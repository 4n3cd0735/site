'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        setUser(session.user)
        // Rediriger vers le dashboard si déjà connecté
        router.push('/dashboard')
      } else {
        setLoading(false)
      }
    }

    getSession()

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user)
        router.push('/dashboard')
      } else {
        setUser(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            📚 Anecdotes App
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Partagez et découvrez des anecdotes fascinantes avec la communauté
          </p>
        </div>

        {/* Actions */}
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
              Commencer l&apos;aventure
            </h2>
            
            <div className="space-y-4">
              <button
                onClick={() => router.push('/auth')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
              >
                🔐 Se connecter / S&apos;inscrire
              </button>
              
              <div className="text-center text-gray-500 text-sm">
                Créez votre compte pour commencer à partager vos anecdotes
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 gap-6 text-center">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-2xl mb-2">✍️</div>
              <h3 className="font-semibold text-gray-900">Partagez</h3>
              <p className="text-gray-600 text-sm">Racontez vos meilleures anecdotes</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-2xl mb-2">👥</div>
              <h3 className="font-semibold text-gray-900">Découvrez</h3>
              <p className="text-gray-600 text-sm">Lisez les histoires des autres</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-2xl mb-2">❤️</div>
              <h3 className="font-semibold text-gray-900">Appréciez</h3>
              <p className="text-gray-600 text-sm">Likez vos anecdotes préférées</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}