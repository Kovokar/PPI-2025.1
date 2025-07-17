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

// Elementos da lista de músicas
const musicList = document.getElementById('musicList');
const musicItems = document.getElementById('musicItems');
const selectAllBtn = document.getElementById('selectAll');
const deselectAllBtn = document.getElementById('deselectAll');
const selectedCount = document.getElementById('selectedCount');
const finalizeButton = document.getElementById('finalizeButton');

// URLs dos endpoints
const LIST_MUSIC_ENDPOINT = 'http://127.0.0.1:5000/lista_musicas';
const CONVERT_ENDPOINT = 'http://127.0.0.1:5000/converter';

// Arrays para armazenar dados
let musicData = [];
let selectedMusicIds = [];
let playlistData = {};

// Estados de feedback
const FEEDBACK_STATES = {
    LOADING: {
        class: 'loading',
        icon: '⏳',
        text: 'Buscando músicas... Isso pode levar alguns minutos.'
    },
    SUCCESS: {
        class: 'success',
        icon: '✅',
        text: 'Músicas carregadas com sucesso! Selecione as que deseja.'
    },
    ERROR: {
        class: 'error',
        icon: '❌',
        text: 'Erro ao buscar músicas. Verifique os dados e tente novamente.'
    },
    NETWORK_ERROR: {
        class: 'error',
        icon: '🌐',
        text: 'Erro de conexão. Verifique se o servidor está rodando.'
    },
    CONVERTING: {
        class: 'loading',
        icon: '🎵',
        text: 'Criando playlist no Spotify... Aguarde.'
    },
    CONVERSION_SUCCESS: {
        class: 'success',
        icon: '🎉',
        text: 'Playlist criada com sucesso no Spotify!'
    },
    CONVERSION_ERROR: {
        class: 'error',
        icon: '❌',
        text: 'Erro ao criar playlist no Spotify. Tente novamente.'
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
    const youtubeRegex = /^https?:\/\/(www\.)?(youtube\.com\/playlist\?list=|youtu\.be\/playlist\?list=|youtube\.com\/watch\?.*list=)/;
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
        btnText.textContent = 'Buscando...';
        btnIcon.textContent = '⏳';
    } else {
        convertButton.classList.remove('loading');
        btnText.textContent = 'Converter Playlist';
        btnIcon.textContent = '🚀';
    }
}

// Função para fazer requisição à API de listagem
async function fetchMusicList(playlistData) {
    try {
        const response = await fetch(LIST_MUSIC_ENDPOINT, {
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
        console.error('Erro ao buscar músicas:', error);
        
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            return { success: false, error: 'NETWORK_ERROR' };
        }
        
        return { success: false, error: 'API_ERROR', details: error.message };
    }
}

// Função para criar item de música na lista
function createMusicItem(music, index) {
    const musicItem = document.createElement('div');
    musicItem.className = 'music-item';
    musicItem.dataset.musicId = music.id;
    
    const imageUrl = music.images && music.images.length > 0 
        ? music.images[music.images.length - 1].url // Usar a menor imagem
        : '';
    
    const artistNames = music.artists 
        ? music.artists.map(artist => artist.name).join(', ')
        : 'Artista desconhecido';
    
    musicItem.innerHTML = `
        <input type="checkbox" class="music-checkbox" id="music-${index}" data-music-id="${music.id}">
        <img src="${imageUrl}" alt="${music.name}" class="music-image" onerror="this.style.display='none'">
        <div class="music-info">
            <div class="music-title">${music.name}</div>
            <div class="music-artist">${artistNames}</div>
        </div>
    `;
    
    // Event listener para seleção
    musicItem.addEventListener('click', (e) => {
        if (e.target.type !== 'checkbox') {
            const checkbox = musicItem.querySelector('.music-checkbox');
            checkbox.checked = !checkbox.checked;
            checkbox.dispatchEvent(new Event('change'));
        }
    });
    
    // Event listener para checkbox
    const checkbox = musicItem.querySelector('.music-checkbox');
    checkbox.addEventListener('change', (e) => {
        const musicId = e.target.dataset.musicId;
        
        if (e.target.checked) {
            selectedMusicIds.push(musicId);
            musicItem.classList.add('selected');
        } else {
            selectedMusicIds = selectedMusicIds.filter(id => id !== musicId);
            musicItem.classList.remove('selected');
        }
        
        updateSelectedCount();
        updateFinalizeButton();
    });
    
    return musicItem;
}

// Função para atualizar contador de selecionadas
function updateSelectedCount() {
    selectedCount.textContent = `${selectedMusicIds.length} selecionadas`;
}

// Função para atualizar botão finalizar
function updateFinalizeButton() {
    finalizeButton.disabled = selectedMusicIds.length === 0;
}

// Função para renderizar lista de músicas
function renderMusicList(musics) {
    musicItems.innerHTML = '';
    musicData = musics;
    selectedMusicIds = [];
    
    musics.forEach((music, index) => {
        const musicItem = createMusicItem(music, index);
        musicItems.appendChild(musicItem);
    });
    
    updateSelectedCount();
    updateFinalizeButton();
    musicList.classList.remove('hidden');
}

// Função para selecionar todas as músicas
function selectAllMusic() {
    const checkboxes = document.querySelectorAll('.music-checkbox');
    checkboxes.forEach(checkbox => {
        if (!checkbox.checked) {
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change'));
        }
    });
}

// Função para desmarcar todas as músicas
function deselectAllMusic() {
    const checkboxes = document.querySelectorAll('.music-checkbox');
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkbox.checked = false;
            checkbox.dispatchEvent(new Event('change'));
        }
    });
}

