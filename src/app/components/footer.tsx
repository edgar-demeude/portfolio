'use client';

import Link from 'next/link';
import { useLanguage } from './languageContext';
import { translations } from '../../../translations';

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer
      className="w-full text-center text-sm py-6"
    >
      <p className="px-4">
        © {new Date().getFullYear()} Edgar Demeude — {translations[language].all_rights_reserved}.
        <Link href="/legal-notice" className="underline hover:opacity-70 ml-1">
          {translations[language].legal_notice}
        </Link>
      </p>
    </footer>
  );
}
