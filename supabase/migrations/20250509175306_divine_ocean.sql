/*
  # Fix applications table name and add resume constraints

  1. Changes
    - Rename 'application' table to 'applications'
    - Add unique constraint on user_id for resumes table

  2. Security
    - Enable RLS on applications table
    - Add policies for authenticated users
*/

-- Rename application table to applications
ALTER TABLE IF EXISTS application RENAME TO applications;

-- Add unique constraint on user_id for resumes table
ALTER TABLE resumes ADD CONSTRAINT unique_user_resume UNIQUE (user_id);

-- Enable RLS
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Users can read own applications"
  ON applications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own applications"
  ON applications
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own applications"
  ON applications
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);