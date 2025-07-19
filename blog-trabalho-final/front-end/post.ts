const apiUrl2 = 'http://localhost:3000/socialifpi/postagem';

interface Comentario {
    id: number;
    autor: string;
    conteudo: string;
    data: string;
    likes: number;
}

interface Post {
    id: number;
    titulo: string;
    conteudo: string;
    data: string;
    curtidas: number;
    shares: number;
    categorias: string[];
}

function getPostIdFromUrl(): number | null {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    return id ? parseInt(id, 10) : null;
}

async function fetchPost(id: number): Promise<Post | null> {
    try {
        const response = await fetch(`${apiUrl2}/${id}`);
        if (!response.ok) return null;
        const data: Post = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar post:', error);
        return null;
    }
}

function renderPost(post: Post): void {
    const postSection = document.getElementById('post-detalhe');
    if (!postSection) return;

    if (!post) {
        postSection.innerHTML = '<p>Post não encontrado.</p>';
        return;
    }

    const categoria = (post.categorias && post.categorias.length > 0) ? post.categorias[0] : '';
    postSection.innerHTML = `
        <div class="post-detalhe-card">
            <div class="post-image" style="font-size:3.5rem;">📝</div>
            <div class="post-content">
                <div class="post-meta">
                    <span class="post-category">${categoria}</span>
                    <span class="post-date">${new Date(post.data).toLocaleDateString()}</span>
                </div>
                <h2 class="post-title">${post.titulo}</h2>
                <div class="post-body">${post.conteudo}</div>
                <div class="post-extra">
                    <span>👍 Curtidas: <span id="curtidasCount">${post.curtidas}</span></span> |
                    <span>🔁 Compartilhamentos: <span id="sharesCount">${post.shares}</span></span>
                </div>
                <div class="post-actions">
                    <button id="btnCurtir" class="btn-action btn-curtir">👍 Curtir</button>
                    <button id="btnCompartilhar" class="btn-action btn-compartilhar">🔁 Compartilhar</button>
                </div>
            </div>
        </div>
    `;
}

async function listarComentarios(postId: number, container: HTMLElement): Promise<void> {
    try {
        const response = await fetch(`${apiUrl}/${postId}/comentarios`);
        const comentarios: Comentario[] = await response.json();

        const comentariosDiv = document.createElement('div');
        comentariosDiv.className = 'comentarios';

        const tituloComentarios = document.createElement('h3');
        tituloComentarios.textContent = '🗨️ Comentários';
        comentariosDiv.appendChild(tituloComentarios);

        if (comentarios.length === 0) {
            const semComentarios = document.createElement('p');
            semComentarios.textContent = 'Nenhum comentário ainda.';
            comentariosDiv.appendChild(semComentarios);
        } else {
            comentarios.forEach((comentario) => {
                const comentarioDiv = document.createElement('div');
                comentarioDiv.className = 'comentario';

                // Avatar circular com a primeira letra do autor
                const avatar = document.createElement('div');
                avatar.className = 'avatar';
                avatar.textContent = comentario.autor.charAt(0).toUpperCase();

                // Corpo do comentário
                const corpoComentario = document.createElement('div');
                corpoComentario.className = 'corpo-comentario';

                const autorLinha = document.createElement('div');
                autorLinha.className = 'autor-linha';
                autorLinha.innerHTML = `<strong>${comentario.autor}</strong> <span class="data-comentario">${new Date(comentario.data).toLocaleString()}</span>`;

                const conteudo = document.createElement('p');
                conteudo.textContent = comentario.conteudo;

                corpoComentario.appendChild(autorLinha);
                corpoComentario.appendChild(conteudo);

                comentarioDiv.appendChild(avatar);
                comentarioDiv.appendChild(corpoComentario);

                comentariosDiv.appendChild(comentarioDiv);
            });
        }

        container.appendChild(comentariosDiv);
    } catch (error) {
        console.error('Erro ao carregar comentários:', error);
    }
}


