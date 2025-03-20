import * as React from "react";
import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <div className={cn("min-h-[calc(100vh-10rem)] w-full", className)}>
      {children}
    </div>
  );
} 