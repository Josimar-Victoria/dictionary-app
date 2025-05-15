import { Button } from "@/components/ui/button";
import { BookType, BookOpenText, Menu } from "lucide-react";
import { FontSelector } from "./FontSelector";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
    fontFamily: "serif" | "sans" | "mono";
    setFontFamily: (font: "serif" | "sans" | "mono") => void;
    isMenuOpen: boolean;
    setIsMenuOpen: (value: boolean) => void;
}

export function Header({
    darkMode,
    setDarkMode,
    fontFamily,
    setFontFamily,
    isMenuOpen,
    setIsMenuOpen
}: HeaderProps) {
    return (
        <header className="flex items-center justify-between mb-12">
            <div className="flex items-center">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="mr-2 cursor-pointer"
                >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Menu</span>
                </Button>
                <div className="border border-gray-300 dark:border-gray-700 p-2 rounded">
                    {isMenuOpen ? <BookOpenText className="h-6 w-6" /> : <BookType className="h-6 w-6" />}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <FontSelector fontFamily={fontFamily} setFontFamily={setFontFamily} />
                <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
        </header>
    );
}