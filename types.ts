export enum ExerciseType {
  FILL_IN_THE_BLANK = 'FILL_IN_THE_BLANK',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  REWRITE_ACCENT = 'REWRITE_ACCENT',
  CLASSIFY_WORDS = 'CLASSIFY_WORDS',
  TRANSLATION = 'TRANSLATION',
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

export interface Exercise {
  id: string;
  type: ExerciseType;
  instructions: string;
  content: FillInTheBlankContent[] | MultipleChoiceContent[] | RewriteAccentContent[] | ClassifyWordsContent[] | TranslationContent[];
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
  | { kind: 'translate'; french: string; solutions: string[]; note: string; hint: string };

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
}