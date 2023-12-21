import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.mjs";

export async function extractTextFromPDF(pdfUrl: string): Promise<string> {
  const loadingTask = pdfjsLib.getDocument(pdfUrl);
  const pdf = await loadingTask.promise;

  let fullText = '';
  const numPages = pdf.numPages;

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

  return fullText;
}