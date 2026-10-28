export type Platform = 'youtube' | 'facebook' | 'tiktok';

export type UiLanguage = 'bn' | 'en';

export type ContentLanguage = 'Bengali' | 'English' | 'Hindi' | 'Arabic' | 'Other';

export type VideoCategory =
  | 'News'
  | 'Education'
  | 'Islamic Content'
  | 'Comedy'
  | 'Entertainment'
  | 'Technology'
  | 'Facts and Information'
  | 'Tutorial'
  | 'Reviews'
  | 'Other';

export type TargetAudience =
  | 'Bangladesh'
  | 'United States'
  | 'United Kingdom'
  | 'India'
  | 'Global Audience'
  | 'Custom';

export type VideoFormat =
  | 'youtube_long'
  | 'youtube_shorts'
  | 'fb_reels'
  | 'fb_standard'
  | 'tiktok_short'
  | 'tiktok_long';

export interface VideoScriptInput {
  script: string;
  category: VideoCategory;
  language: ContentLanguage;
  audience: TargetAudience;
  customAudience?: string;
  format: VideoFormat;
  topic?: string;
}

export interface TitleItem {
  id: string;
  title: string;
  charCount: number;
  seoScore: number; // 0 - 100 AI estimate
  readability: 'Excellent' | 'Good' | 'Moderate' | 'Complex';
  isRecommended: boolean;
  reasoning: string;
}

export interface HookItem {
  id: string;
  hook: string;
  style: string;
  targetDuration: string;
}

export interface ThumbnailData {
  prompt: string;
  style: string;
  shortText: string;
  aspectRatio: '16:9' | '9:16' | '1:1';
  imageUrl?: string;
  visualElements: string[];
  bannerColor?: string;
  textColor?: string;
}

export interface DescriptionData {
  summary: string;
  fullDescription: string;
  keywordsUsed: string[];
  hashtags: string[];
  chapters?: { time: string; title: string }[];
  callToAction: string;
}

export interface TagsData {
  tags: string[];
  totalChars: number;
  commaSeparated: string;
}

export interface KeywordsData {
  primaryKeywords: string[];
  secondaryKeywords: string[];
  searchPhrases: string[];
  searchIntent: string;
  disclaimer: string;
}

export interface ScriptAnalysisData {
  topic: string;
  targetAudience: string;
  hookGrade: 'A+' | 'A' | 'B' | 'C' | 'Needs Improvement';
  hookFeedback: string;
  weakSections: Array<{
    section: string;
    issue: string;
    suggestedFix: string;
  }>;
  retentionTips: string[];
  unclearOrUnsupportedClaims: string[];
  recommendedKeywords: string[];
  overallSeoScore: number; // 0-100
  scoreBreakdown: {
    relevance: number;
    keywordDensity: number;
    hookImpact: number;
    clarityAndReadability: number;
    audienceMatch: number;
  };
  scoreNotice: string;
}

export interface VideoLengthAdvisor {
  wordCount: number;
  estimatedSpeakingDurationSec: number;
  recommendedDuration: string;
  pacingNote: string;
}

export interface VideoAnalysisData {
  fileName: string;
  fileSizeMb: number;
  visualScenesSummary: string;
  audioPacingObservations: string;
  hookRetentionEvaluation: string;
  retentionRisks: string[];
  aiRecommendations: string[];
  distinctionNotice: string;
}

export interface GenerationResults {
  titles?: TitleItem[];
  description?: DescriptionData;
  tags?: TagsData;
  keywords?: KeywordsData;
  hooks?: HookItem[];
  analysis?: ScriptAnalysisData;
  thumbnail?: ThumbnailData;
  videoLength?: VideoLengthAdvisor;
  videoAnalysis?: VideoAnalysisData;
}

export interface SavedProject {
  id: string;
  name: string;
  platform: Platform;
  createdAt: number;
  updatedAt: number;
  input: VideoScriptInput;
  results: GenerationResults;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  createdAt: number;
}
