"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Loader2, LogIn, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import Link from "next/link";

const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSignUp(values: z.infer<typeof signUpSchema>) {
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: "Account Created! 🎉",
        description: "Welcome! You've been successfully signed up.",
      });
      router.push("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function onSignIn(values: z.infer<typeof signInSchema>) {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: "Signed In! 👋",
        description: "Welcome back! You're now logged in.",
      });
       router.push("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign In Failed",
        description: "Please check your email and password and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Tabs defaultValue="sign-in" className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-muted">
        <TabsTrigger value="sign-in">Sign In</TabsTrigger>
        <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="sign-in">
        <Card className="bg-card border-border/50">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Enter your credentials to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...signInForm}>
              <form
                onSubmit={signInForm.handleSubmit(onSignIn)}
                className="space-y-4"
              >
                <FormField
                  control={signInForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          className="bg-background/80"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signInForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                           className="bg-background/80"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <div className="text-right">
                    <Link href="mailto:support@captioncraft.ai" className="text-sm text-muted-foreground hover:text-primary">
                      Forgot Password?
                    </Link>
                  </div>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <LogIn className="mr-2" /> Sign In
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="sign-up">
        <Card className="bg-card border-border/50">
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>
             Join the community! It's quick and easy.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...signUpForm}>
              <form
                onSubmit={signUpForm.handleSubmit(onSignUp)}
                className="space-y-4"
              >
                <FormField
                  control={signUpForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                           className="bg-background/80"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signUpForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                           className="bg-background/80"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                     <>
                      <UserPlus className="mr-2" /> Sign Up
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
