'use client';

import Header from "@/components/Header";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";
import { getDictionary } from "@/i18n/dictionaries";

export default function HomePage({ params }: { params: any }) {
  const [lang, setLang] = React.useState('ko');

  React.useEffect(() => {
    params.then((p: any) => setLang(p.lang));
  }, [params]);

  const l = lang as 'en' | 'ko';
  const dict = getDictionary(l);
  
  // Cinematic Maine Coon Placeholder from Unsplash
  const heroImage = "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop";

  return (
    <div style={{ background: '#000', color: '#fff', position: 'relative' }}>
      
      {/* Cinematic Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, overflow: 'hidden' }}>
        <motion.img
          src={heroImage}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 3, ease: "easeOut" }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(30%) contrast(120%)' }}
        />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,1) 100%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        <Header lang={lang} />
        
        <main>
          {/* Hero Section */}
          <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 5vw' }}>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            >
              <h2 className="text-accent font-serif" style={{ letterSpacing: '0.5em', fontSize: '0.9rem', marginBottom: '2rem' }}>
                {dict.home.subtitle}
              </h2>
              <h1 className="blend-exclusion" style={{ 
                fontSize: '10vw', 
                fontWeight: 100, 
                letterSpacing: '0.8em', 
                textTransform: 'uppercase', 
                lineHeight: '1',
                marginLeft: '0.4em' // Offset for the first letter's spacing
              }}>
                nyan
              </h1>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.5 }}
              style={{ marginTop: '4rem', maxWidth: '600px' }}
            >
              <p className="font-serif" style={{ fontSize: '1rem', color: '#888', lineHeight: '2', letterSpacing: '0.1em' }}>
                {dict.home.description}
              </p>
              <Link href={`/${lang}/breeds`} className="btn" style={{ marginTop: '3rem', display: 'inline-block', border: '1px solid rgba(255,255,255,0.2)', padding: '1rem 2.5rem', borderRadius: '0', fontSize: '0.8rem', letterSpacing: '0.3em' }}>
                {dict.home.enterCollection}
              </Link>
            </motion.div>
          </section>

          {/* Feature Section 1 */}
          <section style={{ padding: '20vh 5vw', background: '#000', position: 'relative', zIndex: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5vw', alignItems: 'center' }}>
              <motion.div
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
                transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                style={{ background: '#111', aspectRatio: '4/5', width: '100%', overflow: 'hidden' }}
              >
                <img src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1000&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} alt="Cat Eye" />
              </motion.div>
              
              <div>
                <motion.h3 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  className="blend-exclusion"
                  style={{ fontSize: '3rem', fontWeight: 200, letterSpacing: '0.3em', textTransform: 'uppercase' }}
                >
                  {dict.home.feature1Title}
                </motion.h3>
                <p className="font-serif" style={{ marginTop: '3rem', color: '#555', fontSize: '1.1rem', lineHeight: '2', letterSpacing: '0.05em' }}>
                  {dict.home.feature1Desc}
                </p>
              </div>
            </div>
          </section>

          {/* Footer Text */}
          <section style={{ height: '50vh', background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', borderTop: '1px solid #111' }}>
            <h2 className="blend-exclusion" style={{ fontSize: '5vw', fontWeight: 100, letterSpacing: '1.2em', textTransform: 'uppercase', opacity: 0.5 }}>
              n y a n
            </h2>
          </section>
        </main>
      </div>
    </div>
  );
}
