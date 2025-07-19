function getById(id: string) {
    return document.getElementById(id);
}

const apiUrl = 'http://localhost:3000/socialifpi/postagem';  // Atualize a URL conforme necessário

interface Postagem {
    id: number;
    titulo: string;
    conteudo: string;
    data: string;
    curtidas: number;
}

interface Comentario {
    id: number;
    postId: number;
    autor: string;
    conteudo: string;
    data: string;
    likes: number;
}

const comentariosApiUrl = 'http://localhost:3000/socialifpi/postagem'; // Mesma base, rota de comentarios por post

// Este arquivo agora será usado apenas para utilidades ou será removido se não houver uso compartilhado.
// A lógica principal foi movida para index.js (tela inicial) e post.js (página de post).

