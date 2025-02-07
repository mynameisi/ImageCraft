import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { capitalCase } from "@/lib/utils";

interface FiltersProps {
  category: 'artistic' | 'color' | 'effects';
  filters: Record<string, number>;
  onChange: (filter: string, value: number) => void;
}

export function Filters({ category, filters, onChange }: FiltersProps) {
  return (
    <div className="space-y-4">
      {Object.entries(filters).map(([filter, value]) => (
        <div key={filter} className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor={filter}>{capitalCase(filter)}</Label>
            <span className="text-sm text-muted-foreground">{value}%</span>
          </div>
          <Slider
            id={filter}
            min={0}
            max={100}
            step={1}
            value={[value]}
            onValueChange={([newValue]) => onChange(filter, newValue)}
          />
        </div>
      ))}
    </div>
  );
}
