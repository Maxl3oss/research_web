import { extractTextFromPDF } from '@components/helper/ExtractFromPDF';
import React, { useState } from 'react';

const MainTest: React.FC = () => {
  const [text, setText] = useState('');

  const handlePDFUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        if (reader.result) {
          const pdfText = await extractTextFromPDF(reader.result.toString());
          setText(pdfText);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handlePDFUpload} accept=".pdf" />
      <div>
        <h3>Extracted Text:</h3>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default MainTest;
