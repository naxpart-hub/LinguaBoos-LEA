import { grammarData } from './grammarData';
import {
  Chapter,
  Exercise,
  ExerciseType,
  FillInTheBlankContent,
  MultipleChoiceContent,
  RewriteAccentContent,
  ClassifyWordsContent,
  TranslationContent,
  WordOrderContent,
  MatchPairsContent,
  ListeningContent,
  LessonQuestion,
  LessonNode,
  Unit,
  UnitColor,
  GameProgress,
} from '../types';

export const MAX_HEARTS = 5;
export const XP_PER_LESSON = 10;
export const XP_PERFECT_BONUS = 5;
export const XP_PER_THEORY = 5;
export const XP_PER_BOSS = 20;

const QUESTIONS_PER_LESSON = 8;

// ---- Construction du parcours à partir des chapitres ----

const exerciseToQuestions = (exercise: Exercise): LessonQuestion[] => {
  const hint = exercise.feedback.incorrect;
  switch (exercise.type) {
    case ExerciseType.MULTIPLE_CHOICE:
      return (exercise.content as MultipleChoiceContent[]).map(item => ({
        kind: 'mc',
        prompt: item.question,
        options: item.options,
        answer: item.solution,
        hint,
      }));
    case ExerciseType.FILL_IN_THE_BLANK:
      return (exercise.content as FillInTheBlankContent[]).map(item => ({
        kind: 'fill',
        instructions: exercise.instructions,
        parts: item.sentenceParts.join('').split('__'),
        solutions: item.solutions,
        hint,
      }));
    case ExerciseType.REWRITE_ACCENT:
      return (exercise.content as RewriteAccentContent[]).map(item => ({
        kind: 'accent',
        word: item.word,
        solution: item.solution,
        hint,
      }));
    case ExerciseType.CLASSIFY_WORDS: {
      const content = exercise.content[0] as ClassifyWordsContent;
      return content.words.map(w => ({
        kind: 'classify',
        word: w.word,
        categories: content.categories,
        answer: w.category,
        hint,
      }));
    }
    case ExerciseType.TRANSLATION:
      return (exercise.content as TranslationContent[]).map(item => ({
        kind: 'translate',
        french: item.frenchSentence,
        solutions: item.possibleSolutions,
        note: item.note,
        hint,
      }));
    case ExerciseType.WORD_ORDER:
      return (exercise.content as WordOrderContent[]).map(item => ({
        kind: 'order',
        words: item.words,
        solution: item.solution,
        translation: item.translation,
        hint,
      }));
    case ExerciseType.MATCH_PAIRS:
      return (exercise.content as MatchPairsContent[]).map(item => ({
        kind: 'match',
        pairs: item.pairs,
        hint,
      }));
    case ExerciseType.LISTENING:
      return (exercise.content as ListeningContent[]).map(item => ({
        kind: 'listen',
        text: item.audioText,
        solutions: item.possibleSolutions,
        hint,
      }));
    default:
      return [];
  }
};

// Mélange les questions des différents exercices en alternance (round-robin),
// pour que chaque leçon varie les types d'activités.
const interleave = <T,>(lists: T[][]): T[] => {
  const result: T[] = [];
  const max = Math.max(...lists.map(l => l.length), 0);
  for (let i = 0; i < max; i++) {
    for (const list of lists) {
      if (i < list.length) result.push(list[i]);
    }
  }
  return result;
};

const chunk = <T,>(items: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};

const buildUnit = (chapter: Chapter, index: number): Unit => {
  const colors: UnitColor[] = ['green', 'blue', 'purple'];
  const questionPools = chapter.exercises.map(exerciseToQuestions);
  const allQuestions = interleave(questionPools);

  const nodes: LessonNode[] = [
    {
      id: `${chapter.id}-theory`,
      type: 'theory',
      title: 'Théorie',
      questions: [],
    },
    ...chunk(allQuestions, QUESTIONS_PER_LESSON).map((questions, i) => ({
      id: `${chapter.id}-lesson-${i + 1}`,
      type: 'lesson' as const,
      title: `Leçon ${i + 1}`,
      questions,
    })),
    {
      id: `${chapter.id}-boss`,
      type: 'boss',
      title: "Examen de l'unité",
      questions: chapter.quiz.map(q => ({
        kind: 'mc' as const,
        prompt: q.question,
        options: q.options,
        answer: q.answer,
        hint: q.feedback.incorrect,
      })),
    },
  ];

  return {
    id: chapter.id,
    title: chapter.title,
    color: colors[index % colors.length],
    chapter,
    nodes,
  };
};

export const buildUnits = (): Unit[] => grammarData.map(buildUnit);

// ---- Déblocage des nœuds ----

export const flattenNodes = (units: Unit[]): LessonNode[] =>
  units.flatMap(u => u.nodes);

export const isNodeUnlocked = (
  units: Unit[],
  progress: GameProgress,
  nodeId: string
): boolean => {
  for (const unit of units) {
    const idx = unit.nodes.findIndex(n => n.id === nodeId);
    if (idx === -1) continue;
    // Le premier nœud de chaque unité (la théorie) est toujours accessible.
    if (idx === 0) return true;
    // Sinon : débloqué si le nœud précédent de la même unité est terminé.
    return !!progress.completed[unit.nodes[idx - 1].id];
  }
  return false;
};

export const findCurrentNodeId = (units: Unit[], progress: GameProgress): string | null => {
  const all = flattenNodes(units);
  const next = all.find(n => !progress.completed[n.id]);
  return next ? next.id : null;
};

// ---- Persistance de la progression ----

const STORAGE_KEY = 'grimorio-gargola-v1';

const todayString = () => new Date().toISOString().slice(0, 10);

