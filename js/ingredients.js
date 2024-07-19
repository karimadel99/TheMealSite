

let ingredients=document.querySelector('.ingredients')

async function getIngredients() {
    ingredients.innerHTML = `
    <div class="myspinner d-flex justify-content-center align-items-center vh-100">
        <span class="loader"></span>
    </div>`;

    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        ingredients.innerHTML = ''; // Clear previous content
        document.title = 'ingredients';
        console.log(data);

        data.meals.forEach(ing => {
            // Create column div
            let colDiv = document.createElement('div');
            colDiv.className = 'col-lg-3 col-md-6 col-sm-12 text-center my-3 area';
            colDiv.onclick = () => getIngMeals(ing.strIngredient);

            // Create icon element
            let icon = document.createElement('i');
            icon.className = 'fa-solid fa-drumstick-bite';
            // Create heading element
            let heading = document.createElement('h3');
            heading.textContent = ing.strIngredient;

            let desc = document.createElement('p');
            if (ing.strDescription) {
                let description = ing.strDescription.split(' ').slice(0, 10).join(' ');
                desc.textContent = description;
         // Append elements to their parents
              colDiv.appendChild(icon);
              colDiv.appendChild(heading);
              ingredients.appendChild(colDiv);
              colDiv.appendChild(desc)
            } 
        });

    } catch (error) {
        console.error('Failed to fetch:', error);
    }
}

async function getIngMeals(ingredient) {
    ingredients.innerHTML = `
    <div class="myspinner d-flex justify-content-center align-items-center vh-100">
    <span class="loader"></span>
</div>`
console.log(ingredient);
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        console.log(data);
        document.title = 'meals';
        ingredients.innerHTML = ''; // Clear previous content

        data.meals.forEach(meal => {
            // Create column div
            let colDiv = document.createElement('div');
            colDiv.className = 'col-lg-3 col-md-6 col-sm-12 my-2';
            colDiv.onclick = () => getMealById(meal.idMeal);

            // Create card div
            let cardDiv = document.createElement('div');
            cardDiv.className = 'card';

            // Create image element
            let img = document.createElement('img');
            img.src = meal.strMealThumb;
            img.className = 'card-img-top';
            img.alt = meal.strMeal;

            // Create card body div
            let cardBodyDiv = document.createElement('div');
            cardBodyDiv.className = 'card-body text-center py-3';

            // Create card title element
            let cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title fs-4';
            cardTitle.textContent = meal.strMeal;

            // Append elements to their parents
            cardBodyDiv.appendChild(cardTitle);
            cardDiv.appendChild(img);
            cardDiv.appendChild(cardBodyDiv);
            colDiv.appendChild(cardDiv);
            ingredients.appendChild(colDiv);
        });

    } catch (error) {
        console.error('Failed to fetch:', error);
    }
}
