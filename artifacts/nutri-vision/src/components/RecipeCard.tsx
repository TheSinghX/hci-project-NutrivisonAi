import type { Recipe } from "../data/recipes";

interface RecipeCardProps {
  recipe: Recipe;
  onViewDetails: (recipe: Recipe) => void;
}

const typeStyle: Record<Recipe["type"], { bg: string; color: string }> = {
  "Low Calorie":  { bg: "rgba(96,165,250,0.1)",  color: "#93c5fd" },
  "High Protein": { bg: "rgba(167,139,250,0.1)", color: "#c4b5fd" },
  "Balanced":     { bg: "rgba(34,197,94,0.1)",   color: "#86efac" },
  "High Energy":  { bg: "rgba(251,146,60,0.1)",  color: "#fdba74" },
};

export function RecipeCard({ recipe, onViewDetails }: RecipeCardProps) {
  const ts = typeStyle[recipe.type];
  return (
    <div className="nv-recipe-card">
      {/* Name + badge */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px", marginBottom: "16px" }}>
        <h3 style={{ fontSize: "0.92rem", fontWeight: 700, color: "#f1f5f9", lineHeight: 1.35, flex: 1, letterSpacing: "-0.01em" }}>
          {recipe.name}
        </h3>
        <span style={{ flexShrink: 0, padding: "3px 10px", borderRadius: "999px", fontSize: "0.63rem", fontWeight: 600, background: ts.bg, color: ts.color, whiteSpace: "nowrap" }}>
          {recipe.type}
        </span>
      </div>

      {/* Metrics */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {[
          { label: "Calories", value: String(recipe.calories) },
          { label: "Protein",  value: `${recipe.protein}g`   },
          { label: "Carbs",    value: `${recipe.carbs}g`     },
        ].map(m => (
          <div key={m.label} style={{ flex: 1, background: "#0f172a", border: "1px solid #1e293b", borderRadius: "10px", padding: "10px 8px", textAlign: "center" }}>
            <p style={{ fontSize: "0.6rem", color: "#4b5563", marginBottom: "3px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{m.label}</p>
            <p style={{ fontSize: "0.92rem", fontWeight: 700, color: "#f1f5f9" }}>{m.value}</p>
          </div>
        ))}
      </div>

      {/* View button */}
      <button
        onClick={() => onViewDetails(recipe)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
          padding: "9px 12px", borderRadius: "9px",
          border: "1px solid #1f2937", background: "transparent",
          fontSize: "0.75rem", fontWeight: 500, color: "#6b7280", cursor: "pointer",
          transition: "all 0.18s",
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(34,197,94,0.3)"; e.currentTarget.style.color = "#f1f5f9"; e.currentTarget.style.background = "rgba(34,197,94,0.04)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "#1f2937"; e.currentTarget.style.color = "#6b7280"; e.currentTarget.style.background = "transparent"; }}
      >
        View details
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
