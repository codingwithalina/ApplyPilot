/*
  # Fix Resume Storage Bucket

  1. Storage Setup
    - Create resumes bucket if it doesn't exist
    - Set public access to bucket
  
  2. Storage Policies
    - Allow authenticated users to read their own resumes
    - Allow authenticated users to upload their own resumes
*/

-- Create storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage bucket
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create storage policies
CREATE POLICY "Users can read own resumes"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'resumes' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload own resumes"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'resumes' 
  AND auth.uid()::text = (storage.foldername(name))[1]
  AND (LOWER(storage.extension(name)) = '.pdf')
  AND (octet_length(content) <= 5242880)
);

CREATE POLICY "Users can update own resumes"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'resumes' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own resumes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'resumes' AND auth.uid()::text = (storage.foldername(name))[1]);