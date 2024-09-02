import React from "react";

import { PDFDocument, rgb } from "pdf-lib";

import { Download as DownloadIcon } from "lucide-react";

import { Input } from "./components/ui/input";

export function App() {
  const [originalPDF, setOriginalPDF] = React.useState<File | null>();

  const [modifiedPDF, setModifiedPDF] = React.useState<string>();

  React.useEffect(() => {
    const loadPDF = async () => {
      const file = await originalPDF?.arrayBuffer();
      const document = await PDFDocument.load(file as ArrayBuffer);

      const pages = document.getPages();

      const [firstPage] = pages;

      const size = firstPage.getSize();

      firstPage?.drawRectangle({
        x: 0,
        y: size.height * 0.87,
        width: 120,
        height: 80,
        color: rgb(1, 1, 1),
      });

      firstPage?.drawRectangle({
        x: size.width * 0.35,
        y: size.height * 0,
        width: 180,
        height: 80,
        color: rgb(1, 1, 1),
      });

      const modified = await document.save();

      const modifiedURL = URL.createObjectURL(new Blob([modified], { type: "application/pdf" }));

      setModifiedPDF(modifiedURL);
    };

    if (originalPDF) loadPDF();
  }, [originalPDF]);

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const file = files?.item(0);
    setOriginalPDF(file);
  };

  return (
    <div className="flex flex-col gap-10 p-10 rounded-lg shadow-md bg-white w-screen h-screen max-w-[800px] max-h-[800px]">
      <h1 className="text-3xl font-medium">PDF Astral</h1>

      <Input type="file" onChange={handleSelectFile} accept="application/pdf" />

      {modifiedPDF && <iframe src={`${modifiedPDF}#view=fit`} className="w-full h-[800px]"></iframe>}

      {modifiedPDF && (
        <a
          href={modifiedPDF}
          download={"mapa-astral.pdf"}
          className="flex items-center gap-5 w-fit rounded-lg border px-5 py-2 hover:bg-neutral-100 transition-all shadow-sm hover:shadow-md"
        >
          Baixar
          <DownloadIcon size={18} />
        </a>
      )}
    </div>
  );
}

export default App;
