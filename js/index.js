///<reference types="../@types/jquery"/>



let sidenav = document.querySelector(".sidenav");
let openNavIcon = document.querySelector("#openNavIcon");
let icon = document.querySelector('.nav-toggle');

function openNav() {
    if (sidenav.style.width === "250px") {
        sidenav.style.width = "0";
        openNavIcon.style.marginLeft = "0";
        icon.innerHTML = '☰';
        sidenav.classList.remove("open");
        for (let i = 0; i < 5; i++) {
            $(".sideA a").eq(i).animate({
                top: 0
            }, (i + 5) * 100)
        }
    } else {
        sidenav.style.width = "250px";
        openNavIcon.style.marginLeft = "250px";
        icon.innerHTML = '&times;';
        sidenav.classList.add("open");
        $(".sideA a").animate({
            top: 300
        }, 500)
    }
}


let startMeals=document.querySelector('.start');

async function startPage(name) {
    startMeals.innerHTML = `
    <div class="myspinner d-flex justify-content-center align-items-center vh-100">
    <span class="loader"></span>
</div>`
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        startMeals.innerHTML = ''; // Clear previous content

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
            startMeals.appendChild(colDiv);
        });

    } catch (error) {
        console.error('Failed to fetch:', error);
    }
}




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

let search = document.querySelector('.search');





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

let myModal = document.querySelector('.MYmodal-cont');

async function getMealById(id) {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        let meal = data.meals[0];
        console.log(meal);

        // Disable body scroll
        document.body.classList.add('overflow-hidden');

        myModal.classList.remove('d-none');

        // Clear previous modal content
        myModal.innerHTML = '';

        // Create modal elements
        let modalDiv = document.createElement('div');
        modalDiv.classList.add('MYmodal');

        let closeIcon = document.createElement('i');
        closeIcon.classList.add('fa-solid', 'fa-xmark');
        closeIcon.id = 'close';
        closeIcon.style.position = 'absolute';
        closeIcon.style.right = '20px';
        closeIcon.style.top = '20px';
        
        let rowDiv = document.createElement('div');
        rowDiv.classList.add('row', 'my-4');

        let imgColDiv = document.createElement('div');
        imgColDiv.classList.add('col-lg-4', 'col-12');
        
        let imgDiv = document.createElement('div');
        imgDiv.classList.add('MYmodal-img');
        
        let img = document.createElement('img');
        img.src = meal.strMealThumb;
        img.alt = meal.strMeal;

        imgDiv.appendChild(img);
        imgColDiv.appendChild(imgDiv);
        
        let mealTitle = document.createElement('h2');
        mealTitle.textContent = meal.strMeal;
        
        imgColDiv.appendChild(mealTitle);

        let infoColDiv = document.createElement('div');
        infoColDiv.classList.add('col-lg-6', 'col-12');

        let instructionsTitle = document.createElement('h3');
        instructionsTitle.textContent = 'Instructions';
        instructionsTitle.style.marginTop = '20px';

        let instructions = document.createElement('p');
        instructions.textContent = meal.strInstructions;
        
        let area = document.createElement('h3');
        area.textContent = `Area: ${meal.strArea}`;

        let category = document.createElement('h3');
        category.textContent = `Category: ${meal.strCategory}`;

        let recipesTitle = document.createElement('h3');
        recipesTitle.textContent = 'Recipes';

        let recipesList = document.createElement('ul');
        recipesList.classList.add('list-unstyled', 'd-flex', 'g-3', 'flex-wrap');

        for (let i = 1; i <= 20; i++) {
            let ingredient = meal[`strIngredient${i}`];
            if (ingredient) {
                let listItem = document.createElement('li');
                listItem.classList.add('alert', 'alert-info', 'm-2', 'p-1');
                listItem.textContent = ingredient;
                recipesList.appendChild(listItem);
            }
        }

        let tagsTitle = document.createElement('h3');
        tagsTitle.textContent = 'Tags';

        let tagsList = document.createElement('ul');
        tagsList.classList.add('list-unstyled', 'd-flex', 'g-3', 'flex-wrap');

        if (meal.strTags) {
            let tags = meal.strTags.split(',');
            tags.forEach(tag => {
                let listItem = document.createElement('li');
                listItem.classList.add('alert', 'alert-danger', 'm-2', 'p-1');
                listItem.textContent = tag;
                tagsList.appendChild(listItem);
            });
        }

        let sourceButton = document.createElement('a');
        sourceButton.href = meal.strSource || '#';
        sourceButton.classList.add('btn', 'btn-success', 'm-2');
        sourceButton.textContent = 'Source';

        let youtubeButton = document.createElement('a');
        youtubeButton.href = meal.strYoutube || '#';
        youtubeButton.classList.add('btn', 'btn-danger', 'm-2');
        youtubeButton.textContent = 'YouTube';

        infoColDiv.appendChild(instructionsTitle);
        infoColDiv.appendChild(instructions);
        infoColDiv.appendChild(area);
        infoColDiv.appendChild(category);
        infoColDiv.appendChild(recipesTitle);
        infoColDiv.appendChild(recipesList);
        infoColDiv.appendChild(tagsTitle);
        infoColDiv.appendChild(tagsList);
        infoColDiv.appendChild(sourceButton);
        infoColDiv.appendChild(youtubeButton);

        rowDiv.appendChild(imgColDiv);
        rowDiv.appendChild(infoColDiv);

        modalDiv.appendChild(closeIcon);
        modalDiv.appendChild(rowDiv);

        myModal.appendChild(modalDiv);

        closeIcon.addEventListener('click', function(e) {
            myModal.classList.add('d-none');
            // Enable body scroll
            document.body.classList.remove('overflow-hidden');
        });
    } catch (error) {
        console.error('Failed to fetch:', error);
    }
}



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
