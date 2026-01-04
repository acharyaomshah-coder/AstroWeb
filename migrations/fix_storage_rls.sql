-- Create the storage bucket 'images' if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop existing policies for the 'images' bucket to avoid conflicts
-- We use a precise name to avoid deleting other policies, but we'll try to cover common names
DROP POLICY IF EXISTS "Images Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Images Authenticated Insert" ON storage.objects;
DROP POLICY IF EXISTS "Images Authenticated Update" ON storage.objects;
DROP POLICY IF EXISTS "Images Authenticated Delete" ON storage.objects;

-- Allow public access to view images (SELECT)
CREATE POLICY "Images Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'images' );

-- Allow authenticated users to upload images (INSERT)
CREATE POLICY "Images Authenticated Insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'images' );

-- Allow authenticated users to update images (UPDATE)
CREATE POLICY "Images Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'images' );

-- Allow authenticated users to delete images (DELETE)
CREATE POLICY "Images Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'images' );
