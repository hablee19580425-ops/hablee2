export interface Game {
  id: string;
  titleKorean: string;
  titleEnglish: string;
  imageUrl: string; // Base64 or Object URL
  linkUrl: string;
}

export interface GameFormData {
  titleKorean: string;
  titleEnglish: string;
  linkUrl: string;
  imageFile: File | null;
}