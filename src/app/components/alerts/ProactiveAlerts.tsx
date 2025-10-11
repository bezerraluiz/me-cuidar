import { AlertCircle, CheckCircle, Clock, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface ProactiveAlertsProps {
  onNavigate: (page: string, data?: any) => void;
}

export function ProactiveAlerts({ onNavigate }: ProactiveAlertsProps) {
  // Dados mock de alertas baseados em idade e histórico
  const alerts = [
    {
      id: 1,
      type: "urgent",
      exam: "Colonoscopia",
      reason: "Recomendado para pessoas acima de 50 anos",
      status: "overdue",
      lastDone: null,
      nextDue: "Agora",
      description: "A colonoscopia é importante para detectar precocemente câncer de intestino. Esse exame deve ser feito a partir dos 50 anos e repetido a cada 5-10 anos.",
    },
    {
      id: 2,
      type: "warning",
      exam: "Mamografia",
      reason: "Exame anual recomendado",
      status: "due-soon",
      lastDone: "15/03/2024",
      nextDue: "Março 2025",
      description: "A mamografia é o principal exame para detectar precocemente o câncer de mama. Mulheres acima de 40 anos devem fazer anualmente.",
    },
    {
      id: 3,
      type: "info",
      exam: "Exame de Sangue Completo",
      reason: "Check-up anual",
      status: "ok",
      lastDone: "22/08/2025",
      nextDue: "Agosto 2026",
      description: "O hemograma completo ajuda a identificar diversas condições de saúde e deve ser feito anualmente.",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "overdue":
        return <AlertCircle className="h-6 w-6 text-destructive" />;
      case "due-soon":
        return <Clock className="h-6 w-6 text-warning" />;
      case "ok":
        return <CheckCircle className="h-6 w-6 text-success" />;
      default:
        return <Info className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "overdue":
        return <Badge className="bg-destructive">Atrasado</Badge>;
      case "due-soon":
        return <Badge className="bg-warning">Em breve</Badge>;
      case "ok":
        return <Badge className="bg-success">Em dia</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h1>Sua Saúde Preventiva</h1>
        <p className="text-muted-foreground mt-2">
          Acompanhe os exames recomendados para você
        </p>
      </div>

      {/* Resumo */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl text-destructive">1</div>
              <p className="text-sm text-muted-foreground mt-1">Atrasado</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl text-warning">1</div>
              <p className="text-sm text-muted-foreground mt-1">Em breve</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl text-success">1</div>
              <p className="text-sm text-muted-foreground mt-1">Em dia</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Alertas */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <Card 
            key={alert.id}
            className={
              alert.status === "overdue" 
                ? "border-destructive/20 bg-destructive/5" 
                : alert.status === "due-soon"
                ? "border-warning/20 bg-warning/5"
                : ""
            }
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  {getStatusIcon(alert.status)}
                  <div className="flex-1">
                    <CardTitle className="mb-1">{alert.exam}</CardTitle>
                    <CardDescription>{alert.reason}</CardDescription>
                  </div>
                </div>
                {getStatusBadge(alert.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2 text-sm">
                {alert.lastDone ? (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Último exame:</span>
                    <span>{alert.lastDone}</span>
                  </div>
                ) : (
                  <div className="text-muted-foreground">Nunca realizado</div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Próximo exame:</span>
                  <span>{alert.nextDue}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex-1 h-12">
                      Entenda Por Quê
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{alert.exam}</DialogTitle>
                      <DialogDescription className="pt-4">
                        {alert.description}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                      <Button 
                        className="w-full h-12"
                        onClick={() => {
                          onNavigate('scheduling', { examType: alert.exam });
                        }}
                      >
                        Agendar Este Exame
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {alert.status !== "ok" && (
                  <Button 
                    className="flex-1 h-12"
                    onClick={() => onNavigate('scheduling', { examType: alert.exam })}
                  >
                    Agendar Agora
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
