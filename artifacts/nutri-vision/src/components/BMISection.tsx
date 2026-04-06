import { useState } from "react";
import type { BMICategory } from "../data/recipes";
import { getBMICategory } from "../data/recipes";

interface BMISectionProps {
  bmi: number | null;
  bmiCategory: BMICategory | null;
  onUpdate: (bmi: number, category: BMICategory) => void;
}

const categoryStyle: Record<BMICategory, { bg: string; color: string; border: string; glow: string }> = {
  Underweight: { bg: "rgba(96,165,250,0.1)",  color: "#93c5fd", border: "rgba(96,165,250,0.2)",  glow: "rgba(96,165,250,0.15)" },
  Normal:      { bg: "rgba(74,222,128,0.1)",  color: "#86efac", border: "rgba(74,222,128,0.2)",  glow: "rgba(74,222,128,0.15)" },
  Overweight:  { bg: "rgba(251,191,36,0.1)",  color: "#fcd34d", border: "rgba(251,191,36,0.2)",  glow: "rgba(251,191,36,0.1)" },
  Obese:       { bg: "rgba(252,165,165,0.1)", color: "#fca5a5", border: "rgba(252,165,165,0.2)", glow: "rgba(252,165,165,0.1)" },
};

export function BMISection({ bmi, bmiCategory, onUpdate }: BMISectionProps) {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");

  function handleUpdate() {
    const h = parseFloat(height), w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) { setError("Enter valid height and weight."); return; }
    if (h < 50 || h > 300) { setError("Height: 50–300 cm."); return; }
    if (w < 10 || w > 500) { setError("Weight: 10–500 kg."); return; }
    setError("");
    const bmiVal = parseFloat((w / ((h / 100) ** 2)).toFixed(1));
    onUpdate(bmiVal, getBMICategory(bmiVal));
  }

  const cs = bmiCategory ? categoryStyle[bmiCategory] : null;

  return (
    <div className="nv-card" style={{ height: "100%" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
        <div className="nv-icon-box">
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#4ade80" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <p className="nv-label">BMI Calculator</p>
          <p style={{ fontSize: "0.82rem", color: "#d1d5db", fontWeight: 500, marginTop: "2px" }}>Your measurements</p>
        </div>
      </div>

      {/* Inputs */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
        {[
          { label: "Height (cm)", ph: "170", v: height, set: setHeight },
          { label: "Weight (kg)", ph: "65",  v: weight, set: setWeight },
        ].map((f) => (
          <div key={f.label}>
            <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 500, color: "#4b5563", marginBottom: "6px" }}>{f.label}</label>
            <input type="number" placeholder={f.ph} value={f.v} onChange={(e) => f.set(e.target.value)} className="nv-input" style={{ width: "100%" }} />
          </div>
        ))}
      </div>

      {error && <p style={{ fontSize: "0.7rem", color: "#f87171", marginBottom: "10px" }}>{error}</p>}

      <button className="nv-btn-primary" style={{ width: "100%", marginBottom: "20px", textAlign: "center" }} onClick={handleUpdate}>
        Update BMI
      </button>

      {/* Result */}
      {bmi !== null && bmiCategory !== null && cs && (
        <div style={{
          paddingTop: "16px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: "0.65rem", color: "#4b5563", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Your BMI</p>
              <p style={{ fontSize: "2.75rem", fontWeight: 900, color: "#f9fafb", lineHeight: 1, letterSpacing: "-0.04em" }}>{bmi}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{
                display: "inline-flex", alignItems: "center",
                padding: "5px 14px", borderRadius: "999px",
                fontSize: "0.75rem", fontWeight: 700,
                background: cs.bg, color: cs.color,
                border: `1px solid ${cs.border}`,
                boxShadow: `0 0 16px ${cs.glow}`,
              }}>
                {bmiCategory}
              </span>
            </div>
          </div>
          {/* BMI bar */}
          <div style={{ marginTop: "14px" }}>
            <div style={{ height: "4px", borderRadius: "999px", background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${Math.min((bmi / 40) * 100, 100)}%`,
                background: `linear-gradient(90deg, #4ade80, ${cs.color})`,
                borderRadius: "999px",
                transition: "width 0.5s ease",
              }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
              <span style={{ fontSize: "0.6rem", color: "#374151" }}>15</span>
              <span style={{ fontSize: "0.6rem", color: "#374151" }}>18.5</span>
              <span style={{ fontSize: "0.6rem", color: "#374151" }}>25</span>
              <span style={{ fontSize: "0.6rem", color: "#374151" }}>30</span>
              <span style={{ fontSize: "0.6rem", color: "#374151" }}>40</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
