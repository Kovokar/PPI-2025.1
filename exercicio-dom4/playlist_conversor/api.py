from flask import Flask, jsonify, request
from flask_cors import CORS
from spotify import main as main_spotify, converter, configurar_spotify
from utils import formata_url
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)


@app.route('/lista_musicas', methods=['POST'])
def lista_musicas():
    """
    Endpoint para listar as músicas encontradas na playlist do YouTube
    """
    try:
        new_playlist = {
            "playlist_youtube": request.json['playlist_youtube'],
            "nome_playlist_spotify": request.json['nome_playlist_spotify']
        }
        
        playlist_youtube_id = formata_url(new_playlist['playlist_youtube'])
        nome_da_playlist_spotify = new_playlist['nome_playlist_spotify']
        
        tracks = main_spotify(playlist_youtube_id=playlist_youtube_id, nome_playlist_spotify=nome_da_playlist_spotify)
        
        return jsonify(tracks), 200
        
    except KeyError as e:
        return jsonify({
            "error": "Campo obrigatório ausente",
            "missing_field": str(e)
        }), 400
        
    except Exception as e:
        return jsonify({
            "error": "Erro interno do servidor",
            "message": str(e)
        }), 500

@app.route('/converter', methods=['POST'])
def converter_playlist():
    """
    Endpoint para converter as músicas selecionadas em uma playlist do Spotify
    Recebe um array de IDs das músicas selecionadas
    """
    try:
        # Recebe o array de IDs das músicas selecionadas
        tracks_ids = request.json
        print(tracks_ids)
        # Validação básica
        if not isinstance(tracks_ids['ids'], list):
            return jsonify({
                "error": "Formato inválido. Esperado: array de IDs das músicas"
            }), 400
            
        if len(tracks_ids['ids']) == 0:
            return jsonify({
                "error": "Nenhuma música selecionada"
            }), 400
        
        # Carregar variáveis de ambiente e configurar Spotify
        load_dotenv()
        sp = configurar_spotify()
        
        # Recuperar o nome da playlist (você pode armazenar isso de diferentes formas)
        # Opção 1: Receber junto com os IDs
        # Opção 2: Armazenar em sessão/cache
        # Opção 3: Usar um nome padrão
        
        # Por enquanto, vou assumir que você quer receber o nome junto:
        # Se o request for um objeto com 'ids' e 'nome_playlist':
        
        if isinstance(request.json, dict) and 'ids' in request.json:
            tracks_ids = request.json['ids']
            nome_playlist_spotify = request.json.get('nome_playlist_spotify', 'Playlist Convertida')
        else:
            # Se for apenas o array de IDs, usar nome padrão
            nome_playlist_spotify = 'Playlist Convertida do YouTube'
        
        # Chamar a função converter
        link  = converter(
            tracks_ids=tracks_ids, 
            sp=sp, 
            nome_playlist_spotify=nome_playlist_spotify
        )
        
        return jsonify({
            "success": True,
            "message": "Playlist criada com sucesso no Spotify!",
            "nome_playlist": nome_playlist_spotify,
            "total_musicas": len(tracks_ids),
            "link_playlist": link
        }), 200
        
    except TypeError as e:
        return jsonify({
            "error": "Erro de tipo de dados",
            "message": str(e)
        }), 400
        
    except Exception as e:
        return jsonify({
            "error": "Erro ao criar playlist no Spotify",
            "message": str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True)