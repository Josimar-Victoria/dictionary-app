import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    isLoading: boolean;
    handleSubmit: (e: React.FormEvent) => void;
}

export function SearchBar({ searchTerm, setSearchTerm, isLoading, handleSubmit }: SearchBarProps) {
    return (
        <form onSubmit={handleSubmit} className="relative mb-12 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <Input
                type="text"
                placeholder="Search for a word..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-10 py-4 bg-transparent border-none focus-visible:ring-0 text-lg"
                disabled={isLoading}
            />
            <button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                disabled={isLoading}
            >
                {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                ) : (
                    <Search className="h-5 w-5 text-purple-500" />
                )}
            </button>
        </form>
    );
}