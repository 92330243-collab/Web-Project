import React, { useState } from 'react';
import avocadoImg from '../assets/Avocado Toast.jpeg';
import smoothieImg from '../assets/Fruit Smoothie.jpeg';
import yogurtImg from '../assets/Greek Yogurt.jpeg';
import chickenImg from '../assets/Grilled Chicken.jpeg';
import quinoaImg from '../assets/Quinoa Salad.jpeg';
import veggieImg from '../assets/Veggie Wrap.jpeg';

const Recipes = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const recipes = [
    {
      id: 1,
      title: "Greek Yogurt Bowl",
      description: "Creamy yogurt with honey, berries, and crunchy granola",
      image: yogurtImg,
      time: "5 min",
      calories: 280,
      category: "Breakfast",
      ingredients: ["Greek yogurt", "Berries", "Honey", "Granola"]
    },
    {
      id: 2,
      title: "Avocado Toast",
      description: "Crispy toast topped with creamy avocado and seasonings",
      image: avocadoImg,
      time: "10 min",
      calories: 320,
      category: "Breakfast",
      ingredients: ["Whole grain bread", "Avocado", "Salt", "Pepper"]
    },
    {
      id: 3,
      title: "Quinoa Salad",
      description: "Fresh quinoa salad with veggies and lemon dressing",
      image: quinoaImg,
      time: "20 min",
      calories: 350,
      category: "Lunch",
      ingredients: ["Quinoa", "Cherry tomatoes", "Cucumber", "Lemon"]
    },
    {
      id: 4,
      title: "Grilled Chicken Bowl",
      description: "Juicy chicken with rice and roasted vegetables",
      image: chickenImg,
      time: "25 min",
      calories: 420,
      category: "Lunch",
      ingredients: ["Chicken breast", "Brown rice", "Broccoli", "Olive oil"]
    },
    {
      id: 5,
      title: "Veggie Wrap",
      description: "Colorful veggies wrapped in a whole wheat tortilla",
      image: veggieImg,
      time: "15 min",
      calories: 300,
      category: "Lunch",
      ingredients: ["Whole wheat tortilla", "Lettuce", "Bell peppers", "Hummus"]
    },
    {
      id: 6,
      title: "Fruit Smoothie",
      description: "Refreshing blend of fruits with a hint of mint",
      image: smoothieImg,
      time: "5 min",
      calories: 250,
      category: "Snack",
      ingredients: ["Banana", "Berries", "Milk", "Mint"]
    }
  ];

  const categories = ["All", "Breakfast", "Lunch", "Snack"];

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory = activeCategory === "All" || recipe.category === activeCategory;
    return matchesCategory;
  });

  return (
    <div className="recipes-page">
      <section className="recipes-hero">
        <div className="container">
          <h1>🍎 Healthy Recipes</h1>
          <p>Discover delicious and nutritious meals for your lifestyle</p>
        </div>
      </section>

      <section className="recipes-section">
        <div className="container">
          <div className="recipes-filters">
            <div className="filter-categories">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="recipes-count">
            <span>{filteredRecipes.length} recipes found</span>
          </div>

          <div className="recipes-grid">
            {filteredRecipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <div className="recipe-image">
                  <img src={recipe.image} alt={recipe.title} />
                  <span className="recipe-badge">{recipe.category}</span>
                </div>
                <div className="recipe-content">
                  <h3>{recipe.title}</h3>
                  <p>{recipe.description}</p>
                  <div className="recipe-meta">
                    <span className="meta-item">⏱️ {recipe.time}</span>
                    <span className="meta-item">🔥 {recipe.calories} kcal</span>
                  </div>
                  <div className="recipe-ingredients">
                    {recipe.ingredients.map((ingredient, index) => (
                      <span key={index} className="ingredient-tag">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredRecipes.length === 0 && (
            <div className="no-results">
              <span>😕</span>
              <h3>No recipes found</h3>
              <p>Try adjusting your filter</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Recipes;