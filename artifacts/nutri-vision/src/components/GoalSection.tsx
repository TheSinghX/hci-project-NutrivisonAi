import type { Goal } from "../data/recipes";

interface GoalSectionProps {
  goal: Goal;
  onChange: (goal: Goal) => void;
}

const goals: { value: Goal; label: string; desc: string; icon: string }[] = [
  { value: "Weight Loss", label: "Weight Loss", desc: "Calorie deficit & high fiber", icon: "↓" },
  { value: "Maintain",    label: "Maintain",    desc: "Balanced daily nutrition",    icon: "—" },
  { value: "Weight Gain", label: "Weight Gain", desc: "Surplus & high protein",       icon: "↑" },
];

export function GoalSection({ goal, onChange }: GoalSectionProps) {
  return (
    <div className="nv-card">
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px" }}>
        <div className="nv-icon-box">
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#4ade80" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", textTransform: "uppercase" }}>Health Goal</p>
          <p style={{ fontSize: "0.8rem", color: "#f3f4f6", fontWeight: 500, marginTop: "1px" }}>What are you aiming for?</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
        {goals.map((g) => {
          const active = goal === g.value;
          return (
            <button
              key={g.value}
              onClick={() => onChange(g.value)}
              style={{
                position: "relative",
                padding: "18px 14px",
                borderRadius: "12px",
                border: active ? "1px solid rgba(74,222,128,0.3)" : "1px solid rgba(255,255,255,0.05)",
                background: active ? "rgba(74,222,128,0.07)" : "rgba(255,255,255,0.02)",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {active && (
                <div style={{ position: "absolute", top: "10px", right: "10px", width: "16px", height: "16px", borderRadius: "50%", background: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="9" height="9" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              <div style={{ fontSize: "1.25rem", fontWeight: 700, color: active ? "#4ade80" : "#6b7280", marginBottom: "6px" }}>{g.icon}</div>
              <p style={{ fontSize: "0.8rem", fontWeight: 600, color: active ? "#f3f4f6" : "#d1d5db", marginBottom: "3px" }}>{g.label}</p>
              <p style={{ fontSize: "0.7rem", color: "#6b7280", lineHeight: 1.3 }}>{g.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
