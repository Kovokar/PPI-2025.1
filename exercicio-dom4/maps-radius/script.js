// Configurações iniciais
const localizacaoInicial = [-23.5859, -46.6566];
let localizacaoAtual = [...localizacaoInicial];
let unidadeAtual = 'metros';
let valorRaioAtual = 1000;
let circulo = null;
let marcador = null;
let circuloOculto = false;
let mapaLimpo = false;
let dadosBackup = {
    circulo: null,
    marcador: null,
    localizacao: null
};

// Inicializar mapa principal
const mapa = L.map('map').setView(localizacaoInicial, 15);

// Adicionar tile layer padrão
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
}).addTo(mapa);

// Criar marcador inicial
criarMarcador(localizacaoInicial);

// Criar círculo inicial
criarCirculo(localizacaoInicial, valorRaioAtual);

// Event listeners
document.getElementById('raio').addEventListener('input', function() {
    valorRaioAtual = parseFloat(this.value);
    atualizarRaio();
});

mapa.on('click', function(e) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    
    // Atualizar coordenadas
    localizacaoAtual = [lat, lng];
    
    // Atualizar display de coordenadas
    document.getElementById('coordenadas').innerHTML = `
        Lat: ${lat.toFixed(6)}<br>
        Lng: ${lng.toFixed(6)}
    `;
    
    // Mover marcador
    if (marcador) {
        mapa.removeLayer(marcador);
    }
    criarMarcador([lat, lng]);
    
    // Mover círculo
    if (circulo) {
        mapa.removeLayer(circulo);
        criarCirculo([lat, lng], valorRaioAtual);
    }
});

// Funções principais
function criarMarcador(posicao) {
    marcador = L.marker(posicao).addTo(mapa)
        .bindPopup(`
            <div style="text-align: center;">
                <strong>📍 Localização Selecionada</strong><br>
                Lat: ${posicao[0].toFixed(6)}<br>
                Lng: ${posicao[1].toFixed(6)}
            </div>
        `)
        .openPopup();
}

function criarCirculo(posicao, raio) {
    circulo = L.circle(posicao, {
        color: '#ff6b6b',
        fillColor: '#ff6b6b',
        fillOpacity: 0.2,
        radius: raio,
        weight: 3
    }).addTo(mapa);
}

function atualizarRaio() {
    const valorDisplay = document.getElementById('valorRaio');
    let valorExibir = valorRaioAtual;
    
    if (unidadeAtual === 'km') {
        valorExibir = (valorRaioAtual / 1000).toFixed(1);
        valorDisplay.textContent = `${valorExibir} km`;
    } else {
        valorDisplay.textContent = `${valorExibir} m`;
    }
    
    if (circulo) {
        mapa.removeLayer(circulo);
        criarCirculo(localizacaoAtual, valorRaioAtual);
    }
}

