import { AuthForm } from "@/components/auth-form";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AuthPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 relative">
       <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(hsl(var(--primary))_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
      
      <div className="w-full max-w-md space-y-6 text-center">
        <Link href="/" className="flex items-center justify-center gap-3">
            <Sparkles className="h-12 w-12 text-primary" />
            <h1 className="text-5xl font-bold text-foreground">CaptionCraft</h1>
        </Link>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground sm:text-xl">
          Welcome back, creator! Let's get you signed in.
        </p>
      </div>

      <div className="w-full max-w-sm mt-12">
        <AuthForm />
      </div>

      <footer className="py-8 mt-auto text-center text-sm text-muted-foreground">
        <p>Built with <span className="text-primary">♥</span> for the creators.</p>
      </footer>
    </main>
  );
}
