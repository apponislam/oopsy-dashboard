import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans, Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-jakarta",
});

export const metadata: Metadata = {
    title: {
        default: "Oopsy Admin Console",
        template: "%s | Oopsy Admin Console",
    },
    description: "Comfort & Convenience, Anywhere. Find clean restrooms, showers, and luggage storage near you — instantly.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en" className={cn("h-full", "antialiased", jakarta.variable, "font-sans", geist.variable)}>
            <body className="min-h-full flex flex-col">
                <TooltipProvider>{children}</TooltipProvider>
            </body>
        </html>
    );
}
