'use client'

import { Check } from 'lucide-react'

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3
}

const steps = [
  { num: 1, label: 'Cardápio' },
  { num: 2, label: 'Extras' },
  { num: 3, label: 'Resumo' },
]

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 py-6" role="navigation" aria-label="Progresso do orçamento">
      {steps.map((step, i) => {
        const isComplete = currentStep > step.num
        const isCurrent = currentStep === step.num

        return (
          <div key={step.num} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-200
                  ${isComplete ? 'bg-accent text-white' : ''}
                  ${isCurrent ? 'bg-primary text-white ring-2 ring-primary/30' : ''}
                  ${!isComplete && !isCurrent ? 'bg-border-light text-text-muted' : ''}
                `}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {isComplete ? <Check className="w-4 h-4" aria-hidden="true" /> : step.num}
              </div>
              <span className={`text-xs font-medium ${isCurrent ? 'text-primary' : 'text-text-muted'}`}>
                {step.label}
              </span>
            </div>

            {i < steps.length - 1 && (
              <div
                className={`w-12 sm:w-20 h-0.5 mb-5 transition-colors duration-200 ${
                  currentStep > step.num ? 'bg-accent' : 'bg-border-light'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
