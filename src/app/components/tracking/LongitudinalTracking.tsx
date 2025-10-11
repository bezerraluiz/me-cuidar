import { TrendingUp, Calendar, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { MOCK_TRACKING_DATA, MOCK_YEARLY_DATA } from "../../data/mockData";

export function LongitudinalTracking() {
  // Dados centralizados do mockData
  const trackingData = MOCK_TRACKING_DATA;
  const yearlyData = MOCK_YEARLY_DATA;

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Celebração / Motivação */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardContent className="pt-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
            <Award className="h-8 w-8 text-primary" />
          </div>
          {trackingData.yearsTracking > 0 ? (
            <>
              <h2>Parabéns! 🎉</h2>
              <p className="text-muted-foreground mt-2">
                Você está há {trackingData.yearsTracking} {trackingData.yearsTracking === 1 ? 'ano' : 'anos'} fazendo rastreamento preventivo!
              </p>
              <Badge className="mt-4 bg-primary">Mantenha o cuidado com sua saúde</Badge>
            </>
          ) : (
            <>
              <h2>Comece sua jornada! 💪</h2>
              <p className="text-muted-foreground mt-2">
                É hora de começar a cuidar da sua saúde com os exames preventivos recomendados!
              </p>
              <Badge className="mt-4 bg-primary">Você pode começar agora</Badge>
            </>
          )}
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
          <CardTitle>Seu Progresso no Bem Cuidar</CardTitle>
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
          {trackingData.upcomingExams.length > 0 ? (
            trackingData.upcomingExams.map((exam, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg bg-muted p-3">
                <span>{exam.name}</span>
                <span className="text-sm text-muted-foreground">{exam.date}</span>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-4">
              <p>Você ainda não tem exames agendados.</p>
              <p className="text-sm mt-1">Agende seus exames preventivos para começar!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Gráfico de Tendência */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className={`h-5 w-5 ${trackingData.completionRate >= 70 ? 'text-success' : 'text-warning'}`} />
            <CardTitle>Sua Tendência de Cuidado</CardTitle>
          </div>
          <CardDescription>
            {trackingData.completionRate >= 70
              ? "Você está mantendo uma boa frequência de exames preventivos!"
              : "É importante melhorar a frequência dos seus exames preventivos."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {trackingData.completionRate >= 70 ? (
            <div className="rounded-lg bg-gradient-to-r from-success/10 to-primary/10 p-6 text-center">
              <p className="text-success">
                Tendência Positiva: Continue assim para manter sua saúde em dia! 📈
              </p>
            </div>
          ) : (
            <div className="rounded-lg bg-gradient-to-r from-warning/10 to-primary/10 p-6 text-center">
              <p className="text-warning">
                Atenção: Agende seus exames preventivos para cuidar melhor da sua saúde! 📊
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
