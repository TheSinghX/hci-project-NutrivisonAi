import type { Goal } from "../data/recipes";

interface GoalSectionProps {
  goal: Goal;
  onChange: (goal: Goal) => void;
}

const goals: { value: Goal; label: string; desc: string }[] = [
  { value: "Weight Loss", label: "Weight Loss",  desc: "Calorie deficit, high fiber"    },
  { value: "Maintain",    label: "Maintain",     desc: "Balanced daily nutrition"       },
  { value: "Weight Gain", label: "Weight Gain",  desc: "Calorie surplus, high protein"  },
];

export function GoalSection({ goal, onChange }: GoalSectionProps) {
  return (
    <div className="nv-card">
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px" }}>
        <div className="nv-icon-box">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <p className="nv-label">Health Goal</p>
          <p style={{ fontSize: "0.82rem", color: "#9ca3af", marginTop: "1px" }}>What are you working towards?</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
        {goals.map(g => {
          const active = goal === g.value;
          return (
            <button
              key={g.value}
              onClick={() => onChange(g.value)}
              style={{
                padding: "18px 16px",
                borderRadius: "12px",
                border: active ? "1px solid rgba(34,197,94,0.3)" : "1px solid #1f2937",
                background: active ? "rgba(34,197,94,0.06)" : "rgba(255,255,255,0.015)",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.18s ease",
                position: "relative",
              }}
            >
              {active && (
                <div style={{ position: "absolute", top: "10px", right: "10px", width: "16px", height: "16px", borderRadius: "50%", background: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="9" height="9" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              <p style={{ fontSize: "0.85rem", fontWeight: 600, color: active ? "#f9fafb" : "#9ca3af", marginBottom: "4px" }}>{g.label}</p>
              <p style={{ fontSize: "0.72rem", color: active ? "#6b7280" : "#374151", lineHeight: 1.4 }}>{g.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
