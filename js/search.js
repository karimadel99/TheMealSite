let search = document.querySelector('.search');


async function searchName(name) {
    console.log(name);
    search.innerHTML = `
    <div class="myspinner d-flex justify-content-center align-items-center vh-100">
    <span class="loader"></span>
</div>`
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        search.innerHTML = ''; // Clear previous content

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
            cardBodyDiv.className = 'card-body align-items-start py-3 text-start';

            // Create card title element
            let cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title fs-4';
            cardTitle.textContent = meal.strMeal;

            // Append elements to their parents
            cardBodyDiv.appendChild(cardTitle);
            cardDiv.appendChild(img);
            cardDiv.appendChild(cardBodyDiv);
            colDiv.appendChild(cardDiv);
            search.appendChild(colDiv);
        });

    } catch (error) {
        console.error('Failed to fetch:', error);
    }
}


async function searchLetter(letter) {
    search.innerHTML = `
            <div class="myspinner d-flex justify-content-center align-items-center vh-100">
            <span class="loader"></span>
        </div>`
    console.log(letter);
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        search.innerHTML = ''; // Clear previous content

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
            cardBodyDiv.className = 'card-body align-items-start py-3 text-start';

            // Create card title element
            let cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title fs-4';
            cardTitle.textContent = meal.strMeal;

            // Append elements to their parents
            cardBodyDiv.appendChild(cardTitle);
            cardDiv.appendChild(img);
            cardDiv.appendChild(cardBodyDiv);
            colDiv.appendChild(cardDiv);
            search.appendChild(colDiv);
        });

    } catch (error) {
        console.error('Failed to fetch:', error);
    }
}

