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