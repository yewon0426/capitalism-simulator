import { EraId, EraMetadata, TeacherCueCard } from '../types/capitalism';

export const ERAS: Record<EraId, EraMetadata> = {
  commercial: {
    id: 'commercial',
    name: '상업 자본주의',
    nameEn: 'Commercial Capitalism',
    period: '16세기 ~ 18세기 중엽',
    coreQuestion: '“해외 무역이 확대되면 유럽의 경제와 도시에는 어떤 변화가 나타날까?”',
    observationPoint: '대항해 시대로 늘어난 무역선과 상인들의 자본 축적, 그리고 왕실 세관의 중상주의 정책 개입을 관찰하세요.',
    coreConcept: '상업 자본주의는 상업과 해외 무역을 통한 자본 축적이 중요한 특징이며, 국가는 중상주의 정책을 통해 경제에 적극적으로 개입했다.',
    implemented: true,
    nextTransitionReason: '상업적 자본 축적과 시장 확대는 대량 생산에 대한 수요를 낳았고, 기술 혁신과 결합하여 기계제 공업을 출현시키는 토대가 되었습니다.',
  },
  industrial: {
    id: 'industrial',
    name: '산업 자본주의',
    nameEn: 'Industrial Capitalism',
    period: '18세기 후반 ~ 19세기 말',
    coreQuestion: '“기계를 도입하면 생산 방식과 경제활동은 어떻게 달라질까?”',
    observationPoint: '수공업 작업장이 증기기관 공장으로 전환되는 과정, 생산성 폭증, 기업 간 시장 경쟁과 산업화의 그늘을 관찰하세요.',
    coreConcept: '산업 자본주의는 산업혁명으로 기계제 공업이 발전하고, 시장의 자율성과 경쟁을 중시하는 자유방임주의가 영향력을 확대한 흐름이다.',
    implemented: true,
    nextTransitionReason: '자유방임주의 하에서 기업 간 과열 경쟁과 독점, 유효수요 부족이 누적되어 1929년 전 세계적 대공황이라는 전대미문의 위기로 이어졌습니다.',
  },
  modified: {
    id: 'modified',
    name: '수정 자본주의',
    nameEn: 'Modified Capitalism (Keynesianism)',
    period: '20세기 1930년대 ~ 1970년대',
    coreQuestion: '“물건을 충분히 생산할 수 있는데도 왜 공장과 가게가 문을 닫고 실업자가 넘쳐날까?”',
    observationPoint: '1929년 대공황의 수요 부족 악순환과 뉴딜 정책 등 정부의 적극적인 공공사업·유효수요 창출을 관찰합니다.',
    coreConcept: '수정 자본주의는 시장경제를 유지하면서 경기 침체와 실업 등 시장 실패를 해결하기 위해 정부의 적극적인 역할을 강조하는 흐름이다.',
    implemented: true,
    nextTransitionReason: '1970년대 석유 파동으로 경기 침체와 물가 상승이 동시에 발생하는 스태그플레이션이 발생하며 케인스주의 정부 개입의 한계가 노출되었습니다.',
  },
  neoliberal: {
    id: 'neoliberal',
    name: '신자유주의',
    nameEn: 'Neoliberalism',
    period: '1970년대 말 ~ 현재',
    coreQuestion: '“경기는 침체되는데 물가는 계속 오르는 스태그플레이션 상황에서 정부는 무엇을 해야 할까?”',
    observationPoint: '석유 파동 이후 정부 개입 축소, 규제 완화, 민영화, 자유 무역 확대를 통한 시장 효율성 강조를 관찰합니다.',
    coreConcept: '신자유주의는 스태그플레이션 등 정부 실패 이후 시장의 자율성과 경쟁을 강조하며 정부의 역할을 재조정하려는 흐름이다.',
    implemented: true,
    nextTransitionReason: '금융 위기, 빈부 격차 심화, 공공성 약화 등의 문제가 대두되어 시장과 정부의 균형 있는 역할에 대한 현대적 논의로 이어집니다.',
  },
  comparison: {
    id: 'comparison',
    name: '4대 시대 종합 비교',
    nameEn: 'Comprehensive Historical Matrix',
    period: '자본주의 500년 변천사',
    coreQuestion: '“자본주의는 역사적 위기와 변화 속에서 어떻게 정부와 시장의 균형을 바꾸어 왔을까?”',
    observationPoint: '상업 → 산업 → 수정 → 신자유주의로 이어지는 순환과 발전 메커니즘을 한눈에 비교 분석하세요.',
    coreConcept: '자본주의는 고정된 제도가 아니라 역사적 조건과 한계에 부딪힐 때마다 시장과 정부의 역할을 재조정하며 진화해 온 유기적 체제이다.',
    implemented: true,
    nextTransitionReason: '',
  },
};

