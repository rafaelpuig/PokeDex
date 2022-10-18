
const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let counterPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); /*await só pode ser usado em função assincrona, por isso o async antes do parametro de pokemon. Tambem, a expressão entre crazes permite a sintaxe do sifrão que passa um parâmetro JS para dentro do link, nesse caso o pokemon*/
    if(APIResponse.status == 200) {
        const data = await APIResponse.json(); /*Para pegar os dados da API deve fazer uma requisição do json*/
        return data;
    }
};

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name; /*substituir nome do pokemon no html tal qual o atributo name na API */
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; /*src é a forma de linkar a imagem, ao contrario do innerHTML. Tambem, o caminho esta entre conchetes e aspas simples para poder escrever caracteres como o '-', 'generation-v'*/
        input.value = ''; /*limpar formulario apos pesquisa*/
        counterPokemon = data.id;
        } else {
            pokemonImage.style.display = 'none';
            pokemonName.innerHTML = 'Not found :c';
            pokemonNumber.innerHTML = '';
        }
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (counterPokemon > 1){
    counterPokemon -= 1;
    renderPokemon(counterPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    counterPokemon += 1;
    renderPokemon(counterPokemon);
});

renderPokemon('counterPokemon');
