document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "3339445204d6423097503b8f165c23d5"; // Your Spoonacular API key
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");
    const recipeContainer = document.getElementById("recipe");
    const facts = document.getElementById("fac");

    // Event listener for the search button
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query) {
            fetchRecipe(query);
        } else {
            alert("Please enter a dish name!");
        }
    });

    // Function to fetch recipe based on the query
    function fetchRecipe(query) {
        const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}&number=1`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.results.length > 0) {
                    const recipeId = data.results[0].id;
                    fetchRecipeDetails(recipeId);
                } else {
                    recipeContainer.innerHTML = "<p>No recipes found. Try another dish!</p>";
                }
            })
            .catch((error) => {
                console.error("Error fetching recipe:", error);
                recipeContainer.innerHTML = "<p>Failed to fetch recipe. Please try again.</p>";
            });
    }

    // Function to fetch recipe details based on the recipe ID
    function fetchRecipeDetails(recipeId) {
        const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                displayRecipe(data);
            })
            .catch((error) => {
                console.error("Error fetching recipe details:", error);
                recipeContainer.innerHTML = "<p>Failed to fetch recipe details. Please try again.</p>";
            });
    }

    // Function to display the recipe
    function displayRecipe(recipe) {
        const ingredientsList = recipe.extendedIngredients
            .map((ingredient) => `<li>${ingredient.original}</li>`)
            .join("");

        const instructions = recipe.instructions 
            ? recipe.instructions.replace(/<[^>]+>/g, '') // Remove HTML tags from instructions
            : "No instructions available.";

        recipeContainer.innerHTML = `
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}" style="max-width: 100%; height: auto;">
            <h3>Ingredients:</h3>
            <ul>${ingredientsList}</ul>
            <h3>Instructions:</h3>
            <p>${instructions}</p>
        `;
    }

    // Function to fetch food trivia
    function fetchFoodTrivia() {
        const apiUrl = `https://api.spoonacular.com/food/trivia/random?apiKey=${apiKey}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // Log the data to the console
                facts.innerHTML = `<p>${data.text}</p>`; // Display the trivia text
            })
            .catch((error) => {
                console.error("Error fetching food trivia:", error);
                facts.innerHTML = "<p>Failed to fetch food trivia. Please try again.</p>";
            });
    }

    setInterval(() => {
        fetchFoodTrivia();
    }, 3000);
});