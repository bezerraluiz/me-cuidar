import { Users, Clock, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { useState, useEffect } from "react";

interface VirtualQueueProps {
  onCancel?: () => void;
}

export function VirtualQueue({ onCancel }: VirtualQueueProps) {
  const [position, setPosition] = useState(3);
  const [estimatedTime, setEstimatedTime] = useState(15);
  const [isYourTurn, setIsYourTurn] = useState(false);

  // Simular progressão na fila
  useEffect(() => {
    if (position > 0 && !isYourTurn) {
      const timer = setInterval(() => {
        setPosition((prev) => {
          const newPos = prev - 1;
          if (newPos === 0) {
            setIsYourTurn(true);
            // Vibração se disponível
            if (navigator.vibrate) {
              navigator.vibrate([200, 100, 200]);
            }
          }
          return newPos;
        });
        setEstimatedTime((prev) => Math.max(0, prev - 5));
      }, 10000); // A cada 10 segundos para demo

      return () => clearInterval(timer);
    }
  }, [position, isYourTurn]);

  const progress = position > 0 ? ((5 - position) / 5) * 100 : 100;

  if (isYourTurn) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center pb-20 md:pb-6">
        <Card className="w-full max-w-md border-success/20 bg-gradient-to-br from-success/5 to-success/10">
          <CardContent className="pt-6 text-center space-y-6">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-success/20 animate-pulse">
              <CheckCircle className="h-12 w-12 text-success" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl">É SUA VEZ!</h1>
              <p className="text-success text-xl">
                Dirija-se à Sala 3
              </p>
            </div>

            <div className="rounded-lg bg-success/10 p-6">
              <p className="text-lg">
                Por favor, dirija-se ao local indicado
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <AlertCircle className="h-5 w-5" />
                <span>Não esqueça seus documentos</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center pb-20 md:pb-6">
      <div className="w-full max-w-md space-y-6">
        {/* Posição na Fila */}
        <Card>
          <CardContent className="pt-6 text-center space-y-6">
            <div className="space-y-2">
              <p className="text-muted-foreground">Você é o</p>
              <div className="text-6xl text-primary">
                {position}º
              </div>
              <p className="text-muted-foreground">da fila</p>
            </div>

            <div className="space-y-2">
              <Progress value={progress} className="h-3" />
              <p className="text-sm text-muted-foreground">
                Progresso na fila
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tempo Estimado */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Tempo estimado</p>
                <p className="text-2xl">~{estimatedTime} minutos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pessoas na Fila */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Pessoas à sua frente</p>
                <p className="text-2xl">{position - 1}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informações */}
        <Card className="border-primary/20 bg-accent/30">
          <CardContent className="pt-6 space-y-3">
            <h4>Enquanto aguarda:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span>•</span>
                <span>Mantenha seus documentos em mãos</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Fique atento ao chamado no painel</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Você receberá uma notificação quando for sua vez</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Botão de Cancelar */}
        {onCancel && (
          <Button
            variant="outline"
            className="w-full h-12 text-destructive hover:text-destructive"
            onClick={onCancel}
          >
            Cancelar / Reagendar
          </Button>
        )}
      </div>
    </div>
  );
}
