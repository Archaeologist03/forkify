import {
    elements
} from "./base";


export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = "";
};

export const clearResults = () => {
    elements.searchResList.innerHTML = "";
}

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(" ").reduce((a, c) => {
            if (a + c.length <= limit) {
                newTitle.push(c);
            }
            return a + c.length;
        }, 0);

        // returns new title with "..." if title length was bigger than limit
        return `${newTitle.join(" ")} ...`;

    }
    // returns title immediately if title length is smaller than limit
    return title;
}

const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="results__link" href="${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    // insertAdjacentElement doesn't work on markup(string), had to go with HTML instead.
    elements.searchResList.insertAdjacentHTML("beforeend", markup);
};

export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
};