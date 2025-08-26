'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push('/auth')
      } else {
        setUser(user)
      }
      setLoading(false)
    })
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Chargement...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard
            </h1>
            <button
              onClick={handleSignOut}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Se déconnecter
            </button>
          </div>
          
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            ✅ Félicitations ! Vous êtes connecté avec succès.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded">
              <h3 className="font-semibold text-lg mb-2">Informations utilisateur</h3>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>ID:</strong> {user?.id}</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded">
              <h3 className="font-semibold text-lg mb-2">Prochaines étapes</h3>
              <ul className="list-disc list-inside">
                <li>Créer les tables pour les anecdotes</li>
                <li>Ajouter l'upload d'images</li>
                <li>Interface d'administration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}