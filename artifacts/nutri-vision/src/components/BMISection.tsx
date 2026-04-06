import { useState } from "react";
import type { BMICategory } from "../data/recipes";
import { getBMICategory } from "../data/recipes";

interface BMISectionProps {
  bmi: number | null;
  bmiCategory: BMICategory | null;
  onUpdate: (bmi: number, category: BMICategory) => void;
}

const categoryBadge: Record<BMICategory, { bg: string; color: string; border: string }> = {
  Underweight: { bg: "rgba(96,165,250,0.10)", color: "#93c5fd", border: "rgba(96,165,250,0.18)" },
  Normal:      { bg: "rgba(74,222,128,0.10)", color: "#86efac", border: "rgba(74,222,128,0.18)" },
  Overweight:  { bg: "rgba(251,191,36,0.10)", color: "#fcd34d", border: "rgba(251,191,36,0.18)" },
  Obese:       { bg: "rgba(252,165,165,0.10)", color: "#fca5a5", border: "rgba(252,165,165,0.18)" },
};

export function BMISection({ bmi, bmiCategory, onUpdate }: BMISectionProps) {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");

  function handleUpdate() {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) { setError("Please enter valid height and weight."); return; }
    if (h < 50 || h > 300) { setError("Height must be between 50–300 cm."); return; }
    if (w < 10 || w > 500) { setError("Weight must be between 10–500 kg."); return; }
    setError("");
    const bmiVal = parseFloat((w / ((h / 100) ** 2)).toFixed(1));
    onUpdate(bmiVal, getBMICategory(bmiVal));
  }

  return (
    <div className="nv-card" style={{ height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px" }}>
        <div className="nv-icon-box">
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#4ade80" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", textTransform: "uppercase" }}>BMI Calculator</p>
          <p style={{ fontSize: "0.8rem", color: "#f3f4f6", fontWeight: 500, marginTop: "1px" }}>Your measurements</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
        {[
          { label: "Height (cm)", placeholder: "e.g. 170", value: height, onChange: setHeight },
          { label: "Weight (kg)", placeholder: "e.g. 65", value: weight, onChange: setWeight },
        ].map((f) => (
          <div key={f.label}>
            <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 500, color: "#6b7280", marginBottom: "6px" }}>{f.label}</label>
            <input type="number" placeholder={f.placeholder} value={f.value} onChange={(e) => f.onChange(e.target.value)} className="nv-input" style={{ width: "100%" }} />
          </div>
        ))}
      </div>

      {error && <p style={{ fontSize: "0.7rem", color: "#f87171", marginBottom: "10px" }}>{error}</p>}

      <button className="nv-btn-primary" style={{ width: "100%", marginBottom: "18px", textAlign: "center" }} onClick={handleUpdate}>
        Update BMI
      </button>

      {bmi !== null && bmiCategory !== null && (
        <div style={{ display: "flex", alignItems: "center", gap: "14px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div>
            <p style={{ fontSize: "0.68rem", color: "#6b7280", marginBottom: "4px" }}>Your BMI</p>
            <p style={{ fontSize: "2.25rem", fontWeight: 700, color: "#f3f4f6", lineHeight: 1, letterSpacing: "-0.02em" }}>{bmi}</p>
          </div>
          <div style={{ flex: 1 }} />
          <span style={{
            padding: "5px 12px",
            borderRadius: "999px",
            fontSize: "0.72rem",
            fontWeight: 600,
            background: categoryBadge[bmiCategory].bg,
            color: categoryBadge[bmiCategory].color,
            border: `1px solid ${categoryBadge[bmiCategory].border}`,
          }}>
            {bmiCategory}
          </span>
        </div>
      )}
    </div>
  );
}
