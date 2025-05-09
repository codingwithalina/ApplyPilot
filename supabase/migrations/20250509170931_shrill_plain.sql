-- Add created_at column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'resumes' AND column_name = 'created_at'
  ) THEN
    ALTER TABLE resumes ADD COLUMN created_at timestamptz DEFAULT now();
  END IF;
END $$;