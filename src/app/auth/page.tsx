'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        router.push('/dashboard')
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        router.push('/dashboard')
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connexion à votre compte
          </h2>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google']}
            theme="light"
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Email',
                  password_label: 'Mot de passe',
                  button_label: 'Se connecter',
                  loading_button_label: 'Connexion...',
                  social_provider_text: 'Se connecter avec {{provider}}',
                  link_text: 'Vous avez déjà un compte ? Connectez-vous'
                },
                sign_up: {
                  email_label: 'Email',
                  password_label: 'Mot de passe',
                  button_label: "S'inscrire",
                  loading_button_label: 'Inscription...',
                  social_provider_text: "S'inscrire avec {{provider}}",
                  link_text: "Vous n'avez pas de compte ? Inscrivez-vous"
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}