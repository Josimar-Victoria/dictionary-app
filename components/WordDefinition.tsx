import { Button } from "@/components/ui/button";
import { Play, Heart } from "lucide-react";
import { MeaningSection } from "./MeaningSection";
import { DictionaryEntry } from "@/app/services/dictionaryApi";


interface WordDefinitionProps {
    wordData: DictionaryEntry;
    setSearchTerm: (term: string) => void;
    handleSearch: (term: string) => void;
}

export function WordDefinition({ wordData, setSearchTerm, handleSearch }: WordDefinitionProps) {
    const playAudio = (audioUrl: string | undefined): void => {
        if (audioUrl) {
            new Audio(audioUrl).play();
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-5xl font-bold mb-2">{wordData.word}</h1>
                    {wordData.phonetic && (
                        <p className="text-purple-500">{wordData.phonetic}</p>
                    )}
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="text-gray-400 hover:text-red-500"
                        aria-label="Add to favorites"
                        onClick={() => alert("Added to favorites!")}
                    >
                        <Heart className="h-5 w-5" />
                    </Button>
                    {wordData.phonetics.find(p => p.audio) && (
                        <Button
                            variant="secondary"
                            size="icon"
                            className="bg-purple-100 dark:bg-purple-900/30 text-purple-500"
                            onClick={() => playAudio(wordData.phonetics.find(p => p.audio)?.audio)}
                        >
                            <Play className="h-6 w-6 fill-current" />
                        </Button>
                    )}
                </div>
            </div>

            {wordData.meanings.map((meaning, index) => (
                <MeaningSection
                    key={index}
                    meaning={meaning}
                    setSearchTerm={setSearchTerm}
                    handleSearch={handleSearch}
                />
            ))}

            {wordData.sourceUrls.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <p className="text-gray-500">Source</p>
                    {wordData.sourceUrls.map((url, urlIndex) => (
                        <a
                            key={urlIndex}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-gray-700 dark:text-gray-300 hover:underline"
                        >
                            {url}
                            <svg
                                className="h-4 w-4 ml-1"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}