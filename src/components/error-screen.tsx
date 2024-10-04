'use client'

import { Button } from "@/components/ui/button"

interface ErrorScreenProps {
  errorMessage: string
  onRetry: () => void
}

export default function ErrorScreen({ errorMessage, onRetry }: ErrorScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-red-500 mb-4">{errorMessage}</p>
      <Button onClick={onRetry}>Retry</Button>
    </div>
  )
}
