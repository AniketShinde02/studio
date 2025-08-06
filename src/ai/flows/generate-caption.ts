'use server';

/**
 * @fileOverview Generates multiple captions for a social media post based on a user-provided description.
 *
 * - generateCaptions - A function that generates captions.
 * - GenerateCaptionsInput - The input type for the generateCaptions function.
 * - GenerateCaptionsOutput - The return type for the generateCaptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCaptionsInputSchema = z.object({
  description: z
    .string()
    .describe(
      'A description of the photo or video for which to generate captions.'
    ),
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
  prompt: `You are a social media expert specializing in creating engaging captions.

  Generate multiple captions (at least 3) for a social media post based on the following description:

  Description: {{{description}}}

  Each caption should be unique and suitable for platforms like TikTok, Instagram, and Snapchat.
  Consider different tones and styles to appeal to a Gen Z audience.
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
    return output!;
  }
);