// Função para finalizar conversão
async function finalizeConversion() {
    if (selectedMusicIds.length === 0) {
        showFeedback({
            class: 'error',
            icon: '⚠️',
            text: 'Selecione pelo menos uma música para continuar.'
        });
        return;
    }
    
    // Desabilitar botão
    finalizeButton.disabled = true;
    finalizeButton.classList.add('loading');
    finalizeButton.querySelector('.btn-text').textContent = 'Criando Playlist...';
    finalizeButton.querySelector('.btn-icon').textContent = '⏳';
    
    showFeedback(FEEDBACK_STATES.CONVERTING);
    
    try {
        const response = await fetch(CONVERT_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ids: selectedMusicIds,
                nome_playlist_spotify: playlistData.spotifyName
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();

        // Exibir link da playlist criada, se existir
        if (result.link_playlist) {
            document.getElementById('playlist-link').innerHTML = `
                <a href="${result.link_playlist}" target="_blank" style="color:#1DB954;font-weight:bold;">
                    🎵 Abrir Playlist no Spotify
                </a>
            `;
            showFeedback({
                class: 'success',
                icon: '🎉',
                text: 'Playlist criada com sucesso no Spotify!'
            });
        } else {
            showFeedback(FEEDBACK_STATES.CONVERSION_SUCCESS);
            document.getElementById('playlist-link').innerHTML = '';
        }
        
        // Reset após sucesso
        setTimeout(() => {
            resetApplication();
        }, 5000);

    } catch (error) {
        console.error('Erro na conversão final:', error);
        
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            showFeedback({
                ...FEEDBACK_STATES.NETWORK_ERROR,
                text: 'Erro de conexão ao criar playlist. Verifique se o servidor está rodando.'
            });
        } else {
            showFeedback(FEEDBACK_STATES.CONVERSION_ERROR);
        }
    } finally {
        // Reabilitar botão
        finalizeButton.disabled = false;
        finalizeButton.classList.remove('loading');
        finalizeButton.querySelector('.btn-text').textContent = 'Criar Playlist no Spotify';
        finalizeButton.querySelector('.btn-icon').textContent = '🎵';
    }
}

// Função para resetar aplicação
function resetApplication() {
    form.reset();
    musicList.classList.add('hidden');
    hideFeedback();
    musicData = [];
    selectedMusicIds = [];
    playlistData = {};
}

// Handler do formulário principal
async function handleFormSubmit(event) {
    event.preventDefault();
    
    // Limpar feedback anterior e esconder lista de músicas
    hideFeedback();
    musicList.classList.add('hidden');
    
    // Sanitizar e validar inputs
    const formData = sanitizeInputs();
    playlistData = formData;
    
    // Validações básicas
    if (!formData.youtubeLink || !formData.spotifyName) {
        showFeedback({
            class: 'error',
            icon: '⚠️',
            text: 'Por favor, preencha todos os campos.'
        });
        return;
    }
    
    if (!isValidYouTubePlaylistURL(formData.youtubeLink)) {
        showFeedback({
            class: 'error',
            icon: '❌',
            text: 'URL do YouTube inválida. Use uma URL de playlist ou vídeo válida.'
        });
        return;
    }
    
    // Mostrar estado de carregamento
    toggleFormState(true);
    showFeedback(FEEDBACK_STATES.LOADING);
    
    // Buscar músicas
    const result = await fetchMusicList(formData);
    
    // Processar resultado
    if (result.success) {
        if (result.data && result.data.length > 0) {
            showFeedback(FEEDBACK_STATES.SUCCESS);
            renderMusicList(result.data);
        } else {
            showFeedback({
                class: 'error',
                icon: '😕',
                text: 'Nenhuma música foi encontrada nesta playlist.'
            });
        }
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
selectAllBtn.addEventListener('click', selectAllMusic);
deselectAllBtn.addEventListener('click', deselectAllMusic);
finalizeButton.addEventListener('click', finalizeConversion);

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