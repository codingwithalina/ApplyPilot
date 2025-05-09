import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { FileUp } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const UploadResumePage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [skipResume, setSkipResume] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentResume, setCurrentResume] = useState<string | null>(null);

  // Load current resume on mount
  useEffect(() => {
    const loadCurrentResume = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: resume } = await supabase
        .from('resumes')
        .select('file_url')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (resume) {
        setCurrentResume(resume.file_url);
      }
    };

    loadCurrentResume();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Validate file type
      if (selectedFile.type !== 'application/pdf') {
        toast.error('Please upload a PDF file');
        return;
      }

      // Validate file size (5MB limit)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      setFile(selectedFile);
      
      // Create preview URL
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handleUpload = async () => {
    if (skipResume) {
      navigate('/dashboard');
      return;
    }

    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }

    try {
      setUploading(true);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      // Generate unique file path
      const timestamp = Date.now();
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${timestamp}.${fileExt}`;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(filePath);

      // Save resume record in database
      const { data: resume, error: dbError } = await supabase
        .from('resumes')
        .insert([
          { user_id: user.id, file_url: publicUrl }
        ])
        .select()
        .single();

      if (dbError) throw dbError;

      toast.success('Resume uploaded successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast.error('Failed to upload resume. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Upload Your Resume</CardTitle>
            <CardDescription>
              Upload your resume in PDF format. Maximum file size is 5MB.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {currentResume && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Current Resume</h3>
                  <div className="border rounded-lg overflow-hidden h-[500px]">
                    <iframe
                      src={currentResume}
                      className="w-full h-full"
                      title="Current Resume"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="skipResume" 
                  checked={skipResume} 
                  onCheckedChange={(checked) => {
                    setSkipResume(checked as boolean);
                    if (checked) {
                      setFile(null);
                      if (previewUrl) {
                        URL.revokeObjectURL(previewUrl);
                        setPreviewUrl(null);
                      }
                    }
                  }}
                />
                <Label htmlFor="skipResume">Skip resume upload for now</Label>
              </div>

              {!skipResume && (
                <>
                  <div className="flex justify-center items-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FileUp className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PDF (MAX. 5MB)</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf"
                        onChange={handleFileChange}
                        disabled={uploading}
                      />
                    </label>
                  </div>

                  {file && (
                    <div className="space-y-4">
                      <p className="text-sm text-green-600">
                        Selected file: {file.name}
                      </p>
                      
                      {previewUrl && (
                        <div className="border rounded-lg overflow-hidden h-[500px]">
                          <iframe
                            src={previewUrl}
                            className="w-full h-full"
                            title="Resume Preview"
                            sandbox="allow-scripts allow-same-origin"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              onClick={handleUpload}
              className="w-full"
              disabled={!skipResume && !file || uploading}
            >
              {uploading ? 'Uploading...' : (skipResume ? 'Continue Without Resume' : 'Upload Resume')}
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="w-full"
              disabled={uploading}
            >
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default UploadResumePage;