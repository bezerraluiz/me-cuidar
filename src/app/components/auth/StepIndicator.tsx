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
        <div className="hidden md:flex justify-between">
          {stepLabels.map((label, index) => {
            const step = index + 1;
            const isCompleted = step < currentStep;
            const isCurrent = step === currentStep;
            
            return (
              <div
                key={step}
                className={cn(
                  "flex items-center gap-2 text-sm transition-colors",
                  isCurrent && "text-primary",
                  isCompleted && "text-success",
                  !isCurrent && !isCompleted && "text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <div
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full border-2",
                      isCurrent && "border-primary bg-primary text-primary-foreground",
                      !isCurrent && "border-muted-foreground"
                    )}
                  >
                    {step}
                  </div>
                )}
                <span className="hidden lg:inline">{label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
