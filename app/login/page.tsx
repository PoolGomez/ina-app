import { Suspense } from "react"
import { LoginForm } from "./_components/login-form"


const LoginPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Suspense fallback={<div>Cargando...</div>}>
        <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}

export default LoginPage
