import { useState } from "react";
import type { BMICategory, Goal, Recipe } from "../data/recipes";
import { getFilteredRecipes } from "../data/recipes";
import { BMISection } from "../components/BMISection";
import { IngredientSection } from "../components/IngredientSection";
import { GoalSection } from "../components/GoalSection";
import { RecipeCard } from "../components/RecipeCard";
import { RecipeDetail } from "../components/RecipeDetail";

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: `${Math.random() * 3 + 1.5}px`,
  delay: `${Math.random() * 12}s`,
  duration: `${Math.random() * 12 + 10}s`,
  color: i % 3 === 0 ? "#22c55e" : i % 3 === 1 ? "#06b6d4" : "#8b5cf6",
}));

export function NutriVision() {
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<BMICategory | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [goal, setGoal] = useState<Goal>("Maintain");
  const [isGenerating, setIsGenerating] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  function handleBMIUpdate(bmiVal: number, cat: BMICategory) {
    setBmi(bmiVal); setBmiCategory(cat);
    setRecipes(null); setSelectedRecipe(null);
  }

  function handleGenerate() {
    if (!bmiCategory) return;
    setIsGenerating(true); setSelectedRecipe(null);
    setTimeout(() => {
      const results = getFilteredRecipes(selectedIngredients, bmiCategory, goal);
      setRecipes(results); setIsGenerating(false);
      setTimeout(() => document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth" }), 80);
    }, 1600);
  }

  const canGenerate = !!bmiCategory && selectedIngredients.length > 0;

  return (
    <div style={{ minHeight: "100vh", background: "#020617", color: "#f1f5f9", position: "relative" }}>
      {/* Animated bg */}
      <div className="nv-bg" />

      {/* Floating particles */}
      {PARTICLES.map(p => (
        <div
          key={p.id}
          className="nv-particle"
          style={{
            left: p.left,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 6px ${p.color}`,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto", padding: "64px 24px 96px" }}>

        {/* ── HERO ─────────────────────────────────── */}
        <div style={{ marginBottom: "72px" }}>
          {/* Status badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 14px", borderRadius: "999px",
            background: "rgba(34,197,94,0.07)",
            border: "1px solid rgba(34,197,94,0.2)",
            marginBottom: "28px",
            boxShadow: "0 0 20px rgba(34,197,94,0.08)",
          }}>
            <span className="pulse-dot" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22c55e", display: "inline-block", flexShrink: 0 }} />
            <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#22c55e", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              AI Active · Neural Engine Online
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1, marginBottom: "18px" }}>
            <span style={{ color: "#f9fafb" }}>Nutri</span>
            <span className="gradient-text">Vision</span>
          </h1>

          <p style={{ fontSize: "1rem", color: "#4b5563", maxWidth: "480px", lineHeight: 1.7, marginBottom: "36px" }}>
            AI-powered Indian nutrition intelligence. Input your biometrics, select ingredients,
            and receive a precision-calibrated diet protocol.
          </p>

          {/* Live stats */}
          <div style={{ display: "flex", gap: "28px", flexWrap: "wrap" }}>
            {[
              { val: "30+", label: "Vegetables", color: "#22c55e" },
              { val: "25+", label: "Recipes",    color: "#06b6d4" },
              { val: "99%", label: "Accuracy",   color: "#8b5cf6" },
            ].map(s => (
              <div key={s.label}>
                <p className="glow-pulse" style={{ fontSize: "1.5rem", fontWeight: 900, color: s.color, letterSpacing: "-0.03em", lineHeight: 1, textShadow: `0 0 16px ${s.color}66` }}>{s.val}</p>
                <p style={{ fontSize: "0.62rem", color: "#374151", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "3px" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── STEP LABEL ───────────────────────────── */}
        <StepLabel n={1} label="BIOMETRIC INPUT" color="#22c55e" />

        {/* ── PROFILE ──────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "minmax(260px,1fr) 2fr", gap: "16px", marginBottom: "16px", alignItems: "start" }}>
          <BMISection bmi={bmi} bmiCategory={bmiCategory} onUpdate={handleBMIUpdate} />
          <IngredientSection selected={selectedIngredients} onChange={setSelectedIngredients} />
        </div>

        <StepLabel n={2} label="MISSION OBJECTIVE" color="#06b6d4" />

        <div style={{ marginBottom: "52px" }}>
          <GoalSection goal={goal} onChange={setGoal} />
        </div>

        {/* ── GENERATE ─────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", marginBottom: "72px" }}>
          <div style={{ position: "relative" }}>
            {canGenerate && !isGenerating && (
              <div style={{ position: "absolute", inset: "-24px", borderRadius: "999px", background: "radial-gradient(ellipse, rgba(22,163,74,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />
            )}
            <button
              onClick={handleGenerate}
              disabled={!canGenerate || isGenerating}
              className="nv-btn-generate"
              style={{ opacity: canGenerate && !isGenerating ? 1 : 0.3, cursor: canGenerate && !isGenerating ? "pointer" : "not-allowed" }}
            >
              {isGenerating ? (
                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "15px", height: "15px", border: "2px solid rgba(255,255,255,0.25)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.75s linear infinite" }} />
                  Analyzing ingredients and generating diet plan...
                </span>
              ) : (
                <span style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate Diet Plan
                </span>
              )}
            </button>
          </div>
          {!canGenerate && !isGenerating && (
            <p style={{ fontSize: "0.7rem", color: "#1e293b" }}>
              {!bmiCategory && !selectedIngredients.length ? "Enter BMI and select ingredients to initialize"
                : !bmiCategory ? "BMI calibration required"
                : "Select at least one ingredient"}
            </p>
          )}
        </div>

        {/* ── RESULTS ──────────────────────────────── */}
        {recipes !== null && (
          <div id="results-section" className="animate-fade-in">
            <hr className="nv-divider" style={{ marginBottom: "40px" }} />
            {recipes.length === 0 ? (
              <div className="nv-card" style={{ textAlign: "center", padding: "56px 24px" }}>
                <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "#d1d5db", marginBottom: "8px" }}>No matching protocols found</p>
                <p style={{ fontSize: "0.8rem", color: "#374151" }}>Recalibrate your ingredient selection or adjust mission objective.</p>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
                  <div>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#f9fafb", letterSpacing: "-0.03em", marginBottom: "5px" }}>
                      Personalized Recommendations
                    </h2>
                    <p style={{ fontSize: "0.75rem", color: "#374151" }}>
                      Protocol calibrated for <span style={{ color: "#22c55e" }}>{bmiCategory}</span>
                      <span style={{ color: "#1e293b", margin: "0 6px" }}>·</span>
                      <span style={{ color: "#06b6d4" }}>{goal}</span>
                    </p>
                  </div>
                  <div style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.18)", borderRadius: "12px", padding: "10px 18px", textAlign: "center" }}>
                    <p style={{ fontSize: "1.5rem", fontWeight: 900, color: "#22c55e", lineHeight: 1, textShadow: "0 0 16px rgba(34,197,94,0.4)" }}>{recipes.length}</p>
                    <p style={{ fontSize: "0.58rem", color: "#374151", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "2px" }}>Recipes</p>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "16px" }}>
                  {recipes.map(recipe => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onViewDetails={r => {
                        setSelectedRecipe(r);
                        setTimeout(() => document.getElementById("detail-section")?.scrollIntoView({ behavior: "smooth" }), 60);
                      }}
                    />
                  ))}
                </div>

                {selectedRecipe && (
                  <div id="detail-section">
                    <RecipeDetail recipe={selectedRecipe} bmiCategory={bmiCategory} goal={goal} onBack={() => setSelectedRecipe(null)} />
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: "96px", paddingTop: "24px", borderTop: "1px solid #0f172a", textAlign: "center" }}>
          <p style={{ fontSize: "0.62rem", color: "#0f172a", letterSpacing: "0.1em" }}>NUTRIVISION · AI NUTRITION INTELLIGENCE SYSTEM · v2.0</p>
        </div>
      </div>
    </div>
  );
}

function StepLabel({ n, label, color }: { n: number; label: string; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
      <span style={{
        width: "20px", height: "20px", borderRadius: "50%",
        background: `${color}15`, border: `1px solid ${color}33`,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        fontSize: "0.6rem", fontWeight: 800, color, flexShrink: 0,
        boxShadow: `0 0 8px ${color}22`,
      }}>{n}</span>
      <span style={{ fontSize: "0.6rem", fontWeight: 800, color: color + "99", letterSpacing: "0.12em", textTransform: "uppercase" }}>{label}</span>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${color}22, transparent)` }} />
    </div>
  );
}
