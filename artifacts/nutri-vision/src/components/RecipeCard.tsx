import type { Recipe } from "../data/recipes";

interface RecipeCardProps {
  recipe: Recipe;
  onViewDetails: (recipe: Recipe) => void;
}

const typeStyle: Record<Recipe["type"], { bg: string; color: string; border: string; dot: string }> = {
  "Low Calorie":  { bg: "rgba(96,165,250,0.08)",  color: "#93c5fd", border: "rgba(96,165,250,0.18)",  dot: "#60a5fa" },
  "High Protein": { bg: "rgba(192,132,252,0.08)", color: "#d8b4fe", border: "rgba(192,132,252,0.18)", dot: "#a855f7" },
  "Balanced":     { bg: "rgba(74,222,128,0.08)",  color: "#86efac", border: "rgba(74,222,128,0.18)",  dot: "#22c55e" },
  "High Energy":  { bg: "rgba(251,146,60,0.08)",  color: "#fdba74", border: "rgba(251,146,60,0.18)",  dot: "#f97316" },
};

export function RecipeCard({ recipe, onViewDetails }: RecipeCardProps) {
  const ts = typeStyle[recipe.type];

  return (
    <div className="nv-recipe-card">
      {/* Top shine */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "14px", gap: "10px" }}>
        <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#f1f5f9", lineHeight: 1.3, flex: 1, letterSpacing: "-0.01em" }}>{recipe.name}</h3>
        <span style={{
          flexShrink: 0,
          display: "inline-flex", alignItems: "center", gap: "5px",
          padding: "3px 9px", borderRadius: "999px",
          fontSize: "0.63rem", fontWeight: 700,
          background: ts.bg, color: ts.color,
          border: `1px solid ${ts.border}`,
        }}>
          <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: ts.dot, flexShrink: 0 }} />
          {recipe.type}
        </span>
      </div>

      {/* Metrics */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
        {[
          { label: "Calories", value: recipe.calories.toString(), color: "#f97316" },
          { label: "Protein",  value: `${recipe.protein}g`,       color: "#a855f7" },
        ].map((m) => (
          <div key={m.label} className="nv-metrics-box" style={{ flex: 1 }}>
            <p style={{ fontSize: "0.62rem", color: "#4b5563", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{m.label}</p>
            <p style={{ fontSize: "1rem", fontWeight: 800, color: m.color, letterSpacing: "-0.02em" }}>{m.value}</p>
          </div>
        ))}
      </div>

      {/* Ingredient tag */}
      <div style={{ marginBottom: "12px" }}>
        <span style={{ fontSize: "0.63rem", color: "#374151", textTransform: "capitalize" }}>
          🥗 Main: <span style={{ color: "#6b7280" }}>{recipe.ingredient}</span>
        </span>
      </div>

      <button
        onClick={() => onViewDetails(recipe)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
          padding: "9px", borderRadius: "10px",
          border: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.02)",
          fontSize: "0.75rem", fontWeight: 600, color: "#6b7280",
          cursor: "pointer", transition: "all 0.2s ease",
          letterSpacing: "0.01em",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(74,222,128,0.3)";
          e.currentTarget.style.color = "#86efac";
          e.currentTarget.style.background = "rgba(74,222,128,0.04)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
          e.currentTarget.style.color = "#6b7280";
          e.currentTarget.style.background = "rgba(255,255,255,0.02)";
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
