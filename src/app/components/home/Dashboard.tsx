/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar, Clock, MapPin, Plus, AlertCircle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface DashboardProps {
  onNavigate: (page: string, data?: any) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  // Dados mock
  const nextExam = {
    type: "Mamografia",
    date: "2025-10-18",
    time: "14:30",
    clinic: "Clínica São Lucas",
    address: "Rua das Flores, 123",
  };

  //const availableResults = 2;
  const pendingAlerts = 1;

  return (
    <div className="space-y-6 pb-20 md:pb-6">
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
                  className="cursor-pointer w-full h-12 border-warning text-warning hover:bg-warning hover:text-warning-foreground"
                  onClick={() => onNavigate('alerts')}
                >
                  Ver Alertas
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Próximo Exame */}
      {nextExam && (
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
          </CardContent>
        </Card>
      )}

      {/* Botão de Agendar Novo Exame */}
      <Button
        className="cursor-pointer w-full h-14 gap-2"
        size="lg"
        onClick={() => onNavigate('scheduling')}
      >
        <Plus className="h-5 w-5" />
        Agendar Novo Exame
      </Button>

      {/* Atalhos Rápidos */}
      <div className="grid gap-4 sm:grid-cols-2">
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
