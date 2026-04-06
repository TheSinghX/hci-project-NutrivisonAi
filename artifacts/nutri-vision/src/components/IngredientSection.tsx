import { useState, useRef } from "react";
import { VEGETABLE_OPTIONS, DETECTED_INGREDIENTS_MAP } from "../data/recipes";

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
    setSearch("");
    setIsDropdownOpen(false);
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
        const keys = Object.keys(DETECTED_INGREDIENTS_MAP);
        const detectedList = DETECTED_INGREDIENTS_MAP[keys[Math.floor(Math.random() * keys.length)]];
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
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
        <div className="nv-icon-box">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </div>
        <div>
          <p style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase" }}>Ingredients</p>
          <p style={{ fontSize: "0.7rem", color: "#6b7280", marginTop: "2px" }}>Search or upload an image</p>
        </div>
      </div>

      <div style={{ marginBottom: "18px", padding: "14px", borderRadius: "12px", border: "1px solid #1f2937", background: "rgba(17,24,39,0.5)" }}>
        <p style={{ fontSize: "0.72rem", fontWeight: 500, color: "#9ca3af", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          AI Image Detection
        </p>

        {imagePreview ? (
          <div style={{ position: "relative" }}>
            <img src={imagePreview} alt="Uploaded" style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "10px", display: "block", marginBottom: "10px" }} />
            <button
              onClick={() => { setImagePreview(null); setDetected([]); if (fileRef.current) fileRef.current.value = ""; }}
              style={{ position: "absolute", top: "8px", right: "8px", width: "24px", height: "24px", background: "rgba(0,0,0,0.6)", borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#d1d5db" }}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileRef.current?.click()}
            style={{ width: "100%", height: "90px", border: "1px dashed #374151", borderRadius: "12px", background: "transparent", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", color: "#6b7280", cursor: "pointer", transition: "all 0.2s" }}
          >
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span style={{ fontSize: "0.75rem" }}>Click to upload image</span>
          </button>
        )}
        <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />

        {isAnalyzing && (
          <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", color: "#22c55e" }}>
            <div style={{ width: "12px", height: "12px", border: "2px solid #22c55e", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
            Analyzing image with AI...
          </div>
        )}

        {!isAnalyzing && detected.length > 0 && (
          <div style={{ marginTop: "10px" }}>
            <p style={{ fontSize: "0.72rem", color: "#9ca3af", marginBottom: "4px" }}>
              Detected: <span style={{ color: "#22c55e", textTransform: "capitalize" }}>{detected.join(", ")}</span>
            </p>
            <p style={{ fontSize: "0.7rem", color: "#4b5563" }}>Added to your ingredient list automatically.</p>
          </div>
        )}
      </div>

      <div style={{ marginBottom: "14px" }}>
        <p style={{ fontSize: "0.72rem", fontWeight: 500, color: "#9ca3af", marginBottom: "8px" }}>Search Ingredients</p>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search and add ingredients..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setIsDropdownOpen(true); }}
            onFocus={() => setIsDropdownOpen(true)}
            onBlur={() => setTimeout(() => setIsDropdownOpen(false), 150)}
            className="nv-input"
            style={{ width: "100%", paddingLeft: "38px" }}
          />
          {isDropdownOpen && filtered.length > 0 && (
            <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "#111827", border: "1px solid #374151", borderRadius: "12px", overflow: "hidden", zIndex: 50, boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
              {filtered.map((v) => (
                <button
                  key={v}
                  onMouseDown={() => addIngredient(v)}
                  style={{ width: "100%", textAlign: "left", padding: "10px 16px", fontSize: "0.875rem", color: "#d1d5db", background: "transparent", border: "none", cursor: "pointer", display: "block", textTransform: "capitalize", transition: "background 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#1f2937")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  {v}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {selected.length > 0 && (
        <div>
          <p style={{ fontSize: "0.72rem", fontWeight: 500, color: "#9ca3af", marginBottom: "8px" }}>Selected ({selected.length})</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {selected.map((v) => (
              <span key={v} className="nv-pill" style={{ textTransform: "capitalize" }}>
                {v}
                <button
                  onClick={() => removeIngredient(v)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", opacity: 0.7, marginLeft: "4px", color: "#22c55e" }}
                >
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
