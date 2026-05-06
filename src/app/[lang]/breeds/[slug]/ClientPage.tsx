'use client';

import Header from "@/components/Header";
import { BreedData } from "@/lib/breeds";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef, useState } from "react";

import { getDictionary, Locale } from "@/i18n/dictionaries";

export default function BreedClientPage({ breed, lang, slug }: { breed: BreedData, lang: string, slug: string }) {
  const l = lang as Locale;
  const dict = getDictionary(l);
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  // Image Error Handling
  const [imgError, setImgError] = useState<{ [key: string]: boolean }>({});
  const handleImgError = (key: string) => {
    setImgError(prev => ({ ...prev, [key]: true }));
  };

  const placeholders = {
    master: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2000&auto=format&fit=crop",
    macro: "https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?q=80&w=2000&auto=format&fit=crop",
    fullbody: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80&w=1000&auto=format&fit=crop"
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", fontFamily: "'Inter', sans-serif" }} ref={containerRef}>
      <Header lang={lang} slug={slug} />
      
      {/* 1. HERO SECTION: Museum Grade Entrance */}
      <section style={{ position: 'relative', height: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
        <motion.div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '120%', y: yBg, zIndex: 0 }}>
          <img 
            src={imgError.master ? placeholders.master : (breed.image_master_path || placeholders.master)} 
            onError={() => handleImgError('master')}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, filter: 'grayscale(10%) contrast(1.1)' }} 
            alt={breed.name_en} 
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50%', background: 'linear-gradient(to top, #000, transparent)' }} />
        </motion.div>
        
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 5vw' }}>
          <h2 style={{ fontSize: "0.8rem", color: "#666", marginBottom: "1.5rem", letterSpacing: '0.5em', fontWeight: 300 }}>
            {dict.breed.archive} / {breed.id.toUpperCase()}
          </h2>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            style={{ fontSize: "clamp(4rem, 10vw, 8rem)", fontWeight: 100, marginBottom: "0.5rem", letterSpacing: '-0.02em', textTransform: 'uppercase' }}
          >
            {l === 'ko' ? breed.name_ko : breed.name_en}
          </motion.h1>
          {l === 'ko' && (
            <motion.h3 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              style={{ fontSize: '2rem', color: '#fff', fontWeight: 200, letterSpacing: '0.3em' }}
            >
              {breed.name_en}
            </motion.h3>
          )}
        </div>
      </section>

      {/* 1.5 ORIGIN HISTORY: Museum Plaque Style */}
      {(breed.origin_history_ko || breed.origin_history_en) && (
        <section style={{ padding: '8rem 5vw', background: '#050505', display: 'flex', justifyContent: 'center' }}>
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }}
            style={{ maxWidth: '800px', textAlign: 'center', border: '1px solid #111', padding: '4rem', borderRadius: '0.5rem', background: 'linear-gradient(to bottom, #0a0a0a, #050505)' }}
          >
            <h4 style={{ fontSize: '1rem', color: '#ccc', letterSpacing: '0.4em', marginBottom: '3rem', borderLeft: '2px solid #fff', paddingLeft: '1.5rem', display: 'inline-block' }}>{dict.breed.originHistory}</h4>
            <p style={{ fontSize: '1.2rem', color: '#aaa', lineHeight: '1.8', fontWeight: 300 }}>
              {l === 'ko' ? breed.origin_history_ko : (breed.origin_history_en || breed.origin_history_ko)}
            </p>
          </motion.div>
        </section>
      )}

      <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 5vw" }}>
        
        {/* 2. DECISION MATRIX: Ideal For & Think Twice */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', margin: '6rem 0' }}>
          {/* GOOD FOR BOX */}
          <div style={{ padding: '3rem', background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '1rem' }}>
            <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '2.5rem', letterSpacing: '0.1em', fontWeight: 400 }}>{dict.breed.goodFor}</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {(l === 'en' ? (breed.good_for_en || breed.good_for) : (breed.good_for || breed.pros))?.map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: '1rem', color: '#eee', fontSize: '1.1rem', lineHeight: '1.6' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>+</span> {item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* VITAL STATS BOX */}
          <div style={{ padding: '3rem', background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '3rem' }}>
             <div>
                <div style={{ fontSize: '0.75rem', color: '#999', letterSpacing: '0.2em', marginBottom: '0.8rem', textTransform: 'uppercase' }}>{dict.common.weight}</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 300, color: '#fff' }}>
                  {breed.weight_min_kg} - {breed.weight_max_kg} 
                  <span style={{ fontSize: '0.9rem', color: '#666', marginLeft: '0.5rem', letterSpacing: '0.1em' }}>{dict.common.kg}</span>
                </div>
             </div>
             <div style={{ width: '100%', height: '1px', background: 'linear-gradient(to right, #222, transparent)' }} />
             <div>
                <div style={{ fontSize: '0.75rem', color: '#999', letterSpacing: '0.2em', marginBottom: '0.8rem', textTransform: 'uppercase' }}>{dict.common.lifespan}</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 300, color: '#fff' }}>
                  {breed.lifespan_min_years} - {breed.lifespan_max_years} 
                  <span style={{ fontSize: '0.9rem', color: '#666', marginLeft: '0.5rem', letterSpacing: '0.1em' }}>{dict.common.years}</span>
                </div>
             </div>
          </div>

          {/* THINK TWICE BOX */}
          <div style={{ padding: '3rem', background: '#0a0a0a', border: '1px solid #1a1a1a', borderLeft: '4px solid #331111', borderRadius: '1rem' }}>
            <h3 style={{ color: '#999', fontSize: '1.2rem', marginBottom: '2.5rem', letterSpacing: '0.1em', fontWeight: 400 }}>{dict.breed.thinkTwice}</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {(l === 'en' ? (breed.think_twice_if_en || breed.think_twice_if) : (breed.think_twice_if || breed.cons))?.map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: '1rem', color: '#bbb', fontSize: '1.1rem', lineHeight: '1.6' }}>
                  <span style={{ color: '#661111', fontWeight: 'bold' }}>-</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. MORPHOLOGY GRID: Optimized Aspect Ratios */}
        <section style={{ margin: '12rem 0' }}>
          <h4 style={{ color: '#ccc', fontSize: '1rem', letterSpacing: '0.5em', marginBottom: '5rem', textAlign: 'center', textTransform: 'uppercase' }}>{dict.breed.morphology}</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            {/* Frontal Face */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }}
              style={{ aspectRatio: '1/1.2', borderRadius: '0.5rem', overflow: 'hidden', background: '#050505', position: 'relative' }}
            >
              <img 
                src={imgError.frontal ? placeholders.master : (breed.image_frontal_path || placeholders.master)} 
                onError={() => handleImgError('frontal')}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                alt="Frontal face"
              />
              <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', color: '#fff', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{dict.breed.frontal}</div>
            </motion.div>

            {/* Strict Profile Face */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }} transition={{ delay: 0.1 }}
              style={{ aspectRatio: '1/1.2', borderRadius: '0.5rem', overflow: 'hidden', background: '#050505', position: 'relative' }}
            >
              <img 
                src={breed.image_strict_profile_path || placeholders.master} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                alt="Strict profile"
              />
              <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', color: '#fff', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{dict.breed.strictProfile}</div>
            </motion.div>

            <motion.div 
              whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }} transition={{ delay: 0.2 }}
              style={{ aspectRatio: '1/1.2', borderRadius: '0.5rem', overflow: 'hidden', background: '#050505', position: 'relative' }}
            >
              <img 
                src={breed.image_fullbody_side_path || placeholders.fullbody} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                alt="Side view"
              />
              <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', color: '#fff', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{dict.breed.lateralLine}</div>
            </motion.div>
          </div>
        </section>

        {/* 4. DETAIL FOCUS & HEALTH ALERT */}
        <section style={{ margin: '15rem 0' }}>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <motion.div 
                whileInView={{ opacity: 1 }} initial={{ opacity: 0 }}
                style={{ aspectRatio: '1/1', borderRadius: '0.5rem', overflow: 'hidden', background: '#050505', position: 'relative' }}
              >
                <img src={breed.image_eye_macro_path || placeholders.macro} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Eye macro" />
                <div style={{ position: 'absolute', top: '2rem', left: '2rem', color: '#fff', fontSize: '0.7rem', letterSpacing: '0.3em' }}>{dict.breed.eyeMaster}</div>
              </motion.div>
              
              {/* HEALTH ALERT PANEL */}
              <div style={{ background: '#0a0505', border: '1px solid #2a1111', borderRadius: '0.5rem', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                 <h5 style={{ color: '#f44', fontSize: '0.9rem', letterSpacing: '0.3em', marginBottom: '2.5rem', fontWeight: 500 }}>{dict.breed.healthAdvisory}</h5>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {breed.known_risks?.map((risk, i) => (
                      <div key={i}>
                         <div style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.3rem' }}>{l === 'ko' ? risk.name_ko : risk.name_en}</div>
                         <div style={{ color: '#666', fontSize: '0.8rem' }}>{dict.breed.severity} {
                           risk.severity_note === 'High' ? dict.breed.severityHigh : 
                           risk.severity_note === 'Moderate' ? dict.breed.severityModerate : 
                           risk.severity_note === 'Low' ? dict.breed.severityLow : risk.severity_note
                         }</div>
                      </div>
                    ))}
                 </div>
              </div>

              <motion.div 
                whileInView={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ delay: 0.2 }}
                style={{ aspectRatio: '1/1', borderRadius: '0.5rem', overflow: 'hidden', background: '#050505', position: 'relative' }}
              >
                <img src={breed.image_variant_path || placeholders.fullbody} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Variant study" />
                <div style={{ position: 'absolute', top: '2rem', left: '2rem', color: '#fff', fontSize: '0.7rem', letterSpacing: '0.3em' }}>{dict.breed.variantStudy}</div>
              </motion.div>
           </div>
        </section>

        {/* 5. CORE STATS: Horizontal Layout for Balance */}
        <section style={{ margin: '10rem 0' }}>
          {/* FULL WIDTH SUMMARY */}
          <p style={{ fontSize: '1.8rem', color: '#eee', lineHeight: '1.6', fontWeight: 300, marginBottom: '8rem', maxWidth: '1000px' }}>
            {l === 'ko' ? breed.summary_ko : breed.summary_en}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
             {/* 5.1 CARE METRICS */}
             <div>
                <h4 style={{ color: '#ccc', fontSize: '1rem', letterSpacing: '0.2em', marginBottom: '3rem', textTransform: 'uppercase', borderLeft: '2px solid #555', paddingLeft: '1.2rem' }}>{dict.breed.careIndex}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                   {[
                     { label: dict.breed.grooming, val: breed.grooming_level },
                     { label: dict.breed.shedding, val: breed.shedding_level },
                     { label: dict.breed.activity, val: breed.activity_level }
                   ].map((item, i) => (
                     <div key={i}>
                        <div style={{ fontSize: '0.85rem', color: '#bbb', marginBottom: '0.6rem', fontWeight: 300 }}>{item.label}</div>
                        <div style={{ height: '3px', background: '#1a1a1a', width: '100%', borderRadius: '1px' }}>
                           <motion.div 
                             initial={{ width: 0 }} whileInView={{ width: `${((item.val || 0) / 5) * 100}%` }}
                             transition={{ duration: 1, ease: "easeOut" }}
                             style={{ height: '100%', background: '#fff', borderRadius: '1px' }} 
                           />
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             {/* 5.2 ECONOMICS & ORIGIN */}
             <div>
                <h4 style={{ color: '#ccc', fontSize: '1rem', letterSpacing: '0.2em', marginBottom: '3rem', textTransform: 'uppercase', borderLeft: '2px solid #555', paddingLeft: '1.2rem' }}>{dict.breed.economicsOrigin}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                   <div>
                      <div style={{ fontSize: '0.7rem', color: '#777', marginBottom: '0.4rem', textTransform: 'uppercase' }}>{dict.breed.priceRange}</div>
                      <div style={{ fontSize: '1.1rem', color: '#eee', fontWeight: 300 }}>
                        {l === 'en' ? (breed.economics?.price_range_en || breed.economics?.price_range_ko) : breed.economics?.price_range_ko}
                      </div>
                   </div>
                   <div>
                      <div style={{ fontSize: '0.7rem', color: '#777', marginBottom: '0.4rem', textTransform: 'uppercase' }}>{dict.breed.origin}</div>
                      <div style={{ fontSize: '1.1rem', color: '#eee', fontWeight: 300, lineHeight: '1.6' }}>
                        {(dict.data as any).countries[breed.origin_country] || breed.origin_country} / {(dict.data as any).bodyTypes[breed.body_type] || breed.body_type}
                      </div>
                   </div>
                </div>
             </div>

             {/* 5.3 SOCIAL COMPATIBILITY */}
             <div>
                <h4 style={{ color: '#ccc', fontSize: '1rem', letterSpacing: '0.2em', marginBottom: '3rem', textTransform: 'uppercase', borderLeft: '2px solid #555', paddingLeft: '1.2rem' }}>{dict.breed.social}</h4>
                <div style={{ background: '#050505', padding: '3rem', borderRadius: '1rem', border: '1px solid #111' }}>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                      {[
                        { label: dict.breed.kids, score: breed.social_compatibility?.kids_score },
                        { label: dict.breed.otherCats, score: breed.social_compatibility?.cats_score },
                        { label: dict.breed.dogs, score: breed.social_compatibility?.dogs_score },
                        { label: dict.breed.strangers, score: breed.social_compatibility?.strangers_score }
                      ].map((item, idx) => (
                        <div key={idx}>
                          <div style={{ fontSize: '0.75rem', color: '#999', marginBottom: '0.6rem', letterSpacing: '0.1em' }}>{item.label}</div>
                          <div style={{ display: 'flex', gap: '0.3rem' }}>
                            {[1, 2, 3, 4, 5].map(s => (
                              <div key={s} style={{ flex: 1, height: '4px', background: s <= (item.score || 0) ? '#fff' : '#1a1a1a' }} />
                            ))}
                          </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>

          {/* HOME SUITABILITY (Optional wide row) */}
          {(breed.home_suitability_ko || breed.home_suitability_en) && (
            <div style={{ marginTop: '4rem', background: '#080808', padding: '4rem', borderRadius: '1rem', border: '1px solid #111' }}>
              <h4 style={{ color: '#ccc', fontSize: '1rem', letterSpacing: '0.2em', marginBottom: '2.5rem', textTransform: 'uppercase', borderLeft: '2px solid #333', paddingLeft: '1rem' }}>{dict.breed.homeSuitability}</h4>
              <p style={{ color: '#bbb', fontSize: '1.1rem', lineHeight: '1.8', fontWeight: 300, maxWidth: '1000px' }}>
                {l === 'ko' ? breed.home_suitability_ko : (breed.home_suitability_en || breed.home_suitability_ko)}
              </p>
            </div>
          )}
        </section>

        {/* 6. RECOMMENDED ITEMS & COMPARISON TIP */}
        <section style={{ margin: '15rem 0' }}>
          {breed.recommended_items && (
            <div style={{ marginBottom: '10rem' }}>
              <h4 style={{ color: '#ccc', fontSize: '1.2rem', letterSpacing: '0.5em', marginBottom: '5rem', textAlign: 'center', textTransform: 'uppercase' }}>{dict.breed.recommendedItems}</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                {breed.recommended_items.map((item, idx) => (
                  <div key={idx} style={{ padding: '3rem', background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '1rem' }}>
                    <div style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1.2rem', fontWeight: 400 }}>{item.item_name}</div>
                    <div style={{ fontSize: '1rem', color: '#aaa', lineHeight: '1.7', fontWeight: 300 }}>{item.reason}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {breed.visual_comparison_tip && (
            <div style={{ textAlign: 'center', background: 'linear-gradient(to right, transparent, #0a0a0a, transparent)', padding: '8rem 0', borderRadius: '2rem' }}>
              <h4 style={{ color: '#ccc', fontSize: '1rem', letterSpacing: '0.5em', marginBottom: '4rem', textTransform: 'uppercase' }}>{dict.breed.idTip}</h4>
              <p style={{ fontSize: '2rem', fontWeight: 200, color: '#fff', maxWidth: '1000px', margin: '0 auto', fontStyle: 'italic', lineHeight: '1.6' }}>
                "{l === 'en' ? (breed.visual_comparison_tip_en || breed.visual_comparison_tip) : breed.visual_comparison_tip}"
              </p>
            </div>
          )}
        </section>

        {/* 7. FAQ */}
        <section style={{ margin: '10rem 0' }}>
          <h3 style={{ fontSize: '1.5rem', letterSpacing: '0.2em', marginBottom: '4rem', fontWeight: 300 }}>{dict.breed.faq}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {breed.faq?.map((f, i) => (
              <div key={i} style={{ maxWidth: '800px' }}>
                <h4 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '1.5rem', fontWeight: 400 }}>Q. {l === 'ko' ? f.question_ko : (f.question_en || f.question_ko)}</h4>
                <p style={{ fontSize: '1.1rem', color: '#aaa', lineHeight: '1.8' }}>A. {l === 'ko' ? f.answer_ko : (f.answer_en || f.answer_ko)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. EXPERT SOURCES & DISCLAIMER */}
        <section style={{ margin: '15rem 0 10rem 0', borderTop: '1px solid #111', paddingTop: '8rem' }}>
           <h3 style={{ fontSize: '1rem', letterSpacing: '0.4em', color: '#ccc', marginBottom: '5rem', textAlign: 'center', textTransform: 'uppercase' }}>{dict.breed.expertSources}</h3>
           
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '6rem' }}>
              {breed.expert_sources?.map((source, i) => (
                <div key={i} style={{ padding: '2.5rem', background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '1rem', display: 'flex', flexDirection: 'column' }}>
                   <div style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: '1rem', letterSpacing: '0.2em', fontWeight: 400, textTransform: 'uppercase' }}>{source.source_name}</div>
                   <div style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '2rem', fontWeight: 300, lineHeight: '1.5', flexGrow: 1 }}>{source.source_name} {dict.breed.visitOfficial}</div>
                   <a 
                     href={source.url} target="_blank" rel="noopener noreferrer"
                     style={{ fontSize: '0.9rem', color: 'var(--accent)', textDecoration: 'none', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                   >
                     {source.source_name} {dict.breed.visitOfficial} →
                   </a>
                </div>
              ))}
           </div>

           <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <p style={{ color: '#444', fontSize: '0.8rem', lineHeight: '1.8', fontStyle: 'italic' }}>
                * Disclaimer: This archive is for educational purposes. Consult a veterinarian for health-related decisions.
              </p>
           </div>
        </section>

      </main>
      
      <footer style={{ padding: "10rem 5vw", textAlign: "center", borderTop: "1px solid #111" }}>
        <h2 style={{ fontSize: '5vw', fontWeight: 100, letterSpacing: '1em', opacity: 0.1, marginLeft: '1em' }}>NYAN</h2>
        <p style={{ marginTop: '4rem', fontSize: '0.7rem', letterSpacing: '0.3em', color: '#444' }}>
          {dict.common.footerDesc}
        </p>
      </footer>
    </div>
  );
}
