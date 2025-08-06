
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AuthForm } from "./auth-form";
import { Sparkles } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function AuthModal({ isOpen, onOpenChange }: AuthModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background border-border/50 p-0">
        <div className="flex flex-col items-center justify-center p-8 space-y-4 text-center">
            <Sparkles className="h-12 w-12 text-primary" />
            <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-foreground">Welcome to CaptionCraft</DialogTitle>
                <DialogDescription className="text-lg text-muted-foreground">
                    Sign in or create an account to start generating captions.
                </DialogDescription>
            </DialogHeader>
        </div>
        <div className="px-8 pb-8">
            <AuthForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
