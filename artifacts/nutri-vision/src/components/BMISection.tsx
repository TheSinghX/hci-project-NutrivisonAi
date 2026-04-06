import { useState } from "react";
import type { BMICategory } from "../data/recipes";
import { getBMICategory } from "../data/recipes";

interface BMISectionProps {
  bmi: number | null;
  bmiCategory: BMICategory | null;
  onUpdate: (bmi: number, category: BMICategory) => void;
}

const catStyle: Record<BMICategory, { color: string; glow: string; label: string }> = {
  Underweight: { color: "#60a5fa", glow: "rgba(96,165,250,0.4)",  label: "Underweight" },
  Normal:      { color: "#22c55e", glow: "rgba(34,197,94,0.4)",   label: "Normal"      },
  Overweight:  { color: "#fbbf24", glow: "rgba(251,191,36,0.4)",  label: "Overweight"  },
  Obese:       { color: "#f87171", glow: "rgba(248,113,113,0.4)", label: "Obese"       },
};

export function BMISection({ bmi, bmiCategory, onUpdate }: BMISectionProps) {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");

  function handleUpdate() {
    const h = parseFloat(height), w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) { setError("Invalid values."); return; }
    if (h < 50 || h > 300) { setError("Height: 50–300 cm"); return; }
    if (w < 10 || w > 500) { setError("Weight: 10–500 kg"); return; }
    setError("");
    const val = parseFloat((w / ((h / 100) ** 2)).toFixed(1));
    onUpdate(val, getBMICategory(val));
  }

  const cs = bmiCategory ? catStyle[bmiCategory] : null;

  return (
    <div className="nv-card" style={{ height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px" }}>
        <div className="nv-icon-box">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <p className="nv-label" style={{ color: "#22c55e" }}>Biometric Input</p>
          <p style={{ fontSize: "0.82rem", color: "#9ca3af", marginTop: "1px" }}>Body measurements</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
        {[
          { label: "Height (cm)", ph: "170", v: height, set: setHeight },
          { label: "Weight (kg)", ph: "65",  v: weight, set: setWeight },
        ].map(f => (
          <div key={f.label}>
            <label style={{ display: "block", fontSize: "0.62rem", color: "#374151", fontWeight: 600, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{f.label}</label>
            <input type="number" placeholder={f.ph} value={f.v} onChange={e => f.set(e.target.value)} className="nv-input" style={{ width: "100%" }} />
          </div>
        ))}
      </div>

      {error && <p style={{ fontSize: "0.68rem", color: "#f87171", marginBottom: "10px" }}>{error}</p>}

      <button className="nv-btn-primary" style={{ width: "100%", marginBottom: "20px", textAlign: "center" }} onClick={handleUpdate}>
        Calibrate BMI
      </button>

      {bmi !== null && bmiCategory !== null && cs && (
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "18px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <div>
              <p style={{ fontSize: "0.6rem", color: "#374151", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>BMI Index</p>
              <p style={{ fontSize: "3.25rem", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1, color: cs.color, textShadow: `0 0 24px ${cs.glow}` }}>
                {bmi}
              </p>
            </div>
            <span style={{
              padding: "5px 14px", borderRadius: "999px",
              fontSize: "0.72rem", fontWeight: 700,
              color: cs.color,
              background: `${cs.color}14`,
              border: `1px solid ${cs.color}33`,
              boxShadow: `0 0 14px ${cs.color}22`,
            }}>
              {cs.label}
            </span>
          </div>
          {/* Progress bar */}
          <div style={{ height: "3px", background: "rgba(255,255,255,0.05)", borderRadius: "999px", overflow: "hidden", marginBottom: "5px" }}>
            <div style={{
              height: "100%",
              width: `${Math.min(Math.max(((bmi - 15) / 25) * 100, 2), 100)}%`,
              background: `linear-gradient(90deg, #22c55e, ${cs.color})`,
              borderRadius: "999px",
              boxShadow: `0 0 8px ${cs.color}66`,
              transition: "width 0.6s ease",
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {["15", "18.5", "25", "30", "40"].map(v => <span key={v} style={{ fontSize: "0.56rem", color: "#1e293b" }}>{v}</span>)}
          </div>
        </div>
      )}
    </div>
  );
}
