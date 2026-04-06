import { useState } from "react";
import type { BMICategory, Goal, Recipe } from "../data/recipes";
import { getFilteredRecipes } from "../data/recipes";
import { BMISection } from "../components/BMISection";
import { IngredientSection } from "../components/IngredientSection";
import { GoalSection } from "../components/GoalSection";
import { RecipeCard } from "../components/RecipeCard";
import { RecipeDetail } from "../components/RecipeDetail";

export function NutriVision() {
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<BMICategory | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [goal, setGoal] = useState<Goal>("Maintain");
  const [isGenerating, setIsGenerating] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  function handleBMIUpdate(bmiVal: number, cat: BMICategory) {
    setBmi(bmiVal);
    setBmiCategory(cat);
    setRecipes(null);
    setSelectedRecipe(null);
  }

  function handleGenerate() {
    if (!bmiCategory) return;
    setIsGenerating(true);
    setSelectedRecipe(null);
    setTimeout(() => {
      const results = getFilteredRecipes(selectedIngredients, bmiCategory, goal);
      setRecipes(results);
      setIsGenerating(false);
      if (results.length > 0) {
        setTimeout(() => document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }, 1500);
  }

  const canGenerate = bmiCategory !== null && selectedIngredients.length > 0;

  return (
    <div style={{ minHeight: "100vh", background: "#060a0f", color: "#f1f5f9", position: "relative" }}>
      {/* Background effects */}
      <div className="hero-grid" />
      <div className="hero-glow-left" />
      <div className="hero-glow-right" />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1120px", margin: "0 auto", padding: "64px 20px 96px" }}>

        {/* ── HERO ──────────────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: "72px" }}>

          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 16px", borderRadius: "999px",
            background: "rgba(74,222,128,0.06)",
            border: "1px solid rgba(74,222,128,0.18)",
            fontSize: "0.7rem", fontWeight: 600,
            color: "#86efac", marginBottom: "28px",
            boxShadow: "0 0 24px rgba(74,222,128,0.1)",
          }}>
            <span className="pulse-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", flexShrink: 0, display: "inline-block" }} />
            AI-Powered · Personalized · Indian Nutrition
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: "clamp(3rem, 7vw, 5rem)",
            fontWeight: 900,
            letterSpacing: "-0.05em",
            marginBottom: "20px",
            lineHeight: 1,
          }}>
            <span style={{ color: "#f9fafb" }}>Nutri</span>
            <span className="gradient-text">Vision</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: "1.05rem",
            color: "#4b5563",
            maxWidth: "420px",
            margin: "0 auto 36px",
            lineHeight: 1.7,
          }}>
            Enter your BMI, pick ingredients, and receive a personalized Indian diet plan in seconds.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", justifyContent: "center", gap: "32px", flexWrap: "wrap" }}>
            {[
              { num: "30+", label: "Vegetables" },
              { num: "25+", label: "Recipes" },
              { num: "4",   label: "Health Goals" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <p style={{ fontSize: "1.35rem", fontWeight: 800, color: "#4ade80", letterSpacing: "-0.03em", lineHeight: 1 }}>{s.num}</p>
                <p style={{ fontSize: "0.7rem", color: "#4b5563", marginTop: "3px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── STEP LABELS ───────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700, color: "#4ade80", flexShrink: 0 }}>1</div>
          <p className="nv-label">Set your profile</p>
        </div>

        {/* BMI + Ingredients */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px", marginBottom: "16px", alignItems: "start" }}>
          <BMISection bmi={bmi} bmiCategory={bmiCategory} onUpdate={handleBMIUpdate} />
          <IngredientSection selected={selectedIngredients} onChange={setSelectedIngredients} />
        </div>

        {/* Step 2 */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", marginTop: "8px" }}>
          <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700, color: "#4ade80", flexShrink: 0 }}>2</div>
          <p className="nv-label">Choose your goal</p>
        </div>

        {/* Goal */}
        <div style={{ marginBottom: "52px" }}>
          <GoalSection goal={goal} onChange={setGoal} />
        </div>

        {/* ── GENERATE BUTTON ─────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", marginBottom: "64px" }}>
          {/* Glow halo behind button */}
          <div style={{ position: "relative", display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            {canGenerate && !isGenerating && (
              <div style={{
                position: "absolute",
                inset: "-20px",
                borderRadius: "999px",
                background: "radial-gradient(ellipse, rgba(22,163,74,0.18) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />
            )}
            <button
              onClick={handleGenerate}
              disabled={!canGenerate || isGenerating}
              className="nv-btn-generate"
              style={{ opacity: canGenerate && !isGenerating ? 1 : 0.35, cursor: canGenerate && !isGenerating ? "pointer" : "not-allowed", position: "relative" }}
            >
              {isGenerating ? (
                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "15px", height: "15px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                  Analyzing ingredients and generating diet plan...
                </span>
              ) : (
                <span style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate Diet Plan
                </span>
              )}
            </button>
          </div>

          {!canGenerate && !isGenerating && (
            <p style={{ fontSize: "0.72rem", color: "#374151" }}>
              {!bmiCategory && !selectedIngredients.length
                ? "Complete your profile above to get started"
                : !bmiCategory ? "Update your BMI first"
                : "Add at least one ingredient"}
            </p>
          )}
        </div>

        {/* ── RESULTS ─────────────────────────────────── */}
        {recipes !== null && (
          <div id="results-section" className="animate-fade-in">
            <hr className="nv-divider" style={{ marginBottom: "36px" }} />

            {recipes.length === 0 ? (
              <div className="nv-card" style={{ textAlign: "center", padding: "64px 24px" }}>
                <div style={{
                  width: "52px", height: "52px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 18px",
                }}>
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#4b5563" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "#d1d5db", marginBottom: "7px" }}>No matching recipes found</p>
                <p style={{ fontSize: "0.8rem", color: "#4b5563" }}>Try selecting different ingredients or adjusting your goal</p>
              </div>
            ) : (
              <>
                {/* Results header */}
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "24px", gap: "12px", flexWrap: "wrap" }}>
                  <div>
                    <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#f9fafb", letterSpacing: "-0.03em", marginBottom: "5px" }}>
                      Personalized Recommendations
                    </h3>
                    <p style={{ fontSize: "0.78rem", color: "#4b5563" }}>
                      Based on your BMI &amp; selected ingredients
                      <span style={{ margin: "0 6px", color: "#1f2937" }}>·</span>
                      <span style={{ color: "#6b7280" }}>{recipes.length} recipe{recipes.length !== 1 ? "s" : ""} matched</span>
                      <span style={{ margin: "0 6px", color: "#1f2937" }}>·</span>
                      <span style={{ color: "#4ade80" }}>{bmiCategory}</span>
                      <span style={{ margin: "0 6px", color: "#1f2937" }}>·</span>
                      <span style={{ color: "#6b7280" }}>{goal}</span>
                    </p>
                  </div>
                  {/* Count badge */}
                  <div style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.15)", borderRadius: "12px", padding: "8px 16px", flexShrink: 0 }}>
                    <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#4ade80", lineHeight: 1, textAlign: "center" }}>{recipes.length}</p>
                    <p style={{ fontSize: "0.6rem", color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "2px" }}>Recipes</p>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px" }}>
                  {recipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onViewDetails={(r) => {
                        setSelectedRecipe(r);
                        setTimeout(() => document.getElementById("detail-section")?.scrollIntoView({ behavior: "smooth" }), 50);
                      }}
                    />
                  ))}
                </div>

                {selectedRecipe && (
                  <div id="detail-section">
                    <RecipeDetail
                      recipe={selectedRecipe}
                      bmiCategory={bmiCategory}
                      goal={goal}
                      onBack={() => setSelectedRecipe(null)}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: "96px", paddingTop: "28px", borderTop: "1px solid rgba(255,255,255,0.04)", textAlign: "center" }}>
          <p style={{ fontSize: "0.68rem", color: "#1f2937", letterSpacing: "0.05em" }}>
            NUTRIVISION &middot; AI-POWERED INDIAN NUTRITION ASSISTANT
          </p>
        </div>
      </div>
    </div>
  );
}
