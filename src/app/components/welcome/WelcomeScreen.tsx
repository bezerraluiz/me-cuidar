import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

interface WelcomeScreenProps {
  onComplete: () => void;
}

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const benefits = [
    "Agende seus exames preventivos de forma fácil",
    "Receba lembretes de exames importantes",
    "Acesse seus resultados de forma segura",
    "Aprenda sobre cuidados preventivos",
    "Acompanhe seu histórico de saúde",
  ];

  return (
    <div className="flex min-h-[80vh] items-center justify-center pb-20 md:pb-6 px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-4">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" className="text-primary"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" className="text-primary"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" className="text-primary"/>
            </svg>
          </div>
          <div>
            <h1>Bem-vindo ao Saúde Preventiva</h1>
            <p className="text-muted-foreground mt-2">
              Seu companheiro para cuidar da sua saúde
            </p>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3>O que você pode fazer:</h3>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Button className="w-full h-14" size="lg" onClick={onComplete}>
          Começar
        </Button>
      </div>
    </div>
  );
}
