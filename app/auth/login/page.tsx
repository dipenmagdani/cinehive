import { AuthForm } from "@/components/auth-form"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-cine-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <AuthForm type="login" />
      </main>
      <Footer />
    </div>
  )
}
