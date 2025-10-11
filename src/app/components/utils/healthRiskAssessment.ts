// Função para avaliar riscos de saúde baseados nos dados do usuário
export interface HealthData {
  birthDate: string;
  isSmoker: string;
  hasDiabetes: boolean;
  hasHypertension: boolean;
  hasHeartDisease: boolean;
  hasObesity: boolean;
  familyHistory: {
    breastCancer: boolean;
    colonCancer: boolean;
    prostateCancer: boolean;
    lungCancer: boolean;
    skinCancer: boolean;
    other: boolean;
  };
}

export interface ExamRecommendation {
  exam: string;
  priority: "high" | "medium" | "low";
  reason: string;
  frequency: string;
  startAge?: number;
}

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

export function assessHealthRisks(healthData: HealthData): ExamRecommendation[] {
  const age = calculateAge(healthData.birthDate);
  const recommendations: ExamRecommendation[] = [];

  // Mamografia - para mulheres
  if (age >= 40 || healthData.familyHistory.breastCancer) {
    recommendations.push({
      exam: "Mamografia",
      priority: healthData.familyHistory.breastCancer ? "high" : "medium",
      reason: healthData.familyHistory.breastCancer 
        ? "Histórico familiar de câncer de mama aumenta o risco"
        : "Recomendado para mulheres a partir dos 40 anos",
      frequency: "Anual",
      startAge: healthData.familyHistory.breastCancer ? 35 : 40,
    });
  }

  // Colonoscopia
  if (age >= 45 || healthData.familyHistory.colonCancer) {
    recommendations.push({
      exam: "Colonoscopia",
      priority: healthData.familyHistory.colonCancer ? "high" : "medium",
      reason: healthData.familyHistory.colonCancer
        ? "Histórico familiar de câncer colorretal aumenta significativamente o risco"
        : "Prevenção de câncer de intestino a partir dos 45 anos",
      frequency: "A cada 5-10 anos",
      startAge: healthData.familyHistory.colonCancer ? 40 : 45,
    });
  }

  // Exames cardiovasculares
  if (healthData.hasHypertension || healthData.hasDiabetes || 
      healthData.hasHeartDisease || healthData.hasObesity || age >= 40) {
    recommendations.push({
      exam: "Check-up Cardiovascular",
      priority: (healthData.hasHeartDisease || 
                (healthData.hasHypertension && healthData.hasDiabetes)) ? "high" : "medium",
      reason: "Fatores de risco cardiovascular identificados",
      frequency: "Anual",
    });
  }

  // Exames de sangue para diabéticos
  if (healthData.hasDiabetes) {
    recommendations.push({
      exam: "Hemoglobina Glicada (HbA1c)",
      priority: "high",
      reason: "Essencial para controle do diabetes",
      frequency: "A cada 3 meses",
    });
  }

  // Rastreamento de pulmão para fumantes
  if (healthData.isSmoker === "current" || 
      (healthData.isSmoker === "former" && age >= 50) ||
      healthData.familyHistory.lungCancer) {
    recommendations.push({
      exam: "Tomografia de Tórax",
      priority: "high",
      reason: healthData.isSmoker === "current"
        ? "Fumantes têm risco aumentado de câncer de pulmão"
        : "Ex-fumantes devem continuar rastreamento",
      frequency: "Anual",
      startAge: 50,
    });
  }

  // Exame de pele
  if (healthData.familyHistory.skinCancer || age >= 40) {
    recommendations.push({
      exam: "Exame Dermatológico",
      priority: healthData.familyHistory.skinCancer ? "high" : "low",
      reason: healthData.familyHistory.skinCancer
        ? "Histórico familiar de câncer de pele requer acompanhamento"
        : "Prevenção de câncer de pele",
      frequency: "Anual",
    });
  }

  // PSA para homens (assumindo baseado na idade)
  if (age >= 50 || healthData.familyHistory.prostateCancer) {
    recommendations.push({
      exam: "PSA e Toque Retal",
      priority: healthData.familyHistory.prostateCancer ? "high" : "medium",
      reason: healthData.familyHistory.prostateCancer
        ? "Histórico familiar aumenta risco de câncer de próstata"
        : "Rastreamento de câncer de próstata",
      frequency: "Anual",
      startAge: healthData.familyHistory.prostateCancer ? 45 : 50,
    });
  }

  // Densitometria óssea
  if (age >= 65) {
    recommendations.push({
      exam: "Densitometria Óssea",
      priority: "medium",
      reason: "Rastreamento de osteoporose",
      frequency: "A cada 2 anos",
      startAge: 65,
    });
  }

  // Exames de rotina
  recommendations.push({
    exam: "Exames de Sangue Completo",
    priority: "medium",
    reason: "Check-up anual de saúde geral",
    frequency: "Anual",
  });

  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}
