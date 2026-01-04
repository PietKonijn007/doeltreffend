import type { APIRoute } from 'astro';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand } from '@aws-sdk/client-s3';

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

export const GET: APIRoute = async ({ params }) => {
  const section = params.section;
  
  if (!section) {
    return new Response(JSON.stringify({ error: 'Section parameter is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // List objects in the section folder
    const listCommand = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: `Section ${section}/`,
    });

    const listResponse = await s3Client.send(listCommand);
    
    if (!listResponse.Contents || listResponse.Contents.length === 0) {
      return new Response(JSON.stringify({ files: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Generate presigned URLs for each file
    const files = await Promise.all(
      listResponse.Contents
        .filter(item => item.Key && !item.Key.endsWith('/')) // Filter out folder markers
        .map(async (item) => {
          const command = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: item.Key,
          });
          
          // Generate presigned URL valid for 1 hour
          const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
          
          // Extract filename from key
          const filename = item.Key?.split('/').pop() || '';
          
          return {
            filename,
            url,
            size: item.Size,
            lastModified: item.LastModified,
          };
        })
    );

    return new Response(JSON.stringify({ files }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3000', // Cache for 50 minutes (less than presigned URL expiry)
      },
    });
  } catch (error) {
    console.error('Error fetching S3 images:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch images', details: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
