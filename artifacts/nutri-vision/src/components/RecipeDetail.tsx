import type { Recipe, BMICategory, Goal } from "../data/recipes";

interface RecipeDetailProps {
  recipe: Recipe;
  bmiCategory: BMICategory | null;
  goal: Goal;
  onBack: () => void;
}

export function RecipeDetail({ recipe, bmiCategory, goal, onBack }: RecipeDetailProps) {
  const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(recipe.name + " Indian recipe")}`;

  return (
    <div className="nv-card animate-fade-in" style={{ marginTop: "16px" }}>
      {/* Back */}
      <button
        onClick={onBack}
        style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", color: "#4b5563", background: "none", border: "none", cursor: "pointer", marginBottom: "24px", padding: 0, transition: "color 0.18s" }}
        onMouseEnter={e => (e.currentTarget.style.color = "#9ca3af")}
        onMouseLeave={e => (e.currentTarget.style.color = "#4b5563")}
      >
        <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to recipes
      </button>

      {/* Title + YouTube */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", marginBottom: "8px", flexWrap: "wrap" }}>
        <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#f9fafb", letterSpacing: "-0.03em", lineHeight: 1.1, flex: 1 }}>
          {recipe.name}
        </h2>
        <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="nv-youtube-btn">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          Watch on YouTube
        </a>
      </div>

      {/* Tags */}
      {bmiCategory && (
        <div style={{ display: "flex", gap: "6px", marginBottom: "28px", flexWrap: "wrap" }}>
          {[bmiCategory + " BMI", goal, recipe.type].map(tag => (
            <span key={tag} style={{ fontSize: "0.68rem", fontWeight: 500, padding: "3px 10px", borderRadius: "999px", background: "#1f2937", color: "#6b7280" }}>
              {tag}
            </span>
          ))}
        </div>
      )}

      <hr className="nv-divider" style={{ marginBottom: "28px" }} />

      {/* Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "28px" }}>
        {[
          { label: "Calories", value: String(recipe.calories), unit: "kcal" },
          { label: "Protein",  value: String(recipe.protein),  unit: "g" },
          { label: "Carbs",    value: String(recipe.carbs),    unit: "g" },
          { label: "Fats",     value: String(recipe.fats),     unit: "g" },
        ].map(m => (
          <div key={m.label} style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "12px", padding: "16px", textAlign: "center" }}>
            <p style={{ fontSize: "0.6rem", color: "#4b5563", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{m.label}</p>
            <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.03em", lineHeight: 1 }}>{m.value}</p>
            <p style={{ fontSize: "0.6rem", color: "#374151", marginTop: "3px" }}>{m.unit}</p>
          </div>
        ))}
      </div>

      {/* Benefits */}
      <div style={{ padding: "16px 20px", borderRadius: "12px", background: "rgba(34,197,94,0.04)", border: "1px solid rgba(34,197,94,0.1)", marginBottom: "28px" }}>
        <p className="nv-label" style={{ color: "#22c55e", marginBottom: "8px" }}>Health Benefits</p>
        <p style={{ fontSize: "0.875rem", color: "#9ca3af", lineHeight: 1.7 }}>{recipe.benefits}</p>
      </div>

      {/* Steps */}
      <div>
        <p className="nv-label" style={{ marginBottom: "18px" }}>Cooking Instructions</p>
        <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
          {recipe.steps.map((step, i) => (
            <li key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <span style={{
                flexShrink: 0, width: "24px", height: "24px", borderRadius: "50%",
                background: "#1f2937", border: "1px solid #374151",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.68rem", fontWeight: 700, color: "#22c55e", marginTop: "2px",
              }}>{i + 1}</span>
              <p style={{ fontSize: "0.875rem", color: "#9ca3af", lineHeight: 1.7 }}>{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
