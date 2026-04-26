const messages = {
  ar: {
    invalidYoutubeUrl: 'يرجى إدخال رابط فيديو يوتيوب صحيح',
    enterUsername: 'يرجى إدخال اسم المستخدم',
    contactNow: 'تواصل الآن',
  },

  en: {
    invalidYoutubeUrl: 'Please enter a valid YouTube video URL',
    enterUsername: 'Please enter a username',
    contactNow: 'Contact Now',
  },
};

export type TranslationKey = keyof typeof messages.ar;

export function t(key: TranslationKey): string {
  const lang = document.documentElement.lang?.toLowerCase().startsWith('en') ? 'en' : 'ar';

  return messages[lang][key];
}
