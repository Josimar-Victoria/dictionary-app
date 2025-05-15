import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
}

export function ThemeToggle({ darkMode, setDarkMode }: ThemeToggleProps) {
    return (
        <div className="flex items-center gap-2">
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </div>
    );
}