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
    }, 1400);
  }

  const canGenerate = bmiCategory !== null && selectedIngredients.length > 0;

  return (
    <div style={{ minHeight: "100vh", background: "#0b0f14", color: "#f3f4f6" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "56px 20px 80px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            padding: "5px 14px", borderRadius: "999px",
            border: "1px solid rgba(74,222,128,0.15)",
            background: "rgba(74,222,128,0.04)",
            fontSize: "0.7rem", fontWeight: 500, color: "#86efac", marginBottom: "22px",
          }}>
            <div className="pulse-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80" }} />
            Personalized Nutrition
          </div>
          <h1 style={{
            fontSize: "clamp(2.75rem, 6vw, 3.75rem)",
            fontWeight: 800, color: "#f9fafb",
            letterSpacing: "-0.04em", marginBottom: "14px", lineHeight: 1.05,
          }}>
            Nutri<span style={{ color: "#4ade80" }}>Vision</span>
          </h1>
          <p style={{ fontSize: "1rem", color: "#6b7280", maxWidth: "440px", margin: "0 auto", lineHeight: 1.65 }}>
            AI-powered Indian nutrition assistant. Enter your BMI, pick ingredients, and get a personalized diet plan.
          </p>
        </div>

        {/* BMI + Ingredients */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px", marginBottom: "16px", alignItems: "start" }}>
          <BMISection bmi={bmi} bmiCategory={bmiCategory} onUpdate={handleBMIUpdate} />
          <IngredientSection selected={selectedIngredients} onChange={setSelectedIngredients} />
        </div>

        {/* Goal */}
        <div style={{ marginBottom: "40px" }}>
          <GoalSection goal={goal} onChange={setGoal} />
        </div>

        {/* Generate */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", marginBottom: "52px" }}>
          <button
            onClick={handleGenerate}
            disabled={!canGenerate || isGenerating}
            className="nv-btn-generate"
            style={{ opacity: canGenerate && !isGenerating ? 1 : 0.4, cursor: canGenerate && !isGenerating ? "pointer" : "not-allowed" }}
          >
            {isGenerating ? (
              <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "15px", height: "15px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                Analyzing ingredients and generating diet plan...
              </span>
            ) : (
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate Diet Plan
              </span>
            )}
          </button>
          {!canGenerate && !isGenerating && (
            <p style={{ fontSize: "0.72rem", color: "#374151" }}>
              {!bmiCategory && !selectedIngredients.length
                ? "Enter your BMI and add ingredients to begin"
                : !bmiCategory
                ? "Update your BMI first"
                : "Select at least one ingredient to continue"}
            </p>
          )}
        </div>

        {/* Results */}
        {recipes !== null && (
          <div id="results-section">
            {recipes.length === 0 ? (
              <div className="nv-card" style={{ textAlign: "center", padding: "56px 24px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#d1d5db", marginBottom: "6px" }}>No matching recipes found</p>
                <p style={{ fontSize: "0.8rem", color: "#6b7280" }}>Try different ingredients or adjust your goal</p>
              </div>
            ) : (
              <>
                {/* Results header */}
                <div style={{ marginBottom: "20px" }}>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#f3f4f6", letterSpacing: "-0.01em", marginBottom: "4px" }}>
                    Personalized Recommendations
                  </h3>
                  <p style={{ fontSize: "0.78rem", color: "#6b7280" }}>
                    Based on your BMI and selected ingredients &mdash; {recipes.length} recipe{recipes.length !== 1 ? "s" : ""} found
                    {" · "}BMI: <span style={{ color: "#9ca3af" }}>{bmiCategory}</span>
                    {" · "}Goal: <span style={{ color: "#9ca3af" }}>{goal}</span>
                  </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(272px, 1fr))", gap: "14px" }}>
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
        <div style={{ marginTop: "80px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.04)", textAlign: "center" }}>
          <p style={{ fontSize: "0.72rem", color: "#374151" }}>
            NutriVision &middot; AI-Powered Indian Nutrition Assistant
          </p>
        </div>
      </div>
    </div>
  );
}
