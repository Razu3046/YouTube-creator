import React, { useRef, useEffect, useState } from 'react';
import { Download, Type as TypeIcon, Palette, MoveVertical, RefreshCw, Sparkles } from 'lucide-react';
import { ThumbnailData } from '../types';

interface CanvasThumbnailEditorProps {
  data: ThumbnailData;
  onUpdateText?: (newText: string) => void;
  lang: 'bn' | 'en';
}

export const CanvasThumbnailEditor: React.FC<CanvasThumbnailEditorProps> = ({
  data,
  onUpdateText,
  lang,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [overlayText, setOverlayText] = useState(data.shortText || 'ভিডিওর মূল আকর্ষণ!');
  const [fontSize, setFontSize] = useState<number>(data.aspectRatio === '9:16' ? 44 : 54);
  const [position, setPosition] = useState<'top' | 'center' | 'bottom'>('bottom');
  const [bannerColor, setBannerColor] = useState(data.bannerColor || '#EF4444');
  const [textColor, setTextColor] = useState(data.textColor || '#FFFFFF');
  const [hasBanner, setHasBanner] = useState(true);

  // Sync when data changes
  useEffect(() => {
    if (data.shortText) {
      setOverlayText(data.shortText);
    }
  }, [data.shortText]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 1280;
    let height = 720;
    if (data.aspectRatio === '9:16') {
      width = 720;
      height = 1280;
    } else if (data.aspectRatio === '1:1') {
      width = 1080;
      height = 1080;
    }

    canvas.width = width;
    canvas.height = height;

    // Draw background
    if (data.imageUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        drawOverlay(ctx, width, height);
      };
      img.src = data.imageUrl;
    } else {
      // Sophisticated cinematic dark studio gradient background
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#090d16');
      grad.addColorStop(0.5, '#1e1b4b');
      grad.addColorStop(1, '#0f172a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Add atmospheric glow
      const radial = ctx.createRadialGradient(width * 0.7, height * 0.3, 50, width * 0.7, height * 0.3, width * 0.6);
      radial.addColorStop(0, 'rgba(239, 68, 68, 0.25)');
      radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);

      // Grid/tech overlay lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 80) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      drawOverlay(ctx, width, height);
    }
  };

  const drawOverlay = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (!overlayText.trim()) return;

    ctx.save();
    ctx.font = `bold ${fontSize}px 'Hind Siliguri', 'Plus Jakarta Sans', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const textMetrics = ctx.measureText(overlayText);
    const textWidth = textMetrics.width;
    const paddingX = 40;
    const paddingY = 24;
    const bannerW = Math.min(width * 0.92, textWidth + paddingX * 2);
    const bannerH = fontSize + paddingY * 2;

    let y = height * 0.82;
    if (position === 'top') y = height * 0.2;
    if (position === 'center') y = height * 0.5;

    // Draw backdrop ribbon/banner if enabled
    if (hasBanner) {
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
      ctx.shadowBlur = 24;
      ctx.shadowOffsetY = 8;

      ctx.fillStyle = bannerColor;
      const rx = (width - bannerW) / 2;
      const ry = y - bannerH / 2;
      const radius = 12;

      ctx.beginPath();
      ctx.roundRect(rx, ry, bannerW, bannerH, radius);
      ctx.fill();

      // Border stroke on banner
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    }

    // Text drop shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = hasBanner ? 4 : 16;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 3;

    ctx.fillStyle = textColor;
    ctx.fillText(overlayText, width / 2, y);

    ctx.restore();
  };

  useEffect(() => {
    drawCanvas();
  }, [overlayText, fontSize, position, bannerColor, textColor, hasBanner, data.imageUrl, data.aspectRatio]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `video_thumbnail_${data.aspectRatio.replace(':', 'x')}_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const textPresets = [
    { label: 'লাল স্ট্রিপ', bg: '#DC2626', text: '#FFFFFF' },
    { label: 'হলুদ ফোকাস', bg: '#EAB308', text: '#090D16' },
    { label: 'সাইবার গ্লো', bg: '#06B6D4', text: '#090D16' },
    { label: 'কালো ক্লাসিক', bg: '#0F172A', text: '#38BDF8' },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Canvas Preview */}
      <div className="relative w-full overflow-hidden rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center p-2">
        <canvas
          ref={canvasRef}
          className={`max-w-full h-auto rounded-lg shadow-xl object-contain ${
            data.aspectRatio === '9:16' ? 'max-h-[460px]' : 'max-h-[360px]'
          }`}
        />
      </div>

      {/* Control Strip */}
      <div className="flex flex-col gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <TypeIcon className="w-4 h-4 text-rose-400" />
            <span>{lang === 'bn' ? 'থাম্বনেইল টেক্সট ওভারলে' : 'Thumbnail Text Overlay'}</span>
          </div>
          <button
            onClick={() => setHasBanner(!hasBanner)}
            className={`text-xs px-2.5 py-1 rounded transition-colors font-medium ${
              hasBanner ? 'bg-slate-800 text-white border border-slate-700' : 'bg-slate-900 text-slate-400'
            }`}
          >
            {lang === 'bn' ? (hasBanner ? 'ব্যানার অন' : 'ব্যানার অফ') : hasBanner ? 'Banner On' : 'Banner Off'}
          </button>
        </div>

        {/* Text Input */}
        <input
          type="text"
          value={overlayText}
          onChange={(e) => {
            setOverlayText(e.target.value);
            onUpdateText?.(e.target.value);
          }}
          placeholder={lang === 'bn' ? 'থাম্বনেইল টেক্সট লিখুন...' : 'Enter thumbnail overlay text...'}
          className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
        />

        {/* Options Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Position Selector */}
          <div className="flex flex-col gap-1">
            <span className="text-slate-400">{lang === 'bn' ? 'অবস্থান' : 'Position'}</span>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              {(['top', 'center', 'bottom'] as const).map((pos) => (
                <button
                  key={pos}
                  onClick={() => setPosition(pos)}
                  className={`flex-1 py-1 rounded font-medium capitalize text-center transition-colors ${
                    position === pos ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {pos === 'top' ? (lang === 'bn' ? 'উপরে' : 'Top') : pos === 'center' ? (lang === 'bn' ? 'মাঝে' : 'Center') : (lang === 'bn' ? 'নিচে' : 'Bottom')}
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-slate-400">
              <span>{lang === 'bn' ? 'ফন্ট সাইজ' : 'Font Size'}</span>
              <span className="font-mono text-slate-300">{fontSize}px</span>
            </div>
            <input
              type="range"
              min="28"
              max="92"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full accent-rose-500 mt-2"
            />
          </div>

          {/* Color Presets */}
          <div className="flex flex-col gap-1">
            <span className="text-slate-400">{lang === 'bn' ? 'রঙিন প্রিসেট' : 'Color Presets'}</span>
            <div className="flex items-center gap-2 mt-1">
              {textPresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setBannerColor(preset.bg);
                    setTextColor(preset.text);
                  }}
                  title={preset.label}
                  className="w-6 h-6 rounded-full border border-slate-600 transition-transform hover:scale-110"
                  style={{ backgroundColor: preset.bg }}
                />
              ))}
              <input
                type="color"
                value={bannerColor}
                onChange={(e) => setBannerColor(e.target.value)}
                title="Custom Banner Color"
                className="w-6 h-6 rounded border-0 bg-transparent cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800">
          <div className="text-xs text-slate-400 truncate">
            {lang === 'bn' ? `অনুপাত: ${data.aspectRatio}` : `Ratio: ${data.aspectRatio}`}
          </div>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors shadow-md shadow-rose-950/40"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'থাম্বনেইল ডাউনলোড (PNG)' : 'Download Thumbnail (PNG)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
