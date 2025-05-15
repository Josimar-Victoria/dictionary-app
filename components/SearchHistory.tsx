import { Button } from "@/components/ui/button";

interface SearchHistoryProps {
    searchHistory: string[];
    setSearchTerm: (term: string) => void;
    handleSearch: (term: string) => void;
}

export function SearchHistory({ searchHistory, setSearchTerm, handleSearch }: SearchHistoryProps) {
    if (searchHistory.length === 0) return null;

    return (
        <div className="mb-6">
            <p className="text-gray-500 mb-2">Recent searches:</p>
            <div className="flex flex-wrap gap-2">
                {searchHistory.map((term, index) => (
                    <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setSearchTerm(term);
                            handleSearch(term);
                        }}
                    >
                        {term}
                    </Button>
                ))}
            </div>
        </div>
    );
}