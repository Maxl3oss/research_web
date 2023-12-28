import React, { useEffect, useState } from 'react';
import { ExtractInformation, ExtractTextFromPDF } from '@components/helper/ExtractFromPDF';
import { GetHighlightedText } from '@components/helper/FunctionHelper';

const MainTest: React.FC = () => {
  const [text, setText] = useState('');
  const [/*image**/, setImage] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [hightLight, setHighlight] = useState('');
  const [err, setErr] = useState('');
  const [data, setData] = useState({});

  const handlePDFUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      extract(file);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (e.clipboardData.files.length) {
      const fileObject = e.clipboardData.files[0];
      extract(fileObject);
    }
  };

  function extract(file: File) {
    if ((file.size / (1024 * 1024)) > 10) {
      return setErr("ขนาดไฟล์เกิน 10 mb");
    }
    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.result) {
        setLoading(true);
        const pdfText = await ExtractTextFromPDF(reader.result.toString());
        setLoading(false);

        setText(pdfText.text);
        setImage(pdfText.image);
      }
    };
    reader.readAsDataURL(file);
    setErr("");
  }

  useEffect(() => {
    if (text.length > 0) {
      const res = ExtractInformation(text);
      setData(res);
      console.log(res);
    }
  }, [text]);

  return (
    <div>
      <input type="file" onChange={handlePDFUpload} accept=".pdf" />
      <div onPaste={handlePaste}>
        <input
          className="text-black"
          type="text"
          onChange={(e) => {
            setSearch(e.target.value)
          }}
          value={search}
        />
        <button type="button" onClick={() => setHighlight(search)} className="btn">หา</button>
        <p>{loading ? "extracting ..." : ""}</p>
        <p>{err ?? ""}</p>
        <h2>{JSON.stringify(data)}</h2>
        <h2>IMAGE</h2>
        {/* <img className="h-96" src={image} alt="" /> */}
        <h2>ALL TEXT</h2>
        <span>{GetHighlightedText(text, hightLight)}</span>
      </div >
    </div >
  );
};

export default MainTest;
