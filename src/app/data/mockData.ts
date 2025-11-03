// Sistema de dados mock com múltiplos usuários e relacionamentos

// Interface para tipos
export interface User {
  id: string;
  cpf: string;
  password: string;
  fullName: string;
  birthDate: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  address: {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  education: string;
  occupation?: string;
  workSchedule?: string;
  familyRole?: string;
  technicalSkills?: {
    internet: number; // 1-10
    smartphone: number; // 1-10
    apps: number; // 1-10
  };
}

export interface HealthContext {
  userId: string;
  lastMammogram: string | null;
  physicalActivity: string;
  lastRoutineCheckup: string;
  conditions: Array<{
    name: string;
    medication: string;
    diagnosedDate: string;
  }>;
  allergies: string[];
  familyHistory: string[];
  barriers?: string[];
  fears?: string[];
  motivations?: string[];
  goals?: string[];
  painPoints?: string[];
  quotes?: string[];
}

// Banco de usuários mock
export const MOCK_USERS: Record<string, User> = {
  "user-1": {
    id: "user-1",
    cpf: "123.456.789-00",
    password: "senha123",
    fullName: "Usuário Teste",
    birthDate: "1975-01-15",
    age: 50,
    gender: "Feminino",
    phone: "(81) 98765-4321",
    email: "teste@email.com",
    address: {
      street: "Rua das Flores",
      number: "123",
      complement: "Apt 201",
      neighborhood: "Boa Viagem",
      city: "Recife",
      state: "PE",
      zipCode: "51020-000",
    },
    education: "Ensino Médio Completo",
    occupation: "Gerente de casa e cuidadora da família",
    workSchedule: "8h-18h (dedicação à casa e família)",
    familyRole: "Mãe, esposa e cuidadora principal da família",
    technicalSkills: {
      internet: 5, // Média - usa para necessidades básicas
      smartphone: 6, // Razoável - usa principalmente WhatsApp
      apps: 4, // Baixa - nunca baixou app de saúde antes
    },
  },
};

// Função auxiliar para buscar usuário por CPF
export const findUserByCPF = (cpf: string): User | undefined => {
  return Object.values(MOCK_USERS).find(user => user.cpf === cpf);
};

// Função auxiliar para obter dados de saúde do usuário
export const getHealthContextByUserId = (userId: string): HealthContext | undefined => {
  return MOCK_HEALTH_CONTEXTS[userId];
};

// Mantém compatibilidade com código antigo
export const MOCK_USER = MOCK_USERS["user-1"];

// Contextos de Saúde por usuário
export const MOCK_HEALTH_CONTEXTS: Record<string, HealthContext> = {
  "user-1": {
    userId: "user-1",
    lastMammogram: null,
    physicalActivity: "Sedentária",
    lastRoutineCheckup: "2022-10-15",
    conditions: [
      {
        name: "Hipertensão Leve",
        medication: "Losartana",
        diagnosedDate: "2020-03-10",
      },
    ],
    allergies: [],
    familyHistory: [
      "Hipertensão (mãe)",
      "Diabetes tipo 2 (pai)",
    ],
    barriers: [
      "Falta de informação sobre exames preventivos",
      "Medo do exame e do resultado",
      "Falta de tempo - prioriza cuidar da família",
      "Custo dos exames (algumas clínicas)",
      "Dificuldade de agendar por telefone (linhas ocupadas)",
    ],
    fears: [
      "Tenho medo de descobrir algo ruim sobre minha saúde",
      "Minha família precisa de mim, não posso ficar doente",
      "Tenho medo de fazer a mamografia - ouvi que dói",
      "E se eu descobrir algo grave? Como vou contar para minha família?",
    ],
    motivations: [
      "Estar presente para os filhos crescerem",
      "Ver a filha se formar, casar e ter netos",
      "Ser um exemplo de autocuidado para a filha",
      "Ter saúde para aproveitar a vida com a família",
    ],
    goals: [
      "Fazer os exames preventivos atrasados",
      "Aprender a cuidar melhor da própria saúde",
      "Ter lembretes automáticos para não esquecer dos exames",
      "Conseguir agendar exames de forma fácil e rápida",
      "Entender melhor sobre prevenção de doenças",
    ],
    painPoints: [
      "Nunca tenho tempo de cuidar de mim",
      "Agendar por ligação é um estresse - linhas sempre ocupadas",
      "Não sei quais exames eu deveria fazer na minha idade",
      "Tenho medo de fazer a mamografia - ouvi que é doloroso",
      "Os custos de exames particulares pesam no orçamento",
      "Fico ansiosa pensando em resultados de exames",
    ],
    quotes: [
      "Eu sei que deveria fazer, mas sempre deixo para depois... Meu dia é tão corrido, quando vou ter tempo para isso?",
      "Tenho tanto medo de descobrir algo ruim... Minha família precisa de mim, não posso ficar doente.",
      "Agendar por ligação é um estresse! A linha da UBS vive ocupada.",
    ],
  },
};

// Mantém compatibilidade com código antigo
export const MOCK_HEALTH_CONTEXT = MOCK_HEALTH_CONTEXTS["user-1"];

// Exames preventivos da Regina (baseado no contexto de nunca ter feito mamografia)
export const MOCK_EXAMS = [
  {
    id: 1,
    name: "Mamografia",
    status: "overdue", // Atrasado - nunca fez e tem 50 anos
    lastDone: null,
    nextDue: "Recomendado agora",
    frequency: "Anual",
    ageRecommendation: "A partir dos 40 anos",
    details: "A mamografia é o exame de raios-X da mama que ajuda a detectar o câncer de mama precocemente. Mulheres de 40 a 74 anos devem fazer anualmente.",
    priority: "urgent",
  },
  {
    id: 2,
    name: "Papanicolau",
    status: "overdue",
    lastDone: "2022-05-10", // Há 3 anos na última consulta
    nextDue: "Atrasado desde maio 2025",
    frequency: "A cada 3 anos",
    ageRecommendation: "25 a 64 anos",
    details: "O exame Papanicolau detecta alterações nas células do colo do útero que podem levar ao câncer. Após dois exames anuais normais, pode ser feito a cada 3 anos.",
    priority: "high",
  },
  {
    id: 3,
    name: "Colonoscopia",
    status: "overdue",
    lastDone: null,
    nextDue: "Recomendado agora",
    frequency: "A cada 5-10 anos",
    ageRecommendation: "A partir dos 50 anos",
    details: "A colonoscopia examina o intestino grosso para detectar pólipos e câncer colorretal. É fundamental para pessoas acima de 50 anos ou com histórico familiar.",
    priority: "urgent",
  },
  {
    id: 4,
    name: "Densitometria Óssea",
    status: "due-soon",
    lastDone: null,
    nextDue: "Recomendado em breve",
    frequency: "A cada 2 anos",
    ageRecommendation: "Mulheres a partir dos 50 anos",
    details: "A densitometria óssea mede a densidade dos ossos e ajuda a diagnosticar osteoporose. Recomendada para mulheres após a menopausa ou a partir dos 50 anos.",
    priority: "medium",
  },
  {
    id: 5,
    name: "Exames de Sangue (Hemograma, Glicemia, Colesterol)",
    status: "overdue",
    lastDone: "2022-10-15", // Na última consulta há 3 anos
    nextDue: "Atrasado desde outubro 2023",
    frequency: "Anual",
    ageRecommendation: "Todas as idades",
    details: "Hemograma completo, glicemia, colesterol e outros exames de sangue ajudam a monitorar a saúde geral e detectar problemas precocemente. Especialmente importante para quem tem hipertensão.",
    priority: "high",
  },
  {
    id: 6,
    name: "Pressão Arterial",
    status: "ok",
    lastDone: "2025-09-20", // Faz acompanhamento por causa da hipertensão
    nextDue: "Dezembro 2025",
    frequency: "A cada 3 meses (hipertensão)",
    ageRecommendation: "Todas as idades",
    details: "Medição regular da pressão arterial é essencial, especialmente para quem tem hipertensão. Deve ser feita a cada 3 meses ou conforme orientação médica.",
    priority: "low",
  },
];

// Próximo exame agendado (ainda não tem nenhum agendado)
export const MOCK_NEXT_EXAM = null;

// Histórico de exames realizados
export const MOCK_EXAM_HISTORY = [
  {
    id: 1,
    name: "Papanicolau",
    date: "2022-05-10",
    clinic: "UBS Boa Viagem",
    result: "Normal",
    status: "completed",
    resultAvailable: true,
    notes: "Exame sem alterações. Repetir em 3 anos.",
  },
  {
    id: 2,
    name: "Exames de Sangue",
    date: "2022-10-15",
    clinic: "Laboratório São Lucas",
    result: "Glicemia e colesterol levemente elevados",
    status: "completed",
    resultAvailable: true,
    notes: "Orientado dieta balanceada e atividade física. Controle da hipertensão adequado com Losartana.",
  },
  {
    id: 3,
    name: "Medição de Pressão",
    date: "2025-09-20",
    clinic: "UBS Boa Viagem",
    result: "130/85 mmHg",
    status: "completed",
    resultAvailable: true,
    notes: "Pressão controlada. Manter medicação.",
  },
];

// Notificações/Lembretes
export const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: "urgent",
    title: "Mamografia Recomendada",
    message: "Você tem 50 anos e ainda não fez sua primeira mamografia. Este exame é muito importante para a detecção precoce do câncer de mama.",
    date: "2025-10-10",
    read: false,
    actionType: "schedule",
    actionData: { examType: "Mamografia" },
  },
  {
    id: 2,
    type: "urgent",
    title: "Colonoscopia Recomendada",
    message: "A partir dos 50 anos, é recomendado fazer a colonoscopia para prevenção do câncer colorretal.",
    date: "2025-10-09",
    read: false,
    actionType: "schedule",
    actionData: { examType: "Colonoscopia" },
  },
  {
    id: 3,
    type: "warning",
    title: "Exames de Sangue Atrasados",
    message: "Seus exames de rotina estão atrasados desde outubro de 2023. Agende para monitorar sua glicemia e colesterol.",
    date: "2025-10-08",
    read: false,
    actionType: "schedule",
    actionData: { examType: "Exames de Sangue" },
  },
  {
    id: 4,
    type: "info",
    title: "Próxima Medição de Pressão",
    message: "Lembre-se de medir sua pressão arterial em dezembro. Mantenha o acompanhamento da hipertensão.",
    date: "2025-10-05",
    read: true,
    actionType: "info",
  },
];

