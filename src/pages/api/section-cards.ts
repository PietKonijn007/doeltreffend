import type { APIRoute } from 'astro';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// This route must be server-rendered to generate presigned URLs
export const prerender = false;

const BUCKET_NAME = 'doeltreffend-portfolio-materials';
const REGION = 'eu-west-1';

// Initialize S3 client
const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: import.meta.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: import.meta.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const SECTION_IMAGES = {
  '1': 'section-cards/P1070794.JPG',      // Nodes
  '2': 'section-cards/P1070825.JPG',      // Process Bundle
  '3': 'section-cards/photomap.png',      // Photo Map
  '4': 'section-cards/P1070970.JPG',      // Photos
};

export const GET: APIRoute = async () => {
  try {
    const imageUrls: Record<string, string> = {};

    // Generate presigned URLs for all section card images
    for (const [section, key] of Object.entries(SECTION_IMAGES)) {
      try {
        const command = new GetObjectCommand({
          Bucket: BUCKET_NAME,
          Key: key,
        });
        
        // Generate presigned URL valid for 1 hour
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        imageUrls[section] = url;
      } catch (err) {
        console.error(`Error generating URL for section ${section}:`, err);
        // Use a fallback image if the specific one doesn't exist
        imageUrls[section] = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80';
      }
    }

    return new Response(
      JSON.stringify({ 
        images: imageUrls,
      }),
      {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        },
      }
    );
  } catch (error) {
    console.error('Error fetching section card images from S3:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch section card images',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
