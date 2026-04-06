import type { Recipe, BMICategory, Goal } from "../data/recipes";

interface RecipeDetailProps {
  recipe: Recipe;
  bmiCategory: BMICategory | null;
  goal: Goal;
  onBack: () => void;
}

export function RecipeDetail({ recipe, bmiCategory, goal, onBack }: RecipeDetailProps) {
  return (
    <div className="nv-card animate-fade-in" style={{ marginTop: "16px" }}>
      <button
        onClick={onBack}
        style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", color: "#9ca3af", background: "none", border: "none", cursor: "pointer", marginBottom: "20px", padding: 0, transition: "color 0.2s" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
      >
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Recipes
      </button>

      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "6px" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#fff", flex: 1 }}>{recipe.name}</h2>
          <span style={{ flexShrink: 0, padding: "3px 10px", borderRadius: "999px", fontSize: "0.7rem", fontWeight: 600, background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)", marginTop: "4px" }}>
            {recipe.type}
          </span>
        </div>
        {bmiCategory && (
          <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>
            Recommended for <span style={{ color: "#d1d5db" }}>{bmiCategory} BMI</span>
            {" · "}Goal: <span style={{ color: "#d1d5db" }}>{goal}</span>
          </p>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "20px" }}>
        {[
          { label: "Calories", value: recipe.calories.toString(), unit: "kcal" },
          { label: "Protein", value: recipe.protein.toString(), unit: "g" },
          { label: "Carbs", value: recipe.carbs.toString(), unit: "g" },
          { label: "Fats", value: recipe.fats.toString(), unit: "g" },
        ].map((m) => (
          <div key={m.label} style={{ background: "#0b0f14", border: "1px solid #1f2937", borderRadius: "12px", padding: "12px", textAlign: "center" }}>
            <p style={{ fontSize: "0.65rem", color: "#6b7280", marginBottom: "4px" }}>{m.label}</p>
            <p style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", lineHeight: 1 }}>{m.value}</p>
            <p style={{ fontSize: "0.65rem", color: "#4b5563", marginTop: "2px" }}>{m.unit}</p>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: "20px", padding: "16px", borderRadius: "12px", background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.15)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p style={{ fontSize: "0.65rem", fontWeight: 600, color: "#22c55e", textTransform: "uppercase", letterSpacing: "0.08em" }}>Health Benefits</p>
        </div>
        <p style={{ fontSize: "0.875rem", color: "#d1d5db", lineHeight: 1.6 }}>{recipe.benefits}</p>
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em" }}>Cooking Steps</p>
        </div>
        <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
          {recipe.steps.map((step, idx) => (
            <li key={idx} style={{ display: "flex", gap: "12px" }}>
              <span style={{ flexShrink: 0, width: "24px", height: "24px", borderRadius: "50%", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, color: "#22c55e", marginTop: "2px" }}>
                {idx + 1}
              </span>
              <p style={{ fontSize: "0.875rem", color: "#d1d5db", lineHeight: 1.6 }}>{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
