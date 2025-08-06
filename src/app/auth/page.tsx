import { AuthForm } from "@/components/auth-form";
import Link from "next/link";

export default function AuthPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 relative">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#FF4F84_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-10"></div>
      
      <div className="w-full max-w-md space-y-6 text-center">
        <Link href="/">
          <h1 className="text-5xl font-black tracking-tighter sm:text-6xl bg-gradient-to-br from-primary via-[#BFFF00] to-accent bg-clip-text text-transparent">
            Caption Generator
          </h1>
        </Link>
        <p className="max-w-2xl mx-auto text-lg text-foreground/80 sm:text-xl">
          Welcome back, creator! Let's get you signed in.
        </p>
      </div>

      <div className="w-full max-w-sm mt-12">
        <AuthForm />
      </div>

      <footer className="py-8 mt-auto text-center text-sm text-foreground/50">
        <p>Built with <span className="text-primary">♥</span> for the creators.</p>
      </footer>
    </main>
  );
}