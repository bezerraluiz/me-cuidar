import { CheckCircle } from "lucide-react";
import { cn } from "../ui/utils";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
}

export function StepIndicator({ currentStep, totalSteps, stepLabels }: StepIndicatorProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="space-y-4">
      {/* Barra de Progresso */}
      <div className="flex gap-1">
        {steps.map((step) => (
          <div
            key={step}
            className={cn(
              "h-2 flex-1 rounded-full transition-all duration-300",
              step <= currentStep ? "bg-primary" : "bg-muted"
            )}
          />
        ))}
      </div>

      {/* Labels dos passos (opcional) */}
      {stepLabels && (
        <div className="hidden md:flex justify-between gap-2">
          {stepLabels.map((label, index) => {
            const step = index + 1;
            const isCompleted = step < currentStep;
            const isCurrent = step === currentStep;

            return (
              <div
                key={step}
                className="flex flex-col items-center gap-2 flex-1"
              >
                {isCompleted ? (
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full bg-success text-white"
                    )}
                  >
                    <CheckCircle className="h-5 w-5" />
                  </div>
                ) : (
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium",
                      isCurrent && "border-primary bg-primary text-white",
                      !isCurrent && "border-muted-foreground text-muted-foreground bg-background"
                    )}
                  >
                    {step}
                  </div>
                )}
                <span
                  className={cn(
                    "text-xs text-center transition-colors",
                    isCurrent && "text-primary font-medium",
                    isCompleted && "text-success",
                    !isCurrent && !isCompleted && "text-muted-foreground"
                  )}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
