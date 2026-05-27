"use client";

import { useState, useRef } from "react";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { generatePdfSummary } from "@/actions/upload-actions";


// Zod Schema to validate files on the client side
const uploadSchema = z.object({
  file: z
    .custom<File>((val) => val instanceof File, {
      message: "Please select a valid file.",
    })
    .refine((file) => file.type === "application/pdf", {
      message: "Only PDF files are allowed.",
    })
    .refine((file) => file.size <= 4 * 1024 * 1024, {
      message: "File size must be less than 4MB.",
    }),
});

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState<{ url: string; name: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { startUpload, isUploading } = useUploadThing("pdfUploader", {
    onUploadProgress: (progress) => {
      setUploadProgress(progress);
    },
    onClientUploadComplete: async (res) => {
      setUploadProgress(100);
      if (res && res[0]) {
        setUploadResult({
          url: res[0].url,
          name: res[0].name,
        });

        // Trigger server action to extract and log PDF text
        const result = await generatePdfSummary(res);
        if (!result.success) {
          console.error("PDF extraction failed:", result.message);
        }
      }
      setFile(null);
      setValidationError(null);
    },
    onUploadError: (err) => {
      setValidationError(err.message || "Failed to upload file. Please try again.");
    },
  });

  const validateAndSetFile = (selectedFile: File) => {
    setUploadResult(null);
    const result = uploadSchema.safeParse({ file: selectedFile });
    
    if (!result.success) {
      const errorMsg = result.error.issues[0]?.message || "Invalid file selection";
      setValidationError(errorMsg);
      setFile(null);
    } else {
      setValidationError(null);
      setFile(selectedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleContainerClick = () => {
    fileInputRef.current?.click();
  };

  const handleClearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setValidationError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploadProgress(0);
    setUploadResult(null);
    setValidationError(null);
    
    try {
      await startUpload([file]);
    } catch (err) {
      setValidationError("An error occurred during initiation. Please try again.");
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-16 px-6 landing-bg">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
        
        {/* Top pill badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-200/80 bg-white/90 px-4 py-2 text-xs font-semibold text-rose-600 shadow-sm transition hover:scale-105 duration-300">
          <svg className="h-4 w-4 text-rose-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <span className="tracking-wide">AI-Powered Content Creation</span>
        </div>

        {/* Heading */}
        <h1 className="mt-8 font-display text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl text-center leading-none">
          Start Uploading{" "}
          <span className="relative inline-block px-4 py-2 text-pink-600 bg-pink-100/70 rounded-2xl transform -rotate-1 shadow-sm font-black">
            Your PDF&apos;s
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base md:text-lg text-slate-500 font-medium text-center">
          Upload your PDF and let our AI do the magic! ✨
        </p>

        {/* Upload Container Card */}
        <div className="w-full max-w-3xl mt-12 rounded-3xl border border-white/60 bg-white/70 p-6 md:p-8 shadow-[0_20px_50px_-20px_rgba(16,24,40,0.15)] backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-stretch gap-4">
            
            {/* Custom Input Bar / Dropzone */}
            <div 
              onClick={handleContainerClick}
              className={`flex-1 flex items-center justify-between border border-solid rounded-2xl px-5 py-4 cursor-pointer transition-all duration-300 ${
                isDragActive 
                  ? "border-rose-400 bg-rose-50/50 shadow-inner scale-[0.99]" 
                  : validationError 
                    ? "border-rose-300 bg-rose-50/20 hover:border-rose-400" 
                    : file 
                      ? "border-emerald-300 bg-emerald-50/10 hover:border-emerald-400" 
                      : "border-slate-200 hover:border-slate-300 bg-white/80"
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="application/pdf" 
                className="hidden" 
              />
              <div className="flex items-center gap-3 overflow-hidden mr-2">
                <span className="shrink-0 rounded-lg bg-slate-100 border border-slate-200/60 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition">
                  Choose File
                </span>
                <span className="text-sm font-medium text-slate-600 truncate">
                  {file ? file.name : "No file chosen"}
                </span>
              </div>
              
              {file && (
                <button 
                  onClick={handleClearFile}
                  type="button"
                  className="shrink-0 rounded-full p-1 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
                  title="Remove selected file"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Primary Action Button */}
            <button
              onClick={handleUpload}
              disabled={!file || !!validationError || isUploading}
              className={`rounded-2xl px-8 py-4 text-sm font-semibold text-white transition-all duration-300 shrink-0 ${
                !file || !!validationError || isUploading
                  ? "bg-slate-200 cursor-not-allowed text-slate-400 border border-slate-300/40"
                  : "bg-rose-500 hover:bg-rose-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-rose-500/10 active:translate-y-0 cursor-pointer font-bold"
              }`}
            >
              {isUploading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Uploading...</span>
                </div>
              ) : (
                "Upload your PDF"
              )}
            </button>
          </div>

          {/* Validation Error Hint */}
          {validationError && (
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-rose-600 animate-fadeIn">
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{validationError}</span>
            </div>
          )}

          {/* Upload Progress Bar */}
          {isUploading && (
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Uploading file to cloud storage...
                </span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-300 ease-out rounded-full" 
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Success Card */}
          {uploadResult && (
            <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5 animate-fadeIn">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-emerald-100 p-2 text-emerald-600 shrink-0">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="text-sm font-semibold text-slate-900">Upload Completed Successfully!</h3>
                  <p className="text-xs text-slate-500">File is processed and ready for AI parsing.</p>
                  
                  <div className="mt-2 text-xs font-medium text-slate-700 bg-white/60 rounded-lg p-2 border border-slate-100 truncate max-w-full">
                    {uploadResult.name}
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <a 
                      href={uploadResult.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
                    >
                      <span>View Uploaded PDF</span>
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
