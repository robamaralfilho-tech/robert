// Seleciona os elementos do DOM com os quais vamos interagir.
const btnBuscar = document.getElementById('botao-busca');
const inputBusca = document.getElementById('input-busca');
const main = document.querySelector('main');

// Armazena os dados carregados do data.json para evitar múltiplas requisições.
let dados = [];

// Função assíncrona para buscar os dados do arquivo JSON.
async function carregarDados() {
    try {
        const resposta = await fetch('data.json');
        dados = await resposta.json();
        // Inicialmente, renderiza todos os cards ao carregar a página.
        renderizarCards(dados);
    } catch (error) {
        console.error('Erro ao carregar os dados:', error);
        main.innerHTML = '<p>Não foi possível carregar os dados. Tente novamente mais tarde.</p>';
    }
}

// Função para renderizar os cards na tela.
function renderizarCards(items) {
    // Limpa o conteúdo atual da seção 'main' para exibir apenas os resultados da busca.
    main.innerHTML = '';

    if (items.length === 0) {
        main.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        return;
    }

    // Itera sobre cada item e cria um elemento <article> para ele.
    for (const item of items) {
        const article = document.createElement('article');
        article.innerHTML = `
            <h2>${item.nome}</h2>
            <p><strong>Ano de criação:</strong> ${item.ano}</p>
            <p>${item.descricao}</p>
            <p><strong>Exemplo:</strong> <code>${item.exemplos}</code></p>
            <p><a href="${item.link}" target="_blank">Leia mais...</a></p>
        `;
        main.appendChild(article);
    }
}

// Função que executa a busca.
function buscar() {
    const termoBusca = inputBusca.value.toLowerCase();
    const resultados = dados.filter(item =>
        item.nome.toLowerCase().includes(termoBusca) ||
        item.descricao.toLowerCase().includes(termoBusca)
    );
    renderizarCards(resultados);
}

// Adiciona o evento de clique ao botão de busca.
btnBuscar.addEventListener('click', buscar);

// Adiciona o evento 'input' ao campo de busca para filtrar os resultados enquanto o usuário digita.
inputBusca.addEventListener('input', buscar);

// Adiciona o evento 'search' ao input, que é disparado quando o usuário limpa o campo (clicando no 'x').
inputBusca.addEventListener('search', () => {
    // Se o campo de busca for limpo, exibe todos os dados novamente.
    if (inputBusca.value === '') {
        renderizarCards(dados);
    }
});

// Carrega os dados iniciais quando o script é executado.
carregarDados();
