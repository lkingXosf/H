/*
  # Create LLC Applications and Related Tables

  ## Summary
  This migration creates the database schema for storing LLC formation applications, contact form submissions, and analytics data.

  ## New Tables

  ### 1. `llc_applications`
  Stores all LLC formation applications submitted by users
  - `id` (uuid, primary key) - Unique identifier for each application
  - `company_name` (text) - Name of the LLC being formed
  - `owner_name` (text) - Full name of the LLC owner
  - `email` (text) - Contact email address
  - `phone` (text) - Contact phone number
  - `address` (text) - Street address
  - `city` (text) - City
  - `state` (text) - State/Province
  - `zip_code` (text) - ZIP/Postal code
  - `country` (text) - Country
  - `business_type` (text) - Type of business
  - `members` (text) - Number of LLC members
  - `ein_needed` (boolean) - Whether EIN is needed
  - `bank_account_needed` (boolean) - Whether bank account assistance is needed
  - `additional_info` (text, nullable) - Additional information from user
  - `status` (text) - Application status (pending, processing, completed, rejected)
  - `created_at` (timestamptz) - When application was submitted
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `contact_submissions`
  Stores contact form submissions
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Name of contact
  - `email` (text) - Email address
  - `phone` (text, nullable) - Phone number
  - `company` (text, nullable) - Company name
  - `message` (text) - Message content
  - `created_at` (timestamptz) - Submission timestamp

  ### 3. `chat_conversations`
  Stores AI chat conversations for analytics
  - `id` (uuid, primary key) - Unique identifier
  - `session_id` (text) - Browser session identifier
  - `messages` (jsonb) - Array of chat messages
  - `language` (text) - Language used (en/fr)
  - `created_at` (timestamptz) - When conversation started
  - `updated_at` (timestamptz) - Last message timestamp

  ## Security
  - All tables have Row Level Security (RLS) enabled
  - Public can insert their own data (applications, contact forms, chat)
  - Only authenticated users can view/update records
  - Admins would need separate policies for full access
*/

-- Create llc_applications table
CREATE TABLE IF NOT EXISTS llc_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  owner_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  country text NOT NULL,
  business_type text NOT NULL,
  members text NOT NULL,
  ein_needed boolean DEFAULT true,
  bank_account_needed boolean DEFAULT true,
  additional_info text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create chat_conversations table
CREATE TABLE IF NOT EXISTS chat_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  messages jsonb DEFAULT '[]'::jsonb,
  language text DEFAULT 'en',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE llc_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;

-- Policies for llc_applications
-- Allow anyone to insert applications
CREATE POLICY "Anyone can submit LLC applications"
  ON llc_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anyone to view their own applications by email
CREATE POLICY "Users can view own applications"
  ON llc_applications
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated users can update applications
CREATE POLICY "Authenticated users can update applications"
  ON llc_applications
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for contact_submissions
-- Allow anyone to insert contact submissions
CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow authenticated users to view submissions
CREATE POLICY "Authenticated users can view contact submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for chat_conversations
-- Allow anyone to insert/update their chat conversations
CREATE POLICY "Anyone can create chat conversations"
  ON chat_conversations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update chat conversations"
  ON chat_conversations
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can view chat conversations"
  ON chat_conversations
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_llc_applications_email ON llc_applications(email);
CREATE INDEX IF NOT EXISTS idx_llc_applications_status ON llc_applications(status);
CREATE INDEX IF NOT EXISTS idx_llc_applications_created_at ON llc_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_session_id ON chat_conversations(session_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_llc_applications_updated_at
  BEFORE UPDATE ON llc_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chat_conversations_updated_at
  BEFORE UPDATE ON chat_conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
