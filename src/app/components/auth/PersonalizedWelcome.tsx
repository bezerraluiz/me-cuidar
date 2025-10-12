/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { assessHealthRisks, calculateAge, type HealthData } from "../utils/healthRiskAssessment";

interface PersonalizedWelcomeProps {
  userData: any;
  onComplete: () => void;
}

export function PersonalizedWelcome({ userData, onComplete }: PersonalizedWelcomeProps) {
  const recommendations = assessHealthRisks(userData as HealthData);
  const age = calculateAge(userData.birthDate);

  const highPriorityCount = recommendations.filter(r => r.priority === "high").length;
  //const mediumPriorityCount = recommendations.filter(r => r.priority === "medium").length;

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case "medium":
        return <Info className="h-5 w-5 text-warning" />;
      default:
        return <CheckCircle className="h-5 w-5 text-primary" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-destructive">Prioritário</Badge>;
      case "medium":
        return <Badge className="bg-warning">Importante</Badge>;
      default:
        return <Badge variant="outline">Recomendado</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 p-4 py-8">
      <div className="container mx-auto max-w-3xl space-y-6">
        {/* Boas-vindas */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1>Bem-vindo, {userData.fullName?.split(' ')[0]}!</h1>
              <p className="text-muted-foreground mt-2">
                Sua conta foi criada com sucesso
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Resumo de Informações */}
        <Card>
          <CardHeader>
            <CardTitle>Seu Perfil de Saúde</CardTitle>
            <CardDescription>
              Com base nas suas informações, preparamos recomendações personalizadas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-muted p-4 text-center">
                <div className="text-2xl">{age} anos</div>
                <p className="text-sm text-muted-foreground">Sua idade</p>
              </div>
              <div className="rounded-lg bg-muted p-4 text-center">
                <div className="text-2xl">{recommendations.length}</div>
                <p className="text-sm text-muted-foreground">Exames recomendados</p>
              </div>
              <div className="rounded-lg bg-muted p-4 text-center">
                <div className="text-2xl">{highPriorityCount}</div>
                <p className="text-sm text-muted-foreground">Prioritários</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recomendações Personalizadas */}
        <Card>
          <CardHeader>
            <CardTitle>Exames Recomendados Para Você</CardTitle>
            <CardDescription>
              Baseado na sua idade, histórico de saúde e histórico familiar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommendations.slice(0, 5).map((rec, index) => (
              <div key={index} className="rounded-lg border p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 flex-1">
                    {getPriorityIcon(rec.priority)}
                    <div className="flex-1">
                      <h4>{rec.exam}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {rec.reason}
                      </p>
                    </div>
                  </div>
                  {getPriorityBadge(rec.priority)}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Frequência: {rec.frequency}</span>
                  {rec.startAge && (
                    <span className="text-muted-foreground">A partir de {rec.startAge} anos</span>
                  )}
                </div>
              </div>
            ))}

            {recommendations.length > 5 && (
              <p className="text-center text-sm text-muted-foreground pt-2">
                + {recommendations.length - 5} outros exames recomendados
              </p>
            )}
          </CardContent>
        </Card>

        {/* Mensagem de Encorajamento */}
        <Card className="border-success/20 bg-success/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 flex-shrink-0 text-success mt-0.5" />
              <div className="flex-1">
                <h4>Você deu o primeiro passo!</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Ao fornecer suas informações de saúde, você está sendo proativo no cuidado com sua saúde.
                  Vamos ajudá-lo a manter em dia todos os seus exames preventivos!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informação Importante */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <h4>Importante Saber:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span>•</span>
                  <span>
                    Estas são recomendações gerais baseadas em diretrizes médicas. Sempre consulte
                    seu médico para orientações específicas.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>
                    Vamos enviar lembretes para você não esquecer de fazer seus exames preventivos.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>
                    Você pode atualizar suas informações de saúde a qualquer momento no seu perfil.
                  </span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Botão para Começar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="cursor-pointer flex-1 h-14" onClick={onComplete}>
            Ir para o Painel Principal
          </Button>
          <Button
            variant="outline"
            className="cursor-pointer flex-1 h-14"
            onClick={onComplete}
          >
            Agendar Primeiro Exame
          </Button>
        </div>
      </div>
    </div>
  );
}
