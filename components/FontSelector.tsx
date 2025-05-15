import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface FontSelectorProps {
    fontFamily: "serif" | "sans" | "mono";
    setFontFamily: (font: "serif" | "sans" | "mono") => void;
}

export function FontSelector({ fontFamily, setFontFamily }: FontSelectorProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 cursor-pointer">
                    {fontFamily === "serif" ? "Serif" : fontFamily === "sans" ? "Sans" : "Mono"}
                    <span className="text-xs">▼</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFontFamily("serif")}>Serif</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFontFamily("sans")}>Sans Serif</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFontFamily("mono")}>Monospace</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}