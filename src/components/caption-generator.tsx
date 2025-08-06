"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Sparkles, UploadCloud } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
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
  description: z.string().optional(),
  image: z.any().optional(),
});

const moods = ["😎 Casual", "😂 Funny", "🤩 Excited", "🤔 Thoughtful", "👔 Professional", "💖 Romantic"];

export function CaptionGenerator() {
  const [captions, setCaptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        form.setValue("image", reader.result);
        // Create a description from the image file name
        const description = file.name.replace(/\\.[^/.]+$/, "").replace(/[-_]/g, " ");
        form.setValue("description", `An image of ${description}`);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.image && !values.description) {
      toast({
        variant: "destructive",
        title: "Hold up!",
        description: "Please upload an image or describe it to generate captions.",
      });
      return;
    }

    setIsLoading(true);
    setCaptions([]);
    try {
      const result = await generateCaptions({
        description: values.description || 'an image',
        mood: selectedMood || undefined,
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-2xl p-8 text-center cursor-pointer hover:border-primary transition-all duration-300 group">
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
                          <div className="relative w-full max-w-sm h-64 rounded-xl overflow-hidden">
                             <Image
                                src={imagePreview}
                                alt="Uploaded preview"
                                layout="fill"
                                objectFit="cover"
                              />
                          </div>
                        ) : (
                          <>
                            <UploadCloud className="w-16 h-16 text-gray-500 group-hover:text-primary transition-colors" />
                            <p className="text-lg font-semibold text-gray-300">Drag & Drop your image here</p>
                            <p className="text-gray-400">or</p>
                          </>
                        )}
                        <label htmlFor="file-upload" className="button-secondary bg-gray-700 text-white rounded-xl px-6 py-3 font-semibold hover:bg-gray-600 transition-all duration-300 cursor-pointer">
                          Choose a file
                        </label>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        <FormMessage className="text-primary" />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="max-w-2xl mx-auto">
            <p className="text-lg font-medium text-muted-foreground mb-4">Select a mood:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {moods.map((mood) => (
                <Button
                  key={mood}
                  type="button"
                  variant={selectedMood === mood ? 'default' : 'secondary'}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300"
                  onClick={() => setSelectedMood(mood === selectedMood ? null : mood)}
                >
                  {mood}
                </Button>
              ))}
            </div>
          </div>
          
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

      {(isLoading || captions.length > 0) && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-foreground/90">Your Captions ✨</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="bg-gray-800 p-4 space-y-3 animate-pulse rounded-xl min-h-[150px]">
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
