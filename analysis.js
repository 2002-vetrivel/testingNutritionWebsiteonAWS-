document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("search");
    const issue = document.getElementById("issue");
    const resultContainer = document.getElementById("resultContainer");
    const resultElements = {
        first: document.getElementById("first"),
        second: document.getElementById("second"),
        third: document.getElementById("third"),
        fourth: document.getElementById("fourth"),
        fifth: document.getElementById("fifth"),
        sixth: document.getElementById("sixth"),
        seven: document.getElementById("seven"),
        eight: document.getElementById("eight"),
        nine: document.getElementById("nine")
    };

    // Hide the result container initially
    resultContainer.style.display = "none";

    searchButton.addEventListener("click", () => {
        const input = searchInput.value.trim();
        const API_KEY = "c+Co9lwHhXjtw+hUGd8opg==fmdyks0h26S4DUNb"; 

        // Clear previous results and messages
        issue.innerHTML = "";
        Object.values(resultElements).forEach(el => el.innerHTML = "");
        resultContainer.style.display = "none"; // Hide result container

        if (input === "") {
            issue.innerHTML = "<p style='color:red;'>Input field is empty!</p>";
            return;
        }

        // Show loading indicator
        issue.innerHTML = `<img src="loader.gif" alt="Loading..." style="width:100px">`;

        fetch(`https://api.calorieninjas.com/v1/nutrition?query=${input}`, {
            method: "GET",
            headers: {
                "X-Api-Key": API_KEY
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            issue.innerHTML = ""; // Clear loading indicator

            if (data.items.length === 0) {
                issue.innerHTML = "<p style='color:red;'>No data found!</p>";
                return;
            }

            const item = data.items[0];
            resultElements.first.innerHTML = `<strong>Food:</strong><br> ${item.name}`;
            resultElements.second.innerHTML = `<strong>Calories:</strong><br> ${item.calories} kcal`;
            resultElements.third.innerHTML = `<strong>Protein:</strong><br> ${item.protein_g} g`;
            resultElements.fourth.innerHTML = `<strong>Carbs:</strong><br> ${item.carbohydrates_total_g} g`;
            resultElements.fifth.innerHTML = `<strong>Fat:</strong><br> ${item.fat_total_g} g`;
            resultElements.sixth.innerHTML = `<strong>Sugar:</strong><br> ${item.sugar_g} g`;
            resultElements.seven.innerHTML = `<strong>Cholesterol:</strong><br> ${item.cholesterol_mg} mg`;
            resultElements.eight.innerHTML = `<strong>Saturated fat:</strong><br> ${item.fat_saturated_g} g`;
            resultElements.nine.innerHTML = `<strong>Fiber:</strong><br> ${item.fiber_g} g`;

            // Show the result container only when data is available
            resultContainer.style.display = "block";
        })
        .catch((error) => {
            issue.innerHTML = "<p style='color:red;'>An error occurred. Please try again.</p>";
            resultContainer.style.display = "none"; // Hide result container on error
            console.error("Error:", error);
        });
    });
});