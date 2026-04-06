import type { Recipe } from "../data/recipes";

interface RecipeCardProps {
  recipe: Recipe;
  onViewDetails: (recipe: Recipe) => void;
}

const typeStyle: Record<Recipe["type"], { bg: string; color: string; border: string }> = {
  "Low Calorie":  { bg: "rgba(96,165,250,0.08)",  color: "#93c5fd", border: "rgba(96,165,250,0.15)"  },
  "High Protein": { bg: "rgba(192,132,252,0.08)", color: "#d8b4fe", border: "rgba(192,132,252,0.15)" },
  "Balanced":     { bg: "rgba(74,222,128,0.08)",  color: "#86efac", border: "rgba(74,222,128,0.15)"  },
  "High Energy":  { bg: "rgba(251,146,60,0.08)",  color: "#fdba74", border: "rgba(251,146,60,0.15)"  },
};

export function RecipeCard({ recipe, onViewDetails }: RecipeCardProps) {
  const ts = typeStyle[recipe.type];

  return (
    <div className="nv-recipe-card">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "14px", gap: "10px" }}>
        <h3 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#f3f4f6", lineHeight: 1.35, flex: 1 }}>{recipe.name}</h3>
        <span style={{
          flexShrink: 0,
          display: "inline-flex",
          alignItems: "center",
          padding: "3px 9px",
          borderRadius: "999px",
          fontSize: "0.65rem",
          fontWeight: 600,
          background: ts.bg,
          color: ts.color,
          border: `1px solid ${ts.border}`,
          whiteSpace: "nowrap",
        }}>
          {recipe.type}
        </span>
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
        {[
          { label: "Calories", value: recipe.calories.toString() },
          { label: "Protein",  value: `${recipe.protein}g` },
        ].map((m) => (
          <div key={m.label} className="nv-metrics-box" style={{ flex: 1 }}>
            <p style={{ fontSize: "0.63rem", color: "#6b7280", marginBottom: "3px" }}>{m.label}</p>
            <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#f3f4f6" }}>{m.value}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => onViewDetails(recipe)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          padding: "8px",
          borderRadius: "9px",
          border: "1px solid rgba(255,255,255,0.07)",
          background: "transparent",
          fontSize: "0.75rem",
          fontWeight: 500,
          color: "#9ca3af",
          cursor: "pointer",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(74,222,128,0.3)";
          e.currentTarget.style.color = "#f3f4f6";
          e.currentTarget.style.background = "rgba(74,222,128,0.04)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
          e.currentTarget.style.color = "#9ca3af";
          e.currentTarget.style.background = "transparent";
        }}
      >
        View Details
        <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
