import { TrendingUp, Calendar, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";

export function LongitudinalTracking() {
  const trackingData = {
    yearsTracking: 2,
    totalExams: 12,
    recommendedExams: 15,
    completionRate: 80,
    upcomingExams: [
      { name: "Mamografia", date: "Março 2026" },
      { name: "Densitometria Óssea", date: "Janeiro 2026" },
    ],
  };

  const yearlyData = [
    { year: 2023, exams: 4, recommended: 5 },
    { year: 2024, exams: 5, recommended: 5 },
    { year: 2025, exams: 3, recommended: 5 },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Celebração */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardContent className="pt-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
            <Award className="h-8 w-8 text-primary" />
          </div>
          <h2>Parabéns! 🎉</h2>
          <p className="text-muted-foreground mt-2">
            Você está há {trackingData.yearsTracking} anos fazendo rastreamento preventivo!
          </p>
          <Badge className="mt-4 bg-primary">Mantenha o cuidado com sua saúde</Badge>
        </CardContent>
      </Card>

      {/* Resumo Geral */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl text-primary">{trackingData.totalExams}</div>
            <p className="text-sm text-muted-foreground mt-1">Exames Realizados</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl text-primary">{trackingData.completionRate}%</div>
            <p className="text-sm text-muted-foreground mt-1">Taxa de Adesão</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl text-primary">{trackingData.yearsTracking}</div>
            <p className="text-sm text-muted-foreground mt-1">Anos de Cuidado</p>
          </CardContent>
        </Card>
      </div>

      {/* Progresso Geral */}
      <Card>
        <CardHeader>
          <CardTitle>Seu Progresso de Saúde Preventiva</CardTitle>
          <CardDescription>
            Você completou {trackingData.totalExams} de {trackingData.recommendedExams} exames recomendados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={trackingData.completionRate} className="h-3" />
          <p className="text-sm text-muted-foreground text-center">
            {trackingData.completionRate}% dos exames preventivos realizados
          </p>
        </CardContent>
      </Card>

      {/* Timeline Anual */}
      <Card>
        <CardHeader>
          <CardTitle>Acompanhamento ao Longo dos Anos</CardTitle>
          <CardDescription>Visualize seus exames por ano</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {yearlyData.map((yearData) => (
            <div key={yearData.year} className="space-y-2">
              <div className="flex items-center justify-between">
                <span>{yearData.year}</span>
                <span className="text-sm text-muted-foreground">
                  {yearData.exams} de {yearData.recommended} exames
                </span>
              </div>
              <Progress value={(yearData.exams / yearData.recommended) * 100} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Próximos Exames Programados */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <CardTitle>Próximos Exames Programados</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {trackingData.upcomingExams.map((exam, index) => (
            <div key={index} className="flex items-center justify-between rounded-lg bg-muted p-3">
              <span>{exam.name}</span>
              <span className="text-sm text-muted-foreground">{exam.date}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Gráfico de Tendência */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-success" />
            <CardTitle>Sua Tendência de Cuidado</CardTitle>
          </div>
          <CardDescription>
            Você está mantendo uma boa frequência de exames preventivos!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-gradient-to-r from-success/10 to-primary/10 p-6 text-center">
            <p className="text-success">
              Tendência Positiva: Continue assim para manter sua saúde em dia! 📈
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
