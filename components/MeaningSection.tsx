import { Meaning } from "@/app/services/dictionaryApi";
import { Button } from "@/components/ui/button";


interface MeaningSectionProps {
    meaning: Meaning;
    setSearchTerm: (term: string) => void;
    handleSearch: (term: string) => void;
}

export function MeaningSection({ meaning, setSearchTerm, handleSearch }: MeaningSectionProps) {
    return (
        <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
                <p className="text-xl italic">{meaning.partOfSpeech}</p>
                <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
            </div>

            <div className="mb-6">
                <p className="text-gray-500 mb-4">Meaning</p>
                <ul className="space-y-4">
                    {meaning.definitions.slice(0, 3).map((def, defIndex) => (
                        <li key={defIndex} className="flex">
                            <span className="text-purple-500 mr-4">•</span>
                            <div>
                                <p>{def.definition}</p>
                                {def.example && (
                                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                                        {def.example}
                                    </p>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {meaning.synonyms.length > 0 && (
                <div className="flex gap-6 mb-8">
                    <p className="text-gray-500">Synonyms</p>
                    <div className="flex flex-wrap gap-2">
                        {meaning.synonyms.map((synonym, synIndex) => (
                            <Button
                                key={synIndex}
                                variant="ghost"
                                size="sm"
                                className="text-purple-500"
                                onClick={() => {
                                    setSearchTerm(synonym);
                                    handleSearch(synonym);
                                }}
                            >
                                {synonym}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}