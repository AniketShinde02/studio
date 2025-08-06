
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Sparkles, UploadCloud, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { generateCaptions } from "@/ai/flows/generate-caption";
import { CaptionCard } from "./caption-card";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "./ui/textarea";
import { useAuthModal } from "@/context/AuthModalContext";

const formSchema = z.object({
  description: z.string().min(1, { message: "Please describe your image or vibe." }),
  image: z.any().optional(),
});

const moods = ["😎 Casual", "😂 Funny", "🤩 Excited", "🤔 Thoughtful", "👔 Professional", "💖 Romantic"];

export function CaptionGenerator() {
  const { data: session } = useSession();
  const { setOpen: openAuthModal } = useAuthModal();
  const [captions, setCaptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!session) {
      openAuthModal(true);
      return;
    }

    if (!uploadedFile && !values.description) {
      toast({
        variant: "destructive",
        title: "Hold up!",
        description: "Please upload an image or describe it to generate captions.",
      });
      return;
    }

    setIsLoading(true);
    setCaptions([]);
    let imageUrl = '';

    try {
       if (uploadedFile) {
        const formData = new FormData();
        formData.append('file', uploadedFile);

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadResponse.json();

        if (!uploadResponse.ok || !uploadData.success) {
          throw new Error(uploadData.message || 'Image upload failed.');
        }
        imageUrl = uploadData.url;
      }


      const result = await generateCaptions({
        description: values.description,
        mood: selectedMood || undefined,
        // @ts-ignore
        userId: session?.user?.id,
        imageUrl: imageUrl || undefined,
      });
      if (result && result.captions) {
        setCaptions(result.captions);
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Couldn't generate captions. Please try again.",
        });
      }
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message || "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
               <Card className="bg-card border-2 border-dashed border-border rounded-2xl p-4 sm:p-8 text-center cursor-pointer hover:border-primary transition-all duration-300 group h-full flex flex-col justify-center">
                <CardContent className="p-0">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex flex-col items-center justify-center space-y-4">
                             <input
                                type="file"
                                id="file-upload"
                                className="hidden"
                                accept="image/png, image/jpeg, image/gif"
                                onChange={handleImageChange}
                              />
                            {imagePreview ? (
                              <div className="relative w-full max-w-sm h-48 sm:h-64 rounded-xl overflow-hidden">
                                 <Image
                                    src={imagePreview}
                                    alt="Uploaded preview"
                                    layout="fill"
                                    objectFit="cover"
                                  />
                              </div>
                            ) : (
                              <>
                                <UploadCloud className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground group-hover:text-primary transition-colors" />
                                <p className="text-lg font-semibold text-foreground">Drag & Drop your image</p>
                                <p className="text-muted-foreground">or</p>
                              </>
                            )}
                            <label htmlFor="file-upload" className="button-secondary bg-secondary text-secondary-foreground rounded-xl px-6 py-3 font-semibold hover:bg-secondary/80 transition-all duration-300 cursor-pointer">
                              Choose a file
                            </label>
                            <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                          </div>
                        </FormControl>
                         <FormMessage className="text-primary text-center pt-2" />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
               <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium text-muted-foreground text-left block mb-4">What's your vibe today?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., A golden retriever puppy playing in a field of flowers on a sunny day."
                          className="min-h-[150px] bg-card border-border rounded-2xl p-4"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-primary" />
                    </FormItem>
                  )}
                />
               <div>
                  <p className="text-lg font-medium text-muted-foreground mb-4">Select a mood (optional):</p>
                  <div className="flex flex-wrap justify-start gap-2 sm:gap-3">
                    {moods.map((mood) => (
                      <Button
                        key={mood}
                        type="button"
                        variant={selectedMood === mood ? 'default' : 'secondary'}
                        className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm font-semibold transition-colors duration-300"
                        onClick={() => setSelectedMood(mood === selectedMood ? null : mood)}
                      >
                        {mood}
                      </Button>
                    ))}
                  </div>
              </div>
            </div>
          </div>
          
           <div className="flex flex-col items-center">
              <Button type="submit" disabled={isLoading} size="default" className="w-full max-w-xs font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-100 shadow-lg shadow-primary/30 hover:shadow-primary/50">
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
              <div className="flex items-center text-xs text-muted-foreground mt-4">
                <AlertTriangle className="h-3 w-3 mr-1.5" />
                <p>Disclaimer: Uploaded images are NOT stored permanently and will be auto-deleted 15 minutes after upload.</p>
              </div>
           </div>
        </form>
      </Form>

      {(isLoading || captions.length > 0) && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-foreground/90">Your Captions ✨</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="bg-card p-4 space-y-3 animate-pulse rounded-xl min-h-[150px] border">
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
