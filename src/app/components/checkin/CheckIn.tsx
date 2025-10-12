import { QrCode, MapPin, Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";

interface CheckInProps {
  onCheckInComplete?: () => void;
}

export function CheckIn({ onCheckInComplete }: CheckInProps) {
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const examDetails = {
    type: "Mamografia",
    date: "Hoje, 18/10/2025",
    time: "14:30",
    clinic: "Clínica São Lucas",
    address: "Rua das Flores, 123 - Centro",
    room: "Sala 3",
  };

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    if (onCheckInComplete) {
      setTimeout(() => {
        onCheckInComplete();
      }, 2000);
    }
  };

  if (isCheckedIn) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center pb-20 md:pb-6">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center space-y-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
              <svg
                className="h-10 w-10 text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h2>Check-in Realizado!</h2>
              <p className="text-muted-foreground mt-2">
                Você foi registrado com sucesso. Aguarde ser chamado.
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                Você será direcionado para a fila de espera
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Informações do Exame */}
      <Card>
        <CardHeader>
          <CardTitle>Seu Exame de Hoje</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <h3>{examDetails.type}</h3>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-5 w-5 flex-shrink-0" />
              <span>{examDetails.date}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-5 w-5 flex-shrink-0" />
              <span>{examDetails.time}</span>
            </div>

            <div className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <div>{examDetails.clinic}</div>
                <div className="text-sm">{examDetails.address}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botão de Check-in */}
      <div className="space-y-4">
        <Card className="border-primary/20 bg-accent/30">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2>Você chegou na clínica?</h2>
              <p className="text-muted-foreground mt-2">
                Faça o check-in para entrar na fila de atendimento
              </p>
            </div>
          </CardContent>
        </Card>

        <Button
          className="cursor-pointer w-full h-16 text-lg"
          size="lg"
          onClick={handleCheckIn}
        >
          Fazer Check-in
        </Button>
      </div>

      {/* Opção de QR Code */}
      <div className="text-center space-y-4">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-sm text-muted-foreground">OU</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <Card>
          <CardContent className="pt-6 text-center space-y-4">
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-lg bg-muted">
              <QrCode className="h-20 w-20 text-muted-foreground" />
            </div>
            <div>
              <h3>Escanear QR Code</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Apresente este código no balcão de atendimento
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instruções */}
      <Card className="border-warning/20 bg-warning/5">
        <CardContent className="pt-6">
          <h4 className="mb-3 text-warning">Lembrete Importante</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span>•</span>
              <span>Tenha em mãos seu documento com foto</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Apresente sua carteirinha do convênio</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Dirija-se ao balcão de recepção após o check-in</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
