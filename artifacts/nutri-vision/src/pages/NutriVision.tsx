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
      setTimeout(() => document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth" }), 80);
    }, 1500);
  }

  const canGenerate = !!bmiCategory && selectedIngredients.length > 0;

  return (
    <div style={{ minHeight: "100vh", background: "#0b0f14", color: "#f1f5f9" }}>
      <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "72px 24px 96px" }}>

        {/* ── HEADER ─────────────────────────────── */}
        <div style={{ marginBottom: "64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <span className="status-dot" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
            <span className="nv-label" style={{ color: "#22c55e" }}>AI-Powered Indian Nutrition</span>
          </div>
          <h1 style={{
            fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
            fontWeight: 800,
            color: "#f9fafb",
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            marginBottom: "16px",
          }}>
            Nutri<span style={{ color: "#22c55e" }}>Vision</span>
          </h1>
          <p style={{ fontSize: "1rem", color: "#6b7280", maxWidth: "400px", lineHeight: 1.65 }}>
            Personalized Indian recipe recommendations based on your body metrics and health goals.
          </p>
        </div>

        {/* ── STEP 1: BMI + INGREDIENTS ──────────── */}
        <div style={{ marginBottom: "6px" }}>
          <StepLabel n={1} text="Your profile" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(260px, 1fr) 2fr", gap: "16px", marginBottom: "16px", alignItems: "start" }}>
          <BMISection bmi={bmi} bmiCategory={bmiCategory} onUpdate={handleBMIUpdate} />
          <IngredientSection selected={selectedIngredients} onChange={setSelectedIngredients} />
        </div>

        {/* ── STEP 2: GOAL ────────────────────────── */}
        <div style={{ marginBottom: "6px", marginTop: "8px" }}>
          <StepLabel n={2} text="Health goal" />
        </div>
        <div style={{ marginBottom: "48px" }}>
          <GoalSection goal={goal} onChange={setGoal} />
        </div>

        {/* ── GENERATE ────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", marginBottom: "64px" }}>
          <button
            onClick={handleGenerate}
            disabled={!canGenerate || isGenerating}
            className="nv-btn-generate"
            style={{ opacity: canGenerate && !isGenerating ? 1 : 0.35, cursor: canGenerate && !isGenerating ? "pointer" : "not-allowed" }}
          >
            {isGenerating ? (
              <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "15px", height: "15px", border: "2px solid rgba(255,255,255,0.25)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite", flexShrink: 0 }} />
                Analyzing ingredients and generating diet plan...
              </span>
            ) : (
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate Diet Plan
              </span>
            )}
          </button>
          {!canGenerate && !isGenerating && (
            <p style={{ fontSize: "0.72rem", color: "#374151" }}>
              {!bmiCategory && !selectedIngredients.length ? "Enter your BMI and choose ingredients to begin"
                : !bmiCategory ? "Update your BMI first"
                : "Add at least one ingredient"}
            </p>
          )}
        </div>

        {/* ── RESULTS ─────────────────────────────── */}
        {recipes !== null && (
          <div id="results-section" className="animate-fade-in">
            <hr className="nv-divider" style={{ marginBottom: "40px" }} />

            {recipes.length === 0 ? (
              <div className="nv-card" style={{ textAlign: "center", padding: "56px 24px" }}>
                <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "#d1d5db", marginBottom: "8px" }}>No matching recipes found</p>
                <p style={{ fontSize: "0.8rem", color: "#4b5563" }}>Try different ingredients or adjust your health goal.</p>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "24px", gap: "12px", flexWrap: "wrap" }}>
                  <div>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#f9fafb", letterSpacing: "-0.02em", marginBottom: "4px" }}>
                      Personalized Recommendations
                    </h2>
                    <p style={{ fontSize: "0.78rem", color: "#4b5563" }}>
                      Based on your BMI &amp; selected ingredients
                      <span style={{ color: "#1f2937", margin: "0 6px" }}>·</span>
                      <span style={{ color: "#6b7280" }}>{bmiCategory}</span>
                      <span style={{ color: "#1f2937", margin: "0 6px" }}>·</span>
                      <span style={{ color: "#6b7280" }}>{goal}</span>
                    </p>
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "#4b5563", flexShrink: 0 }}>
                    {recipes.length} recipe{recipes.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(288px, 1fr))", gap: "16px" }}>
                  {recipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onViewDetails={(r) => {
                        setSelectedRecipe(r);
                        setTimeout(() => document.getElementById("detail-section")?.scrollIntoView({ behavior: "smooth" }), 60);
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

        {/* ── FOOTER ──────────────────────────────── */}
        <div style={{ marginTop: "96px", paddingTop: "24px", borderTop: "1px solid #111827", textAlign: "center" }}>
          <p style={{ fontSize: "0.68rem", color: "#1f2937", letterSpacing: "0.06em" }}>NUTRIVISION · AI-POWERED INDIAN NUTRITION</p>
        </div>
      </div>
    </div>
  );
}

function StepLabel({ n, text }: { n: number; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
      <span style={{
        width: "20px", height: "20px", borderRadius: "50%",
        background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        fontSize: "0.62rem", fontWeight: 700, color: "#22c55e", flexShrink: 0,
      }}>{n}</span>
      <span className="nv-label">{text}</span>
    </div>
  );
}