function criarFormularioComentario(postId: number, atualizar: () => void): HTMLFormElement {
    const form = document.createElement('form');
    form.className = 'form-comentario';

    const inputAutor = document.createElement('input');
    inputAutor.type = 'text';
    inputAutor.placeholder = 'Seu nome';
    inputAutor.required = true;
    inputAutor.name = 'autor';

    const inputConteudo = document.createElement('input');
    inputConteudo.type = 'text';
    inputConteudo.placeholder = 'Seu comentário';
    inputConteudo.required = true;
    inputConteudo.name = 'conteudo';

    const botao = document.createElement('button');
    botao.type = 'submit';
    botao.textContent = 'Comentar';
    botao.className = 'btn-comentar';

    form.appendChild(inputAutor);
    form.appendChild(inputConteudo);
    form.appendChild(botao);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!inputAutor.value.trim() || !inputConteudo.value.trim()) return;

        try {
            await fetch(`${apiUrl2}/${postId}/comentarios`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    autor: inputAutor.value.trim(),
                    conteudo: inputConteudo.value.trim(),
                    likes: 0
                })
            });

            inputAutor.value = '';
            inputConteudo.value = '';
            atualizar();
        } catch (error) {
            console.error('Erro ao enviar comentário:', error);
        }
    });

    return form;
}

async function atualizarContadores(postId: number): Promise<void> {
    try {
        const post = await fetchPost(postId);
        if (post) {
            const curtidasElement = document.getElementById('curtidasCount');
            const sharesElement = document.getElementById('sharesCount');

            if (curtidasElement) curtidasElement.textContent = String(post.curtidas);
            if (sharesElement) sharesElement.textContent = String(post.shares);
        }
    } catch (error) {
        console.error('Erro ao atualizar contadores:', error);
    }
}

function configurarBotoesInteracao(postId: number): void {
    const btnCurtir = document.getElementById('btnCurtir');
    const btnCompartilhar = document.getElementById('btnCompartilhar');

    if (!btnCurtir || !btnCompartilhar) {
        console.error('Botões de interação não encontrados');
        return;
    }

    btnCurtir.replaceWith(btnCurtir.cloneNode(true));
    btnCompartilhar.replaceWith(btnCompartilhar.cloneNode(true));

    const novoBtnCurtir = document.getElementById('btnCurtir') as HTMLButtonElement;
    const novoBtnCompartilhar = document.getElementById('btnCompartilhar') as HTMLButtonElement;

    novoBtnCurtir.addEventListener('click', async () => {
        try {
            novoBtnCurtir.classList.add('clicked');
            novoBtnCurtir.disabled = true;

            const response = await fetch(`${apiUrl2}/${postId}/curtir`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                await atualizarContadores(postId);
            }

            setTimeout(() => {
                novoBtnCurtir.classList.remove('clicked');
                novoBtnCurtir.disabled = false;
            }, 500);
        } catch (error) {
            console.error('Erro ao curtir post:', error);
            novoBtnCurtir.disabled = false;
            novoBtnCurtir.classList.remove('clicked');
        }
    });

    novoBtnCompartilhar.addEventListener('click', async () => {
        try {
            novoBtnCompartilhar.classList.add('clicked');
            novoBtnCompartilhar.disabled = true;

            const response = await fetch(`${apiUrl2}/${postId}/compartilhar`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                await atualizarContadores(postId);
            }

            setTimeout(() => {
                novoBtnCompartilhar.classList.remove('clicked');
                novoBtnCompartilhar.disabled = false;
            }, 500);
        } catch (error) {
            console.error('Erro ao compartilhar post:', error);
            novoBtnCompartilhar.disabled = false;
            novoBtnCompartilhar.classList.remove('clicked');
        }
    });
}

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const postId = getPostIdFromUrl();

        if (!postId) {
            console.error('ID do post não encontrado na URL');
            return;
        }

        const post = await fetchPost(postId);

        if (!post) {
            console.error('Post não encontrado');
            return;
        }

        renderPost(post);
        configurarBotoesInteracao(postId);

        const comentariosSection = document.getElementById('comentarios-section');
        if (comentariosSection) {
            const comentariosContainer = document.createElement('div');
            comentariosContainer.className = 'container-comentarios';

            const atualizarComentarios = async () => {
                comentariosContainer.innerHTML = '';
                await listarComentarios(post.id, comentariosContainer);
                comentariosContainer.appendChild(criarFormularioComentario(post.id, atualizarComentarios));
            };

            await atualizarComentarios();
            comentariosSection.appendChild(comentariosContainer);
        }
    } catch (error) {
        console.error('Erro ao carregar a página:', error);
    }
});
