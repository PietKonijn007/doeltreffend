import type { APIRoute } from 'astro';
import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
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

export const GET: APIRoute = async () => {
  try {
    // List all student pictures
    const listCommand = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: 'student_pictures/',
    });

    const listResponse = await s3Client.send(listCommand);
    
    if (!listResponse.Contents || listResponse.Contents.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No student pictures found' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Filter out directory markers and get only files
    const students = listResponse.Contents.filter(
      item => item.Key && !item.Key.endsWith('/')
    );

    if (students.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No valid student pictures found' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Generate presigned URLs for all student pictures
    const studentUrls = await Promise.all(
      students.map(async (student) => {
        const command = new GetObjectCommand({
          Bucket: BUCKET_NAME,
          Key: student.Key,
        });
        
        // Generate presigned URL valid for 1 hour
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        const filename = student.Key?.split('/').pop() || '';
        
        return {
          url,
          filename,
          size: student.Size,
        };
      })
    );

    return new Response(
      JSON.stringify({ 
        students: studentUrls,
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
    console.error('Error fetching student pictures from S3:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch student pictures',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
