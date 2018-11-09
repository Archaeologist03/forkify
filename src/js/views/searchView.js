import {
    elements
} from "./base";
import {
    create
} from "domain";


export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = "";
};

export const clearResults = () => {
    elements.searchResList.innerHTML = "";
    elements.searchResPages.innerHTML = "";
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

// type: prev or next
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === "prev" ? page - 1 : page + 1}>
        <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === "prev" ? "left" : "right"}"></use>
        </svg> 
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    let button;
    if (page === 1 && pages > 1) {
        // button to go to next page
        button = createButton(page, "next");
    } else if (page < pages) {
        // Both buttons
        button = `
            ${createButton(page, "prev")}
            ${createButton(page, "next")}
        `;
    } else if (page === pages && pages > 1) {
        // button to go to prev page
        button = createButton(page, "prev");
    }

    elements.searchResPages.insertAdjacentHTML("afterbegin", button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // render res of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    console.log(recipes);
    recipes.slice(start, end).forEach(renderRecipe);

    // render the pagination btns
    renderButtons(page, recipes.length, resPerPage);
};