"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { generateCaptions } from "@/ai/flows/generate-caption";
import { CaptionCard } from "./caption-card";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  description: z
    .string()
    .min(10, {
      message: "Gotta give me more to work with! ✨ Tell me about the photo or video.",
    })
    .max(500, {
      message: "Easy there, Shakespeare! Keep it under 500 characters.",
    }),
});

export function CaptionGenerator() {
  const [captions, setCaptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setCaptions([]);
    try {
      const result = await generateCaptions({ description: values.description });
      if (result && result.captions) {
        setCaptions(result.captions);
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Couldn't generate captions. Please try again.",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "An error occurred while generating captions. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card className="bg-card/50 border-border/50 shadow-lg shadow-primary/10 p-2 rounded-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-50 -z-10"></div>
        <CardContent className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="What's the vibe? Describe your photo or video..."
                        className="min-h-[120px] resize-none rounded-xl border-2 border-border/50 bg-background/80 text-base focus:border-primary focus-visible:ring-primary/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-primary" />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} size="lg" className="w-full font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-100 shadow-lg shadow-primary/30 hover:shadow-primary/50">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Captions
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {(isLoading || captions.length > 0) && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-foreground/90">Your Captions ✨</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="bg-card/50 border-border/50 p-4 space-y-3 animate-pulse rounded-xl min-h-[150px]">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </Card>
                ))
              : captions.map((caption, index) => (
                  <CaptionCard key={index} caption={caption} />
                ))}
          </div>
        </div>
      )}
    </div>
  );
}
