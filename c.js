const recipesContainer = document.getElementById('recipes-container');

fetch('https://.dummyjson.com/recipes')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch recipes');
        }
        return response.json();
    })
    .then(data => {
        data.forEach(recipe => {
            const recipeElement = document.createElement('div');
            recipeElement.classList.add('recipe');
            recipeElement.innerHTML = `
                <h2>${recipe.title}</h2>
                <p>${recipe.description}</p>
                <ul>
                    ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
                <p>Instructions: ${recipe.instructions}</p>
            `;
            recipesContainer.appendChild(recipeElement);
        });
    })
    .catch(error => {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = error.message;
        errorMessage.style.color = '#ff0000';
        recipesContainer.appendChild(errorMessage);
    });