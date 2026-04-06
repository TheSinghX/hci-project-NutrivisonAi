import type { Recipe, BMICategory, Goal } from "../data/recipes";

interface RecipeDetailProps {
  recipe: Recipe;
  bmiCategory: BMICategory | null;
  goal: Goal;
  onBack: () => void;
}

export function RecipeDetail({ recipe, bmiCategory, goal, onBack }: RecipeDetailProps) {
  const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(recipe.name + " recipe")}`;

  return (
    <div className="nv-card animate-fade-in" style={{ marginTop: "16px" }}>
      {/* Back */}
      <button
        onClick={onBack}
        style={{
          display: "flex", alignItems: "center", gap: "7px",
          fontSize: "0.75rem", color: "#6b7280", background: "none", border: "none",
          cursor: "pointer", marginBottom: "22px", padding: 0, transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#f3f4f6")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
      >
        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to recipes
      </button>

      {/* Title row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "14px", marginBottom: "8px" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#f9fafb", letterSpacing: "-0.02em", flex: 1 }}>{recipe.name}</h2>
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="nv-youtube-btn"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          Watch on YouTube
        </a>
      </div>

      {bmiCategory && (
        <p style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "22px" }}>
          For <span style={{ color: "#9ca3af" }}>{bmiCategory} BMI</span>
          {" · "}Goal: <span style={{ color: "#9ca3af" }}>{goal}</span>
        </p>
      )}

      {/* Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "22px" }}>
        {[
          { label: "Calories", value: recipe.calories.toString(), unit: "kcal" },
          { label: "Protein",  value: recipe.protein.toString(),  unit: "g" },
          { label: "Carbs",    value: recipe.carbs.toString(),    unit: "g" },
          { label: "Fats",     value: recipe.fats.toString(),     unit: "g" },
        ].map((m) => (
          <div key={m.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "14px", textAlign: "center" }}>
            <p style={{ fontSize: "0.63rem", color: "#6b7280", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{m.label}</p>
            <p style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f3f4f6", lineHeight: 1, letterSpacing: "-0.02em" }}>{m.value}</p>
            <p style={{ fontSize: "0.63rem", color: "#4b5563", marginTop: "3px" }}>{m.unit}</p>
          </div>
        ))}
      </div>

      {/* Benefits */}
      <div style={{ marginBottom: "22px", padding: "16px 18px", borderRadius: "12px", background: "rgba(74,222,128,0.04)", border: "1px solid rgba(74,222,128,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "8px" }}>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#4ade80" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p style={{ fontSize: "0.63rem", fontWeight: 600, color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.06em" }}>Health Benefits</p>
        </div>
        <p style={{ fontSize: "0.875rem", color: "#d1d5db", lineHeight: 1.65 }}>{recipe.benefits}</p>
      </div>

      {/* Steps */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "16px" }}>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#4ade80" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p style={{ fontSize: "0.63rem", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em" }}>Cooking Steps</p>
        </div>
        <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "13px" }}>
          {recipe.steps.map((step, idx) => (
            <li key={idx} style={{ display: "flex", gap: "12px" }}>
              <span style={{
                flexShrink: 0, width: "24px", height: "24px", borderRadius: "50%",
                background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.68rem", fontWeight: 700, color: "#4ade80", marginTop: "1px",
              }}>
                {idx + 1}
              </span>
              <p style={{ fontSize: "0.875rem", color: "#d1d5db", lineHeight: 1.65 }}>{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
