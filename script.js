const name = document.getElementById('nome');
const id = document.getElementById('numero');
const sprite = document.getElementById('sprite');
const tipo = document.getElementById('tipo');
const botao = document.getElementById('bttn');
const searchInput = document.getElementById('search');

botao.addEventListener('click', function(event) {
    event.preventDefault(); // Impede o recarregamento da página
    
    // Converte o termo de busca para minúsculas
    const searchTerm = searchInput.value.toLowerCase();

    // Limpa os dados do Pokémon anterior antes de começar a nova busca
    name.innerHTML = '';
    id.innerHTML = '';
    sprite.src = '';
    tipo.innerHTML = '';

    // Verifica se o campo de busca não está vazio
    if (searchTerm === '') {
        name.innerHTML = 'Por favor, digite o nome ou número do Pokémon.';
        return; // Sai da função para não fazer a requisição
    }
    
    // Faz a requisição para a API
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
        .then(response => {
            if (!response.ok) {
                // Se a resposta não for 200 (OK), lança um erro
                throw new Error('Pokémon não encontrado!');
            }
            return response.json();
        })
        .then(data => {
            // Preenche os elementos com os dados do Pokémon
            name.innerHTML = data.name;
            id.innerHTML = `#${data.id}`;
            sprite.src = data.sprites.front_default;
            tipo.innerHTML = data.types.map(typeInfo => typeInfo.type.name).join(' / ');
        })
        .catch(err => {
            // Captura e exibe o erro na tela
            console.error(err);
            name.innerHTML = err.message; // Exibe a mensagem de erro para o usuário
        });
});