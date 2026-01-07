import React, { useState, useRef, useEffect } from 'react';
import { GameFormData } from '../types';
import { Upload, X, Loader2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { generateGameMetadata } from '../services/geminiService';

interface AddGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: GameFormData) => void;
  initialData?: { ko: string; en: string; url?: string };
}

export const AddGameModal: React.FC<AddGameModalProps> = ({ isOpen, onClose, onAdd, initialData }) => {
  const [formData, setFormData] = useState<GameFormData>({
    titleKorean: '',
    titleEnglish: '',
    linkUrl: '',
    imageFile: null,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-fill form when modal opens with provided titles and URL
  useEffect(() => {
    if (isOpen && initialData) {
      setFormData(prev => ({
        ...prev,
        titleKorean: initialData.ko,
        titleEnglish: initialData.en,
        linkUrl: initialData.url || '', // Use URL if provided
        imageFile: null // Reset image
      }));
      setPreviewUrl(null);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file }));
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleAnalyzeImage = async () => {
    if (!formData.imageFile) return;

    setIsAnalyzing(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = (reader.result as string).split(',')[1];
        const mimeType = formData.imageFile!.type;
        
        const metadata = await generateGameMetadata(base64String, mimeType);
        
        setFormData(prev => ({
          ...prev,
          titleKorean: prev.titleKorean || metadata.titleKorean,
          titleEnglish: prev.titleEnglish || metadata.titleEnglish,
        }));
      };
      reader.readAsDataURL(formData.imageFile);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.imageFile && formData.titleKorean && formData.linkUrl) {
      onAdd(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    // Resetting form data is handled by the useEffect when opening, 
    // but we clear preview here to avoid flicker on close
    setPreviewUrl(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-fade-in">
      <div className="bg-nexus-card w-full max-w-lg rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 bg-neutral-900/50">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Upload className="text-nexus-accent" /> Add New Game
          </h2>
          <button onClick={handleClose} className="text-neutral-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
          
          {/* Image Upload Area */}
          <div 
            className={`relative rounded-xl h-48 flex flex-col items-center justify-center transition-all cursor-pointer group bg-neutral-800/50 hover:bg-neutral-800
              ${previewUrl ? 'bg-neutral-900' : ''}`}
            onClick={() => fileInputRef.current?.click()}
          >
            {previewUrl ? (
              <>
                <img src={previewUrl} alt="Preview" className="h-full w-full object-contain rounded-lg opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="font-bold text-white">Change Image</p>
                </div>
              </>
            ) : (
              <div className="text-center p-4">
                <ImageIcon size={40} className="mx-auto mb-2 text-neutral-500" />
                <p className="text-neutral-400 font-medium">Click to upload Game Cover</p>
                <p className="text-xs text-neutral-600 mt-1">From C:\Users\a1\Pictures\spimage</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </div>

          {/* AI Analyze Button */}
          {previewUrl && (
            <button
              type="button"
              onClick={handleAnalyzeImage}
              disabled={isAnalyzing}
              className="w-full py-2 bg-gradient-to-r from-indigo-900 to-purple-900 rounded-lg text-nexus-accent flex items-center justify-center gap-2 hover:brightness-110 transition-all"
            >
              {isAnalyzing ? (
                <> <Loader2 className="animate-spin" size={18} /> Analyzing Visuals... </>
              ) : (
                <> <Sparkles size={18} /> Auto-Fill Info with Gemini AI </>
              )}
            </button>
          )}

          {/* Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1">Korean Title (한글 제목)</label>
              <input
                type="text"
                required
                value={formData.titleKorean}
                onChange={(e) => setFormData({...formData, titleKorean: e.target.value})}
                className="w-full bg-neutral-900 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-nexus-accent transition-all placeholder-neutral-600"
                placeholder="예: 사이버펑크 2077"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1">English Title (영문 제목)</label>
              <input
                type="text"
                value={formData.titleEnglish}
                onChange={(e) => setFormData({...formData, titleEnglish: e.target.value})}
                className="w-full bg-neutral-900 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-nexus-accent transition-all placeholder-neutral-600"
                placeholder="e.g. Cyberpunk 2077"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1">Launch URL / Path</label>
              <input
                type="text"
                required
                value={formData.linkUrl}
                onChange={(e) => setFormData({...formData, linkUrl: e.target.value})}
                className="w-full bg-neutral-900 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-nexus-accent transition-all placeholder-neutral-600"
                placeholder="https://... or steam://rungame/id"
              />
              <p className="text-xs text-neutral-500 mt-1">Use 'http://' for websites or 'steam://' for local apps.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-neutral-900/50 flex justify-end gap-3">
          <button onClick={handleClose} className="px-4 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors">
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            disabled={!formData.titleKorean || !formData.linkUrl || !formData.imageFile}
            className="px-6 py-2 rounded-lg bg-nexus-accent hover:bg-nexus-accentHover text-white font-bold shadow-lg shadow-nexus-accent/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Add to Library
          </button>
        </div>
      </div>
    </div>
  );
};