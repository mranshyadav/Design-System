import React from 'react'
import { cn } from './utils'

export interface Step {
  id: string
  label: string
  description?: string
}

export interface StepsProps {
  steps: Step[]
  currentIndex: number
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

type StepStatus = 'done' | 'active' | 'pending'

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-white"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function StepCircle({ index, status }: { index: number; status: StepStatus }) {
  if (status === 'done') {
    return (
      <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0">
        <CheckIcon />
      </div>
    )
  }
  if (status === 'active') {
    return (
      <div className="w-8 h-8 rounded-full border-2 border-violet-600 flex items-center justify-center flex-shrink-0">
        <span className="text-sm font-bold text-violet-600">{index + 1}</span>
      </div>
    )
  }
  return (
    <div className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center flex-shrink-0">
      <span className="text-sm text-gray-400">{index + 1}</span>
    </div>
  )
}

export function Steps({
  steps,
  currentIndex,
  orientation = 'horizontal',
  className,
}: StepsProps) {
  function getStatus(index: number): StepStatus {
    if (index < currentIndex) return 'done'
    if (index === currentIndex) return 'active'
    return 'pending'
  }

  if (orientation === 'vertical') {
    return (
      <div className={cn('flex flex-col', className)}>
        {steps.map((step, index) => {
          const status = getStatus(index)
          const isLast = index === steps.length - 1
          return (
            <div key={step.id} className="flex gap-4">
              {/* Left column: circle + connector */}
              <div className="flex flex-col items-center">
                <StepCircle index={index} status={status} />
                {!isLast && (
                  <div
                    className={cn(
                      'w-px flex-1 my-1',
                      status === 'done' ? 'bg-violet-200' : 'bg-gray-200'
                    )}
                  />
                )}
              </div>
              {/* Right column: label + description */}
              <div className={cn('pb-6', isLast && 'pb-0')}>
                <p
                  className={cn(
                    'text-sm font-medium mt-1',
                    status === 'active'
                      ? 'text-violet-700'
                      : status === 'done'
                      ? 'text-gray-900'
                      : 'text-gray-400'
                  )}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-gray-500 mt-0.5">{step.description}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // horizontal
  return (
    <div className={cn('flex items-start', className)}>
      {steps.map((step, index) => {
        const status = getStatus(index)
        const isLast = index === steps.length - 1
        return (
          <React.Fragment key={step.id}>
            {/* Step */}
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <StepCircle index={index} status={status} />
              <div className="text-center">
                <p
                  className={cn(
                    'text-xs font-medium whitespace-nowrap',
                    status === 'active'
                      ? 'text-violet-700'
                      : status === 'done'
                      ? 'text-gray-900'
                      : 'text-gray-400'
                  )}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-gray-400 mt-0.5 whitespace-nowrap">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
            {/* Connector */}
            {!isLast && (
              <div
                className={cn(
                  'flex-1 h-px mt-4 mx-2',
                  status === 'done' ? 'bg-violet-200' : 'bg-gray-200'
                )}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
