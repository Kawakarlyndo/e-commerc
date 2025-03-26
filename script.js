function pesquisar() {
    const termo = document.getElementById("campo-pesquisa").value.toLowerCase().trim();
    
    // Se não houver termo de pesquisa, mostra todos normalmente
    if (!termo) {
        exibirProdutos(dados);
        return;
    }

    // 1. Ordena os produtos: os que têm o termo no NOME vêm primeiro
    const produtosOrdenados = [...dados].sort((a, b) => {
        const aNoNome = a.nome.toLowerCase().includes(termo);
        const bNoNome = b.nome.toLowerCase().includes(termo);
        
        // Se A tem no nome e B não, A vem primeiro
        if (aNoNome && !bNoNome) return -1;
        // Se B tem no nome e A não, B vem primeiro
        if (!aNoNome && bNoNome) return 1;
        
        // Se ambos têm no nome ou nenhum tem, mantém a ordem original
        return 0;
    });

    // 2. Exibe todos os produtos, mas ordenados
    exibirProdutos(produtosOrdenados, termo);
}

function exibirProdutos(produtos, termo = '') {
    const section = document.getElementById('resultados-pesquisa');
    
    let html = produtos.map(produto => {
        const nomeDestacado = destacarTermo(produto.nome, termo);
        const descDestacada = destacarTermo(produto.descricao, termo);
        
        return `
            <div class="item-resultado ${produto.nome.toLowerCase().includes(termo) ? 'destaque-item' : ''}">
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h2>${nomeDestacado}</h2>
                <p class="descricao-meta">${descDestacada}</p>
                <a href="${produto.link}" target="_blank">Mais Informações</a>
            </div>
        `;
    }).join('');

    section.innerHTML = html;
}

function destacarTermo(texto, termo) {
    if (!termo) return texto;
    const regex = new RegExp(`(${termo})`, 'gi');
    return texto.replace(regex, '<span class="destaque-texto">$1</span>');
}

// Mostra todos os livros ao carregar a página
document.addEventListener('DOMContentLoaded', () => exibirProdutos(dados));