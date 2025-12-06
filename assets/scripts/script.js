const nameDisplay = document.getElementById('nome');
const idDisplay = document.getElementById('numero');
const sprite = document.getElementById('sprite');
const tipoDisplay = document.getElementById('tipo');
const botao = document.getElementById('bttn');
const searchInput = document.getElementById('search');
const dadosContainer = document.getElementById('dados');
const detalhesDisplay = document.getElementById('detalhes');
const randomButton = document.getElementById('random-bttn');

sprite.style.display     = 'none';

async function searchPokemon(event) {
    if (event) {
        event.preventDefault();

    }
    const searchTerm = searchInput.value.toLowerCase();

    nameDisplay.innerHTML = '';
    idDisplay.innerHTML = '';
    sprite.src = '';
    tipoDisplay.innerHTML = '';
    detalhesDisplay.innerHTML = '';
    sprite.style.display = 'none';

   

    if (searchTerm === '') {

        nameDisplay.innerHTML = 'Por favor, digite o nome ou número do Pokémon.';

        return; 

    }

   

    nameDisplay.innerHTML = 'Pesquisando...';

    try {

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);

        if (!response.ok) {

            throw new Error('Pokémon não encontrado!');

        }

        const data = await response.json();

        sprite.style.display = 'block';

        searchInput.value = '';

        nameDisplay.innerHTML = `Nome: ${data.name.toUpperCase()}`;

        idDisplay.innerHTML = `Id: #${data.id.toString().padStart(3, '0')}`;

        sprite.src = data.sprites.front_default;

        tipoDisplay.innerHTML = `Tipo: ${data.types.map(typeInfo => typeInfo.type.name).join(' / ')}`;

        let statsHTML = '<div class="stats-grid">';

        data.stats.forEach(stat => {


            statsHTML += `

                <div class="stat-item">

                    <p class="stat-name">${stat.stat.name.toUpperCase()}:</p>

                    <p class="stat-value">${stat.base_stat}</p>

                </div>

            `;

        });

       
        statsHTML += '</div>';

        detalhesDisplay.innerHTML = `

            <h4>Detalhes:</h4>

            <p>Altura: ${data.height / 10} m</p>

            <p>Peso: ${data.weight / 10} kg</p>

           

            <h4>Estatísticas (Base):</h4>

            ${statsHTML}

        `;


    } catch (err) {


        console.error(err);

        nameDisplay.innerHTML = err.message;

        sprite.style.display = 'none';

        detalhesDisplay.innerHTML = '';

    }

}

botao.addEventListener('click', searchPokemon);
searchInput.addEventListener('keydown', function(event) {


    if (event.key === 'Enter') {

        searchPokemon();
    }

});

function searchRandomPokemon() {
    const MAX_POKEMON_ID = 1025; 

    const randomId = Math.floor(Math.random() * MAX_POKEMON_ID) + 1;
    
    searchInput.value = randomId;
    
    searchPokemon(); 
}

randomButton.addEventListener('click', searchRandomPokemon);