export const TEACHER_CUE_CARDS: Record<string, TeacherCueCard> = {
  commercial: {
    questionToStudents: '“신항로 개척 이후 먼 바다를 건너온 향신료와 비단은 유럽 상인들에게 어떤 막대한 변화를 가져왔을까요? 국가 권력은 왜 무역선들을 보호하고 통제했을까요?”',
    teacherGuideText: '학생들이 단순히 상선이 오갔다는 사실에 그치지 않고, ‘상업을 통한 자본 축적’이 이후 산업혁명의 든든한 종잣돈이 되었다는 점을 짚어주세요. 또한 1651년 영국의 항해법처럼 왕실이 자국 무역을 독점하고 수출을 장려한 중상주의(Mercantilism)의 성격을 세관 설치 조작을 통해 설명합니다.',
    boardSummary: [
      '1. 대항해 시대(15~17세기): 원거리 해외 무역 확대와 교역 상품(향신료, 비단 등) 급증',
      '2. 상업 자본의 축적: 무역과 유통 과정을 통해 거대한 부를 형성한 상인 계층 성장',
      '3. 중상주의(Mercantilism): 왕실의 적극적 개입(수출 장려, 수입 억제, 영국 항해법 제정)',
      '4. 한계: 식민지 쟁탈전과 원주민 수탈 등 초기 자본주의의 구조적 모순 내포',
    ],
  },
  industrial: {
    questionToStudents: '“물레를 손으로 돌려 실을 짤 때와, 석탄을 때서 증기기관으로 기계를 돌릴 때 생산량은 몇 배나 차이가 날까요? 그리고 왜 공장이 많아질수록 하늘은 검어지고 도시의 노동자들은 힘들어졌을까요?”',
    teacherGuideText: '조작 1을 통해 수공업(2개)과 기계제 공업(12개)의 가상 생산성 격차를 화면으로 보여주며 생산력의 비약적 발전을 체감하게 하세요. 조작 2에서는 애덤 스미스가 주장한 자유방임주의와 보이지 않는 손(시장 가격 기구)을, 조작 3에서는 장시간 저임금 노동과 환경오염이라는 자본주의의 어두운 이면을 연결합니다.',
    boardSummary: [
      '1. 18세기 후반 영국 산업혁명: 제임스 와트의 증기기관 개량, 방적기·방직기 보급',
      '2. 공장제 기계공업: 손 작업(가내 수공업)에서 대량 분업 기계 생산으로 전환 → 생산성 폭증',
      '3. 자유방임주의와 보이지 않는 손: 애덤 스미스 『국부론』(1776), 자유로운 경쟁과 시장 자율성 중시',
      '4. 한계: 열악한 노동 환경, 아동 노동, 심각한 빈부격차 및 환경오염 발생',
    ],
  },
  modified: {
    questionToStudents: '“시장에 모든 것을 맡겨두면 보이지 않는 손이 다 해결해 준다고 믿었는데, 왜 1929년 수많은 공장이 문을 닫고 길거리에 실업자가 쏟아져 나왔을까요?”',
    teacherGuideText: '공급 과잉과 유효수요 부족으로 인한 대공황의 악순환을 설명합니다. 케인스는 정부가 나서서 댐을 짓고 도로를 놓는 등 공공사업을 펼쳐 일자리와 구매력을 만들어 주어야 시장이 다시 돈다고 주장했음을 강조하세요.',
    boardSummary: [
      '1. 1929년 대공황: 유효수요 부족으로 인한 대규모 생산 축소와 실업의 악순환',
      '2. 케인스주의(수정 자본주의): 정부의 적극적인 재정 지출과 유효수요 창출 강조',
      '3. 미국의 뉴딜 정책(1933~): 테네시강 유역 개발 등 대규모 공공사업 추진',
      '4. 한계: 훗날 정부 지출 누적에 따른 재정 적자와 1970년대 정부 실패의 원인 제공',
    ],
  },
  neoliberal: {
    questionToStudents: '“정부가 돈을 더 써서 경기를 살리려 해도 물가만 천정부지로 치솟는 스태그플레이션이 닥쳤을 때, 경제학자들은 어떤 해법을 제시했을까요?”',
    teacherGuideText: '하이에크와 프리드먼의 이론을 바탕으로, 지나친 정부 개입과 규제가 시장의 역동성을 떨어뜨렸다고 보아 다시금 시장 원리와 자유로운 경쟁, 공기업 민영화를 앞세운 신자유주의의 흐름을 짚어줍니다.',
    boardSummary: [
      '1. 1970년대 석유 파동: 원자재가 폭등으로 경기 침체 + 인플레이션 동시 발생(스태그플레이션)',
      '2. 정부 실패의 인식: 기존 케인스주의적 경기 부양책의 무력화',
      '3. 신자유주의 정책: 규제 완화, 공기업 민영화, 복지 축소, 자유 무역 확대(대처·레이건)',
      '4. 한계: 사회적 양극화 심화, 복지 안전망 축소, 공공 서비스 질 저하 논란',
    ],
  },
};

