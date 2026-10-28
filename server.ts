import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Support up to 50MB for video analysis payloads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Initialize Google GenAI on server side only
const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Utility to verify AI client
function checkAi() {
  if (!ai || !apiKey) {
    throw new Error('GEMINI_API_KEY is not configured on the server. Please check the AI Studio Secrets panel.');
  }
  return ai;
}

// API Health & Status
app.get('/api/status', (_req, res) => {
  res.json({
    status: 'online',
    hasKey: Boolean(apiKey && apiKey.length > 5),
    model: 'gemini-3.8-flash',
  });
});

// 1. Title Generator
app.post('/api/generate-title', async (req, res) => {
  try {
    const { script, platform, category, language, audience, format, topic } = req.body;
    if (!script || script.length < 20) {
      return res.status(400).json({ error: 'Video script is required (minimum 20 characters).' });
    }

    const genAi = checkAi();
    const prompt = `You are a professional video SEO specialist for ${platform.toUpperCase()}.
Analyze the following script and generate 10 optimized, high-CTR video titles.
Platform: ${platform}
Format: ${format}
Category: ${category}
Language: ${language} (Write titles primarily in ${language}, with authentic phrasing and Unicode)
Target Audience: ${audience}
Specific Topic: ${topic || 'Derived from script'}

Rules:
1. Avoid cheap misleading clickbait; focus on genuine curiosity, clarity, and keyword search intent.
2. For YouTube: Keep character count under 100 characters (optimal is 50-70).
3. For Facebook/TikTok: Make them punchy, conversational, and share-worthy.
4. Provide estimated SEO score (0-100) based on keyword prominence, hook power, and search clarity.
5. Pick one title as the recommended best.
6. Provide readability rating (Excellent, Good, Moderate).

Video Script:
"""
${script.substring(0, 4000)}
"""`;

    const response = await genAi.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            titles: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  charCount: { type: Type.INTEGER },
                  seoScore: { type: Type.INTEGER },
                  readability: { type: Type.STRING },
                  isRecommended: { type: Type.BOOLEAN },
                  reasoning: { type: Type.STRING },
                },
                required: ['id', 'title', 'charCount', 'seoScore', 'readability', 'isRecommended', 'reasoning'],
              },
            },
          },
          required: ['titles'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Error generating titles:', error);
    res.status(500).json({ error: error.message || 'Failed to generate titles' });
  }
});

// 2. Description Generator
app.post('/api/generate-description', async (req, res) => {
  try {
    const { script, platform, category, language, audience, format, topic } = req.body;
    const genAi = checkAi();

    const prompt = `You are a top-tier video copywriter and SEO engineer for ${platform.toUpperCase()}.
Generate a comprehensive, high-converting video description for this video.
Platform: ${platform}
Format: ${format}
Category: ${category}
Content Language: ${language}
Target Audience: ${audience}
Topic: ${topic || 'Derived from script'}

Requirements for ${platform}:
- Concise 1-2 sentence hook summary at top.
- Detailed body incorporating key search phrases naturally without keyword stuffing.
- 5-10 relevant hashtags (#tag).
- Clear calls to action (subscribe, comment question, share).
- If YouTube long-form: include formatted chapter/timestamp outline (e.g. 00:00 Intro, 01:15 ...).
- Language: Write primarily in ${language}.

Video Script:
"""
${script.substring(0, 4000)}
"""`;

    const response = await genAi.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            fullDescription: { type: Type.STRING },
            keywordsUsed: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            hashtags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            chapters: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  time: { type: Type.STRING },
                  title: { type: Type.STRING },
                },
                required: ['time', 'title'],
              },
            },
            callToAction: { type: Type.STRING },
          },
          required: ['summary', 'fullDescription', 'keywordsUsed', 'hashtags', 'callToAction'],
        },
      },
    });

    res.json(JSON.parse(response.text || '{}'));
  } catch (error: any) {
    console.error('Error generating description:', error);
    res.status(500).json({ error: error.message || 'Failed to generate description' });
  }
});

// 3. Tags Generator
app.post('/api/generate-tags', async (req, res) => {
  try {
    const { script, platform, category, language, topic } = req.body;
    const genAi = checkAi();

    const prompt = `Generate high-ranking video tags/keywords for ${platform.toUpperCase()}.
Platform: ${platform}
Category: ${category}
Language: ${language}
Topic: ${topic || 'General'}

Requirements:
- YouTube tags limit is 500 characters. Return 15-25 highly relevant mix of broad, specific, and long-tail tags.
- Include Bengali and English variations where relevant.
- Return both individual tags and a ready-to-paste comma-separated string.

Script snippet:
"""
${script.substring(0, 3000)}
"""`;

    const response = await genAi.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            totalChars: { type: Type.INTEGER },
            commaSeparated: { type: Type.STRING },
          },
          required: ['tags', 'totalChars', 'commaSeparated'],
        },
      },
    });

    res.json(JSON.parse(response.text || '{}'));
  } catch (error: any) {
    console.error('Error generating tags:', error);
    res.status(500).json({ error: error.message || 'Failed to generate tags' });
  }
});

