'use server';

/**
 * @fileOverview Generates multiple captions for a social media post based on a user-provided description and mood.
 *
 * - generateCaptions - A function that generates captions and saves them.
 * - GenerateCaptionsInput - The input type for the generateCaptions function.
 * - GenerateCaptionsOutput - The return type for the generateCaptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';
import { Types } from 'mongoose';

const GenerateCaptionsInputSchema = z.object({
  description: z
    .string()
    .describe(
      'A description of the photo or video for which to generate captions.'
    ),
  mood: z.string().optional().describe('The selected mood for the caption.'),
  userId: z.string().optional().describe('The ID of the user generating the caption.'),
  imageUrl: z.string().optional().describe('The URL of the uploaded image.'),
});
export type GenerateCaptionsInput = z.infer<typeof GenerateCaptionsInputSchema>;

const GenerateCaptionsOutputSchema = z.object({
  captions: z
    .array(z.string())
    .describe('An array of generated captions for the social media post.'),
});
export type GenerateCaptionsOutput = z.infer<typeof GenerateCaptionsOutputSchema>;

export async function generateCaptions(input: GenerateCaptionsInput): Promise<GenerateCaptionsOutput> {
  return generateCaptionsFlow(input);
}

const generateCaptionsPrompt = ai.definePrompt({
  name: 'generateCaptionsPrompt',
  input: {schema: GenerateCaptionsInputSchema},
  output: {schema: GenerateCaptionsOutputSchema},
  prompt: `You are a social media expert specializing in creating engaging captions for a Gen Z audience.

  Generate multiple captions (at least 3) for a social media post based on the following description and mood.

  Description: {{{description}}}
  {{#if mood}}
  Mood: {{{mood}}}
  {{/if}}

  Each caption should be unique and suitable for platforms like TikTok, Instagram, and Snapchat.
  Incorporate relevant emojis and hashtags.
  Return the captions in an array.
  `,
});

const generateCaptionsFlow = ai.defineFlow(
  {
    name: 'generateCaptionsFlow',
    inputSchema: GenerateCaptionsInputSchema,
    outputSchema: GenerateCaptionsOutputSchema,
  },
  async input => {
    const {output} = await generateCaptionsPrompt(input);

    if (output && output.captions && input.userId) {
        await dbConnect();
        const postPromises = output.captions.map(caption => {
            const newPost = new Post({
                caption: caption,
                user: new Types.ObjectId(input.userId),
                image: input.imageUrl,
            });
            return newPost.save();
        });
        await Promise.all(postPromises);
    }
    
    return output!;
  }
);
