import { useEffect, useId, useState } from "react";

type Ingredient = {
  quantity: number;
  unit: string;
  item: string;
};

const BASE_SERVINGS = 4;

const ingredients: Ingredient[] = [
  { quantity: 1.5, unit: "lb", item: "boneless, skinless chicken thighs" },
  { quantity: 2, unit: "tbsp", item: "olive oil" },
  { quantity: 2, unit: "cloves", item: "garlic, minced" },
  { quantity: 1, unit: "large", item: "lemon, zested and juiced" },
  { quantity: 1, unit: "tsp", item: "dried oregano" },
  { quantity: 0.5, unit: "tsp", item: "kosher salt" },
  { quantity: 0.25, unit: "tsp", item: "black pepper" },
  { quantity: 2, unit: "tbsp", item: "fresh parsley, chopped" },
];

const method = [
  "Pat the chicken dry. Season both sides with the oregano, salt, and pepper.",
  "Warm the olive oil in a large skillet over medium-high heat. Add the chicken and cook for 5–6 minutes per side, until golden and cooked through.",
  "Lower the heat. Add the garlic, lemon zest, and lemon juice. Cook for 1–2 minutes, stirring gently so the garlic does not burn.",
  "Remove from the heat and rest the chicken for 5 minutes. Scatter with parsley and serve with the pan juices.",
];

function formatQuantity(value: number) {
  if (Number.isInteger(value)) return String(value);
  return value
    .toFixed(2)
    .replace(/0+$/, "")
    .replace(/\.$/, "");
}

function App() {
  const [servings, setServings] = useState(BASE_SERVINGS);
  const [announcement, setAnnouncement] = useState("");
  const servingsId = useId();

  useEffect(() => {
    setAnnouncement(
      `Ingredients updated for ${servings} ${servings === 1 ? "serving" : "servings"}.`
    );
  }, [servings]);

  const changeServings = (next: number) => {
    const safeValue = Math.min(20, Math.max(1, next));
    if (safeValue !== servings) setServings(safeValue);
  };

  return (
    <main className="page">
      <a className="skip-link" href="#recipe-content">
        Skip to recipe
      </a>

      <article className="recipe-card" aria-labelledby="recipe-title">
        <header className="recipe-header">
          <p className="eyebrow">Weeknight dinner</p>
          <h1 id="recipe-title">Lemon Herb Chicken</h1>
          <p className="intro">
            Juicy skillet chicken with bright lemon, garlic, oregano, and fresh
            parsley.
          </p>

          <dl className="recipe-meta" aria-label="Recipe information">
            <div>
              <dt>Prep</dt>
              <dd>10 min</dd>
            </div>
            <div>
              <dt>Cook</dt>
              <dd>15 min</dd>
            </div>
            <div>
              <dt>Total</dt>
              <dd>25 min</dd>
            </div>
          </dl>
        </header>

        <section className="serving-control" aria-labelledby="servings-heading">
          <div>
            <h2 id="servings-heading">Servings</h2>
            <p id={`${servingsId}-help`}>
              Choose how many people you are cooking for. Ingredient quantities
              scale automatically.
            </p>
          </div>

          <div className="stepper" aria-label="Serving size">
            <button
              type="button"
              className="icon-button"
              onClick={() => changeServings(servings - 1)}
              disabled={servings === 1}
              aria-label="Decrease servings"
            >
              <span aria-hidden="true">−</span>
            </button>

            <label htmlFor={servingsId} className="visually-hidden">
              Number of servings
            </label>
            <input
              id={servingsId}
              type="number"
              min="1"
              max="20"
              value={servings}
              onChange={(event) => {
                const value = Number(event.target.value);
                if (Number.isFinite(value)) changeServings(value);
              }}
              aria-describedby={`${servingsId}-help`}
            />

            <button
              type="button"
              className="icon-button"
              onClick={() => changeServings(servings + 1)}
              disabled={servings === 20}
              aria-label="Increase servings"
            >
              <span aria-hidden="true">+</span>
            </button>
          </div>
        </section>

        <div
          className="sr-status"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {announcement}
        </div>

        <div id="recipe-content" className="recipe-grid">
          <section className="recipe-panel" aria-labelledby="ingredients-heading">
            <div className="panel-heading">
              <h2 id="ingredients-heading">Ingredients</h2>
              <span>{servings} servings</span>
            </div>

            <ul className="ingredient-list">
              {ingredients.map((ingredient) => {
                const scaled = (ingredient.quantity / BASE_SERVINGS) * servings;
                return (
                  <li key={ingredient.item}>
                    <span className="quantity" aria-label={`${formatQuantity(scaled)} ${ingredient.unit}`}>
                      {formatQuantity(scaled)} {ingredient.unit}
                    </span>
                    <span>{ingredient.item}</span>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="recipe-panel" aria-labelledby="method-heading">
            <div className="panel-heading">
              <h2 id="method-heading">Method</h2>
              <span>4 steps</span>
            </div>

            <ol className="method-list">
              {method.map((step, index) => (
                <li key={step}>
                  <span className="step-number" aria-hidden="true">
                    {index + 1}
                  </span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </article>
    </main>
  );
}

export default App;