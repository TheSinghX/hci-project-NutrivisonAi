import type { Recipe } from "../data/recipes";

interface RecipeCardProps {
  recipe: Recipe;
  onViewDetails: (recipe: Recipe) => void;
}

const typeStyle: Record<Recipe["type"], { bg: string; color: string; glow: string }> = {
  "Low Calorie":  { bg: "rgba(96,165,250,0.09)",  color: "#93c5fd", glow: "rgba(96,165,250,0.3)"  },
  "High Protein": { bg: "rgba(167,139,250,0.09)", color: "#c4b5fd", glow: "rgba(167,139,250,0.3)" },
  "Balanced":     { bg: "rgba(34,197,94,0.09)",   color: "#86efac", glow: "rgba(34,197,94,0.3)"   },
  "High Energy":  { bg: "rgba(251,146,60,0.09)",  color: "#fdba74", glow: "rgba(251,146,60,0.3)"  },
};

export function RecipeCard({ recipe, onViewDetails }: RecipeCardProps) {
  const ts = typeStyle[recipe.type];
  return (
    <div className="nv-recipe-card">
      {/* Name + badge */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px", marginBottom: "16px" }}>
        <h3 style={{ fontSize: "0.92rem", fontWeight: 700, color: "#f1f5f9", lineHeight: 1.3, flex: 1, letterSpacing: "-0.01em" }}>
          {recipe.name}
        </h3>
        <span style={{
          flexShrink: 0, padding: "3px 10px", borderRadius: "999px",
          fontSize: "0.62rem", fontWeight: 700,
          background: ts.bg, color: ts.color,
          border: `1px solid ${ts.color}30`,
          boxShadow: `0 0 10px ${ts.glow}20`,
          whiteSpace: "nowrap",
        }}>
          {recipe.type}
        </span>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
        {[
          { label: "CAL", value: String(recipe.calories), color: "#f97316" },
          { label: "PRO", value: `${recipe.protein}g`,   color: "#a78bfa" },
          { label: "NET", value: `${recipe.carbs}g`,     color: "#06b6d4" },
        ].map(m => (
          <div key={m.label} className="nv-stat-box" style={{ flex: 1 }}>
            <p style={{ fontSize: "0.58rem", color: "#374151", marginBottom: "4px", letterSpacing: "0.1em" }}>{m.label}</p>
            <p style={{ fontSize: "0.9rem", fontWeight: 800, color: m.color, textShadow: `0 0 10px ${m.color}44` }}>{m.value}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => onViewDetails(recipe)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
          padding: "9px", borderRadius: "9px",
          border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)",
          fontSize: "0.75rem", fontWeight: 600, color: "#4b5563", cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = "rgba(6,182,212,0.3)";
          e.currentTarget.style.color = "#06b6d4";
          e.currentTarget.style.background = "rgba(6,182,212,0.05)";
          e.currentTarget.style.boxShadow = "0 0 16px rgba(6,182,212,0.1)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
          e.currentTarget.style.color = "#4b5563";
          e.currentTarget.style.background = "rgba(255,255,255,0.02)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        View Details
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
