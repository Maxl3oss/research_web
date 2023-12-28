import { IPagin } from "@interfaces/pagin.interface";
import { prefix } from "../../assets/json/prefix.json";
import { nanoid } from "@reduxjs/toolkit";
import { addYears, format } from "date-fns";
import { th } from "date-fns/locale";

type TypeNotation = "standard" | "scientific" | "engineering" | "compact" | undefined

export function FindPrefix(prefixId: string | undefined | null): string {
  if (!prefixId) return ""
  return prefix.filter(curr => curr.id === prefixId)[0].name;
}

export function FormatterNumber(num: string | number | undefined | null, notation: TypeNotation = "standard", units = 0): string {
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

export function FindIndex(pagin: IPagin, index: number) {
  return (FormatterNumber((pagin.page - 1) * pagin.pageSize + (index + 1)))
}

export const FindDataInJSON = (names: string[], dataJSON: { id: number, name: string }[]): number[] => {
  return names.map(name => {
    const foundItem = dataJSON.find(item => item.name === name);
    return foundItem ? foundItem.id : 0;
  }).filter((item) => item !== 0);
};


export function FormatterDate(date: string | undefined, formatDate = "dd MMMM yyyy") {
  if (!date || date === "") return "";

  const convertData = new Date(date);
  const thaiDate = addYears(convertData, 543);
  const thaiDateFns = format(thaiDate, formatDate, { locale: th });

  return thaiDateFns;
}

export function GetHighlightedText(text = "", highlight = "") {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  if (highlight === "") return text;
  return (
    <span>{parts.map(part => part.toLowerCase() === highlight.toLowerCase()
      ? <b key={nanoid()} className="text-indigo-600">{part}</b>
      : part)}
    </span>
  )
}

