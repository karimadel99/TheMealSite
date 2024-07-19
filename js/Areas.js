let areas = document.querySelector('.areas');

async function getAreas() {
    areas.innerHTML = `
    <div class="myspinner d-flex justify-content-center align-items-center vh-100">
        <span class="loader"></span>
    </div>`;

    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        areas.innerHTML = ''; // Clear previous content
        document.title = 'area';

        data.meals.forEach(area => {
            // Create column div
            let colDiv = document.createElement('div');
            colDiv.className = 'col-lg-3 col-md-6 col-sm-12 text-center my-3 area';
            colDiv.onclick = () => getAreaMeals(area.strArea);

            // Create icon element
            let icon = document.createElement('i');
            icon.className = 'fa-solid fa-house-laptop';

            // Create heading element
            let heading = document.createElement('h3');
            heading.textContent = area.strArea;

            // Append elements to their parents
            colDiv.appendChild(icon);
            colDiv.appendChild(heading);
            areas.appendChild(colDiv);
        });

    } catch (error) {
        console.error('Failed to fetch:', error);
    }
}


async function getAreaMeals(area) {
    areas.innerHTML = `
    <div class="myspinner d-flex justify-content-center align-items-center vh-100">
    <span class="loader"></span>
</div>`
console.log(area);
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        console.log(data);
        document.title = 'meals';
        areas.innerHTML = ''; // Clear previous content

        data.meals.slice(0, 20).forEach(meal => {
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
            areas.appendChild(colDiv);
        });

    } catch (error) {
        console.error('Failed to fetch:', error);
    }
}