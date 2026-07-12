export enum ExerciseType {
  FILL_IN_THE_BLANK = 'FILL_IN_THE_BLANK',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  REWRITE_ACCENT = 'REWRITE_ACCENT',
  CLASSIFY_WORDS = 'CLASSIFY_WORDS',
  TRANSLATION = 'TRANSLATION',
  WORD_ORDER = 'WORD_ORDER',
  MATCH_PAIRS = 'MATCH_PAIRS',
  LISTENING = 'LISTENING',
}

export interface Feedback {
  correct: string;
  incorrect: string;
}

export interface FillInTheBlankContent {
  sentenceParts: string[];
  solutions: string[];
}

export interface MultipleChoiceContent {
  question: string;
  options: string[];
  solution: string;
}

export interface RewriteAccentContent {
    word: string;
    solution: string;
}

export interface ClassifyWord {
  word: string;
  category: string;
}

export interface ClassifyWordsContent {
  categories: string[];
  words: ClassifyWord[];
}

export interface TranslationContent {
  frenchSentence: string;
  possibleSolutions: string[];
  note: string;
}

// Puzzle de phrase : remettre les mots mélangés dans le bon ordre.
export interface WordOrderContent {
  words: string[];       // mots dans le désordre (tels qu'affichés sur les tuiles)
  solution: string;      // phrase correcte
  translation?: string;  // traduction française affichée en indice
}

// Appariement : relier les paires (ex. espagnol ↔ français).
export interface MatchPair {
  left: string;
  right: string;
}
export interface MatchPairsContent {
  pairs: MatchPair[];
}

// Dictée audio : écouter (synthèse vocale es-ES) et écrire ce qu'on entend.
export interface ListeningContent {
  audioText: string;          // texte prononcé par la synthèse vocale
  possibleSolutions: string[]; // réponses acceptées (souvent identiques à audioText)
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  instructions: string;
  content:
    | FillInTheBlankContent[]
    | MultipleChoiceContent[]
    | RewriteAccentContent[]
    | ClassifyWordsContent[]
    | TranslationContent[]
    | WordOrderContent[]
    | MatchPairsContent[]
    | ListeningContent[];
  feedback: Feedback;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  feedback: {
    correct: string;
    incorrect: string;
  };
}

export interface Chapter {
  id: string;
  title: string;
  theory: string;
  exercises: Exercise[];
  quiz: QuizQuestion[];
}

// ---- Types du mode jeu (parcours façon Duolingo) ----

export type LessonQuestion =
  | { kind: 'mc'; prompt: string; options: string[]; answer: string; hint: string }
  | { kind: 'fill'; instructions: string; parts: string[]; solutions: string[]; hint: string }
  | { kind: 'accent'; word: string; solution: string; hint: string }
  | { kind: 'classify'; word: string; categories: string[]; answer: string; hint: string }
  | { kind: 'translate'; french: string; solutions: string[]; note: string; hint: string }
  | { kind: 'order'; words: string[]; solution: string; translation?: string; hint: string }
  | { kind: 'match'; pairs: MatchPair[]; hint: string }
  | { kind: 'listen'; text: string; solutions: string[]; hint: string };

export type NodeType = 'theory' | 'lesson' | 'boss';

export interface LessonNode {
  id: string;
  type: NodeType;
  title: string;
  questions: LessonQuestion[];
}

export type UnitColor = 'green' | 'blue' | 'purple';

export interface Unit {
  id: string;
  title: string;
  color: UnitColor;
  chapter: Chapter;
  nodes: LessonNode[];
}

export interface GameProgress {
  xp: number;
  hearts: number;
  streak: number;
  lastActiveDay: string;
  completed: Record<string, boolean>;
  // Remédiation : cartes d'erreurs à rejouer (questions ratées, dédupliquées).
  mistakes: LessonQuestion[];
}