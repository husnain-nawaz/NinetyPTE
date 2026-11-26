import { useState } from 'react';
import { X } from 'lucide-react';
import CyanBarsLoader from '../shared/CyanBarsLoader';

const TRANSLATION_LANGUAGES = [
  'Arabic',
  'Bangla',
  'Dutch',
  'Filipino',
  'French',
  'German',
  'Gujarati',
  'Hindi',
  'Indonesian',
  'Italian',
  'Japanese',
  'Korean',
  'Malay',
  'Malayalam',
  'Mandarin',
  'Marathi',
  'Nepali',
  'Persian',
  'Portuguese',
  'Punjabi',
  'Sinhalese',
  'Spanish',
  'Tamil',
  'Telugu',
  'Thai',
  'Turkish',
  'Urdu',
  'Vietnamese',
];

const SAMPLE_RETURNING_BOOK_TRANSLATIONS = {
  Urdu: [
    {
      en: 'When returning a borrowed book, if there are missing pages, experts say transparency is key.',
      tr: 'جب ایک ادھار لی گئی کتاب واپس کرتے ہیں، اگر وہاں صفحات غائب ہیں، ماہرین کا کہنا ہے کہ شفافیت اہم ہے۔',
    },
    {
      en: 'Librarians and etiquette coaches note a recent rise in damaged book disputes, often caused by silent returns or unreported defects.',
      tr: 'لائبریرین اور آداب کے کوچوں نے حال ہی میں خراب کتابوں کے تنازعات میں اضافے کا نوٹس لیا ہے، جو اکثر خاموش واپسیوں یا غیر رپورٹ شدہ نقائص کی وجہ سے ہوتا ہے۔',
    },
    {
      en: '"If something goes wrong, acknowledge it", says one Toronto librarian.',
      tr: '"اگر کچھ غلط ہو جائے تو اس کا اعتراف کریں،" ٹورنٹو کی ایک لائبریرین کہتی ہے۔',
    },
    {
      en: '"A simple apology and an offer to make it right prevent a small mistake from becoming a big misunderstanding".',
      tr: 'ایک سادہ معذرت اور اسے درست کرنے کی پیشکش چھوٹی غلطی کو بڑی غلط فہمی بننے سے روکتی ہے۔',
    },
  ],
  Hindi: [
    {
      en: 'When returning a borrowed book, if there are missing pages, experts say transparency is key.',
      tr: 'उधार ली गई पुस्तक लौटाते समय, यदि पन्ने गायब हों, तो विशेषज्ञ कहते हैं कि पारदर्शिता सबसे महत्वपूर्ण है।',
    },
    {
      en: 'Librarians and etiquette coaches note a recent rise in damaged book disputes, often caused by silent returns or unreported defects.',
      tr: 'लाइब्रेरियन और शिष्टाचार प्रशिक्षकों ने क्षतिग्रस्त पुस्तकों के विवादों में हालिया वृद्धि देखी है।',
    },
    {
      en: '"If something goes wrong, acknowledge it", says one Toronto librarian.',
      tr: '"यदि कुछ गलत हो जाए, तो उसे स्वीकार करें," टोरंटो की एक लाइब्रेरियन कहती हैं।',
    },
    {
      en: '"A simple apology and an offer to make it right prevent a small mistake from becoming a big misunderstanding".',
      tr: 'एक साधारण माफ़ी और सुधार करने की पेशकश छोटी गलती को बड़ी गलतफहमी बनने से रोकती है।',
    },
  ],
  Arabic: [
    {
      en: 'When returning a borrowed book, if there are missing pages, experts say transparency is key.',
      tr: 'عند إعادة كتاب مستعار، إذا كانت هناك صفحات مفقودة، يقول الخبراء إن الشفافية هي الأساس.',
    },
    {
      en: 'Librarians and etiquette coaches note a recent rise in damaged book disputes, often caused by silent returns or unreported defects.',
      tr: 'يلاحظ أمناء المكتبات ومدربو الآداب ارتفاعاً حديثاً في نزاعات الكتب التالفة بسبب عدم الإبلاغ عن الأعطال.',
    },
  ],
  Spanish: [
    {
      en: 'When returning a borrowed book, if there are missing pages, experts say transparency is key.',
      tr: 'Al devolver un libro prestado, si faltan páginas, los expertos dicen que la transparencia es clave.',
    },
    {
      en: 'Librarians and etiquette coaches note a recent rise in damaged book disputes, often caused by silent returns or unreported defects.',
      tr: 'Bibliotecarios y asesores señalan un aumento reciente en disputas por libros dañados tras devoluciones sin aviso.',
    },
  ],
};

