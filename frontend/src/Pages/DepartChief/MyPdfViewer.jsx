import React from 'react';
import { Document, Page } from 'react-pdf';

const MyPdfViewer = () => {
  const pdfUrl = 'http://localhost:5000/chap2_chaines_Markov_continues.pdf';

  return (
    <div>
      <h1>PDF Viewer</h1>
      <Document
        file={pdfUrl}
        // workerUrl specifies the location of pdf.worker.js
        // Make sure to adjust the path accordingly based on your project structure
        workerUrl="/path/to/pdf.worker.js"
      >
        <Page pageNumber={7} />
      </Document>
    </div>
  );
};

export default MyPdfViewer;
