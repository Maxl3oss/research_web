import { prefix } from "../../assets/json/prefix.json";
type TypeNotation = "standard" | "scientific" | "engineering" | "compact" | undefined

export function FindPrefix(prefixId: string | undefined | null): string {
  if (!prefixId) return ""
  return prefix.filter(curr => curr.id === prefixId)[0].name;
}

export function FormatterNumber(num: string | number | undefined | null, notation: TypeNotation = 'standard', units = 0): string {
  if (!num) return (num ?? 0).toString();
  const numberValue = parseFloat(num.toString());

  if (!Number.isFinite(numberValue) || isNaN(numberValue)) {
    return (num ?? 0).toString();
  }

  const formatter = Intl.NumberFormat('en', {
    notation: notation,
    maximumFractionDigits: units,
  });

  return formatter.format(numberValue);
}