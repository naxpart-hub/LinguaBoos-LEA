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
  const all = flattenNodes(units);
  const index = all.findIndex(n => n.id === nodeId);
  if (index <= 0) return true;
  return !!progress.completed[all[index - 1].id];
};

export const findCurrentNodeId = (units: Unit[], progress: GameProgress): string | null => {
  const all = flattenNodes(units);
  const next = all.find(n => !progress.completed[n.id]);
  return next ? next.id : null;
};

// ---- Persistance de la progression ----

const STORAGE_KEY = 'linguaboost-game-v1';

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
    // Lire la théorie redonne toutes ses forces à Chispa.
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
  }
};
