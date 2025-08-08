
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
} from "@/components/ui/form";
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start p-4 border border-border bg-muted/20 rounded-lg">
            
            <div className="flex items-center justify-center w-full">
              <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-border border-dashed rounded-lg cursor-pointer bg-background hover:bg-muted/40 transition-colors">
                  {imagePreview ? (
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                       <Image
                          src={imagePreview}
                          alt="Uploaded preview"
                          layout="fill"
                          objectFit="cover"
                        />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold text-primary">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  )}
                  <input id="file-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/gif" onChange={handleImageChange} />
              </label>
            </div> 


            <div className="space-y-4">
               <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., A golden retriever puppy playing in a field of flowers..."
                          className="min-h-[120px] bg-background border-border rounded-lg p-3 text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
               <div>
                  <p className="text-sm font-medium text-muted-foreground mb-3">Select a mood (optional):</p>
                  <div className="flex flex-wrap justify-start gap-2">
                    {moods.map((mood) => (
                      <Button
                        key={mood}
                        type="button"
                        variant={selectedMood === mood ? 'default' : 'secondary'}
                        size="sm"
                        className={`rounded-full text-xs font-semibold transition-colors duration-300 ${selectedMood === mood ? 'bg-primary text-primary-foreground' : 'bg-muted/60 text-foreground hover:bg-muted'}`}
                        onClick={() => setSelectedMood(mood === selectedMood ? null : mood)}
                      >
                        {mood}
                      </Button>
                    ))}
                  </div>
              </div>
            </div>
          </div>
          
           <div className="flex flex-col items-center gap-2">
              <Button type="submit" disabled={isLoading} size="lg" className="w-full max-w-sm font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-100 shadow-lg shadow-primary/20 hover:shadow-primary/40">
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
              <div className="flex items-center text-xs text-muted-foreground">
                <AlertTriangle className="h-3 w-3 mr-1.5" />
                <p>Uploaded images are NOT stored permanently.</p>
              </div>
           </div>
        </form>
      </Form>

      {(isLoading || captions.length > 0) && (
        <div className="space-y-6 pt-8">
          <h2 className="text-2xl font-bold text-center text-foreground">Your Captions ✨</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-muted/40 p-4 rounded-lg space-y-3 animate-pulse min-h-[150px] border border-border">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
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
