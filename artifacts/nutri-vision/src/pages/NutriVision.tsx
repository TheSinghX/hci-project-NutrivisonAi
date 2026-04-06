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
        setTimeout(() => {
          document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }, 1200);
  }

  const canGenerate = bmiCategory !== null && selectedIngredients.length > 0;

  return (
    <div style={{ minHeight: "100vh", background: "#0b0f14", color: "#f9fafb" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 16px 60px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "999px", border: "1px solid rgba(34,197,94,0.2)", background: "rgba(34,197,94,0.05)", fontSize: "0.72rem", fontWeight: 600, color: "#22c55e", marginBottom: "20px" }}>
            <div className="pulse-dot" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22c55e" }} />
            AI-Powered Nutrition
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginBottom: "12px", lineHeight: 1.1 }}>
            Nutri<span style={{ color: "#22c55e" }}>Vision</span>
          </h1>
          <p style={{ fontSize: "1rem", color: "#6b7280", maxWidth: "480px", margin: "0 auto", lineHeight: 1.6 }}>
            AI-powered Indian Nutrition Assistant. Personalized diet recommendations based on your BMI, ingredients and health goals.
          </p>
        </div>

        {/* BMI + Ingredients */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px", marginBottom: "16px", alignItems: "start" }}>
          <BMISection bmi={bmi} bmiCategory={bmiCategory} onUpdate={handleBMIUpdate} />
          <IngredientSection selected={selectedIngredients} onChange={setSelectedIngredients} />
        </div>

        {/* Goal */}
        <div style={{ marginBottom: "32px" }}>
          <GoalSection goal={goal} onChange={setGoal} />
        </div>

        {/* Generate Button */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginBottom: "40px" }}>
          <button
            onClick={handleGenerate}
            disabled={!canGenerate || isGenerating}
            className="nv-btn-generate"
            style={{ opacity: canGenerate && !isGenerating ? 1 : 0.45, cursor: canGenerate && !isGenerating ? "pointer" : "not-allowed" }}
          >
            {isGenerating ? (
              <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "16px", height: "16px", border: "2px solid rgba(0,0,0,0.3)", borderTopColor: "#000", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                AI analyzing your ingredients...
              </span>
            ) : (
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate Diet Plan
              </span>
            )}
          </button>
          {!canGenerate && !isGenerating && (
            <p style={{ fontSize: "0.72rem", color: "#374151" }}>
              {!bmiCategory && !selectedIngredients.length ? "Enter your BMI and select ingredients to get started" :
                !bmiCategory ? "Please update your BMI first" :
                "Add at least one ingredient to continue"}
            </p>
          )}
        </div>

        {/* Results */}
        {recipes !== null && (
          <div id="results-section">
            {recipes.length === 0 ? (
              <div className="nv-card" style={{ textAlign: "center", padding: "48px 24px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#1f2937", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#6b7280" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#d1d5db", marginBottom: "6px" }}>No matching recipes found</p>
                <p style={{ fontSize: "0.8rem", color: "#6b7280" }}>Try selecting different ingredients or adjusting your goal</p>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#fff" }}>
                      {recipes.length} Recipe{recipes.length !== 1 ? "s" : ""} Found
                    </h3>
                    <p style={{ fontSize: "0.72rem", color: "#6b7280", marginTop: "2px" }}>
                      BMI: <span style={{ color: "#9ca3af" }}>{bmiCategory}</span>
                      {" · "}Goal: <span style={{ color: "#9ca3af" }}>{goal}</span>
                    </p>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px" }}>
                  {recipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onViewDetails={(r) => {
                        setSelectedRecipe(r);
                        setTimeout(() => {
                          document.getElementById("detail-section")?.scrollIntoView({ behavior: "smooth" });
                        }, 50);
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
        <div style={{ marginTop: "64px", paddingTop: "24px", borderTop: "1px solid #1f2937", textAlign: "center" }}>
          <p style={{ fontSize: "0.72rem", color: "#374151" }}>
            Nutri-Vision · AI-powered Indian Nutrition Assistant · Recommendations based on BMI &amp; ingredients
          </p>
        </div>
      </div>
    </div>
  );
}
