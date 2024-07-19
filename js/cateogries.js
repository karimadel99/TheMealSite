
let Rowdata = document.querySelector('.data');

async function getAllCategories() {
    Rowdata.innerHTML = `
<div class="myspinner d-flex justify-content-center align-items-center vh-100">
<span class="loader"></span>
</div>`
    try {
        let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        document.title = 'categories';
        let data = await response.json();
        Rowdata.innerHTML = '';
        for (let i = 0; i < data.categories.length; i++) {
            let category = data.categories[i];
            let description = category.strCategoryDescription.split(' ').slice(0, 10).join(' ');

            // Create column div
            let colDiv = document.createElement('div');
            colDiv.className = 'col-lg-3 col-md-6 col-sm-12 my-2';
            colDiv.onclick = () => getMealsByCategory(category.strCategory);

            // Create card div
            let cardDiv = document.createElement('div');
            cardDiv.className = 'card';

            // Create image element
            let img = document.createElement('img');
            img.src = category.strCategoryThumb;
            img.className = 'card-img-top';
            img.alt = category.strCategory;

            // Create card body div
            let cardBodyDiv = document.createElement('div');
            cardBodyDiv.className = 'card-body text-center py-3';

            // Create card title element
            let cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title fs-4';
            cardTitle.textContent = category.strCategory;

            // Create card text element
            let cardText = document.createElement('p');
            cardText.className = 'card-text fs-6';
            cardText.textContent = description;

            // Append elements to their parents
            cardBodyDiv.appendChild(cardTitle);
            cardBodyDiv.appendChild(cardText);
            cardDiv.appendChild(img);
            cardDiv.appendChild(cardBodyDiv);
            colDiv.appendChild(cardDiv);
            Rowdata.appendChild(colDiv);
        }
        console.log(data);
    } catch (error) {
        console.error('Failed to fetch:', error);
    }
}






async function getMealsByCategory(Searchcategory) {
    Rowdata.innerHTML = `
    <div class="myspinner d-flex justify-content-center align-items-center vh-100">
    <span class="loader"></span>
</div>`
    console.log(Searchcategory);
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${Searchcategory}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        document.title = 'meals';
        Rowdata.innerHTML = ''; // Clear previous content

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
            Rowdata.appendChild(colDiv);
        });

    } catch (error) {
        console.error('Failed to fetch:', error);
    }
}

