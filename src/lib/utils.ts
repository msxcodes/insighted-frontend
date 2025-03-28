import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const GITHUB_URL = "https://github.com/anand-mukul";
export const LINKEDIN_URL = "https://linkedin.com/in/dev-mukul";
export const ABOUT_URL = `${process.env.NEXT_PUBLIC_APP_URL}/#about`;
export const FEATURES_URL = `${process.env.NEXT_PUBLIC_APP_URL}/#features`;

