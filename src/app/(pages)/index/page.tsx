'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { InvestmentForm } from '../../../components/investment-form'
import { MetaProgress } from '../../../components/meta-progess'
import { Dashboard } from '../../../components/dashboard'
import AuthenticatedWrapper from '@/components/authenticated-wrapper'
import LoadingSpinner from '@/components/loading-spinner'
import ErrorScreen from '@/components/error-screen'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Investment {
  category: string
  amount: number
}

export default function Index() {
  const [investments, setInvestments] = useState<Investment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const target = 100000

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`${window.location.origin}/api/investments/`)
        setInvestments(response.data)
      } catch (erro) {
        setError(`${erro}, Failed to fetch investments. Please try again later.`)
      } finally {
        setIsLoading(false)
      }
    }
    fetchInvestments()
  }, [])

  const handleNewInvestment = (investment: Investment) => {
    setInvestments([...investments, investment])
  }

  const totalInvested = investments.reduce((acc, cur) => acc + cur.amount, 0)

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorScreen errorMessage={error} onRetry={() => window.location.reload()} />
  }

  return (
    <AuthenticatedWrapper>
      <div className="min-h-screen bg-white text-gray-900">
        <header className="bg-gradient-to-r from-primary to-primary-foreground py-6">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-white">Meta da Riqueza SGARIA TECH</h1>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Meta de Investimento</CardTitle>
                <CardDescription>Acompanhe seu progresso rumo à meta de R${target.toLocaleString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <MetaProgress totalInvested={totalInvested} target={target} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Novo Investimento</CardTitle>
                <CardDescription>Adicione um novo aporte ao seu portfólio</CardDescription>
              </CardHeader>
              <CardContent>
                <InvestmentForm onSubmit={handleNewInvestment} />
              </CardContent>
            </Card>
          </div>
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Dashboard de Investimentos</CardTitle>
              <CardDescription>Visualize a distribuição dos seus investimentos</CardDescription>
            </CardHeader>
            <CardContent>
              <Dashboard investments={investments} />
            </CardContent>
          </Card>
        </main>
        <footer className="bg-gray-100 py-4 mt-8">
          <div className="container mx-auto px-4 text-center text-sm text-gray-600">
            © 2024 Meta da Riqueza SGARIA TECH. Todos os direitos reservados.
          </div>
        </footer>
      </div>
    </AuthenticatedWrapper>
  )
}
