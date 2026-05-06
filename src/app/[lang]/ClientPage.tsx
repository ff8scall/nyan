'use client';

import Header from "@/components/Header";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

export default function HomeClientPage({ lang, dict }: { lang: string, dict: any }) {
  const l = lang as 'en' | 'ko';
  
  // Cinematic Maine Coon Placeholder from Unsplash
  const heroImage = "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop";

  const featuredBreeds = [
    { id: 'ragdoll', name_ko: '렉돌', name_en: 'Ragdoll', img: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=800' },
    { id: 'maine-coon', name_ko: '메인쿤', name_en: 'Maine Coon', img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800' },
    { id: 'siamese', name_ko: '샴', name_en: 'Siamese', img: 'https://images.unsplash.com/photo-1513245533418-297f299b6190?q=80&w=800' }
  ];

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
          alt={l === 'ko' ? "메인 화면을 장식하는 메인쿤 고양이의 신비로운 전신 사진" : "Mystical full-body shot of a Maine Coon cat for the hero background"}
        />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,1) 100%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        <Header lang={lang} />
        
        <main>
          {/* 1. Hero Section */}
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
                marginLeft: '0.4em'
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

          {/* 2. Stats Section: Museum Metadata */}
          <section style={{ padding: '10rem 5vw', background: '#050505', display: 'flex', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', borderTop: '1px solid #111' }}>
             {[
               { label: dict.home.statsBreeds, value: "52+" },
               { label: dict.home.statsFAQ, value: "260+" },
               { label: dict.home.statsPhotos, value: "400+" }
             ].map((stat, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.2 }}
                 style={{ flex: 1, minWidth: '200px' }}
               >
                 <div style={{ fontSize: '0.7rem', color: '#666', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1rem' }}>{stat.label}</div>
                 <div style={{ fontSize: '3rem', fontWeight: 100, letterSpacing: '-0.05em' }}>{stat.value}</div>
               </motion.div>
             ))}
          </section>

          {/* 3. Feature Section: Aesthetic Accuracy */}
          <section style={{ padding: '20vh 5vw', background: '#000', position: 'relative' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5vw', alignItems: 'center' }}>
              <motion.div
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
                transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                style={{ background: '#111', aspectRatio: '4/5', width: '100%', overflow: 'hidden' }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1000&auto=format&fit=crop" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} 
                  alt={l === 'ko' ? "고양이의 신비로운 눈동자를 클로즈업한 예술적인 사진" : "Artistic close-up shot of a cat's mystical eye"} 
                />
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

          {/* 4. Mission Section: The Value of Archiving */}
          <section style={{ padding: '15rem 5vw', textAlign: 'center', background: '#050505' }}>
             <motion.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               style={{ maxWidth: '900px', margin: '0 auto' }}
             >
                <h3 style={{ fontSize: '1rem', color: 'var(--accent)', letterSpacing: '0.5em', marginBottom: '4rem', textTransform: 'uppercase' }}>{dict.home.missionTitle}</h3>
                <p style={{ fontSize: '2rem', fontWeight: 200, lineHeight: '1.6', color: '#eee', letterSpacing: '0.02em' }}>
                  {dict.home.missionDesc}
                </p>
             </motion.div>
          </section>

          {/* 5. Featured Breeds: The Collection */}
          <section style={{ padding: '10rem 5vw', background: '#000' }}>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {featuredBreeds.map((breed, i) => (
                  <Link href={`/${lang}/breeds/${breed.id}`} key={i} style={{ textDecoration: 'none' }}>
                    <motion.div 
                      whileHover={{ y: -10 }}
                      style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', borderRadius: '0.5rem', background: '#111' }}
                    >
                       <img src={breed.img} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} alt={l === 'ko' ? breed.name_ko : breed.name_en} />
                       <div style={{ position: 'absolute', bottom: '2rem', left: '2rem' }}>
                          <div style={{ fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Collection</div>
                          <div style={{ fontSize: '2rem', fontWeight: 100, color: '#fff', textTransform: 'uppercase' }}>{l === 'ko' ? breed.name_ko : breed.name_en}</div>
                       </div>
                    </motion.div>
                  </Link>
                ))}
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
