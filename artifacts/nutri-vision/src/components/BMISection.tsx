import { useState } from "react";
import type { BMICategory } from "../data/recipes";
import { getBMICategory } from "../data/recipes";

interface BMISectionProps {
  bmi: number | null;
  bmiCategory: BMICategory | null;
  onUpdate: (bmi: number, category: BMICategory) => void;
}

const categoryPill: Record<BMICategory, { bg: string; color: string }> = {
  Underweight: { bg: "rgba(96,165,250,0.12)",  color: "#93c5fd" },
  Normal:      { bg: "rgba(34,197,94,0.12)",   color: "#86efac" },
  Overweight:  { bg: "rgba(234,179,8,0.12)",   color: "#fde047" },
  Obese:       { bg: "rgba(239,68,68,0.12)",   color: "#fca5a5" },
};

export function BMISection({ bmi, bmiCategory, onUpdate }: BMISectionProps) {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");

  function handleUpdate() {
    const h = parseFloat(height), w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) { setError("Enter valid values."); return; }
    if (h < 50 || h > 300) { setError("Height: 50–300 cm"); return; }
    if (w < 10 || w > 500) { setError("Weight: 10–500 kg"); return; }
    setError("");
    const val = parseFloat((w / ((h / 100) ** 2)).toFixed(1));
    onUpdate(val, getBMICategory(val));
  }

  const cp = bmiCategory ? categoryPill[bmiCategory] : null;

  return (
    <div className="nv-card" style={{ height: "100%" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px" }}>
        <div className="nv-icon-box">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <p className="nv-label">BMI Calculator</p>
          <p style={{ fontSize: "0.82rem", color: "#9ca3af", marginTop: "1px" }}>Enter your measurements</p>
        </div>
      </div>

      {/* Inputs */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
        {[{ label: "Height (cm)", ph: "170", v: height, set: setHeight }, { label: "Weight (kg)", ph: "65", v: weight, set: setWeight }].map(f => (
          <div key={f.label}>
            <label style={{ display: "block", fontSize: "0.68rem", color: "#4b5563", fontWeight: 500, marginBottom: "6px" }}>{f.label}</label>
            <input type="number" placeholder={f.ph} value={f.v} onChange={e => f.set(e.target.value)} className="nv-input" style={{ width: "100%" }} />
          </div>
        ))}
      </div>

      {error && <p style={{ fontSize: "0.7rem", color: "#f87171", marginBottom: "10px" }}>{error}</p>}

      <button className="nv-btn-primary" style={{ width: "100%", marginBottom: "20px", textAlign: "center" }} onClick={handleUpdate}>
        Update BMI
      </button>

      {/* Result */}
      {bmi !== null && bmiCategory !== null && cp && (
        <div style={{ borderTop: "1px solid #1f2937", paddingTop: "18px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <div>
              <p style={{ fontSize: "0.65rem", color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>Your BMI</p>
              <p style={{ fontSize: "3rem", fontWeight: 800, color: "#f9fafb", lineHeight: 1, letterSpacing: "-0.04em" }}>{bmi}</p>
            </div>
            <span style={{ padding: "5px 14px", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 600, background: cp.bg, color: cp.color }}>
              {bmiCategory}
            </span>
          </div>
          {/* Progress bar */}
          <div style={{ height: "3px", background: "#1f2937", borderRadius: "999px", overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${Math.min(Math.max(((bmi - 15) / 25) * 100, 2), 100)}%`,
              background: "linear-gradient(90deg, #22c55e, #86efac)",
              borderRadius: "999px",
              transition: "width 0.5s ease",
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
            {["15", "18.5", "25", "30", "40"].map(v => (
              <span key={v} style={{ fontSize: "0.58rem", color: "#374151" }}>{v}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
