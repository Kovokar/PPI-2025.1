const apiUrl = 'http://localhost:3000/socialifpi/postagem';

let posts = [];
let filteredPosts = [];

function atualizarContador(qtd) {
    const contador = document.getElementById('contadorPostagens');
    if (contador) {
        contador.textContent = `${qtd} postagem${qtd === 1 ? '' : 's'}`;
    }
}

async function fetchPosts() {
    const response = await fetch(apiUrl);
    posts = await response.json();
    filteredPosts = [...posts];
    renderPosts(filteredPosts);
}

function renderPosts(postsToRender = filteredPosts) {
    const container = document.getElementById('postsContainer');
    const noPosts = document.getElementById('noPosts');
    atualizarContador(postsToRender.length);
    if (postsToRender.length === 0) {
        container.innerHTML = '';
        noPosts.style.display = 'block';
        return;
    }
    noPosts.style.display = 'none';
    container.innerHTML = postsToRender.map(post => {
        const resumo = post.conteudo.length > 120 ? post.conteudo.substring(0, 120) + '...' : post.conteudo;
        const categoria = (post.categorias && post.categorias.length > 0) ? post.categorias[0] : '';
        return `
            <a class="post-card" href="post.html?id=${post.id}">
                <div class="post-image">📝</div>
                <div class="post-content">
                    <div class="post-meta">
                        <span class="post-category">${categoria}</span>
                        <span class="post-date">${new Date(post.data).toLocaleDateString()}</span>
                    </div>
                    <h3 class="post-title">${post.titulo}</h3>
                    <p class="post-excerpt">${resumo}</p>
                    <span class="read-more">Ler mais →</span>
                </div>
            </a>
        `;
    }).join('');
}

function searchPosts(query) {
    if (!query) {
        filteredPosts = [...posts];
    } else {
        const q = query.toLowerCase();
        filteredPosts = posts.filter(post => post.titulo.toLowerCase().includes(q));
    }
    renderPosts(filteredPosts);
}

// Modal Nova Postagem
const btnCriarPublicacao = document.getElementById('btnCriarPublicacao');
const modalNovaPostagem = document.getElementById('modalNovaPostagem');
const fecharModalNovaPostagem = document.getElementById('fecharModalNovaPostagem');
const btnCancelarNovaPostagem = document.getElementById('btnCancelarNovaPostagem');
const formNovaPostagem = document.getElementById('formNovaPostagem');

function abrirModalNovaPostagem() {
    modalNovaPostagem.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}
function fecharModalNova() {
    modalNovaPostagem.style.display = 'none';
    document.body.style.overflow = 'auto';
    formNovaPostagem.reset();
}
if (btnCriarPublicacao) btnCriarPublicacao.onclick = abrirModalNovaPostagem;
if (fecharModalNovaPostagem) fecharModalNovaPostagem.onclick = fecharModalNova;
if (btnCancelarNovaPostagem) btnCancelarNovaPostagem.onclick = fecharModalNova;
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharModalNova();
});
modalNovaPostagem.addEventListener('click', (e) => {
    if (e.target === modalNovaPostagem) fecharModalNova();
});

if (formNovaPostagem) {
    formNovaPostagem.onsubmit = async function(e) {
        e.preventDefault();
        const titulo = document.getElementById('tituloNovaPostagem').value.trim();
        const conteudo = document.getElementById('conteudoNovaPostagem').value.trim();
        if (!titulo || !conteudo) return;
        const novaPostagem = {
            titulo,
            conteudo,
            data: new Date().toISOString(),
            curtidas: 0,
            shares: 0,
            categorias: []
        };
        try {
            const resp = await fetch('http://localhost:3000/socialifpi/postagem', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novaPostagem)
            });
            if (resp.ok) {
                fecharModalNova();
                await fetchPosts(); // Atualiza a lista sem recarregar
            } else {
                alert('Erro ao criar publicação.');
            }
        } catch (err) {
            alert('Erro ao criar publicação.');
        }
    };
}

document.addEventListener('DOMContentLoaded', function() {
    fetchPosts();
    const searchInput = document.getElementById('searchInput');
    const btnPesquisar = document.getElementById('btnPesquisar');
    searchInput.addEventListener('input', (e) => {
        searchPosts(e.target.value);
    });
    if (btnPesquisar) {
        btnPesquisar.addEventListener('click', () => {
            searchPosts(searchInput.value);
        });
    }
}); 