import { UiLanguage } from '../types';

export const translations = {
  bn: {
    appName: 'AI VIDEO SEO MASTER',
    tagline: 'আপনার অল-ইন-ওয়ান এআই ভিডিও অপ্টিমাইজেশন টুল',
    homeTitle: 'যে প্ল্যাটফর্মের জন্য ভিডিও অপ্টিমাইজ করতে চান তা নির্বাচন করুন',
    homeSubtitle: 'ইউটিউব, ফেসবুক এবং টিকটকের জন্য আলাদা এবং ডেডিকেটেড এআই অ্যালগরিদম ভিত্তিক এসইও টুলস',
    navHome: 'হোম',
    navSaved: 'সংরক্ষিত প্রজেক্ট',
    navLogin: 'লগইন',
    navLogout: 'লগআউট',
    navGuest: 'গেস্ট মোড',
    
    // Platform Cards on Home
    ytTitle: 'YouTube',
    ytSubtitle: 'YouTube SEO & Video Tools',
    ytDesc: 'ইউটিউব লং-ভিডিও ও শর্টসের জন্য ক্লিক-যোগ্য টাইটেল, এসইও ডেসক্রিপশন, ট্যাগ ও থাম্বনেইল প্রম্পট।',
    fbTitle: 'Facebook',
    fbSubtitle: 'Facebook Reels & Video Tools',
    fbDesc: 'ফেসবুক রিলস ও পেইজ ভিডিওর জন্য এঙ্গেজিং ক্যাপশন, ভাইরাল হুক ও কভার ইমেজ জেনারেটর।',
    ttTitle: 'TikTok',
    ttSubtitle: 'TikTok SEO & Video Tools',
    ttDesc: 'টিকটক সার্চ অপ্টিমাইজেশন, ট্রেন্ডিং হ্যাশট্যাগ, ৩-সেকেন্ড রিটেনশন হুক ও নিখুঁত ভিডিও লেন্থ অ্যাডভাইজার।',

    openDashboard: 'ড্যাশবোর্ড খুলুন',
    backToHome: 'হোমে ফিরে যান',

    // Common Dashboard Labels
    pasteScriptLabel: 'আপনার ভিডিও স্ক্রিপ্ট এখানে পেস্ট করুন',
    pasteScriptPlaceholder: 'আপনার সম্পূর্ণ ভিডিও স্ক্রিপ্টটি এখানে টাইপ বা পেস্ট করুন (কমপক্ষে ৩০ শব্দ বা ১৫০ অক্ষর)...',
    wordsCount: 'শব্দ',
    charsCount: 'অক্ষর',
    estReadTime: 'আনুমানিক পাঠ্য সময়',
    categoryLabel: 'ভিডিও ক্যাটাগরি',
    languageLabel: 'কন্টেন্টের ভাষা',
    audienceLabel: 'টার্গেট দেশ বা দর্শক',
    formatLabel: 'ভিডিও ফরম্যাট',
    topicLabel: 'ভিডিওর মূল বিষয় (ঐচ্ছিক)',
    topicPlaceholder: 'যেমন: কিভাবে অনলাইনে ফ্রিল্যান্সিং শুরু করবেন',
    customAudiencePlaceholder: 'নির্দিষ্ট টার্গেট দর্শক লিখুন',

    // Formats
    formatYtLong: 'YouTube লং-ভিডিও (16:9)',
    formatYtShorts: 'YouTube শর্টস (9:16)',
    formatFbReels: 'Facebook রিলস (9:16)',
    formatFbStandard: 'Facebook স্ট্যান্ডার্ড ভিডিও (16:9 / 1:1)',
    formatTtShort: 'TikTok শর্ট ভিডিও (15-60s)',
    formatTtLong: 'TikTok লং ভিডিও (1-3m+)',

    // Action Buttons
    generateAll: 'সব একসাথে তৈরি করুন (GENERATE ALL)',
    generatingAll: 'এআই বিশ্লেষণ ও জেনারেশন চলছে...',
    saveProject: 'প্রজেক্ট সংরক্ষণ করুন',
    projectSaved: 'প্রজেক্ট সফলভাবে সংরক্ষিত হয়েছে!',
    copyAll: 'সব লেখা কপি করুন',
    copiedAll: 'সব আউটপুট ক্লিপবোর্ডে কপি হয়েছে!',
    clearScript: 'মুছে ফেলুন',
    sampleScript: 'নমুনা স্ক্রিপ্ট বসান',

    // Individual Generators
    genTitles: 'টাইটেল তৈরি করুন',
    genDescription: 'ডেসক্রিপশন তৈরি করুন',
    genTags: 'ট্যাগ তৈরি করুন',
    genHashtags: 'হ্যাশট্যাগ তৈরি করুন',
    genKeywords: 'কীওয়ার্ড রিসার্চ',
    genHooks: 'ভাইরাল হুক তৈরি করুন',
    genAnalysis: 'স্ক্রিপ্ট অডিট ও রিটেনশন',
    genThumbnail: 'থাম্বনেইল / কভার তৈরি করুন',
    genVideoLength: 'ভিডিও লেন্থ অ্যাডভাইস',

    // Result Cards
    cardTitles: 'এসইও টাইটেল সাজেশন (১০টি)',
    cardDescription: 'অপ্টিমাইজড ভিডিও ডেসক্রিপশন',
    cardTags: 'র‍্যাঙ্কিং ট্যাগ ও কিওয়ার্ড',
    cardHashtags: 'প্রাসঙ্গিক হ্যাশট্যাগ',
    cardKeywords: 'কীওয়ার্ড রিসার্চ ও সার্চ ইনটেন্ট',
    cardHooks: 'দর্শকের মনোযোগ ধরে রাখার হুক (১০টি)',
    cardAnalysis: 'স্ক্রিপ্ট অডিট ও অডিয়েন্স রিটেনশন রিপোর্ট',
    cardThumbnail: 'এআই থাম্বনেইল ও কভার আর্ট স্টুডিও',
    cardVideoLength: 'ভিডিওর আদর্শ দৈর্ঘ্য পরামর্শ',
    cardVideoAnalysis: 'ভিডিও ফাইল অ্যানালাইসিস রিপোর্ট',

    // Tool actions
    copy: 'কপি',
    copied: 'কপি হয়েছে!',
    edit: 'সম্পাদনা',
    done: 'সম্পন্ন',
    regenerate: 'আবার তৈরি করুন',
    downloadImage: 'ইমেজ ডাউনলোড করুন',
    addTextOverlay: 'ব্যানার টেক্সট ও ফন্ট এডিটর',

    // Video Upload
    videoUploadTitle: 'ভিডিও ফাইল আপলোড ও অ্যানালাইসিস (ঐচ্ছিক)',
    videoUploadDesc: 'আপনার ভিডিওর ফ্রেম, দৃশ্য ও পেসিং বিশ্লেষণ করতে .mp4, .webm বা .mov ফাইল নির্বাচন করুন (সর্বোচ্চ 50MB)।',
    dragDropVideo: 'ভিডিও ফাইল টেনে এনে ফেলুন বা ক্লিক করে সিলেক্ট করুন',
    analyzeVideoBtn: 'ভিডিও ফাইল অডিট করুন',
    analyzingVideo: 'ভিডিও বিশ্লেষণ চলছে...',
    videoNotice: 'নোটিশ: এটি প্রকৃত ভিডিও ফ্রেম ও অডিওর পর্যবেক্ষণমূলক বিশ্লেষণ।',

    // Warnings & Notices
    seoScoreNotice: '* এটি এআই ভিত্তিক আনুমানিক এসইও স্কোর (০-১০০)। এটি ইউটিউব, ফেসবুক বা টিকটকের কোনো অফিসিয়াল র‍্যাঙ্কিং গ্যারান্টি নয়।',
    keywordDisclaimer: '* এই কিওয়ার্ডগুলো এআই ভিত্তিক প্রস্তাবনা। এগুলো আনুমানিক সার্চ ইনটেন্ট প্রকাশ করে, মনগড়া সার্চ ভলিউম নয়।',
    scriptMinLengthWarning: 'অনুগ্রহ করে কমপক্ষে ৫০ অক্ষরের একটি ভিডিও স্ক্রিপ্ট প্রদান করুন যাতে এআই নিখুঁত এসইও তৈরি করতে পারে।',

    // Saved projects modal
    savedProjectsTitle: 'সংরক্ষিত প্রজেক্ট ও হিস্ট্রি',
    noSavedProjects: 'এখনও কোনো প্রজেক্ট সংরক্ষণ করা হয়নি। একটি স্ক্রিপ্ট অপ্টিমাইজ করে সংরক্ষণ করুন!',
    filterAll: 'সকল প্ল্যাটফর্ম',
    deleteProjectConfirm: 'আপনি কি নিশ্চিত যে এই সংরক্ষিত প্রজেক্টটি ডিলিট করতে চান?',
    exportJson: 'ব্যাকআপ এক্সপোর্ট (JSON)',
    importJson: 'ইমপোর্ট করুন',
    loadProject: 'লোড করুন',
    delete: 'ডিলিট',

    // Auth
    authTitleLogin: 'ক্রিয়েটর একাউন্টে প্রবেশ করুন',
    authTitleRegister: 'নতুন একাউন্ট খুলুন',
    authSubtitle: 'আপনার সকল অপ্টিমাইজেশন হিস্ট্রি নিরাপদ রাখতে লগইন করুন।',
    emailLabel: 'ইমেইল এড্রেস',
    passwordLabel: 'পাসওয়ার্ড',
    nameLabel: 'আপনার নাম',
    loginBtn: 'লগইন করুন',
    registerBtn: 'রেজিস্ট্রেশন করুন',
    guestBtn: 'গেস্ট হিসেবে চালিয়ে যান (ব্রাউজারে সংরক্ষিত থাকবে)',
    noAccount: 'একাউন্ট নেই? রেজিস্ট্রেশন করুন',
    hasAccount: 'ইতিমধ্যে একাউন্ট আছে? লগইন করুন',
    forgotPassword: 'পাসওয়ার্ড মনে নেই?',
    passwordResetSent: 'পাসওয়ার্ড রিসেট লিঙ্ক আপনার ইমেইলে পাঠানো হয়েছে।'
  },
  en: {
    appName: 'AI VIDEO SEO MASTER',
    tagline: 'Your All-in-One AI Video Optimization Tool',
    homeTitle: 'Select Platform to Optimize Your Video',
    homeSubtitle: 'Dedicated AI algorithms tailored specifically for YouTube, Facebook, and TikTok workflows',
    navHome: 'Home',
    navSaved: 'Saved Projects',
    navLogin: 'Sign In',
    navLogout: 'Sign Out',
    navGuest: 'Guest Mode',

    // Platform Cards on Home
    ytTitle: 'YouTube',
    ytSubtitle: 'YouTube SEO & Video Tools',
    ytDesc: 'High-CTR titles, structured SEO descriptions, 500-char tags, 16:9 thumbnail prompts & script retention audit.',
    fbTitle: 'Facebook',
    fbSubtitle: 'Facebook Reels & Video Tools',
    fbDesc: 'Engaging feed & Reels captions, non-deceptive engagement hooks, targeted hashtags, and 9:16/1:1 cover art.',
    ttTitle: 'TikTok',
    ttSubtitle: 'TikTok SEO & Video Tools',
    ttDesc: 'TikTok search bar keyword ideas, 3-second viral hooks, niche hashtags, optimal video length advisor.',

    openDashboard: 'Open Dashboard',
    backToHome: 'Back to Home',

    // Common Dashboard Labels
    pasteScriptLabel: 'Paste Your Video Script Here',
    pasteScriptPlaceholder: 'Enter or paste your complete video script here (at least 30 words or 150 characters)...',
    wordsCount: 'words',
    charsCount: 'chars',
    estReadTime: 'Est. speaking time',
    categoryLabel: 'Video Category',
    languageLabel: 'Content Language',
    audienceLabel: 'Target Country or Audience',
    formatLabel: 'Video Format',
    topicLabel: 'Video Topic (Optional)',
    topicPlaceholder: 'e.g. How to start freelancing from scratch',
    customAudiencePlaceholder: 'Specify target audience',

    // Formats
    formatYtLong: 'YouTube Long-form Video (16:9)',
    formatYtShorts: 'YouTube Shorts (9:16)',
    formatFbReels: 'Facebook Reels (9:16)',
    formatFbStandard: 'Facebook Standard Video (16:9 / 1:1)',
    formatTtShort: 'TikTok Short Video (15-60s)',
    formatTtLong: 'TikTok Long-form (1-3m+)',

    // Action Buttons
    generateAll: 'GENERATE ALL',
    generatingAll: 'AI is analyzing & generating all assets...',
    saveProject: 'Save Project',
    projectSaved: 'Project successfully saved!',
    copyAll: 'Copy All Text',
    copiedAll: 'All outputs copied to clipboard!',
    clearScript: 'Clear Script',
    sampleScript: 'Insert Sample Script',

    // Individual Generators
    genTitles: 'Generate Titles',
    genDescription: 'Generate Description',
    genTags: 'Generate Tags',
    genHashtags: 'Generate Hashtags',
    genKeywords: 'Keyword Research',
    genHooks: 'Generate Viral Hooks',
    genAnalysis: 'Script Retention Audit',
    genThumbnail: 'Generate Thumbnail / Cover',
    genVideoLength: 'Video Length Advice',

    // Result Cards
    cardTitles: 'SEO Title Suggestions (10)',
    cardDescription: 'Structured Video Description',
    cardTags: 'Optimized Video Tags',
    cardHashtags: 'Targeted Hashtags',
    cardKeywords: 'Keyword Research & Search Intent',
    cardHooks: 'High-Retention Opening Hooks (10)',
    cardAnalysis: 'Script Audit & Audience Retention Report',
    cardThumbnail: 'AI Thumbnail & Cover Art Studio',
    cardVideoLength: 'Recommended Video Duration',
    cardVideoAnalysis: 'Video File Analysis Report',

    // Tool actions
    copy: 'Copy',
    copied: 'Copied!',
    edit: 'Edit',
    done: 'Done',
    regenerate: 'Regenerate',
    downloadImage: 'Download Image',
    addTextOverlay: 'Banner Text & Font Overlay',

    // Video Upload
    videoUploadTitle: 'Video File Upload & Analysis (Optional)',
    videoUploadDesc: 'Select an MP4, WebM, or MOV file (max 50MB) to evaluate visual pacing, lighting, and first 5-second scenes.',
    dragDropVideo: 'Drag & drop video file or click to select',
    analyzeVideoBtn: 'Analyze Uploaded Video',
    analyzingVideo: 'Analyzing video file...',
    videoNotice: 'Notice: Video file analysis is based on actual media observations vs AI interpretations.',

    // Warnings & Notices
    seoScoreNotice: '* This is an AI-estimated SEO score (0-100). It is not an official YouTube, Facebook, or TikTok ranking guarantee.',
    keywordDisclaimer: '* These keywords are AI-extracted search intent recommendations, not fabricated search volume numbers.',
    scriptMinLengthWarning: 'Please enter a video script of at least 50 characters so AI can accurately extract metadata and SEO points.',

    // Saved projects modal
    savedProjectsTitle: 'Saved Projects & History',
    noSavedProjects: 'No saved projects yet. Optimize a script and click Save Project!',
    filterAll: 'All Platforms',
    deleteProjectConfirm: 'Are you sure you want to delete this saved project?',
    exportJson: 'Export Backup (JSON)',
    importJson: 'Import Backup',
    loadProject: 'Load Project',
    delete: 'Delete',

    // Auth
    authTitleLogin: 'Sign In to Creator Studio',
    authTitleRegister: 'Create Creator Account',
    authSubtitle: 'Keep all your platform optimizations and history saved.',
    emailLabel: 'Email Address',
    passwordLabel: 'Password',
    nameLabel: 'Full Name',
    loginBtn: 'Sign In',
    registerBtn: 'Create Account',
    guestBtn: 'Continue in Guest Mode (Saved to Browser)',
    noAccount: "Don't have an account? Sign Up",
    hasAccount: 'Already have an account? Sign In',
    forgotPassword: 'Forgot password?',
    passwordResetSent: 'Password reset link sent to your email.'
  }
};
