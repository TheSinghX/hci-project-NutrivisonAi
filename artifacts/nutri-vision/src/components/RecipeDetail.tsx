import type { Recipe, BMICategory, Goal } from "../data/recipes";

interface RecipeDetailProps {
  recipe: Recipe;
  bmiCategory: BMICategory | null;
  goal: Goal;
  onBack: () => void;
}

const metricColors = ["#f97316", "#a855f7", "#38bdf8", "#f43f5e"];

export function RecipeDetail({ recipe, bmiCategory, goal, onBack }: RecipeDetailProps) {
  const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(recipe.name + " recipe Indian")}`;

  return (
    <div className="nv-card animate-fade-in" style={{ marginTop: "16px", position: "relative", overflow: "hidden" }}>
      {/* Decorative top glow */}
      <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Back */}
      <button
        onClick={onBack}
        style={{
          display: "flex", alignItems: "center", gap: "7px",
          fontSize: "0.72rem", color: "#4b5563",
          background: "none", border: "none", cursor: "pointer",
          marginBottom: "24px", padding: 0, transition: "color 0.2s",
          position: "relative",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#d1d5db")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#4b5563")}
      >
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to recipes
      </button>

      {/* Title row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", marginBottom: "10px", flexWrap: "wrap", position: "relative" }}>
        <h2 style={{ fontSize: "1.75rem", fontWeight: 900, color: "#f9fafb", letterSpacing: "-0.04em", flex: 1, lineHeight: 1.05 }}>{recipe.name}</h2>
        <div style={{ display: "flex", gap: "8px", alignItems: "center", flexShrink: 0 }}>
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
      </div>

      {bmiCategory && (
        <div style={{ display: "flex", gap: "6px", marginBottom: "28px", flexWrap: "wrap" }}>
          {[
            { label: bmiCategory + " BMI", color: "#4ade80" },
            { label: goal, color: "#60a5fa" },
            { label: recipe.type, color: "#c084fc" },
          ].map((tag) => (
            <span key={tag.label} style={{
              fontSize: "0.68rem", fontWeight: 600, padding: "3px 10px",
              borderRadius: "999px", background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)", color: tag.color,
            }}>
              {tag.label}
            </span>
          ))}
        </div>
      )}

      {/* Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "24px" }}>
        {[
          { label: "Calories", value: recipe.calories.toString(), unit: "kcal" },
          { label: "Protein",  value: recipe.protein.toString(),  unit: "g" },
          { label: "Carbs",    value: recipe.carbs.toString(),    unit: "g" },
          { label: "Fats",     value: recipe.fats.toString(),     unit: "g" },
        ].map((m, i) => (
          <div key={m.label} style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "14px", padding: "16px", textAlign: "center",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${metricColors[i]}55, transparent)` }} />
            <p style={{ fontSize: "0.6rem", color: "#4b5563", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{m.label}</p>
            <p style={{ fontSize: "1.5rem", fontWeight: 900, color: metricColors[i], lineHeight: 1, letterSpacing: "-0.03em" }}>{m.value}</p>
            <p style={{ fontSize: "0.6rem", color: "#374151", marginTop: "3px" }}>{m.unit}</p>
          </div>
        ))}
      </div>

      {/* Benefits */}
      <div style={{
        marginBottom: "24px", padding: "18px 20px",
        borderRadius: "14px",
        background: "rgba(74,222,128,0.04)",
        border: "1px solid rgba(74,222,128,0.1)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(74,222,128,0.3), transparent)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "10px" }}>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#4ade80" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p style={{ fontSize: "0.62rem", fontWeight: 700, color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.08em" }}>Health Benefits</p>
        </div>
        <p style={{ fontSize: "0.9rem", color: "#d1d5db", lineHeight: 1.7 }}>{recipe.benefits}</p>
      </div>

      {/* Steps */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "18px" }}>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#4ade80" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p style={{ fontSize: "0.62rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em" }}>Cooking Steps</p>
        </div>
        <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
          {recipe.steps.map((step, idx) => (
            <li key={idx} style={{ display: "flex", gap: "14px" }}>
              <span style={{
                flexShrink: 0, width: "26px", height: "26px", borderRadius: "50%",
                background: `rgba(74,222,128,0.08)`,
                border: "1px solid rgba(74,222,128,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.7rem", fontWeight: 800, color: "#4ade80",
                marginTop: "1px", boxShadow: "0 0 10px rgba(74,222,128,0.1)",
              }}>
                {idx + 1}
              </span>
              <p style={{ fontSize: "0.9rem", color: "#cbd5e1", lineHeight: 1.7 }}>{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
