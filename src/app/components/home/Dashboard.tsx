import { Calendar, Clock, MapPin, Plus, FileText, AlertCircle, Activity, GraduationCap, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { MOCK_NEXT_EXAM, MOCK_EXAM_HISTORY, MOCK_EXAMS } from "../../data/mockData";

interface DashboardProps {
  onNavigate: (page: string, data?: { examType?: string }) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  // Dados mock centralizados
  const nextExam = MOCK_NEXT_EXAM;
  const availableResults = MOCK_EXAM_HISTORY.filter(exam => exam.resultAvailable).length;
  const pendingAlerts = MOCK_EXAMS.filter(exam => exam.status === "overdue" || exam.status === "due-soon").length;

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Próximo Exame */}
      {nextExam ? (
        <Card className="border-primary/20 bg-accent/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Próximo Exame Agendado</CardTitle>
              <Badge className="bg-primary">Em breve</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h3 className="text-primary">{nextExam.type}</h3>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-5 w-5 flex-shrink-0" />
                  <span>
                    {new Date(nextExam.date).toLocaleDateString('pt-BR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-5 w-5 flex-shrink-0" />
                  <span>{nextExam.time}</span>
                </div>

                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <div>{nextExam.clinic}</div>
                    <div className="text-sm">{nextExam.address}</div>
                  </div>
                </div>
              </div>
            </div>

            <Button
              className="w-full h-12"
              onClick={() => onNavigate('exam-details')}
            >
              Ver Detalhes do Agendamento
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {/* Alerta de Exames Pendentes */}
      {pendingAlerts > 0 && (
        <Card className="border-warning/20 bg-warning/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 flex-shrink-0 text-warning" />
              <div className="flex-1 space-y-2">
                <h3>Atenção: Exame Preventivo Necessário</h3>
                <p className="text-muted-foreground">
                  Você tem {pendingAlerts} exame{pendingAlerts > 1 ? 's' : ''} preventivo{pendingAlerts > 1 ? 's' : ''} recomendado{pendingAlerts > 1 ? 's' : ''} para sua idade.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full h-12 border-warning text-warning hover:bg-warning hover:text-warning-foreground"
                  onClick={() => onNavigate('alerts')}
                >
                  Ver Alertas
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Botão de Agendar Novo Exame */}
      <Button 
        className="w-full h-14 gap-2"
        size="lg"
        onClick={() => onNavigate('scheduling')}
      >
        <Plus className="h-5 w-5" />
        Agendar Novo Exame
      </Button>

      {/* Resultados Disponíveis */}
      {availableResults > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Resultados Disponíveis</span>
              <Badge className="bg-success">{availableResults}</Badge>
            </CardTitle>
            <CardDescription>
              Você tem resultados de exames prontos para visualizar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full h-12 gap-2"
              onClick={() => onNavigate('exams')}
            >
              <FileText className="h-5 w-5" />
              Ver Meus Resultados
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Atalhos Rápidos */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="cursor-pointer transition-colors hover:bg-accent" onClick={() => onNavigate('health')}>
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <h4>Meu Bem Cuidar</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Acompanhe seus exames
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer transition-colors hover:bg-accent" onClick={() => onNavigate('education')}>
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <h4>Aprenda Sobre Prevenção</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Artigos e vídeos educativos
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer transition-colors hover:bg-accent" onClick={() => onNavigate('tracking')}>
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h4>Meu Progresso</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Veja seu histórico de cuidado
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer transition-colors hover:bg-accent" onClick={() => onNavigate('checkin')}>
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h4>Fazer Check-in</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Chegou na clínica?
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
