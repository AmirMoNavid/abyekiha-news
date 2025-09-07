import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(request, { params }) {
  const { filename } = params;

  const currentDirectory = process.cwd();
  const publicDirectory = path.join(currentDirectory, '..', 'public');

  try {
    const filePath = path.join(publicDirectory, 'images', filename);
    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse('file not found', { status: 404 });
  }
}

export const config = {
  api: {
    externalResolver: true,
    responseLimit: false,
  },
};
