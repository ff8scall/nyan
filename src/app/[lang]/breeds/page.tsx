'use client';

import { getAllBreedSlugs, getBreedBySlug } from "@/lib/breeds";
import Header from "@/components/Header";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

import { getDictionary, Locale } from "@/i18n/dictionaries";

export default function BreedsGridPage({ params }: { params: any }) {
  const [data, setData] = useState<{ breeds: any[], lang: string }>({ breeds: [], lang: 'ko' });
  const [activeFilter, setActiveFilter] = useState('all');
  
  const { breeds, lang } = data;
  const l = lang as Locale;
  const dict = getDictionary(l);
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]); // Parallax for the watermark

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    params.then(async (p: any) => {
      const res = await fetch(`/api/breeds?lang=${p.lang}`);
      const json = await res.json();
      setData({ breeds: json, lang: p.lang });
    });
  }, [params]);


  const filteredBreeds = breeds.filter(breed => {
    const matchesSearch = 
      breed.name_en?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      breed.name_ko?.includes(searchTerm);
    
    if (!matchesSearch) return false;
    if (activeFilter === 'all') return true;
    if (activeFilter === 'long') return breed.coat_length === 'long';
    if (activeFilter === 'short') return breed.coat_length === 'short';
    if (activeFilter === 'rare') return breed.local_rarity_ko?.includes('희귀') || breed.id === 'savannah' || breed.id === 'chartreux';
    if (activeFilter === 'popular') return ['ragdoll', 'siamese', 'persian', 'maine-coon', 'british-shorthair'].includes(breed.id);
    return true;
  });

  const filters = [
    { id: 'all', label: dict.breed.filterAll },
    { id: 'popular', label: dict.breed.filterPopular },
    { id: 'long', label: dict.breed.filterLongHair },
    { id: 'short', label: dict.breed.filterShortHair },
    { id: 'rare', label: dict.breed.filterRare }
  ];

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', position: 'relative' }} ref={containerRef}>
      
      {/* Fixed Watermark Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, overflow: 'hidden', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.h1 
          className="text-huge-light blend-exclusion" 
          style={{ y: yBg, opacity: 0.05, whiteSpace: 'nowrap', textAlign: 'center' }}
        >
          ENCYCLO<br/>PEDIA
        </motion.h1>
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        <Header lang={lang} />
        
        {/* Sticky Filter Bar */}
        <div style={{ position: 'sticky', top: '0', zIndex: 50, padding: '2rem 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(10,10,10,0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {filters.map(filter => (
              <button 
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className="font-serif"
                style={{ 
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  color: activeFilter === filter.id ? 'var(--foreground)' : '#444',
                  textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem',
                  transition: 'color 0.3s',
                  position: 'relative'
                }}
              >
                {filter.label}
                {activeFilter === filter.id && (
                  <motion.div layoutId="underline" style={{ position: 'absolute', bottom: '-4px', left: 0, width: '100%', height: '1px', background: '#fff' }} />
                )}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <AnimatePresence>
              {isSearchOpen && (
                <motion.input 
                  autoFocus
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '200px', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={dict.breed.searchPlaceholder}
                  style={{ background: 'none', border: 'none', borderBottom: '1px solid #333', color: '#fff', outline: 'none', fontSize: '0.8rem', padding: '0.5rem' }}
                />
              )}
            </AnimatePresence>
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="font-serif" 
              style={{ background: 'none', border: 'none', color: isSearchOpen ? '#fff' : '#666', cursor: 'pointer', letterSpacing: '0.1em', fontSize: '0.9rem' }}
            >
              {isSearchOpen ? dict.breed.close : dict.breed.search}
            </button>
          </div>
        </div>

        {/* Vertical Dot Navigation */}
        <div style={{ position: 'fixed', right: '2vw', top: '50%', transform: 'translateY(-50%)', zIndex: 50, display: 'flex', flexDirection: 'column', gap: '1rem', opacity: 0.3 }}>
          {Array.from({ length: Math.ceil(filteredBreeds.length / 5) || 1 }).map((_, i) => (
            <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#fff' }} />
          ))}
        </div>

        <main style={{ padding: '5rem 5vw', minHeight: '100vh' }}>
          {/* Asymmetric Grid Layout */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gridAutoRows: 'minmax(400px, auto)',
            gap: '2rem' 
          }}>
            <AnimatePresence mode="popLayout">
              {filteredBreeds.map((breed, index) => {
                const imageSource = breed.image_master_path || placeholders.master;
                const isLarge = (index + 1) % 7 === 0;

                return (
                  <motion.div
                    layout
                    key={breed.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    style={{ gridColumn: isLarge ? 'span 2' : 'span 1', gridRow: isLarge ? 'span 2' : 'span 1' }}
                  >
                    <Link href={`/${lang}/breeds/${breed.slug}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                      <motion.div
                        whileHover="hover"
                        style={{ 
                          width: '100%', height: '100%', 
                          background: '#0a0a0a',
                          position: 'relative',
                          overflow: 'hidden',
                          borderRadius: '8px',
                          border: '1px solid rgba(255,255,255,0.05)',
                          aspectRatio: isLarge ? 'auto' : '3/4'
                        }}
                      >
                        {/* Background Image */}
                        <motion.div 
                          variants={{
                            hover: { opacity: 0.6, scale: 1.1 }
                          }}
                          initial={{ opacity: 0.3 }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
                        >
                          <img 
                            src={imageSource} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(40%) contrast(1.1) brightness(0.8)' }} 
                            alt={breed.name_en} 
                            loading="lazy"
                          />
                        </motion.div>

                        {/* Content */}
                        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '2.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', zIndex: 10 }}>
                          <div style={{ fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.5em', marginBottom: '1rem', fontWeight: 300 }}>
                            ARCHIVE_{breed.id.slice(0, 4).toUpperCase()}
                          </div>
                          <h2 style={{ fontSize: isLarge ? '4.5rem' : '2.2rem', fontWeight: 100, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: '0.85', color: '#fff' }}>
                            {l === 'ko' ? breed.name_ko : breed.name_en}
                          </h2>
                          {l === 'ko' && (
                            <h3 style={{ fontSize: '1rem', color: '#888', fontWeight: 300, marginTop: '0.8rem', letterSpacing: '0.3em' }}>
                              {breed.name_en}
                            </h3>
                          )}
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

const placeholders = {
  master: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop"
};
