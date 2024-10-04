'use client'

import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

interface AuthenticatedWrapperProps {
  children: React.ReactNode
}

export default function AuthenticatedWrapper({ children }: AuthenticatedWrapperProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session) {
      router.push('/')
    }
  }, [session, router])

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return <>{children}</>
}
