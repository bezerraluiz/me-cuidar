import { Calendar, Download, FileText, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useState } from "react";

interface ExamHistoryProps {
  onNavigate: (page: string) => void;
}

export function ExamHistory({ onNavigate }: ExamHistoryProps) {
  const [yearFilter, setYearFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const exams = [
    {
      id: 1,
      type: "Exames de Sangue",
      date: "22/08/2025",
      clinic: "Laboratório Vida",
      status: "available",
      result: "Normal",
    },
    {
      id: 2,
      type: "Mamografia",
      date: "15/03/2025",
      clinic: "Clínica São Lucas",
      status: "available",
      result: "Normal",
    },
    {
      id: 3,
      type: "Papanicolau",
      date: "10/05/2025",
      clinic: "Centro Médico Santa Maria",
      status: "available",
      result: "Normal",
    },
    {
      id: 4,
      type: "Densitometria Óssea",
      date: "20/01/2024",
      clinic: "Clínica Imagem",
      status: "available",
      result: "Osteopenia leve",
    },
    {
      id: 5,
      type: "Ultrassom Abdominal",
      date: "05/11/2024",
      clinic: "Hospital Vida Nova",
      status: "available",
      result: "Normal",
    },
    {
      id: 6,
      type: "Mamografia",
      date: "18/10/2025",
      clinic: "Clínica São Lucas",
      status: "pending",
      result: null,
    },
  ];

  const years = ["all", "2025", "2024", "2023"];
  const types = ["all", "Mamografia", "Exames de Sangue", "Papanicolau", "Densitometria Óssea"];

  const filteredExams = exams.filter(exam => {
    const yearMatch = yearFilter === "all" || exam.date.includes(yearFilter);
    const typeMatch = typeFilter === "all" || exam.type === typeFilter;
    return yearMatch && typeMatch;
  });

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h1>Histórico de Exames</h1>
        <p className="text-muted-foreground mt-2">
          Visualize todos os seus exames anteriores
        </p>
      </div>

      {/* Filtros */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm">Filtrar por Ano</label>
          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Todos os anos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os anos</SelectItem>
              {years.filter(y => y !== "all").map(year => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm">Filtrar por Tipo</label>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Todos os tipos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              {types.filter(t => t !== "all").map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Timeline de Exames */}
      <div className="relative space-y-4">
        {/* Linha vertical da timeline */}
        <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-border hidden sm:block" />

        {filteredExams.map((exam, index) => (
          <Card key={exam.id} className="relative">
            {/* Ponto na timeline */}
            <div className="absolute left-5 top-6 h-3 w-3 rounded-full border-4 border-background bg-primary hidden sm:block" />
            
            <CardHeader className="sm:ml-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle>{exam.type}</CardTitle>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{exam.date}</span>
                    </div>
                    <span>•</span>
                    <span>{exam.clinic}</span>
                  </div>
                </div>
                
                {exam.status === "available" ? (
                  <Badge className="bg-success flex-shrink-0">Disponível</Badge>
                ) : (
                  <Badge variant="outline" className="flex-shrink-0">Aguardando</Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="sm:ml-8 space-y-3">
              {exam.result && (
                <div className="rounded-lg bg-muted p-3">
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Resultado:</span>
                    <span>{exam.result}</span>
                  </div>
                </div>
              )}

              {exam.status === "available" ? (
                <Button variant="outline" className="w-full h-12 gap-2">
                  <Download className="h-5 w-5" />
                  Baixar Resultado em PDF
                </Button>
              ) : (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Resultado disponível em até 5 dias úteis</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredExams.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <h3>Nenhum exame encontrado</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Tente ajustar os filtros ou agende um novo exame
          </p>
          <Button className="mt-4" onClick={() => onNavigate('scheduling')}>
            Agendar Exame
          </Button>
        </div>
      )}
    </div>
  );
}
