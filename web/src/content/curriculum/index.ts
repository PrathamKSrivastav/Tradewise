import type { LessonObject } from '@/types/lesson';

// Level 1 — Financial Basics
import l1_01 from './level1/01-money-and-inflation';
import l1_02 from './level1/02-savings-vs-investing';
import l1_03 from './level1/03-financial-markets-intro';
import l1_04 from './level1/04-goal-planning-emergency-fund';
import l1_05 from './level1/05-compound-interest-and-sip';

// Level 2 — Stock Market Fundamentals
import l2_01 from './level2/01-what-is-a-stock';
import l2_02 from './level2/02-reading-a-stock-quote';
import l2_03 from './level2/03-indices-sensex-nifty';
import l2_04 from './level2/04-sectors-and-diversification';
import l2_05 from './level2/05-mutual-funds-and-etfs';
import l2_06 from './level2/06-demat-account-and-order-types';

// Level 3 — Technical Analysis
import l3_01 from './level3/01-intro-to-technical-analysis';
import l3_02 from './level3/02-candlestick-patterns';
import l3_03 from './level3/03-support-resistance';
import l3_04 from './level3/04-moving-averages';
import l3_05 from './level3/05-rsi-and-macd';
import l3_06 from './level3/06-bollinger-bands-fibonacci';
import l3_07 from './level3/07-volume-and-putting-it-together';

// Level 4 — Fundamental Analysis
import l4_01 from './level4/01-intro-to-fundamental-analysis';
import l4_02 from './level4/02-reading-the-pl-statement';
import l4_03 from './level4/03-balance-sheet-and-cash-flow';
import l4_04 from './level4/04-profitability-ratios';
import l4_05 from './level4/05-valuation-ratios-pe-pb';
import l4_06 from './level4/06-dcf-and-equity-research';

// Level 5 — Risk Management
import l5_01 from './level5/01-types-of-risk';
import l5_02 from './level5/02-position-sizing';
import l5_03 from './level5/03-kelly-criterion-and-expectancy';
import l5_04 from './level5/04-trading-psychology';
import l5_05 from './level5/05-portfolio-risk-and-sharpe';

// Level 6 — Trading Systems
import l6_01 from './level6/01-what-is-a-trading-system';
import l6_02 from './level6/02-pair-trading-logic';
import l6_03 from './level6/03-pair-trading-methods';
import l6_04 from './level6/04-calendar-spreads';
import l6_05 from './level6/05-momentum-portfolio';

// Level 7 — Derivatives
import l7_01 from './level7/01-intro-to-derivatives';
import l7_02 from './level7/02-futures-leverage-and-margin';
import l7_03 from './level7/03-options-call-and-put-basics';
import l7_04 from './level7/04-options-greeks-and-pricing';
import l7_05 from './level7/05-option-strategies';

// Level 8 — Taxation
import l8_01 from './level8/01-trader-vs-investor';
import l8_02 from './level8/02-capital-gains-tax';
import l8_03 from './level8/03-business-income-tax';
import l8_04 from './level8/04-turnover-and-compliance';

const level1Lessons: LessonObject[] = [l1_01, l1_02, l1_03, l1_04, l1_05];
const level2Lessons: LessonObject[] = [l2_01, l2_02, l2_03, l2_04, l2_05, l2_06];
const level3Lessons: LessonObject[] = [l3_01, l3_02, l3_03, l3_04, l3_05, l3_06, l3_07];
const level4Lessons: LessonObject[] = [l4_01, l4_02, l4_03, l4_04, l4_05, l4_06];
const level5Lessons: LessonObject[] = [l5_01, l5_02, l5_03, l5_04, l5_05];
const level6Lessons: LessonObject[] = [l6_01, l6_02, l6_03, l6_04, l6_05];
const level7Lessons: LessonObject[] = [l7_01, l7_02, l7_03, l7_04, l7_05];
const level8Lessons: LessonObject[] = [l8_01, l8_02, l8_03, l8_04];

export const curriculum: Record<number, LessonObject[]> = {
  1: level1Lessons,
  2: level2Lessons,
  3: level3Lessons,
  4: level4Lessons,
  5: level5Lessons,
  6: level6Lessons,
  7: level7Lessons,
  8: level8Lessons,
};

export function getLessonsByLevel(level: number): LessonObject[] {
  return curriculum[level] ?? [];
}

export function getLessonById(id: string): LessonObject | undefined {
  return Object.values(curriculum).flat().find((l) => l.id === id);
}

export function getAllLessons(): LessonObject[] {
  return Object.values(curriculum).flat();
}
