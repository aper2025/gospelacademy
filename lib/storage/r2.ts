/**
 * Cloudflare R2 storage client (S3-compatible).
 *
 * Env vars required:
 *   R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY,
 *   R2_BUCKET_NAME, R2_PUBLIC_URL
 */

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'

function getClient(): S3Client {
  const accountId = process.env.R2_ACCOUNT_ID
  if (!accountId) throw new Error('R2_ACCOUNT_ID is not set')

  return new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  })
}

const bucket = () => {
  const name = process.env.R2_BUCKET_NAME
  if (!name) throw new Error('R2_BUCKET_NAME is not set')
  return name
}

const publicUrl = () => {
  const url = process.env.R2_PUBLIC_URL
  if (!url) throw new Error('R2_PUBLIC_URL is not set')
  return url.replace(/\/$/, '')
}

/**
 * Upload a file to R2 and return its public URL.
 */
export async function uploadFile(
  key: string,
  body: Buffer,
  contentType: string,
): Promise<string> {
  const client = getClient()
  await client.send(
    new PutObjectCommand({
      Bucket: bucket(),
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  )
  return `${publicUrl()}/${key}`
}

/**
 * Delete a file from R2 by its key.
 */
export async function deleteFile(key: string): Promise<void> {
  const client = getClient()
  await client.send(
    new DeleteObjectCommand({
      Bucket: bucket(),
      Key: key,
    }),
  )
}

/**
 * Extract the R2 object key from a full public URL.
 */
export function keyFromUrl(fileUrl: string): string {
  const base = publicUrl()
  if (fileUrl.startsWith(base)) {
    return fileUrl.slice(base.length + 1) // +1 for the slash
  }
  // Fallback: just use the last path segments
  const url = new URL(fileUrl)
  return url.pathname.replace(/^\//, '')
}