// 4. Keyword Research
app.post('/api/generate-keywords', async (req, res) => {
  try {
    const { script, platform, language, category } = req.body;
    const genAi = checkAi();

    const prompt = `Extract and suggest search keywords and intent phrases for this video.
Platform: ${platform}
Category: ${category}
Language: ${language}

Requirements:
1. Extract primary core keywords.
2. Extract secondary/long-tail keywords.
3. Suggest 8-12 related search phrases users type in search bars.
4. Explain the user search intent.
5. Emphasize clearly that these are AI-extracted intent recommendations, not fabricated search volume statistics.

Script:
"""
${script.substring(0, 3000)}
"""`;

    const response = await genAi.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            primaryKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            secondaryKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            searchPhrases: { type: Type.ARRAY, items: { type: Type.STRING } },
            searchIntent: { type: Type.STRING },
            disclaimer: { type: Type.STRING },
          },
          required: ['primaryKeywords', 'secondaryKeywords', 'searchPhrases', 'searchIntent', 'disclaimer'],
        },
      },
    });

    res.json(JSON.parse(response.text || '{}'));
  } catch (error: any) {
    console.error('Error generating keywords:', error);
    res.status(500).json({ error: error.message || 'Failed to generate keywords' });
  }
});

// 5. Hook Generator
app.post('/api/generate-hook', async (req, res) => {
  try {
    const { script, platform, language, format } = req.body;
    const genAi = checkAi();

    const prompt = `Generate 10 magnetic opening hooks for ${platform.toUpperCase()} (${format}).
Language: ${language}
Platform Hook Timings:
- YouTube: 0 to 5 seconds hook.
- Facebook Reels / Video: 0 to 3 seconds hook to stop feed scrolling.
- TikTok: 0 to 2 seconds high-retention hook.

Styles to provide:
1. Curiosity Gap
2. Problem-Agitation-Solution
3. Shocking Fact / Statistic
4. Direct Question
5. Contrarian / Myth-Buster
6. Story Opener
7. Fast Promise
8. Relatable Scenario
9. Secret / Insider Tip
10. High-Stakes Challenge

Script:
"""
${script.substring(0, 3000)}
"""`;

    const response = await genAi.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hooks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  hook: { type: Type.STRING },
                  style: { type: Type.STRING },
                  targetDuration: { type: Type.STRING },
                },
                required: ['id', 'hook', 'style', 'targetDuration'],
              },
            },
          },
          required: ['hooks'],
        },
      },
    });

    res.json(JSON.parse(response.text || '{}'));
  } catch (error: any) {
    console.error('Error generating hooks:', error);
    res.status(500).json({ error: error.message || 'Failed to generate hooks' });
  }
});

// 6. Script & Retention Analyzer
app.post('/api/analyze-script', async (req, res) => {
  try {
    const { script, platform, language, category, audience, format } = req.body;
    const genAi = checkAi();

    const prompt = `Perform an in-depth script audit and audience retention analysis for ${platform.toUpperCase()}.
Format: ${format}
Language: ${language}
Category: ${category}
Target Audience: ${audience}

Analyze:
1. Main topic & audience resonance.
2. Opening hook evaluation (Grade: A+, A, B, C, or Needs Improvement) with feedback.
3. Weak sections in the script where viewers are likely to drop off, and concrete actionable fixes.
4. Viewer retention improvement tips (pacing, pattern interrupts, visuals).
5. Unclear statements or unsupported claims that need verification.
6. Recommended keywords to weave into spoken narration.
7. Estimated overall SEO score (0-100) with category breakdown (relevance, keyword density, hook impact, clarity, audience match).
8. Clear statement that this score is an AI estimate, not official platform ranking data.

Script:
"""
${script.substring(0, 5000)}
"""`;

    const response = await genAi.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topic: { type: Type.STRING },
            targetAudience: { type: Type.STRING },
            hookGrade: { type: Type.STRING },
            hookFeedback: { type: Type.STRING },
            weakSections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  section: { type: Type.STRING },
                  issue: { type: Type.STRING },
                  suggestedFix: { type: Type.STRING },
                },
                required: ['section', 'issue', 'suggestedFix'],
              },
            },
            retentionTips: { type: Type.ARRAY, items: { type: Type.STRING } },
            unclearOrUnsupportedClaims: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendedKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            overallSeoScore: { type: Type.INTEGER },
            scoreBreakdown: {
              type: Type.OBJECT,
              properties: {
                relevance: { type: Type.INTEGER },
                keywordDensity: { type: Type.INTEGER },
                hookImpact: { type: Type.INTEGER },
                clarityAndReadability: { type: Type.INTEGER },
                audienceMatch: { type: Type.INTEGER },
              },
              required: ['relevance', 'keywordDensity', 'hookImpact', 'clarityAndReadability', 'audienceMatch'],
            },
            scoreNotice: { type: Type.STRING },
          },
          required: [
            'topic',
            'targetAudience',
            'hookGrade',
            'hookFeedback',
            'weakSections',
            'retentionTips',
            'unclearOrUnsupportedClaims',
            'recommendedKeywords',
            'overallSeoScore',
            'scoreBreakdown',
            'scoreNotice',
          ],
        },
      },
    });

    res.json(JSON.parse(response.text || '{}'));
  } catch (error: any) {
    console.error('Error analyzing script:', error);
    res.status(500).json({ error: error.message || 'Failed to analyze script' });
  }
});

