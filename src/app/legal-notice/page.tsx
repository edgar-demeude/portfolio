'use client';

import { useLanguage } from '../components/languageContext';
import { translations } from '../../../translations';

export default function LegalNotice() {
  const { language } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-lg leading-relaxed">
      <h1 className="text-3xl font-semibold mb-6">
        {translations[language].legal_notice}
      </h1>
      
      <p>
        {translations[language].legal_notice_text_1}
        <strong>Edgar Demeude</strong>. {translations[language].legal_notice_text_2}
      </p>

      <p className="mt-4">
        {translations[language].legal_notice_contact}{' '}
        <a href="mailto:edgardemeude@proton.me" className="underline hover:opacity-70">
          edgardemeude@proton.me
        </a>
      </p>
    </div>
  );
}
