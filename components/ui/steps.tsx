import * as React from "react"
import { cn } from "@/lib/utils"

export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
  completed?: boolean
  disabled?: boolean
  index?: number
}

export function Step({ active, completed, disabled, index, className, children, ...props }: StepProps) {
  return (
    <div
      className={cn("flex flex-col items-center gap-2", disabled && "opacity-50 cursor-not-allowed", className)}
      {...props}
    >
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full border-2 text-center font-medium",
          active && "border-primary bg-primary text-primary-foreground",
          completed && "border-primary bg-primary text-primary-foreground",
          !active && !completed && "border-muted-foreground",
        )}
      >
        {completed ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
          index
        )}
      </div>
      <div className="text-center">{children}</div>
    </div>
  )
}

export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  currentStep?: number
  completedSteps?: number[]
}

export function Steps({ currentStep = 0, completedSteps = [], className, children, ...props }: StepsProps) {
  const childrenArray = React.Children.toArray(children)
  const steps = childrenArray.map((step, index) => {
    if (React.isValidElement(step)) {
      return React.cloneElement(step, {
        active: currentStep === index,
        completed: completedSteps.includes(index),
        disabled: index > currentStep && !completedSteps.includes(index),
        index: index + 1,
      })
    }
    return step
  })

  return (
    <div className={cn("flex w-full items-start justify-between gap-4", className)} {...props}>
      {steps}
    </div>
  )
}
