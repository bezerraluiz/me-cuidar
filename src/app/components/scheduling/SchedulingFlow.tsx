import { useState } from "react";
import { ChevronLeft, Search, MapPin, Calendar, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { CustomCalendar } from "../ui/custom-calendar";

interface Clinic {
  id: number;
  name: string;
  distance: string;
  address: string;
  rating: number;
}

interface SchedulingFlowProps {
  onNavigate: (page: string) => void;
  initialExamType?: string;
}

export function SchedulingFlow({ onNavigate, initialExamType }: SchedulingFlowProps) {
  const [step, setStep] = useState(1);
  const [selectedExam, setSelectedExam] = useState(initialExamType || "");
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    name: "Maria Silva",
    cpf: "123.456.789-00",
    birthDate: "15/03/1975",
    phone: "(11) 98765-4321",
    email: "maria.silva@email.com",
  });

  // Dados mock
  const exams = [
    { id: "mamografia", name: "Mamografia", description: "Exame de raios-X das mamas" },
    { id: "colonoscopia", name: "Colonoscopia", description: "Exame do intestino grosso" },
    { id: "papanicolau", name: "Papanicolau", description: "Exame preventivo ginecológico" },
    { id: "densitometria", name: "Densitometria Óssea", description: "Exame da densidade dos ossos" },
    { id: "sangue", name: "Exames de Sangue", description: "Hemograma completo e bioquímica" },
    { id: "ultrassom", name: "Ultrassom", description: "Exame de imagem por ultrassom" },
  ];

  const clinics = [
    {
      id: 1,
      name: "Clínica São Lucas",
      distance: "1.2 km",
      address: "Rua das Flores, 123 - Centro",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Centro Médico Santa Maria",
      distance: "2.5 km",
      address: "Av. Paulista, 1000 - Bela Vista",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Hospital Vida Nova",
      distance: "3.0 km",
      address: "Rua da Saúde, 456 - Jardins",
      rating: 4.7,
    },
  ];

  const availableTimes = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  ];

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else onNavigate('home');
  };

  const handleConfirm = () => {
    // Simulação de confirmação
    setTimeout(() => {
      onNavigate('home');
    }, 3000);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header com Progresso */}
      <div className="space-y-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Voltar
        </Button>

        <div>
          <h1>Agendar Exame</h1>
          <p className="text-muted-foreground mt-1">
            Passo {step} de 5
          </p>
        </div>

        {/* Barra de Progresso */}
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full ${s <= step ? "bg-primary" : "bg-muted"
                }`}
            />
          ))}
        </div>
      </div>

      {/* Passo 1: Escolher Exame */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <h2>Escolha o Exame</h2>
            <p className="text-muted-foreground mt-1">
              Selecione o tipo de exame que deseja agendar
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar exame..."
              className="h-12 pl-10"
            />
          </div>

          <div className="space-y-3">
            {exams.map((exam) => (
              <Card
                key={exam.id}
                className={`cursor-pointer transition-colors ${selectedExam === exam.name
                  ? "border-primary bg-accent"
                  : "hover:bg-accent"
                  }`}
                onClick={() => setSelectedExam(exam.name)}
              >
                <CardContent className="flex items-start gap-3 p-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3>{exam.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {exam.description}
                    </p>
                  </div>
                  {selectedExam === exam.name && (
                    <CheckCircle className="h-5 w-5 flex-shrink-0 text-primary" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Button
            className="cursor-pointer w-full h-12"
            disabled={!selectedExam}
            onClick={handleNext}
          >
            Continuar
          </Button>
        </div>
      )}

      {/* Passo 2: Escolher Clínica */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <h2>Escolha a Clínica</h2>
            <p className="text-muted-foreground mt-1">
              Selecione a clínica mais próxima de você
            </p>
          </div>

          <div className="space-y-3">
            {clinics.map((clinic) => (
              <Card
                key={clinic.id}
                className={`cursor-pointer transition-colors ${selectedClinic?.id === clinic.id
                  ? "border-primary bg-accent"
                  : "hover:bg-accent"
                  }`}
                onClick={() => setSelectedClinic(clinic)}
              >
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3>{clinic.name}</h3>
                    {selectedClinic?.id === clinic.id && (
                      <CheckCircle className="h-5 w-5 flex-shrink-0 text-primary" />
                    )}
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span>{clinic.address}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{clinic.distance}</Badge>
                      <span>⭐ {clinic.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button
            className="cursor-pointer w-full h-12"
            disabled={!selectedClinic}
            onClick={handleNext}
          >
            Continuar
          </Button>
        </div>
      )}

      {/* Passo 3: Escolher Data e Horário */}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <h2>Escolha Data e Horário</h2>
            <p className="text-muted-foreground mt-1">
              Selecione o melhor dia e horário para você
            </p>
          </div>

          <Card>
            <CardContent className="p-0">
              <CustomCalendar
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return date < today;
                }}
              />
            </CardContent>
          </Card>

          {selectedDate && (
            <>
              <div>
                <h3>Horários Disponíveis</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedDate.toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {availableTimes.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className="cursor-pointer h-12"
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </>
          )}

          <Button
            className="cursor-pointer w-full h-12"
            disabled={!selectedDate || !selectedTime}
            onClick={handleNext}
          >
            Continuar
          </Button>
        </div>
      )}

      {/* Passo 4: Confirmar Dados */}
      {step === 4 && (
        <div className="space-y-4">
          <div>
            <h2>Confirme Seus Dados</h2>
            <p className="text-muted-foreground mt-1">
              Verifique se todas as informações estão corretas
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                value={formData.cpf}
                onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">Data de Nascimento</Label>
              <Input
                id="birthDate"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-12"
              />
            </div>
          </div>

          <Button
            className="cursor-pointer w-full h-12"
            onClick={handleNext}
          >
            Continuar
          </Button>
        </div>
      )}

      {/* Passo 5: Resumo e Confirmação */}
      {step === 5 && (
        <div className="space-y-6">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h2>Confirme Seu Agendamento</h2>
            <p className="text-muted-foreground mt-1">
              Revise os detalhes antes de confirmar
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Resumo do Agendamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Exame:</span>
                  <span>{selectedExam}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data:</span>
                  <span>
                    {selectedDate?.toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Horário:</span>
                  <span>{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Clínica:</span>
                  <span>{selectedClinic?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Endereço:</span>
                  <span className="text-right">{selectedClinic?.address}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="rounded-lg bg-warning/10 p-4">
                  <h4 className="mb-2 text-warning">Instruções de Preparo</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Compareça com 15 minutos de antecedência</li>
                    <li>Traga documento com foto e carteirinha do convênio</li>
                    <li>Jejum de 8 horas (se aplicável)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            className="cursor-pointer w-full h-14"
            onClick={handleConfirm}
          >
            Confirmar Agendamento
          </Button>
        </div>
      )}
    </div>
  );
}
