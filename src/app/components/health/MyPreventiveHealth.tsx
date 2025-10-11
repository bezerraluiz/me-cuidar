import { CheckCircle, XCircle, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { cn } from "../ui/utils";

interface MyPreventiveHealthProps {
  onNavigate: (page: string, data?: any) => void;
}

export function MyPreventiveHealth({ onNavigate }: MyPreventiveHealthProps) {
  const [expandedExam, setExpandedExam] = useState<number | null>(null);

  // Dados mock de exames preventivos
  const exams = [
    {
      id: 1,
      name: "Mamografia",
      status: "ok",
      lastDone: "15/03/2025",
      nextDue: "15/03/2026",
      frequency: "Anual",
      ageRecommendation: "A partir dos 40 anos",
      details: "A mamografia é o exame de raios-X da mama que ajuda a detectar o câncer de mama precocemente. Mulheres de 40 a 74 anos devem fazer anualmente.",
    },
    {
      id: 2,
      name: "Papanicolau",
      status: "ok",
      lastDone: "10/05/2025",
      nextDue: "10/05/2028",
      frequency: "A cada 3 anos",
      ageRecommendation: "25 a 64 anos",
      details: "O exame Papanicolau detecta alterações nas células do colo do útero que podem levar ao câncer. Após dois exames anuais normais, pode ser feito a cada 3 anos.",
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
    },
    {
      id: 4,
      name: "Densitometria Óssea",
      status: "due-soon",
      lastDone: "20/01/2024",
      nextDue: "Janeiro 2026",
      frequency: "A cada 2 anos",
      ageRecommendation: "Mulheres pós-menopausa",
      details: "A densitometria óssea mede a densidade dos ossos e ajuda a diagnosticar osteoporose. Recomendada para mulheres após a menopausa.",
    },
    {
      id: 5,
      name: "Exames de Sangue",
      status: "ok",
      lastDone: "22/08/2025",
      nextDue: "22/08/2026",
      frequency: "Anual",
      ageRecommendation: "Todas as idades",
      details: "Hemograma completo, glicemia, colesterol e outros exames de sangue ajudam a monitorar a saúde geral e detectar problemas precocemente.",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ok":
        return <CheckCircle className="h-6 w-6 text-success" />;
      case "overdue":
        return <XCircle className="h-6 w-6 text-destructive" />;
      case "due-soon":
        return <Clock className="h-6 w-6 text-warning" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "ok":
        return "Em dia";
      case "overdue":
        return "Atrasado";
      case "due-soon":
        return "Em breve";
      default:
        return "";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ok":
        return "text-success";
      case "overdue":
        return "text-destructive";
      case "due-soon":
        return "text-warning";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h1>Minha Saúde Preventiva</h1>
        <p className="text-muted-foreground mt-2">
          Acompanhe todos os seus exames preventivos
        </p>
      </div>

      {/* Checklist de Exames */}
      <div className="space-y-3">
        {exams.map((exam) => {
          const isExpanded = expandedExam === exam.id;
          
          return (
            <Card key={exam.id}>
              <CardHeader 
                className="cursor-pointer"
                onClick={() => setExpandedExam(isExpanded ? null : exam.id)}
              >
                <div className="flex items-start gap-3">
                  {getStatusIcon(exam.status)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="mb-1">{exam.name}</CardTitle>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <CardDescription>
                        {exam.lastDone ? (
                          <>Última: {exam.lastDone}</>
                        ) : (
                          <>Nunca realizado</>
                        )}
                      </CardDescription>
                      <div className={cn("text-sm", getStatusColor(exam.status))}>
                        Próximo: {exam.nextDue} • {getStatusText(exam.status)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="space-y-4 border-t pt-4">
                  <div className="grid gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Frequência:</span>
                      <span>{exam.frequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Recomendado:</span>
                      <span>{exam.ageRecommendation}</span>
                    </div>
                  </div>

                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm">{exam.details}</p>
                  </div>

                  {exam.status !== "ok" && (
                    <Button 
                      className="w-full h-12"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('scheduling', { examType: exam.name });
                      }}
                    >
                      Agendar {exam.name}
                    </Button>
                  )}
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Botão Flutuante */}
      <Button 
        className="w-full h-14"
        size="lg"
        onClick={() => onNavigate('scheduling')}
      >
        Agendar Novo Exame
      </Button>
    </div>
  );
}