// Dados de acompanhamento longitudinal (Regina tem apenas 2 exames nos últimos anos)
export const MOCK_TRACKING_DATA = {
  yearsTracking: 0, // Ela não faz rastreamento preventivo regular
  totalExams: 3, // Apenas 3 exames nos últimos 3 anos
  recommendedExams: 6, // Deveria ter feito 6
  completionRate: 50, // Baixa adesão
  upcomingExams: [] as Array<{ name: string; date: string }>, // Nenhum agendado ainda
};

export const MOCK_YEARLY_DATA = [
  { year: 2023, exams: 0, recommended: 2 },
  { year: 2024, exams: 0, recommended: 2 },
  { year: 2025, exams: 1, recommended: 2 }, // Apenas medição de pressão
];

// Clínicas disponíveis em Recife
export const MOCK_CLINICS = [
  {
    id: 1,
    name: "UBS Boa Viagem",
    address: "Av. Conselheiro Aguiar, 1500 - Boa Viagem, Recife - PE",
    distance: "1.2 km",
    acceptsSUS: true,
    rating: 4.2,
    availableExams: ["Papanicolau", "Pressão Arterial", "Exames de Sangue"],
  },
  {
    id: 2,
    name: "Clínica São Lucas",
    address: "Rua do Hospício, 300 - Boa Vista, Recife - PE",
    distance: "3.5 km",
    acceptsSUS: false,
    rating: 4.7,
    availableExams: ["Mamografia", "Papanicolau", "Exames de Sangue", "Densitometria Óssea"],
  },
  {
    id: 3,
    name: "Hospital das Clínicas UFPE",
    address: "Av. Prof. Moraes Rego, 1235 - Cidade Universitária, Recife - PE",
    distance: "6.8 km",
    acceptsSUS: true,
    rating: 4.5,
    availableExams: ["Mamografia", "Colonoscopia", "Papanicolau", "Densitometria Óssea", "Exames de Sangue"],
  },
  {
    id: 4,
    name: "Instituto de Medicina Integral (IMIP)",
    address: "Rua dos Coelhos, 300 - Coelhos, Recife - PE",
    distance: "4.2 km",
    acceptsSUS: true,
    rating: 4.6,
    availableExams: ["Mamografia", "Colonoscopia", "Papanicolau", "Exames de Sangue"],
  },
];
