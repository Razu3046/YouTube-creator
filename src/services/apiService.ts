import {
  Platform,
  VideoScriptInput,
  TitleItem,
  DescriptionData,
  TagsData,
  KeywordsData,
  HookItem,
  ScriptAnalysisData,
  ThumbnailData,
  VideoLengthAdvisor,
  VideoAnalysisData,
  GenerationResults,
} from '../types';

export const apiService = {
  async checkStatus(): Promise<{ status: string; hasKey: boolean; model: string }> {
    try {
      const res = await fetch('/api/status');
      if (!res.ok) throw new Error('API offline');
      return await res.json();
    } catch {
      return { status: 'offline', hasKey: false, model: 'unknown' };
    }
  },

  async generateTitles(input: VideoScriptInput, platform: Platform): Promise<TitleItem[]> {
    const res = await fetch('/api/generate-title', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        script: input.script,
        platform,
        category: input.category,
        language: input.language,
        audience: input.customAudience || input.audience,
        format: input.format,
        topic: input.topic,
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to generate titles' }));
      throw new Error(err.error || 'Server error generating titles');
    }
    const data = await res.json();
    return data.titles || [];
  },

  async generateDescription(input: VideoScriptInput, platform: Platform): Promise<DescriptionData> {
    const res = await fetch('/api/generate-description', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        script: input.script,
        platform,
        category: input.category,
        language: input.language,
        audience: input.customAudience || input.audience,
        format: input.format,
        topic: input.topic,
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to generate description' }));
      throw new Error(err.error || 'Server error generating description');
    }
    return await res.json();
  },

  async generateTags(input: VideoScriptInput, platform: Platform): Promise<TagsData> {
    const res = await fetch('/api/generate-tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        script: input.script,
        platform,
        category: input.category,
        language: input.language,
        topic: input.topic,
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to generate tags' }));
      throw new Error(err.error || 'Server error generating tags');
    }
    return await res.json();
  },

  async generateKeywords(input: VideoScriptInput, platform: Platform): Promise<KeywordsData> {
    const res = await fetch('/api/generate-keywords', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        script: input.script,
        platform,
        category: input.category,
        language: input.language,
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to generate keywords' }));
      throw new Error(err.error || 'Server error generating keywords');
    }
    return await res.json();
  },

  async generateHooks(input: VideoScriptInput, platform: Platform): Promise<HookItem[]> {
    const res = await fetch('/api/generate-hook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        script: input.script,
        platform,
        language: input.language,
        format: input.format,
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to generate hooks' }));
      throw new Error(err.error || 'Server error generating hooks');
    }
    const data = await res.json();
    return data.hooks || [];
  },

  async analyzeScript(input: VideoScriptInput, platform: Platform): Promise<ScriptAnalysisData> {
    const res = await fetch('/api/analyze-script', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        script: input.script,
        platform,
        language: input.language,
        category: input.category,
        audience: input.customAudience || input.audience,
        format: input.format,
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to analyze script' }));
      throw new Error(err.error || 'Server error analyzing script');
    }
    return await res.json();
  },

  async generateThumbnail(input: VideoScriptInput, platform: Platform, style?: string): Promise<ThumbnailData> {
    const res = await fetch('/api/generate-thumbnail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        script: input.script,
        platform,
        format: input.format,
        visualStyle: style || 'High-Contrast Click-worthy',
        language: input.language,
        topic: input.topic,
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to generate thumbnail' }));
      throw new Error(err.error || 'Server error generating thumbnail');
    }
    return await res.json();
  },

  async calculateVideoLength(input: VideoScriptInput, platform: Platform): Promise<VideoLengthAdvisor> {
    const res = await fetch('/api/calculate-video-length', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        script: input.script,
        platform,
        format: input.format,
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to calculate length' }));
      throw new Error(err.error || 'Server error calculating length');
    }
    return await res.json();
  },

  async analyzeVideo(file: File, scriptContext?: string, platform: Platform = 'youtube'): Promise<VideoAnalysisData> {
    // Read file as base64 if under 20MB, or extract metadata
    let base64Data: string | undefined = undefined;
    if (file.size <= 25 * 1024 * 1024) {
      base64Data = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = () => resolve(undefined);
        reader.readAsDataURL(file);
      });
    }

    const res = await fetch('/api/analyze-video', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileName: file.name,
        fileSizeMb: Number((file.size / (1024 * 1024)).toFixed(1)),
        videoData: base64Data,
        scriptContext,
        platform,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to analyze video' }));
      throw new Error(err.error || 'Server error analyzing video');
    }
    return await res.json();
  },

  async generateAll(
    input: VideoScriptInput,
    platform: Platform,
    onProgress?: (step: string, percent: number) => void
  ): Promise<GenerationResults> {
    const results: GenerationResults = {};
    const steps = [
      { name: 'Titles & SEO Scores', fn: () => this.generateTitles(input, platform).then(r => { results.titles = r; }) },
      { name: 'Opening Hooks', fn: () => this.generateHooks(input, platform).then(r => { results.hooks = r; }) },
      { name: 'Description & Timestamps', fn: () => this.generateDescription(input, platform).then(r => { results.description = r; }) },
      { name: 'Tags & Keywords', fn: () => Promise.all([
          this.generateTags(input, platform).then(r => { results.tags = r; }),
          this.generateKeywords(input, platform).then(r => { results.keywords = r; })
        ])
      },
      { name: 'Audience Retention Audit', fn: () => this.analyzeScript(input, platform).then(r => { results.analysis = r; }) },
      { name: 'Thumbnail & Visual Concept', fn: () => this.generateThumbnail(input, platform).then(r => { results.thumbnail = r; }) },
      { name: 'Duration & Pacing Advice', fn: () => this.calculateVideoLength(input, platform).then(r => { results.videoLength = r; }) },
    ];

    let completed = 0;
    const errors: string[] = [];

    for (const step of steps) {
      onProgress?.(step.name, Math.round((completed / steps.length) * 100));
      try {
        await step.fn();
      } catch (err: any) {
        console.warn(`Step "${step.name}" failed:`, err);
        errors.push(`${step.name}: ${err.message || 'Failed'}`);
      }
      completed++;
    }

    onProgress?.('Complete', 100);
    return results;
  },
};
