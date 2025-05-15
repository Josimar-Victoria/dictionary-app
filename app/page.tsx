"use client";

import { useState, useEffect } from "react";
import { DictionaryEntry, fetchWordDefinition } from "./services/dictionaryApi";
import { MobileMenu } from "@/components/mobilemenu/mobile-menu";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { SearchHistory } from "@/components/SearchHistory";
import { WordDefinition } from "@/components/WordDefinition";

type FontFamily = "serif" | "sans" | "mono";

export default function DictionaryPage() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [fontFamily, setFontFamily] = useState<FontFamily>("serif");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [wordData, setWordData] = useState<DictionaryEntry[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSearch = async (word: string): Promise<void> => {
    if (!word.trim()) {
      setError("Please enter a word");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchWordDefinition(word);

      if (!data || data.length === 0) {
        throw new Error("No definitions found");
      }

      setWordData(data);
      setSearchHistory(prev =>
        [word, ...prev.filter(item => item.toLowerCase() !== word.toLowerCase())].slice(0, 5)
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch word definition";
      setError(errorMessage);
      setWordData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <div className={cn(
      "min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300",
      fontFamily === "serif" ? "font-serif" : fontFamily === "sans" ? "font-sans" : "font-mono"
    )}>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
        />

        <SearchHistory
          searchHistory={searchHistory}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />

        {isLoading && (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-purple-500" />
            <p className="mt-2">Searching for {searchTerm}...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
            <p className="text-gray-500 mt-2">Try another word</p>
          </div>
        )}

        {wordData && wordData.length > 0 && (
          <WordDefinition
            wordData={wordData[0]}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
          />
        )}
      </div>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
}