const yesterdayString = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
};

export const defaultProgress = (): GameProgress => ({
  xp: 0,
  hearts: MAX_HEARTS,
  streak: 0,
  lastActiveDay: '',
  completed: {},
  mistakes: [],
});

export const loadProgress = (): GameProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    const parsed = JSON.parse(raw) as GameProgress;
    return { ...defaultProgress(), ...parsed };
  } catch {
    return defaultProgress();
  }
};

export const saveProgress = (progress: GameProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Stockage indisponible (mode privé...) : le jeu reste jouable sans sauvegarde.
  }
};

const updateStreak = (progress: GameProgress): GameProgress => {
  const today = todayString();
  if (progress.lastActiveDay === today) return progress;
  const streak = progress.lastActiveDay === yesterdayString() ? progress.streak + 1 : 1;
  return { ...progress, streak, lastActiveDay: today };
};

export const completeNode = (
  progress: GameProgress,
  node: LessonNode,
  perfect: boolean
): { progress: GameProgress; xpEarned: number } => {
  const alreadyDone = !!progress.completed[node.id];
  let xpEarned =
    node.type === 'theory' ? XP_PER_THEORY :
    node.type === 'boss' ? XP_PER_BOSS :
    XP_PER_LESSON + (perfect ? XP_PERFECT_BONUS : 0);
  // Rejouer un nœud déjà terminé rapporte moins, comme sur Duolingo.
  if (alreadyDone) xpEarned = Math.max(2, Math.round(xpEarned / 2));

  let next: GameProgress = {
    ...progress,
    xp: progress.xp + xpEarned,
    completed: { ...progress.completed, [node.id]: true },
    // Lire la théorie redonne toutes ses forces à Gargui.
    hearts: node.type === 'theory' ? MAX_HEARTS : progress.hearts,
  };
  next = updateStreak(next);
  saveProgress(next);
  return { progress: next, xpEarned };
};

export const loseHeart = (progress: GameProgress): GameProgress => {
  const next = { ...progress, hearts: Math.max(0, progress.hearts - 1) };
  saveProgress(next);
  return next;
};

export const refillHearts = (progress: GameProgress): GameProgress => {
  const next = { ...progress, hearts: MAX_HEARTS };
  saveProgress(next);
  return next;
};

// ---- Vérification des réponses ----

const normalize = (s: string) => s.trim().toLowerCase();

const normalizeSentence = (s: string) =>
  normalize(s).replace(/[.,;:!?¡¿"«»]/g, '').replace(/\s+/g, ' ');

export const checkQuestion = (question: LessonQuestion, answers: string[]): boolean => {
  switch (question.kind) {
    case 'mc':
      return answers[0] === question.answer;
    case 'classify':
      return answers[0] === question.answer;
    case 'accent':
      return answers[0]?.trim() === question.solution;
    case 'fill':
      return question.solutions.every(
        (sol, i) => normalize(answers[i] ?? '') === normalize(sol)
      );
    case 'translate':
      return question.solutions.some(
        sol => normalizeSentence(sol) === normalizeSentence(answers[0] ?? '')
      );
    case 'order':
      return normalizeSentence(answers[0] ?? '') === normalizeSentence(question.solution);
    case 'match':
      // L'appariement se valide dans l'interface : 'ok' quand toutes les paires sont trouvées.
      return answers[0] === 'ok';
    case 'listen':
      return question.solutions.some(
        sol => normalizeSentence(sol) === normalizeSentence(answers[0] ?? '')
      );
  }
};

export const correctAnswerText = (question: LessonQuestion): string => {
  switch (question.kind) {
    case 'mc':
      return question.answer;
    case 'classify':
      return question.answer;
    case 'accent':
      return question.solution;
    case 'fill':
      return question.solutions.join(', ');
    case 'translate':
      return question.solutions[0];
    case 'order':
      return question.solution;
    case 'match':
      return question.pairs.map(p => `${p.left} → ${p.right}`).join(' · ');
    case 'listen':
      return question.solutions[0];
  }
};

// ---- Remédiation : cartes d'erreurs ----

const MAX_MISTAKES = 50;
export const REVIEW_QUESTIONS_PER_SESSION = 8;

const mistakeKey = (q: LessonQuestion): string => JSON.stringify(q);

// Enregistre une question ratée dans le deck de révision (dédupliquée, plafonnée).
export const recordMistake = (progress: GameProgress, question: LessonQuestion): GameProgress => {
  const key = mistakeKey(question);
  const existing = progress.mistakes ?? [];
  if (existing.some(m => mistakeKey(m) === key)) return progress;
  const mistakes = [...existing, question].slice(-MAX_MISTAKES);
  const next = { ...progress, mistakes };
  saveProgress(next);
  return next;
};

// Retire du deck les questions revues avec succès (fin d'une session de révision).
export const clearReviewedMistakes = (
  progress: GameProgress,
  reviewed: LessonQuestion[]
): GameProgress => {
  const reviewedKeys = new Set(reviewed.map(mistakeKey));
  const mistakes = (progress.mistakes ?? []).filter(m => !reviewedKeys.has(mistakeKey(m)));
  const next = { ...progress, mistakes };
  saveProgress(next);
  return next;
};

// Construit la salle de révision à partir des erreurs stockées (les plus anciennes d'abord).
export const buildReviewNode = (progress: GameProgress): LessonNode | null => {
  const mistakes = progress.mistakes ?? [];
  if (mistakes.length === 0) return null;
  return {
    id: 'review-session',
    type: 'lesson',
    title: 'Salle de Révision',
    questions: mistakes.slice(0, REVIEW_QUESTIONS_PER_SESSION),
  };
};