function alterarUnidade(novaUnidade) {
    // Atualizar botões
    document.querySelectorAll('.unit-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const slider = document.getElementById('raio');
    
    if (novaUnidade === 'km' && unidadeAtual === 'metros') {
        // Converter para km
        slider.min = 0.1;
        slider.max = 10;
        slider.step = 0.1;
        slider.value = valorRaioAtual / 1000;
        unidadeAtual = 'km';
    } else if (novaUnidade === 'metros' && unidadeAtual === 'km') {
        // Converter para metros
        slider.min = 100;
        slider.max = 10000;
        slider.step = 50;
        slider.value = valorRaioAtual;
        unidadeAtual = 'metros';
    }
    
    unidadeAtual = novaUnidade;
    
    if (novaUnidade === 'km') {
        valorRaioAtual = parseFloat(slider.value) * 1000;
    } else {
        valorRaioAtual = parseFloat(slider.value);
    }
    
    atualizarRaio();
}

function centralizarMapa() {
    mapa.setView(localizacaoInicial, 15);
    localizacaoAtual = [...localizacaoInicial];
    
    if (marcador) {
        mapa.removeLayer(marcador);
    }
    criarMarcador(localizacaoInicial);
    
    if (circulo) {
        mapa.removeLayer(circulo);
        criarCirculo(localizacaoInicial, valorRaioAtual);
    }
    
    document.getElementById('coordenadas').innerHTML = `
        Lat: ${localizacaoInicial[0].toFixed(6)}<br>
        Lng: ${localizacaoInicial[1].toFixed(6)}
    `;
}

function alternarCirculo() {
    const btn = document.getElementById('btnCirculo');
    
    if (circuloOculto) {
        // Mostrar círculo
        criarCirculo(localizacaoAtual, valorRaioAtual);
        btn.innerHTML = '❌ Remover Círculo';
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-danger');
        circuloOculto = false;
    } else {
        // Ocultar círculo
        if (circulo) {
            mapa.removeLayer(circulo);
            circulo = null;
        }
        btn.innerHTML = '✅ Mostrar Círculo';
        btn.classList.remove('btn-danger');
        btn.classList.add('btn-primary');
        circuloOculto = true;
    }
}

function alternarLimpar() {
    const btn = document.getElementById('btnLimpar');
    
    if (mapaLimpo) {
        // Restaurar mapa
        if (dadosBackup.marcador) {
            criarMarcador(dadosBackup.localizacao);
            localizacaoAtual = [...dadosBackup.localizacao];
            
            document.getElementById('coordenadas').innerHTML = `
                Lat: ${dadosBackup.localizacao[0].toFixed(6)}<br>
                Lng: ${dadosBackup.localizacao[1].toFixed(6)}
            `;
        }
        
        if (dadosBackup.circulo && !circuloOculto) {
            criarCirculo(dadosBackup.localizacao, valorRaioAtual);
        }
        
        btn.innerHTML = '🗑️ Limpar';
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
        mapaLimpo = false;
    } else {
        // Fazer backup e limpar
        dadosBackup.marcador = marcador ? true : false;
        dadosBackup.circulo = circulo ? true : false;
        dadosBackup.localizacao = [...localizacaoAtual];
        
        if (marcador) {
            mapa.removeLayer(marcador);
            marcador = null;
        }
        if (circulo) {
            mapa.removeLayer(circulo);
            circulo = null;
        }
        
        document.getElementById('coordenadas').textContent = 'Clique no mapa para ver as coordenadas';
        
        btn.innerHTML = '↩️ Restaurar';
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');
        mapaLimpo = true;
    }
}

// Funções do modal
let mapaModal = null;

function abrirModal() {
    document.getElementById('modalMapa').style.display = 'block';
    
    setTimeout(() => {
        if (!mapaModal) {
            mapaModal = L.map('mapModal').setView(localizacaoAtual, 15);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19
            }).addTo(mapaModal);
        }
        
        // Sincronizar com o mapa principal
        mapaModal.setView(localizacaoAtual, mapa.getZoom());
        
        if (marcador) {
            L.marker(localizacaoAtual).addTo(mapaModal)
                .bindPopup('Localização Selecionada')
                .openPopup();
        }
        
        if (circulo) {
            L.circle(localizacaoAtual, {
                color: '#ff6b6b',
                fillColor: '#ff6b6b',
                fillOpacity: 0.2,
                radius: valorRaioAtual,
                weight: 3
            }).addTo(mapaModal);
        }
        
        mapaModal.invalidateSize();
    }, 100);
}

function fecharModal() {
    document.getElementById('modalMapa').style.display = 'none';
    if (mapaModal) {
        mapaModal.eachLayer(function(layer) {
            if (layer !== mapaModal._layers[Object.keys(mapaModal._layers)[0]]) {
                mapaModal.removeLayer(layer);
            }
        });
    }
}

// Fechar modal clicando fora
window.onclick = function(event) {
    const modal = document.getElementById('modalMapa');
    if (event.target === modal) {
        fecharModal();
    }
}