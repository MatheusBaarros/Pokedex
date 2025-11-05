const nameDisplay = document.getElementById('nome');
const idDisplay = document.getElementById('numero');
const sprite = document.getElementById('sprite');
const tipoDisplay = document.getElementById('tipo');
const botao = document.getElementById('bttn');
const searchInput = document.getElementById('search');
const dadosContainer = document.getElementById('dados');
const detalhesDisplay = document.getElementById('detalhes'); // Certifique-se que este ID existe no HTML!
const randomButton = document.getElementById('random-bttn');

sprite.style.display     = 'none';

async function searchPokemon(event) {
    // Impede o recarregamento da página, importante para o botão
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

        return; // Sai da função

    }

   

    nameDisplay.innerHTML = 'Pesquisando...';



    try {

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);

       

        if (!response.ok) {

            throw new Error('Pokémon não encontrado!');

        }

       

        const data = await response.json();

       

        // Exibe a imagem e limpa o campo de busca

        sprite.style.display = 'block';

        searchInput.value = '';



        // Preenche os elementos com os dados principais

        nameDisplay.innerHTML = `Nome: ${data.name.toUpperCase()}`;

        idDisplay.innerHTML = `Id: #${data.id.toString().padStart(3, '0')}`;

        sprite.src = data.sprites.front_default;

        tipoDisplay.innerHTML = `Tipo: ${data.types.map(typeInfo => typeInfo.type.name).join(' / ')}`;



        // Adiciona Altura, Peso e Stats com o layout de Grid

        let statsHTML = '<div class="stats-grid">';

       

        data.stats.forEach(stat => {

            // Usa <div> para agrupar o nome e o valor de cada stat

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

        // Captura e exibe o erro na tela

        console.error(err);

        nameDisplay.innerHTML = err.message;

        sprite.style.display = 'none';

        detalhesDisplay.innerHTML = '';

    }

}



// 2. Event Listener para o BOTÃO (Chama a função)

botao.addEventListener('click', searchPokemon);



// 3. Event Listener para a tecla ENTER no campo de busca

searchInput.addEventListener('keydown', function(event) {

    // Verifica se a tecla pressionada é "Enter"

    if (event.key === 'Enter') {

        searchPokemon();

    }

});

function searchRandomPokemon() {
    // 1025 é o limite atual de Pokémons na PokeAPI (9ª Geração + formas)
    const MAX_POKEMON_ID = 1025; 
    
    // Gera um ID aleatório entre 1 e o máximo
    const randomId = Math.floor(Math.random() * MAX_POKEMON_ID) + 1;
    
    // Define o valor do input com o ID aleatório
    searchInput.value = randomId;
    
    // Chama a função principal de busca
    searchPokemon(); 
}

// Conecta o novo botão à função
randomButton.addEventListener('click', searchRandomPokemon);