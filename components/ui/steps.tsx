import { cn } from "@/lib/utils"

interface Step {
  title: string
  description?: string
}

interface StepsProps {
  steps: Step[]
  currentStep?: number
  className?: string
}

export function Steps({ steps, currentStep = 0, className }: StepsProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {steps.map((step, index) => (
        <div key={index} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full border text-xs font-medium",
                index < currentStep
                  ? "border-primary bg-primary text-primary-foreground"
                  : index === currentStep
                    ? "border-primary text-primary"
                    : "border-muted-foreground/20 text-muted-foreground",
              )}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && <div className="h-full w-px bg-muted-foreground/20 my-1" />}
          </div>
          <div className="pb-4">
            <p className={cn("font-medium", index <= currentStep ? "text-foreground" : "text-muted-foreground")}>
              {step.title}
            </p>
            {step.description && <p className="text-sm text-muted-foreground mt-0.5">{step.description}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
