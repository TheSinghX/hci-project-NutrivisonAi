import type { Goal } from "../data/recipes";

interface GoalSectionProps {
  goal: Goal;
  onChange: (goal: Goal) => void;
}

const goals: { value: Goal; label: string; desc: string; icon: string }[] = [
  { value: "Weight Loss", label: "Weight Loss", desc: "Calorie deficit, high fiber", icon: "↓" },
  { value: "Maintain", label: "Maintain", desc: "Balanced nutrition", icon: "=" },
  { value: "Weight Gain", label: "Weight Gain", desc: "Calorie surplus, high protein", icon: "↑" },
];

export function GoalSection({ goal, onChange }: GoalSectionProps) {
  return (
    <div className="nv-card">
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
        <div className="nv-icon-box">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <p style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase" }}>Health Goal</p>
          <p style={{ fontSize: "0.7rem", color: "#6b7280", marginTop: "2px" }}>Select your target</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
        {goals.map((g) => {
          const isActive = goal === g.value;
          return (
            <button
              key={g.value}
              onClick={() => onChange(g.value)}
              style={{
                position: "relative",
                padding: "16px",
                borderRadius: "12px",
                border: isActive ? "1px solid rgba(34,197,94,0.5)" : "1px solid #1f2937",
                background: isActive ? "rgba(34,197,94,0.08)" : "rgba(17,24,39,0.5)",
                color: isActive ? "#fff" : "#9ca3af",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {isActive && (
                <div style={{ position: "absolute", top: "8px", right: "8px", width: "16px", height: "16px", borderRadius: "50%", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="#000" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#22c55e", marginBottom: "4px" }}>{g.icon}</div>
              <p style={{ fontSize: "0.78rem", fontWeight: 600, marginBottom: "2px", color: isActive ? "#fff" : "#d1d5db" }}>{g.label}</p>
              <p style={{ fontSize: "0.7rem", color: "#6b7280" }}>{g.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
