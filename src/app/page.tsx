'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import React from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      setError(error + ' An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Blue background with logo */}
      <div className="hidden w-1/2 bg-blue-600 lg:flex flex-col items-center justify-center p-12">
        {/* <div className="w-64 h-64 bg-white rounded-full flex items-center justify-center mb-8"> */}
          {/* Replace with your actual logo */}
          {/* <span className="text-4xl font-bold text-blue-600">LOGO</span> */}
        {/* </div> */}
        <h1 className="text-6xl font-bold text-white mb-4">Meta da Riqueza</h1>
        <p className="text-xl text-white text-center">Gerencie seus investimentos e alcance suas metas financeiras</p>
        <p className='text-xs text-white/50 mt-2'>Sgaria Tech.</p>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Bem-vindo de volta</CardTitle>
            <CardDescription>Faça login para acessar sua conta</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              {error && <p className="text-red-500 mt-4">{error}</p>}
              <Button className="w-full mt-6" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{' '}
              <a href="/signup" className="text-blue-600 hover:underline">
                Cadastre-se
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}