import Link from 'next/link';
import { getDictionary, Locale } from '@/i18n/dictionaries';

export default function Header({ lang, slug }: { lang: string; slug?: string }) {
  const otherLang = lang === 'ko' ? 'en' : 'ko';
  const switchHref = slug ? `/${otherLang}/breeds/${slug}` : `/${otherLang}`;
  const dict = getDictionary(lang);

  return (
    <header style={{
      padding: '2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      background: 'rgba(10, 10, 10, 0.8)',
      backdropFilter: 'blur(10px)',
      zIndex: 100
    }}>
      <Link href={`/${lang}`} style={{ fontSize: '1.2rem', fontWeight: 100, letterSpacing: '0.6em', textTransform: 'uppercase', color: '#fff' }}>
        n y a n
      </Link>
      
      <nav style={{ display: 'flex', gap: '2rem', textTransform: 'uppercase', fontSize: '0.9rem' }}>
        <Link href={`/${lang}/breeds`}>{dict.common.encyclopedia}</Link>
        <Link href={switchHref} style={{ color: 'var(--accent)' }}>
          {dict.common.languageSwitch}
        </Link>
      </nav>
    </header>
  );
}
