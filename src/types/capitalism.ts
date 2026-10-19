export type EraId = 'commercial' | 'industrial' | 'modified' | 'neoliberal' | 'comparison';

export interface CommercialState {
  tradeExpanded: boolean;
  stateIntervention: boolean; // 중상주의 정책 / 항해법
  shipCount: number;
  goldReserves: number;
  unloadedGoodsCount: number;
}

export interface IndustrialState {
  mechanization: boolean; // 산업혁명 (수공업 -> 공장제 기계공업)
  marketCompetition: boolean; // 애덤 스미스, 보이지 않는 손, 복수 공장 경쟁
  industrialShadows: boolean; // 노동 문제, 환경 오염, 빈부격차
  manualProducedCount: number;
  factoryProducedCount: number;
}

export interface ModifiedState {
  depressionTriggered: boolean; // 대공황 발생 (수요 부족 악순환)
  newDealPublicWorks: boolean; // 정부 공공사업 (TVA 댐, 고용 창출)
  welfarePolicy: boolean; // 사회보장제도 및 최저임금
}

export interface NeoliberalState {
  oilShockStagflation: boolean; // 석유 파동 및 스태그플레이션
  marketDeregulation: boolean; // 규제 완화 및 공기업 민영화
  globalTradeFree: boolean; // 자유무역 및 노동시장 유연화
}

export interface EraMetadata {
  id: EraId;
  name: string;
  nameEn: string;
  period: string;
  coreQuestion: string;
  observationPoint: string;
  coreConcept: string;
  implemented: boolean;
  nextTransitionReason: string;
}

export interface TeacherCueCard {
  questionToStudents: string;
  teacherGuideText: string;
  boardSummary: string[];
}

export interface ExplanationStep {
  title: string;
  content: string;
  keyPoints: string[];
}

export interface ComparisonDimension {
  dimension: string;
  before: string;
  after: string;
}

export interface TermDefinition {
  term: string;
  pronunciation?: string;
  easyDefinition: string;
  academicNote?: string;
}

export interface OperationExplanation {
  operationId: string;
  operationTitle: string;
  shortLabel: string;
  summary: string;
  step1Before: ExplanationStep;
  step2Background: ExplanationStep;
  step3After: ExplanationStep;
  step4Significance: ExplanationStep;
  comparisonMatrix?: ComparisonDimension[];
  misconceptionWarning?: {
    misconception: string;
    correction: string;
  };
  terms: TermDefinition[];
}
