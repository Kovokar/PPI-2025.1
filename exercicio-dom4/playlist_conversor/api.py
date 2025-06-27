from flask import Flask, jsonify, request
from flask_cors import CORS
from spotify import main as main_spotify
from utils import formata_url

app = Flask(__name__)
CORS(app)


# Rota para adicionar um novo livro (POST)
@app.route('/converter_playlist', methods=['POST'])
def add_book():

    new_playlist = {
        "playlist_youtube": request.json['playlist_youtube'],
        "nome_playlist_spotify": request.json['nome_playlist_spotify']
    }
    
    playlist_youtube_id = formata_url(new_playlist['playlist_youtube'])
    nome_da_playlist_spotify = new_playlist['nome_playlist_spotify']
    
    main_spotify(playlist_youtube_id=playlist_youtube_id, nome_playlist_spotify=nome_da_playlist_spotify)
    
    return jsonify(new_playlist), 201


if __name__ == '__main__':
    app.run(debug=True)
