import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc = "";

interface LanguageDetectionResult {
  th: string;
  en: string;
}

type TypeExtractPDF = {
  text: string;
  image: File;
  creator: string;
  title: string;
  title_alternative: string;
  description: string;
}

export function DetectLanguage(text: string): LanguageDetectionResult {
  let thai = '';
  let english = '';

  for (let i = 0; i < text.length; i++) {
    if (text.charCodeAt(i) >= 3584 && text.charCodeAt(i) <= 3711) {
      thai += text[i];
    } else {
      english += text[i];
    }
  }

  return { th: thai, en: english };
}

export async function ExtractTextFromPDF(pdfUrl: string): Promise<TypeExtractPDF> {
  const loadingTask = pdfjsLib.getDocument(pdfUrl);
  const pdf = await loadingTask.promise;

  let fullText = '';
  const numPages = pdf.numPages;
  // get text
  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    for (const textItem of textContent.items) {
      if ('str' in textItem) {
        fullText += textItem.str + ' ';
      } else if ('textContent' in textItem) {
        fullText += textItem.textContent + ' ';
      }
    }
  }

  // get image
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale: 1 });
  const canvas = document.createElement("canvas");
  canvas.style.display = "none";
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  await page.render({
    canvasContext: canvas.getContext("2d") as CanvasRenderingContext2D,
    viewport,
  }).promise;
  const dataUrl = canvas.toDataURL("image/png");
  canvas.remove();
  const image = Base64ToFile(dataUrl) as File;

  const dataResearch = ExtractInformation(fullText);
  return { text: fullText, image, ...dataResearch };
}

export function ExtractInformation(inputString: string) {
  const regex_creator = /นา[งย]\s*(.*?)(?:\s*การวิจัย|$)/s;
  const match_creator = regex_creator.exec(inputString) ?? "";

  const regex_title = /\s*(.*?)(?:\s*นาย|$)/s;
  const match_title = regex_title.exec(inputString) ?? "";

  const regex_des = /บทคัดย่อ\s*(.*?)(?:\s*กิตติกรรมประกาศ|$)/s;
  const match_des = regex_des.exec(inputString) ?? "";

  const title = DetectLanguage(match_title[1]?.trim() ?? "");
  const creator = ((match_creator[0])?.split(" ") || []).slice(0, -1)?.join(" ");
  const description = match_des[1];
  
  return {
    creator: creator,
    title: title.th,
    title_alternative: title.en,
    description: description,
  }
}

export function Base64ToFile(base64Image: string, fileName = "image.jpg", fileType = "image/jpeg"): File | null {
  // Extracting the Base64 data
  const base64Data = base64Image.split(',')[1];

  // Convert Base64 to binary
  const binaryStr = atob(base64Data);

  // Create an ArrayBuffer and a Uint8Array for the binary data
  const arrayBuffer = new ArrayBuffer(binaryStr.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  // Convert the binary string to a Uint8Array
  for (let i = 0; i < binaryStr.length; i++) {
    uint8Array[i] = binaryStr.charCodeAt(i);
  }

  // Create a Blob from the Uint8Array
  const blob = new Blob([uint8Array], { type: fileType });

  // Create a File from the Blob
  const file = new File([blob], fileName, { type: fileType });

  return file;
}