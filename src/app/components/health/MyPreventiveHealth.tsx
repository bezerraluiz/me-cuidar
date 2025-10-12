import { CheckCircle, XCircle, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "../ui/utils";
import { MOCK_EXAMS } from "../../data/mockData";

interface MyPreventiveHealthProps {
  onNavigate: (page: string, data?: { examType?: string }) => void;
  userExams?: any[];
}

export function MyPreventiveHealth({ onNavigate, userExams }: MyPreventiveHealthProps) {
  const [expandedExam, setExpandedExam] = useState<number | null>(null);

  // Usa exames do usuário se disponível, senão usa MOCK_EXAMS
  const exams = userExams || MOCK_EXAMS;

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
        <h1>Meu Me Cuidar</h1>
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
