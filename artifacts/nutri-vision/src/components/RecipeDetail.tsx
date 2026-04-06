import type { Recipe, BMICategory, Goal } from "../data/recipes";

interface RecipeDetailProps {
  recipe: Recipe;
  bmiCategory: BMICategory | null;
  goal: Goal;
  onBack: () => void;
}

const metricColors = [
  { color: "#f97316", glow: "rgba(249,115,22,0.3)"  },
  { color: "#a78bfa", glow: "rgba(167,139,250,0.3)" },
  { color: "#06b6d4", glow: "rgba(6,182,212,0.3)"   },
  { color: "#f43f5e", glow: "rgba(244,63,94,0.3)"   },
];

export function RecipeDetail({ recipe, bmiCategory, goal, onBack }: RecipeDetailProps) {
  const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(recipe.name + " Indian recipe")}`;

  return (
    <div className="nv-card animate-fade-in" style={{ marginTop: "16px", position: "relative" }}>
      {/* Corner glow */}
      <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "180px", height: "180px", borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Back */}
      <button
        onClick={onBack}
        style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "0.72rem", color: "#374151", background: "none", border: "none", cursor: "pointer", marginBottom: "24px", padding: 0, transition: "color 0.2s" }}
        onMouseEnter={e => (e.currentTarget.style.color = "#9ca3af")}
        onMouseLeave={e => (e.currentTarget.style.color = "#374151")}
      >
        <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to protocols
      </button>

      {/* Title + YT */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", marginBottom: "10px", flexWrap: "wrap" }}>
        <h2 style={{ fontSize: "1.75rem", fontWeight: 900, color: "#f9fafb", letterSpacing: "-0.04em", lineHeight: 1.05, flex: 1 }}>
          {recipe.name}
        </h2>
        <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="nv-youtube-btn">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          ▶ Watch Recipe
        </a>
      </div>

      {/* Tags */}
      {bmiCategory && (
        <div style={{ display: "flex", gap: "6px", marginBottom: "28px", flexWrap: "wrap" }}>
          {[
            { label: bmiCategory,  color: "#22c55e" },
            { label: goal,         color: "#06b6d4" },
            { label: recipe.type,  color: "#8b5cf6" },
          ].map(t => (
            <span key={t.label} style={{ fontSize: "0.68rem", fontWeight: 600, padding: "3px 11px", borderRadius: "999px", background: `${t.color}10`, border: `1px solid ${t.color}25`, color: t.color }}>
              {t.label}
            </span>
          ))}
        </div>
      )}

      <hr className="nv-divider" style={{ marginBottom: "28px" }} />

      {/* Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "28px" }}>
        {[
          { label: "Calories", value: String(recipe.calories), unit: "kcal" },
          { label: "Protein",  value: String(recipe.protein),  unit: "g"    },
          { label: "Carbs",    value: String(recipe.carbs),    unit: "g"    },
          { label: "Fats",     value: String(recipe.fats),     unit: "g"    },
        ].map((m, i) => {
          const mc = metricColors[i];
          return (
            <div key={m.label} className="nv-stat-box" style={{ padding: "16px" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(90deg, transparent, ${mc.color}55, transparent)` }} />
              <p style={{ fontSize: "0.58rem", color: "#374151", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.1em" }}>{m.label}</p>
              <p style={{ fontSize: "1.5rem", fontWeight: 900, color: mc.color, letterSpacing: "-0.04em", lineHeight: 1, textShadow: `0 0 16px ${mc.glow}` }}>{m.value}</p>
              <p style={{ fontSize: "0.58rem", color: "#1e293b", marginTop: "3px" }}>{m.unit}</p>
            </div>
          );
        })}
      </div>

      {/* Benefits */}
      <div style={{ padding: "18px 20px", borderRadius: "14px", background: "rgba(34,197,94,0.04)", border: "1px solid rgba(34,197,94,0.1)", marginBottom: "28px", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.4), transparent)" }} />
        <p className="nv-label" style={{ color: "#22c55e", marginBottom: "10px" }}>— Health Benefits</p>
        <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: 1.75 }}>{recipe.benefits}</p>
      </div>

      {/* Steps */}
      <div>
        <p className="nv-label" style={{ color: "#06b6d4", marginBottom: "18px" }}>— Cooking Protocol</p>
        <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
          {recipe.steps.map((step, i) => (
            <li key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <span style={{
                flexShrink: 0, width: "26px", height: "26px", borderRadius: "50%",
                background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.68rem", fontWeight: 800, color: "#06b6d4",
                marginTop: "2px", boxShadow: "0 0 8px rgba(6,182,212,0.15)",
              }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p style={{ fontSize: "0.875rem", color: "#6b7280", lineHeight: 1.75 }}>{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