// 7. Thumbnail & Cover Art Generator
app.post('/api/generate-thumbnail', async (req, res) => {
  try {
    const { script, platform, format, visualStyle, language, topic } = req.body;
    const genAi = checkAi();

    const aspectRatio = platform === 'youtube' && format !== 'youtube_shorts' ? '16:9' : platform === 'tiktok' || format === 'youtube_shorts' || format === 'fb_reels' ? '9:16' : '1:1';

    // First generate the prompt concept and short text overlay
    const conceptPrompt = `You are an elite YouTube and social media thumbnail designer.
Create a high-impact, click-worthy visual concept for:
Platform: ${platform}
Format: ${format}
Selected Style: ${visualStyle || 'High-Contrast Click-worthy'}
Language: ${language}
Topic: ${topic || 'Derived from script'}

Requirements:
1. Provide a detailed English image generation prompt specifying composition, lighting, facial expressions, background contrast, and 8k studio realism. No fake or misleading visual claims.
2. Provide a short, punchy 2-4 word text overlay in ${language} (e.g. "১ মিনিটে শিখুন!" or "BIG MISTAKE!") designed to be readable on mobile phone screens.
3. Suggest 3 key visual elements.
4. Suggest recommended banner/accent color and text color for optimal contrast.

Script snippet:
"""
${script.substring(0, 2000)}
"""`;

    const conceptResponse = await genAi.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: conceptPrompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            prompt: { type: Type.STRING },
            style: { type: Type.STRING },
            shortText: { type: Type.STRING },
            visualElements: { type: Type.ARRAY, items: { type: Type.STRING } },
            bannerColor: { type: Type.STRING },
            textColor: { type: Type.STRING },
          },
          required: ['prompt', 'style', 'shortText', 'visualElements', 'bannerColor', 'textColor'],
        },
      },
    });

    const concept = JSON.parse(conceptResponse.text || '{}');
    let imageUrl: string | undefined = undefined;

    // Try generating actual image using gemini-3.1-flash-lite-image
    try {
      const imgRes = await genAi.models.generateContent({
        model: 'gemini-3.1-flash-lite-image',
        contents: {
          parts: [{ text: concept.prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio === '16:9' ? '16:9' : aspectRatio === '9:16' ? '9:16' : '1:1',
          },
        },
      });

      if (imgRes.candidates && imgRes.candidates[0]?.content?.parts) {
        for (const part of imgRes.candidates[0].content.parts) {
          if (part.inlineData && part.inlineData.data) {
            imageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
            break;
          }
        }
      }
    } catch (imgErr) {
      console.warn('Image model generation notice (fallback to concept canvas studio):', imgErr);
    }

    res.json({
      prompt: concept.prompt,
      style: concept.style || visualStyle || 'High-Contrast',
      shortText: concept.shortText,
      aspectRatio,
      imageUrl,
      visualElements: concept.visualElements || [],
      bannerColor: concept.bannerColor || '#EF4444',
      textColor: concept.textColor || '#FFFFFF',
    });
  } catch (error: any) {
    console.error('Error generating thumbnail:', error);
    res.status(500).json({ error: error.message || 'Failed to generate thumbnail concept' });
  }
});

