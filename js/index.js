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

