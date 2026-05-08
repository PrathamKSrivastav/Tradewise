export interface LessonFact {
  statement: string;
  source?: 'varsity' | 'sebi' | 'nism' | 'amfi' | 'rbi' | 'ncert';
  citation: string;
  verifiedDate?: string; // ISO date — flag for yearly review
}

export interface QuizSeed {
  id?: string;
  question: string;
  options: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  explanation: string;
  factRef?: string; // maps back to facts[].citation
  citation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface LessonIllustration {
  type: 'svg-component' | 'recharts-component' | 'inline-svg';
  ref: string;
  caption: string;
}

export interface SimulatorExercise {
  prompt: string;
  metric: string;
  goal: string;
  successCondition: string;
}

export interface LessonObject {
  id: string;                        // slug e.g. "01-money-and-inflation"
  title: string;
  subtitle?: string;
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  order: number;
  xpReward: number;
  source?: string;                   // attribution line (required for L1/L2)
  attribution?: string;              // alias for source used in L3–L8
  estimatedReadTime?: number;        // minutes
  body: string;                      // MDX content
  keyTerms: { term: string; definition: string }[];
  facts: LessonFact[];
  quizSeed: QuizSeed[];
  illustrations?: LessonIllustration[];
  simulatorExercise?: SimulatorExercise;
}
