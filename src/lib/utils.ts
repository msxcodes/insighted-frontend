import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const GITHUB_URL = "#";
export const LINKEDIN_URL = "#";
export const ABOUT_URL = "#";
export const FEATURES_URL = "#";