function splitIntoSentences(text) {
  return String(text || '')
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Interactive bilingual translation modal with 28-language selector and animated transition state.
 */
export default function TranslateModal({ questionId, promptText, onClose }) {
  const [selectedLanguage, setSelectedLanguage] = useState('Urdu');
  const [pendingLanguage, setPendingLanguage] = useState('Urdu');
  const [pickingLanguage, setPickingLanguage] = useState(false);
  const [loadingTranslation, setLoadingTranslation] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const sentences = splitIntoSentences(promptText);
  const presetPairs = SAMPLE_RETURNING_BOOK_TRANSLATIONS[selectedLanguage];
  const pairs =
    presetPairs && promptText?.includes('borrowed book')
      ? presetPairs
      : sentences.map((en) => ({
          en,
          tr: `[${selectedLanguage}] ${en}`,
        }));

  const handleConfirmLanguage = () => {
    setPickingLanguage(false);
    setSelectedLanguage(pendingLanguage);
    setLoadingTranslation(true);
    setTimeout(() => setLoadingTranslation(false), 320);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Teal Modal Top Bar */}
        <div className="bg-[#38c6bd] px-5 py-3 text-white flex items-center justify-between gap-3">
          <span className="w-16" />
          <span className="text-sm sm:text-base font-extrabold">#{questionId}</span>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setFeedbackSent(true)}
              className="rounded border border-white/80 px-2.5 py-0.5 text-[11px] font-semibold hover:bg-white/15 transition cursor-pointer"
            >
              {feedbackSent ? 'Feedback Sent' : 'Feedback'}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close translate modal"
              className="w-6 h-6 rounded-full bg-white text-[#38c6bd] hover:bg-slate-100 flex items-center justify-center cursor-pointer"
            >
              <X className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {pickingLanguage ? (
          <div className="p-5 sm:p-6 space-y-4">
            <div className="max-h-[340px] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-1 pr-1">
              {TRANSLATION_LANGUAGES.map((lang) => {
                const active = pendingLanguage === lang;
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setPendingLanguage(lang)}
                    className={`px-3.5 py-2 text-left text-xs rounded-md transition cursor-pointer ${
                      active
                        ? 'bg-[#ebfbfa] text-[#28b5ac] font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                type="button"
                onClick={handleConfirmLanguage}
                className="rounded-full bg-[#4bd5cc] hover:bg-[#38c6bd] px-6 py-1.5 text-xs font-bold text-white cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {loadingTranslation ? (
              <div className="py-12 flex items-center justify-center">
                <CyanBarsLoader label="Translating question" />
              </div>
            ) : (
              <div className="max-h-[340px] overflow-y-auto pr-2 space-y-4 text-xs sm:text-[13px]">
                {pairs.map((pair, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <p className="text-slate-800 leading-relaxed">{pair.en}</p>
                    <p
                      dir={
                        selectedLanguage === 'Urdu' ||
                        selectedLanguage === 'Arabic' ||
                        selectedLanguage === 'Persian'
                          ? 'rtl'
                          : 'ltr'
                      }
                      className="text-slate-600 leading-relaxed"
                    >
                      {pair.tr}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  setPendingLanguage(selectedLanguage);
                  setPickingLanguage(true);
                }}
                className="rounded-full border border-[#72e0d9] text-[#2cc3b9] hover:bg-[#f0fcfb] px-5 py-1.5 text-xs font-semibold transition cursor-pointer"
              >
                Choose Language
              </button>

              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-[#4bd5cc] hover:bg-[#38c6bd] px-6 py-1.5 text-xs font-bold text-white transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
