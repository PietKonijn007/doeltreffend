import { convert } from 'pdf2pic';
import fs from 'fs';
import path from 'path';

export interface PDFPageInfo {
  pageNumber: number;
  imageUrl: string;
  thumbnailUrl: string;
}

export interface PDFInfo {
  filename: string;
  totalPages: number;
  pages: PDFPageInfo[];
  originalUrl: string;
}

export async function processPDF(pdfPath: string, outputDir: string): Promise<PDFInfo> {
  const filename = path.basename(pdfPath, '.pdf');
  const pdfBuffer = fs.readFileSync(pdfPath);
  
  // Create output directories
  const fullSizeDir = path.join(outputDir, 'full');
  const thumbnailDir = path.join(outputDir, 'thumbnails');
  
  if (!fs.existsSync(fullSizeDir)) {
    fs.mkdirSync(fullSizeDir, { recursive: true });
  }
  if (!fs.existsSync(thumbnailDir)) {
    fs.mkdirSync(thumbnailDir, { recursive: true });
  }

  // Convert PDF to images
  const convert2pic = convert({
    density: 150,           // High quality for full size
    saveFilename: filename,
    savePath: fullSizeDir,
    format: 'jpeg',
    width: 1200,
    height: 1600
  });

  const convertThumbnail = convert({
    density: 100,           // Lower quality for thumbnails
    saveFilename: `${filename}_thumb`,
    savePath: thumbnailDir,
    format: 'jpeg',
    width: 300,
    height: 400
  });

  try {
    // Convert all pages
    const fullSizeResults = await convert2pic.bulk(pdfBuffer, { responseType: 'image' });
    const thumbnailResults = await convertThumbnail.bulk(pdfBuffer, { responseType: 'image' });

    const pages: PDFPageInfo[] = [];
    
    for (let i = 0; i < fullSizeResults.length; i++) {
      const pageNum = i + 1;
      const fullSizePath = path.join(fullSizeDir, `${filename}.${pageNum}.jpeg`);
      const thumbnailPath = path.join(thumbnailDir, `${filename}_thumb.${pageNum}.jpeg`);
      
      pages.push({
        pageNumber: pageNum,
        imageUrl: `/Material/Section 2/processed/${filename}/full/${filename}.${pageNum}.jpeg`,
        thumbnailUrl: `/Material/Section 2/processed/${filename}/thumbnails/${filename}_thumb.${pageNum}.jpeg`
      });
    }

    return {
      filename,
      totalPages: pages.length,
      pages,
      originalUrl: `/Material/Section 2/${path.basename(pdfPath)}`
    };
  } catch (error) {
    console.error('Error processing PDF:', error);
    throw error;
  }
}