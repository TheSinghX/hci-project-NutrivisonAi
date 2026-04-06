import { useState, useRef } from "react";
import { VEGETABLE_OPTIONS, getRandomDetectedIngredients } from "../data/recipes";

interface IngredientSectionProps {
  selected: string[];
  onChange: (ingredients: string[]) => void;
}

export function IngredientSection({ selected, onChange }: IngredientSectionProps) {
  const [search, setSearch] = useState("");
  const [detected, setDetected] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = VEGETABLE_OPTIONS.filter(
    v => v.toLowerCase().includes(search.toLowerCase()) && !selected.includes(v)
  );

  function addIngredient(v: string) {
    if (!selected.includes(v)) onChange([...selected, v]);
    setSearch(""); setIsOpen(false);
  }

  function removeIngredient(v: string) {
    onChange(selected.filter(s => s !== v));
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      setImagePreview(ev.target?.result as string);
      setIsAnalyzing(true);
      setTimeout(() => {
        const list = getRandomDetectedIngredients();
        setDetected(list);
        setIsAnalyzing(false);
        const next = [...selected];
        list.forEach(d => { if (!next.includes(d)) next.push(d); });
        onChange(next);
      }, 1800);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="nv-card">
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px" }}>
        <div className="nv-icon-box">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </div>
        <div>
          <p className="nv-label">Ingredients</p>
          <p style={{ fontSize: "0.82rem", color: "#9ca3af", marginTop: "1px" }}>Search or scan via photo</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "20px" }}>

        {/* ── Image Detection ── */}
        <div>
          <p className="nv-label" style={{ marginBottom: "10px" }}>AI Photo Detection</p>
          {imagePreview ? (
            <div style={{ position: "relative", marginBottom: "10px" }}>
              <img src={imagePreview} alt="Uploaded" style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "10px", display: "block" }} />
              <button
                onClick={() => { setImagePreview(null); setDetected([]); if (fileRef.current) fileRef.current.value = ""; }}
                style={{ position: "absolute", top: "6px", right: "6px", width: "20px", height: "20px", background: "rgba(0,0,0,0.65)", borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileRef.current?.click()}
              style={{
                width: "100%", height: "120px",
                border: "1px dashed #1f2937", borderRadius: "10px",
                background: "transparent", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: "8px",
                color: "#374151", cursor: "pointer", transition: "all 0.18s",
                marginBottom: "10px",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(34,197,94,0.3)"; e.currentTarget.style.color = "#6b7280"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#1f2937"; e.currentTarget.style.color = "#374151"; }}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span style={{ fontSize: "0.72rem" }}>Upload a photo</span>
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />

          {isAnalyzing && (
            <div style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "0.72rem", color: "#4b5563" }}>
              <div style={{ width: "11px", height: "11px", border: "1.5px solid #22c55e", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite", flexShrink: 0 }} />
              Scanning image...
            </div>
          )}

          {!isAnalyzing && detected.length > 0 && (
            <div style={{ padding: "10px 12px", borderRadius: "9px", background: "rgba(34,197,94,0.04)", border: "1px solid rgba(34,197,94,0.1)" }}>
              <p style={{ fontSize: "0.7rem", color: "#86efac", lineHeight: 1.55 }}>
                AI detected: <strong style={{ textTransform: "capitalize" }}>{detected.join(", ")}</strong>
                <br /><span style={{ color: "#374151" }}>(confidence simulated)</span>
              </p>
            </div>
          )}
        </div>

        {/* ── Search + Selected ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Search */}
          <div>
            <p className="nv-label" style={{ marginBottom: "10px" }}>Search & Add</p>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#334155" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search ingredients..."
                value={search}
                onChange={e => { setSearch(e.target.value); setIsOpen(true); }}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setTimeout(() => setIsOpen(false), 140)}
                className="nv-input"
                style={{ width: "100%", paddingLeft: "36px" }}
              />
              {isOpen && filtered.length > 0 && (
                <div style={{
                  position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0,
                  background: "#111827", border: "1px solid #1f2937", borderRadius: "12px",
                  zIndex: 50, boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
                  maxHeight: "210px", overflowY: "auto",
                }}>
                  {filtered.map(v => (
                    <button
                      key={v}
                      onMouseDown={() => addIngredient(v)}
                      style={{
                        width: "100%", textAlign: "left", padding: "9px 14px",
                        fontSize: "0.84rem", color: "#9ca3af", background: "transparent",
                        border: "none", cursor: "pointer", display: "block",
                        textTransform: "capitalize", transition: "background 0.12s",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#1f2937"; e.currentTarget.style.color = "#f1f5f9"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#9ca3af"; }}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Selected */}
          <div>
            <p className="nv-label" style={{ marginBottom: "10px" }}>
              Selected{selected.length > 0 ? ` · ${selected.length}` : ""}
            </p>
            {selected.length === 0 ? (
              <p style={{ fontSize: "0.75rem", color: "#1f2937", fontStyle: "italic" }}>None yet — search above or upload a photo</p>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                {selected.map(v => (
                  <span key={v} className="nv-pill" style={{ textTransform: "capitalize" }}>
                    {v}
                    <button
                      onClick={() => removeIngredient(v)}
                      style={{ background: "none", border: "none", cursor: "pointer", padding: "0 0 0 6px", display: "inline-flex", alignItems: "center", color: "#22c55e", opacity: 0.6, transition: "opacity 0.15s" }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                      onMouseLeave={e => (e.currentTarget.style.opacity = "0.6")}
                    >
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