// 8. Video Length Advisor (especially for TikTok & Shorts)
app.post('/api/calculate-video-length', async (req, res) => {
  try {
    const { script, platform, format } = req.body;
    const words = script ? script.trim().split(/\s+/).filter(Boolean).length : 0;
    // Average speaking rate: 130-150 words per minute for regular video, 160 wpm for fast shorts
    const isShort = format === 'tiktok_short' || format === 'youtube_shorts' || format === 'fb_reels';
    const wpm = isShort ? 155 : 135;
    const estimatedSec = Math.max(10, Math.round((words / wpm) * 60));

    let recommended = '30 - 60 seconds';
    let pacingNote = 'Steady conversational pace. Insert 1-2 visual B-roll cuts every 4 seconds.';

    if (platform === 'tiktok') {
      if (estimatedSec <= 35) {
        recommended = '21 - 34 seconds (Highest TikTok completion rate sweet spot)';
      } else if (estimatedSec <= 60) {
        recommended = '45 - 58 seconds (Good for educational storytelling)';
      } else {
        recommended = '60 - 90 seconds (Ensure dynamic text captions throughout to prevent swipe-away)';
      }
      pacingNote = 'TikTok algorithm prioritizes video completion rate. Cut introductory pauses completely.';
    } else if (platform === 'youtube') {
      if (isShort) {
        recommended = '40 - 55 seconds (Loops well if end matches beginning)';
      } else {
        recommended = `${Math.ceil(estimatedSec / 60)} - ${Math.ceil(estimatedSec / 60) + 3} minutes (Good for watch time & mid-roll ads)`;
      }
    } else {
      // Facebook
      if (isShort) {
        recommended = '25 - 45 seconds';
      } else {
        recommended = '3+ minutes (Facebook monetization benchmark)';
      }
    }

    res.json({
      wordCount: words,
      estimatedSpeakingDurationSec: estimatedSec,
      recommendedDuration: recommended,
      pacingNote,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to calculate video length' });
  }
});

// 9. Actual Video File Analysis
app.post('/api/analyze-video', async (req, res) => {
  try {
    const { fileName, fileSizeMb, videoData, scriptContext, platform } = req.body;
    const genAi = checkAi();

    // If base64 video is provided, send inlineData to Gemini 3.8 Flash for true multimodal analysis!
    let promptText = `Analyze this video file uploaded by a creator for ${platform.toUpperCase()}.
File Name: ${fileName || 'uploaded_video.mp4'}
File Size: ${fileSizeMb ? fileSizeMb + ' MB' : 'Under 50MB'}
Script context (if provided): ${scriptContext || 'Not provided'}

Detailed analysis instructions:
1. Examine the opening 3-5 seconds: Does the visual scene and movement immediately hook the viewer?
2. Assess visual pacing, lighting quality, subject framing, and audio/speech clarity.
3. Highlight retention risks (e.g. static camera angle too long, silence, cluttered background).
4. Concrete recommendations to increase viewer retention.
5. Provide a transparent distinction notice separating observed media facts from AI recommendations.`;

    const contents: any[] = [];
    if (videoData && typeof videoData === 'string' && videoData.startsWith('data:')) {
      const [mimePrefix, base64Str] = videoData.split(';base64,');
      const mimeType = mimePrefix.replace('data:', '') || 'video/mp4';
      contents.push({
        parts: [
          {
            inlineData: {
              mimeType,
              data: base64Str,
            },
          },
          { text: promptText },
        ],
      });
    } else {
      contents.push({ text: promptText });
    }

    const response = await genAi.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents.length === 1 && contents[0].parts ? contents[0] : promptText,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fileName: { type: Type.STRING },
            fileSizeMb: { type: Type.NUMBER },
            visualScenesSummary: { type: Type.STRING },
            audioPacingObservations: { type: Type.STRING },
            hookRetentionEvaluation: { type: Type.STRING },
            retentionRisks: { type: Type.ARRAY, items: { type: Type.STRING } },
            aiRecommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
            distinctionNotice: { type: Type.STRING },
          },
          required: [
            'fileName',
            'fileSizeMb',
            'visualScenesSummary',
            'audioPacingObservations',
            'hookRetentionEvaluation',
            'retentionRisks',
            'aiRecommendations',
            'distinctionNotice',
          ],
        },
      },
    });

    res.json(JSON.parse(response.text || '{}'));
  } catch (error: any) {
    console.error('Error analyzing video file:', error);
    res.status(500).json({ error: error.message || 'Failed to analyze video file' });
  }
});

// Vite middleware in dev or static files in production
if (process.env.NODE_ENV !== 'production') {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
