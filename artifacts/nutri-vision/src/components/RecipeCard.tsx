import type { Recipe } from "../data/recipes";

interface RecipeCardProps {
  recipe: Recipe;
  onViewDetails: (recipe: Recipe) => void;
}

const typeStyle: Record<Recipe["type"], { bg: string; color: string; border: string }> = {
  "Low Calorie": { bg: "rgba(59,130,246,0.10)", color: "#60a5fa", border: "rgba(59,130,246,0.20)" },
  "High Protein": { bg: "rgba(168,85,247,0.10)", color: "#c084fc", border: "rgba(168,85,247,0.20)" },
  Balanced: { bg: "rgba(34,197,94,0.10)", color: "#4ade80", border: "rgba(34,197,94,0.20)" },
  "High Energy": { bg: "rgba(249,115,22,0.10)", color: "#fb923c", border: "rgba(249,115,22,0.20)" },
};

export function RecipeCard({ recipe, onViewDetails }: RecipeCardProps) {
  const ts = typeStyle[recipe.type];

  return (
    <div className="nv-recipe-card">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px", gap: "8px" }}>
        <h3 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#fff", lineHeight: 1.3, flex: 1 }}>{recipe.name}</h3>
        <span style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", padding: "2px 8px", borderRadius: "999px", fontSize: "0.65rem", fontWeight: 600, background: ts.bg, color: ts.color, border: `1px solid ${ts.border}`, whiteSpace: "nowrap" }}>
          {recipe.type}
        </span>
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
        <div className="nv-metrics-box" style={{ flex: 1 }}>
          <p style={{ fontSize: "0.65rem", color: "#6b7280", marginBottom: "2px" }}>Calories</p>
          <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#fff" }}>{recipe.calories}</p>
        </div>
        <div className="nv-metrics-box" style={{ flex: 1 }}>
          <p style={{ fontSize: "0.65rem", color: "#6b7280", marginBottom: "2px" }}>Protein</p>
          <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#fff" }}>{recipe.protein}g</p>
        </div>
      </div>

      <button
        onClick={() => onViewDetails(recipe)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "8px", borderRadius: "10px", border: "1px solid #374151", background: "transparent", fontSize: "0.75rem", fontWeight: 500, color: "#9ca3af", cursor: "pointer", transition: "all 0.2s" }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(34,197,94,0.4)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(34,197,94,0.05)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#374151"; e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.background = "transparent"; }}
      >
        View Details
        <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
