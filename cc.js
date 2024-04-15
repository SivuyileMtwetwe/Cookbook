document.addEventListener('DOMContentLoaded', function() {
    fetch('https://dummyjson.com/recipes')
    .then(res => res.json())
    .then(json => {
        const container = document.getElementById('json-container');
        json.recipes.slice(0,50).forEach(recipe => {
            const card = createCard(recipe);
            container.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error fetching JSON data:', error);
    });

     // Get filter elements
     const cookingTimeSelect = document.getElementById('cookingTime');
     const difficultySelect = document.getElementById('difficulty');
     const mealTypeSelect = document.getElementById('mealType');
 
     // Event listeners for filters
     cookingTimeSelect.addEventListener('change', applyFilters);
     difficultySelect.addEventListener('change', applyFilters);
     mealTypeSelect.addEventListener('change', applyFilters);
 
     function applyFilters() {
         const selectedCookingTime = cookingTimeSelect.value;
         const selectedDifficulty = difficultySelect.value;
         const selectedMealType = mealTypeSelect.value;
 
         // Filter recipes based on user selections
         const filteredRecipes = json.recipes.filter(recipe => {
             return (
                 (selectedCookingTime === 'short' && recipe.cookingTime <= 30) ||
                 (selectedCookingTime === 'medium' && recipe.cookingTime > 30 && recipe.cookingTime <= 60) ||
                 (selectedCookingTime === 'long' && recipe.cookingTime > 60)
             ) && recipe.difficulty === selectedDifficulty && recipe.mealType === selectedMealType;
         });
 
         // Clear existing cards
         const container = document.getElementById('json-container');
         container.innerHTML = '';
 
         // Display filtered recipes
         filteredRecipes.slice(0, 50).forEach(recipe => {
             const card = createCard(recipe);
             container.appendChild(card);
         });
     }
 

     const filteredRecipes = json.recipes.filter(recipe => {
        const cookingTimeInMinutes = parseInt(recipe.cookingTime.replace(/\D/g, ""));
    
        return (
          (selectedCookingTime === 'short' && cookingTimeInMinutes <= 30) ||
          (selectedCookingTime === 'medium' && cookingTimeInMinutes > 30 && cookingTimeInMinutes <= 60) ||
          (selectedCookingTime === 'long' && cookingTimeInMinutes > 60)
        ) && recipe.difficulty === selectedDifficulty && recipe.mealType === selectedMealType;
      });

    function createCard(recipe) {
        const card = document.createElement('div');
        card.classList.add('card');

        const image = document.createElement('img');
        image.src = recipe.image;
        card.appendChild(image);

        const name = document.createElement('h2');
        name.textContent = recipe.name;
        card.appendChild(name);

        const ingredients = document.createElement('p');
        ingredients.innerHTML = `<h5>Ingredients:</h5> ${recipe.ingredients}`;
        card.appendChild(ingredients);
        
        const instructions = document.createElement('p');
        instructions.innerHTML = `<h5>Instructions:</h5> ${recipe.instructions}`;
        card.appendChild(instructions);

        return card;
    }
});
