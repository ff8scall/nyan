'use client';

import Header from "@/components/Header";
import { BreedData } from "@/lib/breeds";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef, useState } from "react";

export default function BreedClientPage({ breed, lang, slug }: { breed: BreedData, lang: string, slug: string }) {
  const l = lang as "en" | "ko";
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  // Image Error Handling (Fallback to high-end placeholders if local AI generation is pending)
  const [imgError, setImgError] = useState<{ [key: string]: boolean }>({});
  const handleImgError = (key: string) => {
    setImgError(prev => ({ ...prev, [key]: true }));
  };

  const placeholders = {
    master: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2000&auto=format&fit=crop",
    macro: "https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?q=80&w=2000&auto=format&fit=crop",
    fullbody: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80&w=1000&auto=format&fit=crop"
  };

  const t = {
    ko: {
      archive: "아카이브",
      pros: "장점",
      cons: "단점",
      morphology: "형태학적 연구",
      frontal: "정면 관찰",
      build: "체형 및 구조",
      texture: "피부 및 털 질감",
      colorArchive: "컬러 아카이브",
      economics: "경제성 및 관리비",
      marketPrice: "예상 분양가:",
      monthlyCare: "월 평균 관리비:",
      origin: "기원 및 신체 정보",
      social: "사회성 및 친화도",
      kids: "어린이",
      otherCats: "다른 고양이",
      dogs: "강아지",
      strangers: "낯선 사람",
      idTip: "구별 포인트",
      faq: "자주 묻는 질문",
      footer: "박물관급 아카이브 / 5080 렌더링 파워드"
    },
    en: {
      archive: "ARCHIVE",
      pros: "PROS",
      cons: "CONS",
      morphology: "MORPHOLOGY STUDY",
      frontal: "01 / Frontal Face",
      build: "02 / Substantial Build",
      texture: "03 / Fiber Texture",
      colorArchive: "COLOR ARCHIVE",
      economics: "ECONOMICS",
      marketPrice: "Market Price:",
      monthlyCare: "Monthly Care:",
      origin: "ORIGIN & BIOLOGY",
      social: "SOCIAL COMPATIBILITY",
      kids: "KIDS",
      otherCats: "OTHER CATS",
      dogs: "DOGS",
      strangers: "STRANGERS",
      idTip: "IDENTIFICATION TIP",
      faq: "FREQUENTLY ASKED",
      footer: "MUSEUM GRADE ARCHIVE / POWERED BY 5080 RENDERING"
    }
  }[l];

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
            {t.archive} / {breed.id.toUpperCase()}
          </h2>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            style={{ fontSize: "clamp(4rem, 10vw, 8rem)", fontWeight: 100, marginBottom: "0.5rem", letterSpacing: '-0.02em', textTransform: 'uppercase' }}
          >
            {l === 'ko' ? breed.name_ko : breed.name_en}
          </motion.h1>
          <motion.h3 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            style={{ fontSize: '2rem', color: '#fff', fontWeight: 200, letterSpacing: '0.3em' }}
          >
            {l === 'ko' ? breed.name_en : breed.name_ko}
          </motion.h3>
        </div>
      </section>

      <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 5vw" }}>
        
        {/* 2. SEO HIGHLIGHT: Pros & Cons & Vital Stats */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', margin: '6rem 0' }}>
          <div style={{ padding: '3rem', background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '1rem' }}>
            <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '2rem', letterSpacing: '0.1em', fontWeight: 400 }}>{t.pros}</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {(l === 'ko' ? breed.pros : breed.pros)?.map((pro, i) => (
                <li key={i} style={{ display: 'flex', gap: '1rem', color: '#ccc', fontSize: '1.1rem', lineHeight: '1.5' }}>
                  <span style={{ color: '#fff' }}>+</span> {pro}
                </li>
              ))}
            </ul>
          </div>
          
          {/* NEW: VITAL STATS */}
          <div style={{ padding: '3rem', background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
             <div style={{ marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#666', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>WEIGHT</div>
                <div style={{ fontSize: '2rem', fontWeight: 200 }}>{breed.weight_min_kg} - {breed.weight_max_kg} <span style={{ fontSize: '1rem', color: '#444' }}>KG</span></div>
             </div>
             <div>
                <div style={{ fontSize: '0.7rem', color: '#666', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>LIFESPAN</div>
                <div style={{ fontSize: '2rem', fontWeight: 200 }}>{breed.lifespan_min_years} - {breed.lifespan_max_years} <span style={{ fontSize: '1rem', color: '#444' }}>YEARS</span></div>
             </div>
          </div>

          <div style={{ padding: '3rem', background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '1rem' }}>
            <h3 style={{ color: '#666', fontSize: '1.2rem', marginBottom: '2rem', letterSpacing: '0.1em', fontWeight: 400 }}>{t.cons}</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {(l === 'ko' ? breed.cons : breed.cons)?.map((con, i) => (
                <li key={i} style={{ display: 'flex', gap: '1rem', color: '#888', fontSize: '1.1rem', lineHeight: '1.5' }}>
                  <span style={{ color: '#444' }}>-</span> {con}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. MORPHOLOGY GRID: Optimized Aspect Ratios */}
        <section style={{ margin: '12rem 0' }}>
          <h4 style={{ color: '#444', fontSize: '0.8rem', letterSpacing: '0.5em', marginBottom: '4rem', textAlign: 'center' }}>{t.morphology}</h4>
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
              <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', color: '#fff', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{t.frontal}</div>
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
              <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', color: '#fff', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>90° PROFILE</div>
            </motion.div>

            {/* Full Body Side */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }} transition={{ delay: 0.2 }}
              style={{ aspectRatio: '1/1.2', borderRadius: '0.5rem', overflow: 'hidden', background: '#050505', position: 'relative' }}
            >
              <img 
                src={breed.image_fullbody_side_path || placeholders.fullbody} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                alt="Side view"
              />
              <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', color: '#fff', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>LATERAL LINE</div>
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
                <div style={{ position: 'absolute', top: '2rem', left: '2rem', color: '#fff', fontSize: '0.7rem', letterSpacing: '0.3em' }}>EYE MASTER</div>
              </motion.div>
              
              {/* HEALTH ALERT PANEL */}
              <div style={{ background: '#0a0505', border: '1px solid #2a1111', borderRadius: '0.5rem', padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                 <h5 style={{ color: '#f44', fontSize: '0.7rem', letterSpacing: '0.3em', marginBottom: '2rem' }}>HEALTH RISK ADVISORY</h5>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {breed.known_risks?.map((risk, i) => (
                      <div key={i}>
                         <div style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.3rem' }}>{risk.name_ko}</div>
                         <div style={{ color: '#666', fontSize: '0.8rem' }}>Severity: {risk.severity_note}</div>
                      </div>
                    ))}
                 </div>
              </div>

              <motion.div 
                whileInView={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ delay: 0.2 }}
                style={{ aspectRatio: '1/1', borderRadius: '0.5rem', overflow: 'hidden', background: '#050505', position: 'relative' }}
              >
                <img src={breed.image_variant_path || placeholders.fullbody} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Variant study" />
                <div style={{ position: 'absolute', top: '2rem', left: '2rem', color: '#fff', fontSize: '0.7rem', letterSpacing: '0.3em' }}>VARIANT STUDY</div>
              </motion.div>
           </div>
        </section>

        {/* 5. CORE STATS: Balanced Information Layout */}
        <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', margin: '10rem 0' }}>
          <div>
            <p style={{ fontSize: '1.5rem', color: '#eee', lineHeight: '1.8', fontWeight: 300, marginBottom: '4rem' }}>
              {l === 'ko' ? breed.summary_ko : breed.summary_en}
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
               {/* CARE METRICS */}
               <div>
                  <h4 style={{ color: '#444', fontSize: '0.8rem', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>CARE INDEX</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                     {[
                       { label: 'GROOMING', val: breed.grooming_level },
                       { label: 'SHEDDING', val: breed.shedding_level },
                       { label: 'ACTIVITY', val: breed.activity_level }
                     ].map((item, i) => (
                       <div key={i}>
                          <div style={{ fontSize: '0.6rem', color: '#555', marginBottom: '0.4rem' }}>{item.label}</div>
                          <div style={{ height: '2px', background: '#222', width: '100%' }}>
                             <div style={{ height: '100%', background: '#fff', width: `${((item.val || 0) / 5) * 100}%` }} />
                          </div>
                       </div>
                     ))}
                  </div>
               </div>

               {/* ECONOMICS & ORIGIN */}
               <div>
                  <h4 style={{ color: '#444', fontSize: '0.8rem', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>ECONOMICS & ORIGIN</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                     <div>
                        <div style={{ fontSize: '0.6rem', color: '#555', marginBottom: '0.2rem' }}>PRICE RANGE</div>
                        <div style={{ fontSize: '1rem', color: '#ccc' }}>{breed.economics?.price_range_ko}</div>
                     </div>
                     <div>
                        <div style={{ fontSize: '0.6rem', color: '#555', marginBottom: '0.2rem' }}>ORIGIN</div>
                        <div style={{ fontSize: '1rem', color: '#ccc' }}>{breed.origin_country} / {breed.body_type}</div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
          
          {/* SOCIAL COMPATIBILITY PANEL */}
          <div style={{ background: '#050505', padding: '3rem', borderRadius: '1rem', border: '1px solid #111', alignSelf: 'start' }}>
             <h4 style={{ color: '#444', fontSize: '0.8rem', letterSpacing: '0.2em', marginBottom: '2rem' }}>{t.social}</h4>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { label: t.kids, score: breed.social_compatibility?.kids_score },
                  { label: t.otherCats, score: breed.social_compatibility?.cats_score },
                  { label: t.dogs, score: breed.social_compatibility?.dogs_score },
                  { label: t.strangers, score: breed.social_compatibility?.strangers_score }
                ].map((item, idx) => (
                  <div key={idx}>
                    <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>{item.label.toUpperCase()}</div>
                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                      {[1, 2, 3, 4, 5].map(s => (
                        <div key={s} style={{ flex: 1, height: '4px', background: s <= (item.score || 0) ? '#fff' : '#222' }} />
                      ))}
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* 6. COMPARISON TIP */}
        {breed.visual_comparison_tip && (
          <section style={{ margin: '15rem 0', textAlign: 'center' }}>
            <h4 style={{ color: '#444', fontSize: '0.8rem', letterSpacing: '0.5em', marginBottom: '2rem' }}>{t.idTip}</h4>
            <p style={{ fontSize: '1.8rem', fontWeight: 300, color: '#fff', maxWidth: '900px', margin: '0 auto', fontStyle: 'italic', lineHeight: '1.6' }}>
              "{breed.visual_comparison_tip}"
            </p>
          </section>
        )}

        {/* 7. FAQ */}
        <section style={{ margin: '10rem 0 20rem 0' }}>
          <h3 style={{ fontSize: '1.5rem', letterSpacing: '0.2em', marginBottom: '4rem', fontWeight: 300 }}>{t.faq}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {breed.faq?.map((f, i) => (
              <div key={i} style={{ maxWidth: '800px' }}>
                <h4 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '1.5rem', fontWeight: 400 }}>Q. {l === 'ko' ? f.question_ko : f.question_ko}</h4>
                <p style={{ fontSize: '1.1rem', color: '#888', lineHeight: '1.8' }}>A. {l === 'ko' ? f.answer_ko : f.answer_ko}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
      
      <footer style={{ padding: "10rem 5vw", textAlign: "center", borderTop: "1px solid #111" }}>
        <h2 style={{ fontSize: '5vw', fontWeight: 100, letterSpacing: '1em', opacity: 0.1, marginLeft: '1em' }}>NYAN</h2>
        <p style={{ marginTop: '4rem', fontSize: '0.7rem', letterSpacing: '0.3em', color: '#444' }}>
          {t.footer}
        </p>
      </footer>
    </div>
  );
}