export interface ComparisonRow {
  eraId: EraId;
  name: string;
  period: string;
  background: string;
  coreFeature: string;
  thinkers: string;
  stateRole: string;
  limitations: string;
  accentColor: string;
}

export const COMPARISON_DATA: ComparisonRow[] = [
  {
    eraId: 'commercial',
    name: '상업 자본주의',
    period: '16~18세기',
    background: '신항로 개척, 대항해 시대, 해외 식민지 및 원거리 무역 확대',
    coreFeature: '상품 유통과 해외 교역을 통한 상업 자본 축적',
    thinkers: '토머스 먼 (Thomas Mun), 중상주의자들',
    stateRole: '중상주의 (수출 장려, 수입 억제, 자국 선박 보호, 적극적 개입)',
    limitations: '식민지 수탈과 국가 간 무역 갈등, 생산 단계의 근본적 혁신 부족',
    accentColor: 'amber',
  },
  {
    eraId: 'industrial',
    name: '산업 자본주의',
    period: '18세기 말~19세기',
    background: '영국 산업혁명, 증기기관 발명, 기계제 대량 생산 기술 발전',
    coreFeature: '공장제 기계공업, 분업화, 생산성 폭증과 자본가-노동자 계급 분화',
    thinkers: '애덤 스미스 (Adam Smith, 『국부론』 1776)',
    stateRole: '자유방임주의, 야경국가론 (국방·치안 외 시장 개입 최소화)',
    limitations: '도시 빈민·노동 착취, 심각한 빈부격차, 독점화, 유효수요 부족으로 인한 대공황',
    accentColor: 'indigo',
  },
  {
    eraId: 'modified',
    name: '수정 자본주의',
    period: '20세기 (1930년대~)',
    background: '1929년 세계 대공황 발생, 시장 실패와 만성적 유효수요 부족',
    coreFeature: '유효수요 창출, 복지 제도 도입, 공공사업을 통한 고용 증대',
    thinkers: '존 메이너드 케인스 (John Maynard Keynes)',
    stateRole: '적극적 개입 (큰 정부, 공공사업 뉴딜 정책, 사회보장제도)',
    limitations: '정부 재정 적자 누적, 관료주의 비효율, 1970년대 스태그플레이션 직면',
    accentColor: 'emerald',
  },
  {
    eraId: 'neoliberal',
    name: '신자유주의',
    period: '1970년대 말~현재',
    background: '제1·2차 석유 파동, 스태그플레이션, 정부 개입의 한계(정부 실패)',
    coreFeature: '시장의 자율성과 경쟁 복원, 지구적 자유무역(세계화)',
    thinkers: '하이에크 (Friedrich Hayek), 프리드먼 (Milton Friedman)',
    stateRole: '작은 정부 (규제 완화, 공기업 민영화, 복지 축소, 노동 시장 유연화)',
    limitations: '빈부 격차 및 사회적 양극화 심화, 금융 불안정성, 공공성 약화',
    accentColor: 'sky',
  },
];
