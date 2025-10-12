// Utilitário para calcular status dos exames preventivos

export interface ExamConfig {
  name: string;
  frequency: number; // em meses
  ageRecommendation: number; // idade mínima
  urgencyThreshold: number; // meses de atraso para ser urgente
}

// Configurações dos exames
export const EXAM_CONFIGS: Record<string, ExamConfig> = {
  mammography: {
    name: "Mamografia",
    frequency: 12, // anual
    ageRecommendation: 40,
    urgencyThreshold: 6,
  },
  papSmear: {
    name: "Papanicolau",
    frequency: 36, // a cada 3 anos
    ageRecommendation: 25,
    urgencyThreshold: 12,
  },
  colonoscopy: {
    name: "Colonoscopia",
    frequency: 60, // a cada 5 anos (mínimo)
    ageRecommendation: 50,
    urgencyThreshold: 12,
  },
  bloodTests: {
    name: "Exames de Sangue (Hemograma, Glicemia, Colesterol)",
    frequency: 12, // anual
    ageRecommendation: 0, // todas as idades
    urgencyThreshold: 6,
  },
  boneDensity: {
    name: "Densitometria Óssea",
    frequency: 24, // a cada 2 anos
    ageRecommendation: 50,
    urgencyThreshold: 6,
  },
};

export type ExamStatus = "ok" | "due-soon" | "overdue" | "not-applicable";
export type ExamPriority = "low" | "medium" | "high" | "urgent";

export interface CalculatedExam {
  id: number;
  name: string;
  status: ExamStatus;
  lastDone: string | null;
  nextDue: string;
  frequency: string;
  ageRecommendation: string;
  details: string;
  priority: ExamPriority;
}

// Calcula a diferença em meses entre duas datas
function monthsDifference(date1: Date, date2: Date): number {
  const months = (date2.getFullYear() - date1.getFullYear()) * 12;
  return months + date2.getMonth() - date1.getMonth();
}

// Formata a frequência do exame
function formatFrequency(months: number): string {
  if (months === 12) return "Anual";
  if (months === 36) return "A cada 3 anos";
  if (months === 24) return "A cada 2 anos";
  if (months === 60) return "A cada 5-10 anos";
  if (months === 3) return "A cada 3 meses";
  return `A cada ${months} meses`;
}

// Formata a recomendação de idade
function formatAgeRecommendation(age: number, gender?: string): string {
  if (age === 0) return "Todas as idades";
  if (age === 40 && gender === "Feminino") return "A partir dos 40 anos";
  if (age === 50 && gender === "Feminino") return "Mulheres a partir dos 50 anos";
  if (age === 25) return "25 a 64 anos";
  return `A partir dos ${age} anos`;
}

// Calcula o status de um exame baseado na última data
export function calculateExamStatus(
  examKey: string,
  lastDate: string | null,
  userAge: number,
  hasCondition: boolean = false
): { status: ExamStatus; priority: ExamPriority; nextDue: string } {
  const config = EXAM_CONFIGS[examKey];
  const today = new Date();

  // Verifica se o exame é aplicável para a idade
  if (userAge < config.ageRecommendation && !hasCondition) {
    return {
      status: "not-applicable",
      priority: "low",
      nextDue: `Recomendado a partir dos ${config.ageRecommendation} anos`,
    };
  }

  // Se nunca fez o exame
  if (!lastDate) {
    return {
      status: "overdue",
      priority: "urgent",
      nextDue: "Recomendado agora",
    };
  }

  // Calcula há quantos meses foi feito
  const lastExamDate = new Date(lastDate);
  const monthsSinceLastExam = monthsDifference(lastExamDate, today);

  // Se está dentro do prazo
  if (monthsSinceLastExam < config.frequency) {
    const nextExamDate = new Date(lastExamDate);
    nextExamDate.setMonth(nextExamDate.getMonth() + config.frequency);

    const monthsUntilNext = monthsDifference(today, nextExamDate);

    if (monthsUntilNext <= 3) {
      return {
        status: "due-soon",
        priority: "medium",
        nextDue: nextExamDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
      };
    }

    return {
      status: "ok",
      priority: "low",
      nextDue: nextExamDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
    };
  }

  // Está atrasado
  const monthsOverdue = monthsSinceLastExam - config.frequency;
  const nextExamDate = new Date(lastExamDate);
  nextExamDate.setMonth(nextExamDate.getMonth() + config.frequency);

  if (monthsOverdue >= config.urgencyThreshold) {
    return {
      status: "overdue",
      priority: "urgent",
      nextDue: `Atrasado desde ${nextExamDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`,
    };
  }

  return {
    status: "overdue",
    priority: "high",
    nextDue: `Atrasado desde ${nextExamDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`,
  };
}

// Detalhes dos exames
const EXAM_DETAILS: Record<string, string> = {
  mammography: "A mamografia é o exame de raios-X da mama que ajuda a detectar o câncer de mama precocemente. Mulheres de 40 a 74 anos devem fazer anualmente.",
  papSmear: "O exame Papanicolau detecta alterações nas células do colo do útero que podem levar ao câncer. Após dois exames anuais normais, pode ser feito a cada 3 anos.",
  colonoscopy: "A colonoscopia examina o intestino grosso para detectar pólipos e câncer colorretal. É fundamental para pessoas acima de 50 anos ou com histórico familiar.",
  bloodTests: "Hemograma completo, glicemia, colesterol e outros exames de sangue ajudam a monitorar a saúde geral e detectar problemas precocemente. Especialmente importante para quem tem hipertensão.",
  boneDensity: "A densitometria óssea mede a densidade dos ossos e ajuda a diagnosticar osteoporose. Recomendada para mulheres após a menopausa ou a partir dos 50 anos.",
};

// Gera a lista completa de exames calculados
export function generateUserExams(
  examsHistory: Record<string, { done: boolean; lastDate: string }>,
  userAge: number,
  gender: string,
  hasHypertension: boolean = false
): CalculatedExam[] {
  const exams: CalculatedExam[] = [];
  let examId = 1;

  Object.entries(EXAM_CONFIGS).forEach(([key, config]) => {
    const history = examsHistory[key];
    const lastDate = history?.done ? history.lastDate : null;

    const { status, priority, nextDue } = calculateExamStatus(
      key,
      lastDate,
      userAge,
      key === 'bloodTests' && hasHypertension // Exames de sangue são mais frequentes com hipertensão
    );

    // Pula exames não aplicáveis
    if (status === "not-applicable") return;

    exams.push({
      id: examId++,
      name: config.name,
      status,
      lastDone: lastDate,
      nextDue,
      frequency: formatFrequency(config.frequency),
      ageRecommendation: formatAgeRecommendation(config.ageRecommendation, gender),
      details: EXAM_DETAILS[key] || "",
      priority,
    });
  });

  return exams;
}

// Calcula a idade a partir da data de nascimento
export function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}
