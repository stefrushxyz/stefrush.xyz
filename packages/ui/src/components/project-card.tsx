"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Project } from "../data";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function ProjectCard({ title, description, link, preview }: Project) {
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showPreview && (e.key === "Escape" || e.key === "q")) {
        setShowPreview(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showPreview]);

  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle className="text-2xl max-sm:text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <p>{description}</p>
        <p>
          <a href={link} target="_blank" rel="noopener noreferrer" className="underline">
            View Source
          </a>
        </p>
        {preview && (
          <p>
            <Image
              src={preview}
              alt={`Preview of ${title}`}
              width={500}
              height={500}
              unoptimized
              className="cursor-pointer"
              onClick={() => setShowPreview(true)}
            />
          </p>
        )}
      </CardContent>
      {preview && showPreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowPreview(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === "q") {
              setShowPreview(false);
            }
          }}
        >
          <div className="max-h-[90vh] max-w-[90vw]">
            <Image
              src={preview}
              alt={`Full screen preview of ${title}`}
              width={1000}
              height={1000}
              unoptimized
              className="h-auto w-auto"
            />
          </div>
        </div>
      )}
    </Card>
  );
}
