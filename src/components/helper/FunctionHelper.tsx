import { IPagin } from "@interfaces/pagin.interface";
import { prefix } from "../../assets/json/prefix.json";
import { nanoid } from "@reduxjs/toolkit";
import dayjs, { ConfigType } from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import "dayjs/locale/th";
type TypeNotation = "standard" | "scientific" | "engineering" | "compact" | undefined;
type DateType = string | number | Date | ConfigType;
dayjs.extend(relativeTime);

declare module 'dayjs' {
  interface Dayjs {
    fromNow(withoutSuffix?: boolean): string;
    from(compared: DateType, withoutSuffix?: boolean): string;
    toNow(withoutSuffix?: boolean): string;
    to(compared: DateType, withoutSuffix?: boolean): string;
  }
}

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


export function FormatterDate(date: string | Date | undefined, formatDate = "DD MMMM YYYY") {
  if (!date || date === "") return "";

  dayjs.locale('th');
  return dayjs(date).format(formatDate);
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

export function SubtractYear543(date: Date | string | undefined | null) {
  if (!date || date === null) return "";
  const getDate = new Date(date);
  getDate.setFullYear(getDate.getFullYear() - 543);
  return getDate.toISOString();
}

export function FormatDateComments(date: DateType): string {
  if (!date) return "";
  return dayjs(date).fromNow(true);
}