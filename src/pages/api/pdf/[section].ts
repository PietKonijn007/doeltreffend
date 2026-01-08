import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';

export const GET: APIRoute = async ({ params }) => {
  const section = params.section;
  
  if (!section) {
    return new Response(JSON.stringify({ error: 'Section parameter required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const materialPath = path.join(process.cwd(), 'public', 'Material', `Section ${section}`);
    
    if (!fs.existsSync(materialPath)) {
      return new Response(JSON.stringify({ pdfs: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const files = fs.readdirSync(materialPath);
    const pdfFiles = files.filter(file => file.toLowerCase().endsWith('.pdf'));
    
    const pdfs = pdfFiles.map(filename => {
      const filePath = path.join(materialPath, filename);
      const stats = fs.statSync(filePath);
      const baseName = path.basename(filename, '.pdf');
      
      // Check if processed images exist
      const processedDir = path.join(materialPath, 'processed', baseName);
      const metadataPath = path.join(processedDir, 'metadata.json');
      
      let pages: any[] = [];
      let totalPages = 0;
      
      if (fs.existsSync(metadataPath)) {
        try {
          const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
          pages = metadata.pages || [];
          totalPages = metadata.totalPages || 0;
        } catch (error) {
          console.error('Error reading metadata:', error);
          // Fallback to directory scanning
          const fullDir = path.join(processedDir, 'full');
          const thumbnailDir = path.join(processedDir, 'thumbnails');
          
          if (fs.existsSync(fullDir) && fs.existsSync(thumbnailDir)) {
            const fullImages = fs.readdirSync(fullDir).filter(f => f.endsWith('.png')).sort();
            const thumbnailImages = fs.readdirSync(thumbnailDir).filter(f => f.endsWith('.png')).sort();
            
            totalPages = fullImages.length;
            
            pages = fullImages.map((fullImage, index) => {
              const pageNumber = index + 1;
              const thumbnailImage = thumbnailImages[index];
              
              return {
                pageNumber,
                imageUrl: `/Material/Section ${section}/processed/${baseName}/full/${fullImage}`,
                thumbnailUrl: `/Material/Section ${section}/processed/${baseName}/thumbnails/${thumbnailImage}`
              };
            });
          }
        }
      }
      
      return {
        filename: baseName,
        originalFilename: filename,
        size: stats.size,
        url: `/Material/Section ${section}/${filename}`,
        totalPages,
        pages,
        processed: pages.length > 0
      };
    });

    return new Response(JSON.stringify({ pdfs }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error reading PDF files:', error);
    return new Response(JSON.stringify({ error: 'Failed to read PDF files' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ params, request }) => {
  const section = params.section;
  
  if (!section) {
    return new Response(JSON.stringify({ error: 'Section parameter required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { filename } = await request.json();
    
    if (!filename) {
      return new Response(JSON.stringify({ error: 'Filename required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const materialPath = path.join(process.cwd(), 'public', 'Material', `Section ${section}`);
    const pdfPath = path.join(materialPath, filename);
    
    if (!fs.existsSync(pdfPath)) {
      return new Response(JSON.stringify({ error: 'PDF file not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // For now, return a simple response
    // In a production environment, you'd process the PDF here
    return new Response(JSON.stringify({ 
      message: 'PDF processing would happen here',
      filename,
      section 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error processing PDF:', error);
    return new Response(JSON.stringify({ error: 'Failed to process PDF' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};