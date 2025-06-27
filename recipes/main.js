import recipes from './recipes.mjs';

function ranNum(num) {
    return Math.floor(Math.random()*num)
}

function ranItem(list) {
    return recipes[ranNum(recipes.length)]
}

function tagsTemplate(tags) {
	// loop through the tags list and transform the strings to HTML
    let html = "";
    tags.forEach(tag => {
        html += `<li>${ tag }</li>`;
    });
	return html;
}

function ratingTemplate(rating) {
	// begin building an html string using the ratings HTML written earlier as a model.
	let html = '';
// our ratings are always out of 5, so create a for loop from 1 to 5

    for (let i = 1; i < 6; i++) {
		// check to see if the current index of the loop is less than our rating
        if (i <= rating) {
            // if so then output a filled star
            html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
            // else output an empty star
        } else { html += `<span aria-hidden="true" class="icon-star-empty">☆</span>` }

    }

	// after the loop, add the closing tag to our string
	// return the html string
	return html
}

function recipeTemplate(recipe) {
	return `<figure class="recipe">
    <img src=${ recipe.image } alt=${ recipe.image } />
    <figcaption>
        <ul class="recipe__tags">
            ${ tagsTemplate(recipe.tags) }
        </ul>
        <h2><a href="#">${ recipe.name }</a></h2>
        <p class="recipe__ratings">
            <span
                class="rating"
                role="img"
                aria-label="Rating: ${ recipe.rating } out of 5 stars"
            >
                ${ ratingTemplate(recipe.rating) }
            </span>
        </p>
        <p class="recipe__description">
            ${ recipe.description }
        </p>
</figcaption>
</figure>`;
}

function renderRecipes(recipeList) {
	// get the element we will output the recipes into
    const recipeSection = document.querySelector('.recipeSection');
	// use the recipeTemplate function to transform our recipe objects into recipe HTML strings
    let rsHTML = ``;
    recipeList.forEach(recipe => {
        rsHTML += recipeTemplate(recipe);
    });
	// Set the HTML strings as the innerHTML of our output element.
    recipeSection.innerHTML = rsHTML;
}

function init() {
  // get a random recipe
  const recipe = ranItem(recipes)
  // render the recipe with renderRecipes.
  renderRecipes([recipe]);
}

init();

function filterRecipes(query) {
    query = query.toLowerCase();

    function filterer(recipe) {
        if (recipe.name.toLowerCase().includes(query) || 
            recipe.description.toLowerCase().includes(query) ||
            recipe.tags.find(item => item.toLowerCase().includes(query)) ||
            recipe.recipeIngredient.find(item => item.toLowerCase().includes(query))) { return true }
        else { return false }
    }

    const filteredRecipes = recipes.filter(filterer);

    renderRecipes(filteredRecipes.sort())
}

const search = document.querySelector("#searchBar");
search.addEventListener("input", () => {
    filterRecipes(search.value);
});