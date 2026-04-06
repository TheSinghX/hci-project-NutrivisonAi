import { useState } from "react";
import type { BMICategory } from "../data/recipes";
import { getBMICategory } from "../data/recipes";

interface BMISectionProps {
  bmi: number | null;
  bmiCategory: BMICategory | null;
  onUpdate: (bmi: number, category: BMICategory) => void;
}

const categoryBadge: Record<BMICategory, { bg: string; color: string; border: string }> = {
  Underweight: { bg: "rgba(59,130,246,0.12)", color: "#60a5fa", border: "rgba(59,130,246,0.25)" },
  Normal: { bg: "rgba(34,197,94,0.12)", color: "#22c55e", border: "rgba(34,197,94,0.25)" },
  Overweight: { bg: "rgba(234,179,8,0.12)", color: "#eab308", border: "rgba(234,179,8,0.25)" },
  Obese: { bg: "rgba(239,68,68,0.12)", color: "#ef4444", border: "rgba(239,68,68,0.25)" },
};

export function BMISection({ bmi, bmiCategory, onUpdate }: BMISectionProps) {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");

  function handleUpdate() {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) {
      setError("Please enter valid height and weight values.");
      return;
    }
    if (h < 50 || h > 300) { setError("Height must be between 50–300 cm."); return; }
    if (w < 10 || w > 500) { setError("Weight must be between 10–500 kg."); return; }
    setError("");
    const bmiVal = parseFloat((w / ((h / 100) ** 2)).toFixed(1));
    onUpdate(bmiVal, getBMICategory(bmiVal));
  }

  return (
    <div className="nv-card" style={{ height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
        <div className="nv-icon-box">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <p style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase" }}>BMI Calculator</p>
          <p style={{ fontSize: "0.7rem", color: "#6b7280", marginTop: "2px" }}>Enter your measurements</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 500, color: "#9ca3af", marginBottom: "6px" }}>Height (cm)</label>
          <input type="number" placeholder="e.g. 170" value={height} onChange={(e) => setHeight(e.target.value)} className="nv-input" style={{ width: "100%" }} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 500, color: "#9ca3af", marginBottom: "6px" }}>Weight (kg)</label>
          <input type="number" placeholder="e.g. 65" value={weight} onChange={(e) => setWeight(e.target.value)} className="nv-input" style={{ width: "100%" }} />
        </div>
      </div>

      {error && <p style={{ fontSize: "0.72rem", color: "#f87171", marginBottom: "10px" }}>{error}</p>}

      <button className="nv-btn-primary" style={{ width: "100%", marginBottom: "16px" }} onClick={handleUpdate}>Update BMI</button>

      {bmi !== null && bmiCategory !== null && (
        <div style={{ display: "flex", alignItems: "center", gap: "16px", paddingTop: "16px", borderTop: "1px solid #1f2937" }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "0.7rem", color: "#6b7280", marginBottom: "4px" }}>Your BMI</p>
            <p style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", lineHeight: 1 }}>{bmi}</p>
          </div>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "4px 12px",
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
