import { getAllBreedSlugs } from "@/lib/breeds";
import fs from "fs";
import path from "path";
import Link from "next/link";
import React from "react";

// Server Component for Audit Dashboard v2
export default async function AuditPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const slugs = await getAllBreedSlugs();
  
  const WIKI_REF_DIR = path.join(process.cwd(), "src/data/wiki_refs");
  const IMAGE_DIR = path.join(process.cwd(), "public/images/Nyan");

  const breedAuditData = slugs.map(slug => {
    const wikiPath = path.join(WIKI_REF_DIR, `${slug}.json`);
    let wiki = null;
    if (fs.existsSync(wikiPath)) {
      wiki = JSON.parse(fs.readFileSync(wikiPath, "utf-8"));
    }

    const aiImages = {
      master: fs.existsSync(path.join(IMAGE_DIR, `${slug}_master.png`)),
      fullbody: fs.existsSync(path.join(IMAGE_DIR, `${slug}_fullbody.png`)),
      macro: fs.existsSync(path.join(IMAGE_DIR, `${slug}_macro.png`)),
      frontal: fs.existsSync(path.join(IMAGE_DIR, `${slug}_frontal.png`))
    };

    // Construct Authority Links
    const breedName = slug.replace(/-/g, " ");
    const cfaLink = `https://cfa.org/${slug}/`;
    const ticaLink = `https://www.tica.org/breeds/browse-all-breeds`;
    const googleSearchLink = `https://www.google.com/search?q=${encodeURIComponent(breedName + " cat breed standard")}&tbm=isch`;

    return { slug, breedName, wiki, aiImages, cfaLink, ticaLink, googleSearchLink };
  });

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", padding: "4rem 2rem", fontFamily: "'Inter', sans-serif" }}>
      <header style={{ marginBottom: "4rem", borderBottom: "1px solid #333", paddingBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 100, letterSpacing: "0.4em" }}>VISUAL AUDIT v2.0</h1>
          <p style={{ color: "#666", marginTop: "1rem", letterSpacing: "0.1em" }}>NYAN ARCHIVE QUALITY ASSURANCE / COMPARING AI ASSETS VS OFFICIAL STANDARDS</p>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
           <a href="https://cfa.org/breeds/" target="_blank" style={{ padding: "0.5rem 1rem", border: "1px solid #333", fontSize: "0.8rem", color: "#888" }}>CFA MASTER LIST</a>
           <a href="https://www.tica.org/breeds/browse-all-breeds" target="_blank" style={{ padding: "0.5rem 1rem", border: "1px solid #333", fontSize: "0.8rem", color: "#888" }}>TICA MASTER LIST</a>
        </div>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "10rem" }}>
        {breedAuditData.map((item) => (
          <section key={item.slug} id={item.slug} style={{ borderBottom: "1px solid #111", paddingBottom: "8rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                <h2 style={{ fontSize: "2.2rem", textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 200 }}>
                  {item.breedName}
                </h2>
                <div style={{ display: "flex", gap: "0.8rem" }}>
                  <a href={item.cfaLink} target="_blank" style={{ fontSize: "0.7rem", color: "#aaa", border: "1px solid #222", padding: "0.3rem 0.6rem", borderRadius: "2px" }}>CFA STD</a>
                  <a href={item.googleSearchLink} target="_blank" style={{ fontSize: "0.7rem", color: "#aaa", border: "1px solid #222", padding: "0.3rem 0.6rem", borderRadius: "2px" }}>GOOGLE REF</a>
                </div>
              </div>
              <Link href={`/${lang}/breeds/${item.slug}`} target="_blank" style={{ color: "#555", fontSize: "0.8rem", letterSpacing: "0.1em" }}>
                VIEW PUBLIC PAGE →
              </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem" }}>
              {/* Left: Authority & Reference */}
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <div style={{ background: "#0a0a0a", padding: "2.5rem", borderRadius: "1rem", border: "1px solid #222" }}>
                  <h3 style={{ fontSize: "0.7rem", color: "#444", letterSpacing: "0.3em", marginBottom: "2rem", textTransform: "uppercase" }}>Wikipedia Ground Truth</h3>
                  {item.wiki ? (
                    <>
                      <div style={{ aspectRatio: "1/1", background: "#000", borderRadius: "0.5rem", overflow: "hidden", marginBottom: "2rem", border: "1px solid #111" }}>
                        {item.wiki.image_url ? (
                          <img src={item.wiki.image_url} alt="Wiki Reference" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                        ) : (
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#333" }}>IMAGE MISSING</div>
                        )}
                      </div>
                      <div style={{ fontSize: "0.95rem", lineHeight: "1.7", color: "#999", fontWeight: 300 }}>
                        {item.wiki.summary}
                      </div>
                    </>
                  ) : (
                    <div style={{ color: "#ff4d4d", fontSize: "0.8rem" }}>NO WIKI DATA FOUND</div>
                  )}
                </div>
                
                <div style={{ padding: "2rem", border: "1px dashed #222", borderRadius: "1rem" }}>
                  <h4 style={{ fontSize: "0.7rem", color: "#444", letterSpacing: "0.2em", marginBottom: "1rem" }}>AUDIT NOTES</h4>
                  <p style={{ fontSize: "0.85rem", color: "#666", lineHeight: "1.6" }}>
                    Compare skeletal structure, eye color, and coat texture. If the AI subject looks generic, check the CFA standard for unique breed markers.
                  </p>
                </div>
              </div>

              {/* Right: AI Generated Assets */}
              <div>
                <h3 style={{ fontSize: "0.7rem", color: "#444", letterSpacing: "0.3em", marginBottom: "2rem", textTransform: "uppercase" }}>AI Generated Assets (Target: 5080 Rendering)</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem" }}>
                  {["master", "fullbody", "macro", "frontal"].map((type) => (
                    <div key={type} style={{ background: "#050505", borderRadius: "0.8rem", border: "1px solid #111", padding: "0.8rem" }}>
                      <div style={{ aspectRatio: "1/1", background: "#000", borderRadius: "0.4rem", overflow: "hidden", marginBottom: "1rem" }}>
                        {(item.aiImages as any)[type] ? (
                          <img 
                            src={`/images/Nyan/${item.slug}_${type}.png`} 
                            alt={`${type} view`} 
                            style={{ width: "100%", height: "100%", objectFit: "cover", filter: "contrast(1.05)" }} 
                          />
                        ) : (
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#222", fontSize: "0.7rem" }}>
                            FILE NOT FOUND
                          </div>
                        )}
                      </div>
                      <div style={{ fontSize: "0.65rem", color: "#333", textAlign: "center", letterSpacing: "0.2em", fontWeight: 600 }}>{type.toUpperCase()} ASSET</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
