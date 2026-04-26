const a = {
  ar: {
    invalidYoutubeUrl: "يرجى إدخال رابط فيديو يوتيوب صحيح",
    enterUsername: "يرجى إدخال اسم المستخدم",
    contactNow: "تواصل الآن"
  },
  en: {
    invalidYoutubeUrl: "Please enter a valid YouTube video URL",
    enterUsername: "Please enter a username",
    contactNow: "Contact Now"
  }
};
function o(n) {
  var e;
  const t = (e = document.documentElement.lang) != null && e.toLowerCase().startsWith("en") ? "en" : "ar";
  return a[t][n];
}
export {
  o as t
};
