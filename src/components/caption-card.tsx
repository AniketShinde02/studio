"use client";

import { useState, useEffect } from 'react';
import { Check, Copy } from 'lucide-react';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface CaptionCardProps {
  caption: string;
}

export function CaptionCard({ caption }: CaptionCardProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(caption);
    setCopied(true);
    toast({
      title: "Copied to clipboard!",
      description: "Now go make some magic happen. ✨",
    });
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <Card className="group bg-card shadow-md hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 rounded-xl flex flex-col justify-between min-h-[150px] border">
      <CardContent className="p-4 flex-grow">
        <p className="text-card-foreground/90">{caption}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleCopy}
          variant="ghost"
          size="sm"
          className="w-full text-primary hover:bg-primary/10 hover:text-primary"
        >
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copy Caption
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
