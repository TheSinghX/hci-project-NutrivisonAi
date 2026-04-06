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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = VEGETABLE_OPTIONS.filter(
    (v) => v.toLowerCase().includes(search.toLowerCase()) && !selected.includes(v)
  );

  function addIngredient(v: string) {
    if (!selected.includes(v)) onChange([...selected, v]);
    setSearch(""); setIsDropdownOpen(false);
  }

  function removeIngredient(v: string) {
    onChange(selected.filter((s) => s !== v));
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImagePreview(ev.target?.result as string);
      setIsAnalyzing(true);
      setTimeout(() => {
        const detectedList = getRandomDetectedIngredients();
        setDetected(detectedList);
        setIsAnalyzing(false);
        const newIngredients = [...selected];
        detectedList.forEach((d) => { if (!newIngredients.includes(d)) newIngredients.push(d); });
        onChange(newIngredients);
      }, 1800);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="nv-card">
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
        <div className="nv-icon-box">
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#4ade80" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </div>
        <div>
          <p className="nv-label">Ingredients</p>
          <p style={{ fontSize: "0.82rem", color: "#d1d5db", fontWeight: 500, marginTop: "2px" }}>Search or detect via image</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {/* Left: Image Detection */}
        <div style={{ padding: "16px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}>
          <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#374151", marginBottom: "10px", display: "flex", alignItems: "center", gap: "5px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#4ade80" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            AI Camera
          </p>

          {imagePreview ? (
            <div style={{ position: "relative" }}>
              <img src={imagePreview} alt="Uploaded" style={{ width: "100%", height: "110px", objectFit: "cover", borderRadius: "10px", display: "block", marginBottom: "8px" }} />
              <button
                onClick={() => { setImagePreview(null); setDetected([]); if (fileRef.current) fileRef.current.value = ""; }}
                style={{ position: "absolute", top: "6px", right: "6px", width: "20px", height: "20px", background: "rgba(0,0,0,0.7)", borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
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
                width: "100%", height: "110px",
                border: "1px dashed rgba(255,255,255,0.08)", borderRadius: "12px",
                background: "transparent",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "7px",
                color: "#374151", cursor: "pointer", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(74,222,128,0.3)"; e.currentTarget.style.color = "#6b7280"; e.currentTarget.style.background = "rgba(74,222,128,0.02)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#374151"; e.currentTarget.style.background = "transparent"; }}
            >
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span style={{ fontSize: "0.7rem" }}>Upload photo</span>
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />

          {isAnalyzing && (
            <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "7px", fontSize: "0.7rem", color: "#6b7280" }}>
              <div style={{ width: "11px", height: "11px", border: "1.5px solid #4ade80", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite", flexShrink: 0 }} />
              Analyzing image...
            </div>
          )}

          {!isAnalyzing && detected.length > 0 && (
            <div style={{ marginTop: "10px", padding: "9px 11px", borderRadius: "9px", background: "rgba(74,222,128,0.04)", border: "1px solid rgba(74,222,128,0.1)" }}>
              <p style={{ fontSize: "0.68rem", color: "#86efac", lineHeight: 1.5 }}>
                AI detected: <strong style={{ textTransform: "capitalize" }}>{detected.join(", ")}</strong>
                <br /><span style={{ color: "#374151" }}>(confidence simulated)</span>
              </p>
            </div>
          )}
        </div>

        {/* Right: Search */}
        <div>
          <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#374151", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Search & Select</p>
          <div style={{ position: "relative", marginBottom: "14px" }}>
            <div style={{ position: "absolute", left: "11px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#374151" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search ingredients..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setIsDropdownOpen(true); }}
              onFocus={() => setIsDropdownOpen(true)}
              onBlur={() => setTimeout(() => setIsDropdownOpen(false), 150)}
              className="nv-input"
              style={{ width: "100%", paddingLeft: "34px" }}
            />
            {isDropdownOpen && filtered.length > 0 && (
              <div style={{
                position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0,
                background: "#0d1520", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px", overflow: "hidden", zIndex: 50,
                boxShadow: "0 16px 48px rgba(0,0,0,0.7)", maxHeight: "200px", overflowY: "auto",
              }}>
                {filtered.map((v) => (
                  <button
                    key={v}
                    onMouseDown={() => addIngredient(v)}
                    style={{ width: "100%", textAlign: "left", padding: "9px 14px", fontSize: "0.82rem", color: "#9ca3af", background: "transparent", border: "none", cursor: "pointer", display: "block", textTransform: "capitalize", transition: "all 0.12s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(74,222,128,0.06)"; e.currentTarget.style.color = "#d1d5db"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#9ca3af"; }}
                  >
                    {v}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Selected */}
          <div>
            <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#374151", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Selected {selected.length > 0 ? `(${selected.length})` : ""}
            </p>
            {selected.length === 0 ? (
              <p style={{ fontSize: "0.75rem", color: "#1f2937", fontStyle: "italic" }}>None selected yet</p>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {selected.map((v) => (
                  <span key={v} className="nv-pill" style={{ textTransform: "capitalize" }}>
                    {v}
                    <button
                      onClick={() => removeIngredient(v)}
                      style={{ background: "none", border: "none", cursor: "pointer", padding: "0 0 0 5px", display: "inline-flex", alignItems: "center", color: "#4ade80", opacity: 0.6, transition: "opacity 0.15s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
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
