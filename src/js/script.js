let URL = 'https://www.themealdb.com/api/json/v1/1/'


const $name = document.querySelector('.name')
const $btn = document.querySelector('.btn')
const $btn_random = document.querySelector('.btn_random')

const $recipe = document.querySelector('.recipe')
const $recipe__instructions = document.querySelector('.recipe__instructions')
const $image = document.querySelector('.image')
const $title = document.querySelector('.title')
const $ingredients = document.querySelector('.ingredients')
const $country = document.querySelector('.country')
const $country__icon = document.querySelectorAll('.country__icon')
const $cards = document.querySelector('.cards')








$btn.addEventListener('click', () => {
    event.preventDefault()
    let value = $name.value;

    fetch(`${URL}search.php?s=${value}`)
        .then(res => res.json())
        .then(facts => showText(facts))
        .catch(e => error(value))
})

$btn_random.addEventListener('click', () => {
    event.preventDefault()
    let value = $name.value;

    fetch(`${URL}random.php`)
        .then(res => res.json())
        .then(facts => showText(facts))
        .catch(e => error(value))
})


function showText(facts) {
    $recipe__instructions.textContent = '';
    $title.textContent = '';
    $ingredients.textContent = '';
    $image.textContent = '';
    $title.textContent = facts.meals[0].strMeal

    $image.appendChild(createEl('img', null, 'src', facts.meals[0].strMealThumb))

    for (let i = 1; i < 20; i++) {
        if (facts.meals[0][`strIngredient${i}`]) {
            $ingredients.appendChild(createEl('li', `${facts.meals[0][`strIngredient${i}`]}`))
        }
    }
    for (let i = 1; i < 20; i++) {
        if (facts.meals[0][`strIngredient${i}`]) {
            $recipe__instructions.appendChild(createEl('li', `${facts.meals[0][`strIngredient${i}`]} - ${facts.meals[0][`strMeasure${i}`]}`))
        }
    }
}


function error(value) {
    $recipe__instructions.textContent = `Aucune recette trouver a ce nom : ${value}`
}

function createEl(type, content, src, srcContent, elClass) {
    const el = document.createElement(type)
    el.setAttribute(src, srcContent)
    el.className = elClass
    el.textContent = content
    return el
}

$country__icon.forEach(item => (
    item.addEventListener('click', () => {
        event.preventDefault()
        let value = item.getAttribute('data-country');

        fetch(`${URL}filter.php?a=${value}`)
            .then(res => res.json())
            .then(facts => showCountryMeal(facts))
            .catch(e => error(value))
    })
))

function showCountryMeal(facts) {
    $cards.textContent = ''
    console.log(facts);

    facts.meals.forEach(item => {
        card = createEl('div', null, null, null, 'card')
        card.appendChild(createEl('img', null, 'src', item.strMealThumb))
        card.appendChild(createEl('p', item.strMeal))
        card.appendChild(createEl('a', 'Decouvrir plus_', 'href', `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.idMeal}`))

        $cards.appendChild(card)
    })
}

// facts.meals`${[i]}[strIngredient${i}]`
// item.addEventListener('click', () => {
//     const value_icon = item.getAttribute('data-country')
//     fetch(`${URL}search.php?a=${value_icon}`)
//         .then(res => res.json())
//         .then(facts => showText(facts))
// })
// countries_icon = ['vietnam.png', 'india.png', 'greece.png', 'germany.png', 'egypt.png', 'france.png', 'china.png', 'canada.png', 'usa.png', 'uk.png', 'mexico.png', 'japan.png', 'italy.png']

// countries_icon.map(img => (
//     $country.appendChild(createEl('img', null, 'src', img))
// ))


