import type { Goal } from "../data/recipes";

interface GoalSectionProps {
  goal: Goal;
  onChange: (goal: Goal) => void;
}

const goals: { value: Goal; label: string; desc: string; color: string; icon: string }[] = [
  { value: "Weight Loss", label: "Weight Loss",  desc: "Deficit · High fiber · Fat burn",    color: "#60a5fa", icon: "↓" },
  { value: "Maintain",    label: "Maintain",     desc: "Balance · Steady nutrition",          color: "#22c55e", icon: "◈" },
  { value: "Weight Gain", label: "Weight Gain",  desc: "Surplus · Anabolic · High protein",  color: "#f97316", icon: "↑" },
];

export function GoalSection({ goal, onChange }: GoalSectionProps) {
  return (
    <div className="nv-card">
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px" }}>
        <div className="nv-icon-box">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#06b6d4" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <p className="nv-label" style={{ color: "#06b6d4" }}>Mission Objective</p>
          <p style={{ fontSize: "0.82rem", color: "#9ca3af", marginTop: "1px" }}>Select your health protocol</p>
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
                padding: "20px 16px", borderRadius: "14px",
                border: active ? `1px solid ${g.color}44` : "1px solid rgba(255,255,255,0.06)",
                background: active ? `${g.color}0a` : "rgba(255,255,255,0.02)",
                textAlign: "left", cursor: "pointer",
                transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                position: "relative", overflow: "hidden",
                boxShadow: active ? `0 0 24px ${g.color}15, inset 0 0 24px ${g.color}05` : "none",
                transform: active ? "scale(1.01)" : "scale(1)",
              }}
            >
              {/* Top line */}
              {active && (
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(90deg, transparent, ${g.color}66, transparent)` }} />
              )}
              {/* Check */}
              {active && (
                <div style={{ position: "absolute", top: "10px", right: "10px", width: "16px", height: "16px", borderRadius: "50%", background: g.color, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 10px ${g.color}66` }}>
                  <svg width="9" height="9" fill="none" viewBox="0 0 24 24" stroke="#000" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              <div style={{ fontSize: "1.5rem", fontWeight: 900, color: active ? g.color : "#1e293b", marginBottom: "8px", textShadow: active ? `0 0 12px ${g.color}66` : "none" }}>{g.icon}</div>
              <p style={{ fontSize: "0.85rem", fontWeight: 700, color: active ? "#f9fafb" : "#6b7280", marginBottom: "4px" }}>{g.label}</p>
              <p style={{ fontSize: "0.68rem", color: active ? "#6b7280" : "#1e293b", lineHeight: 1.4 }}>{g.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
