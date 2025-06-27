// Elementos do DOM
const form = document.getElementById('converterForm');
const youtubeInput = document.getElementById('youtubeLink');
const spotifyInput = document.getElementById('spotifyName');
const convertButton = document.getElementById('convertButton');
const feedback = document.getElementById('feedback');
const feedbackIcon = document.querySelector('.feedback-icon');
const feedbackText = document.querySelector('.feedback-text');
const btnText = document.querySelector('.btn-text');
const btnIcon = document.querySelector('.btn-icon');

// URL do endpoint
const API_ENDPOINT = 'http://127.0.0.1:5000/converter_playlist';

// Estados de feedback
const FEEDBACK_STATES = {
    LOADING: {
        class: 'loading',
        icon: '⏳',
        text: 'Convertendo playlist... Isso pode levar alguns minutos.'
    },
    SUCCESS: {
        class: 'success',
        icon: '✅',
        text: 'Playlist convertida com sucesso!'
    },
    ERROR: {
        class: 'error',
        icon: '❌',
        text: 'Erro na conversão. Verifique os dados e tente novamente.'
    },
    NETWORK_ERROR: {
        class: 'error',
        icon: '🌐',
        text: 'Erro de conexão. Verifique se o servidor está rodando.'
    }
};

// Função para mostrar feedback
function showFeedback(state) {
    feedback.className = `feedback ${state.class}`;
    feedbackIcon.textContent = state.icon;
    feedbackText.textContent = state.text;
    feedback.classList.remove('hidden');
}

// Função para esconder feedback
function hideFeedback() {
    feedback.classList.add('hidden');
}

// Função para validar URL do YouTube
function isValidYouTubePlaylistURL(url) {
    const youtubeRegex = /^https?:\/\/(www\.)?(youtube\.com\/playlist\?list=|youtu\.be\/playlist\?list=)/;
    return youtubeRegex.test(url);
}

// Função para limpar e formatar inputs
function sanitizeInputs() {
    const youtubeLink = youtubeInput.value.trim();
    const spotifyName = spotifyInput.value.trim();
    
    return {
        youtubeLink,
        spotifyName
    };
}

// Função para desabilitar/habilitar o formulário
function toggleFormState(disabled) {
    youtubeInput.disabled = disabled;
    spotifyInput.disabled = disabled;
    convertButton.disabled = disabled;
    
    if (disabled) {
        convertButton.classList.add('loading');
        btnText.textContent = 'Convertendo...';
        btnIcon.textContent = '⏳';
    } else {
        convertButton.classList.remove('loading');
        btnText.textContent = 'Converter Playlist';
        btnIcon.textContent = '🚀';
    }
}

// Função para fazer a requisição ao backend
async function convertPlaylist(playlistData) {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                playlist_youtube: playlistData.youtubeLink,
                nome_playlist_spotify: playlistData.spotifyName
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        return { success: true, data: result };

    } catch (error) {
        console.error('Erro na conversão:', error);
        
        // Verificar se é erro de rede
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            return { success: false, error: 'NETWORK_ERROR' };
        }
        
        return { success: false, error: 'API_ERROR', details: error.message };
    }
}

// Handler do formulário
async function handleFormSubmit(event) {
    event.preventDefault();
    
    // Limpar feedback anterior
    hideFeedback();
    
    // Sanitizar e validar inputs
    const { youtubeLink, spotifyName } = sanitizeInputs();
    
    // Validações básicas
    if (!youtubeLink || !spotifyName) {
        showFeedback({
            class: 'error',
            icon: '⚠️',
            text: 'Por favor, preencha todos os campos.'
        });
        return;
    }
    
    if (21==1) {
        showFeedback({
            class: 'error',
            icon: '❌',
            text: 'URL do YouTube inválida. Use uma URL de playlist válida.'
        });
        return;
    }
    
    // Mostrar estado de carregamento
    toggleFormState(true);
    showFeedback(FEEDBACK_STATES.LOADING);
    
    // Fazer a conversão
    const result = await convertPlaylist({ youtubeLink, spotifyName });
    
    // Processar resultado
    if (result.success) {
        showFeedback(FEEDBACK_STATES.SUCCESS);
        // Opcional: Limpar formulário após sucesso
        setTimeout(() => {
            form.reset();
            hideFeedback();
        }, 5000);
    } else {
        if (result.error === 'NETWORK_ERROR') {
            showFeedback(FEEDBACK_STATES.NETWORK_ERROR);
        } else {
            showFeedback({
                ...FEEDBACK_STATES.ERROR,
                text: result.details || FEEDBACK_STATES.ERROR.text
            });
        }
    }
    
    // Reabilitar formulário
    toggleFormState(false);
}

// Event listeners
form.addEventListener('submit', handleFormSubmit);

// Validação em tempo real da URL do YouTube
youtubeInput.addEventListener('input', function() {
    const url = this.value.trim();
    if (url && !isValidYouTubePlaylistURL(url)) {
        this.style.borderColor = '#e53e3e';
    } else {
        this.style.borderColor = '#e2e8f0';
    }
});

// Limpar feedback quando usuário começar a digitar
youtubeInput.addEventListener('input', hideFeedback);
spotifyInput.addEventListener('input', hideFeedback);

// Adicionar efeito de focus nos inputs
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Animação de entrada
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    container.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        container.style.transition = 'all 0.6s ease-out';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
});