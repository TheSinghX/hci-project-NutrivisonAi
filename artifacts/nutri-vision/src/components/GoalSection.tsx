import type { Goal } from "../data/recipes";

interface GoalSectionProps {
  goal: Goal;
  onChange: (goal: Goal) => void;
}

const goals: { value: Goal; label: string; desc: string; icon: string; color: string; glow: string }[] = [
  { value: "Weight Loss", label: "Weight Loss", desc: "Calorie deficit & high fiber", icon: "↓", color: "#60a5fa", glow: "rgba(96,165,250,0.12)" },
  { value: "Maintain",    label: "Maintain",    desc: "Balanced daily nutrition",   icon: "—", color: "#4ade80", glow: "rgba(74,222,128,0.12)" },
  { value: "Weight Gain", label: "Weight Gain", desc: "Calorie surplus & protein",  icon: "↑", color: "#fb923c", glow: "rgba(251,146,60,0.12)" },
];

export function GoalSection({ goal, onChange }: GoalSectionProps) {
  return (
    <div className="nv-card">
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
        <div className="nv-icon-box">
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#4ade80" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <p className="nv-label">Health Goal</p>
          <p style={{ fontSize: "0.82rem", color: "#d1d5db", fontWeight: 500, marginTop: "2px" }}>What are you aiming for?</p>
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
                padding: "20px 16px",
                borderRadius: "14px",
                border: active ? `1px solid rgba(255,255,255,0.1)` : "1px solid rgba(255,255,255,0.05)",
                background: active ? g.glow : "rgba(255,255,255,0.02)",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
                boxShadow: active ? `0 0 24px ${g.glow}, 0 4px 16px rgba(0,0,0,0.3)` : "none",
                overflow: "hidden",
              }}
            >
              {/* Shine line on top */}
              {active && (
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                  background: `linear-gradient(90deg, transparent, ${g.color}55, transparent)`,
                }} />
              )}
              {/* Check */}
              {active && (
                <div style={{
                  position: "absolute", top: "10px", right: "10px",
                  width: "16px", height: "16px", borderRadius: "50%",
                  background: g.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 0 8px ${g.color}66`,
                }}>
                  <svg width="9" height="9" fill="none" viewBox="0 0 24 24" stroke="#000" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              <div style={{
                fontSize: "1.6rem", fontWeight: 900,
                color: active ? g.color : "#374151",
                marginBottom: "8px", lineHeight: 1,
                textShadow: active ? `0 0 20px ${g.color}66` : "none",
              }}>
                {g.icon}
              </div>
              <p style={{ fontSize: "0.82rem", fontWeight: 700, color: active ? "#f1f5f9" : "#6b7280", marginBottom: "4px" }}>{g.label}</p>
              <p style={{ fontSize: "0.7rem", color: active ? "#9ca3af" : "#374151", lineHeight: 1.4 }}>{g.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
