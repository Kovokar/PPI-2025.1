import os
from dotenv import load_dotenv
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from youtube import main as main_youtube
from utils import item_mais_frequente, adicionar_banda

def configurar_spotify():
    """Configura autenticação automática com captura do callback."""
    
    scope = "playlist-modify-public playlist-modify-private"
    
    sp_oauth = SpotifyOAuth(
        client_id=os.getenv("SPOTIPY_CLIENT_ID"),
        client_secret=os.getenv("SPOTIPY_CLIENT_SECRET"),
        redirect_uri=os.getenv("SPOTIPY_REDIRECT_URI"),
        scope=scope,
        cache_path=".cache",
        open_browser=True  # Abre o navegador e captura o callback automaticamente
    )
    
    token_info = sp_oauth.get_cached_token()
    
    if not token_info:
        auth_url = sp_oauth.get_authorize_url()
        print(f"Abrindo o navegador para autorizar o app...")
        
        # Essa linha já abre o navegador e o server local cuida do callback
        token_info = sp_oauth.get_access_token(as_dict=True)

    sp = spotipy.Spotify(auth=token_info['access_token'])
    return sp

def criar_playlist(sp, nome_playlist, descricao="", publica=True):
    """Cria uma nova playlist na conta do usuário autenticado."""
    user_id = sp.me()['id']
    playlist = sp.user_playlist_create(user=user_id, name=nome_playlist, public=publica, description=descricao)
    print(f"\n✅ Playlist '{nome_playlist}' criada com sucesso!")
    print(f"🔗 Link da playlist: {playlist['external_urls']['spotify']}")
    print(f"ID da playlist: {playlist['id']}")
    print(f"Descrição: {playlist}")
    return playlist['id'], playlist['external_urls']['spotify']

def buscar_musica(sp, nome_musica, limite=1):
    """Busca uma música pelo nome e retorna o ID da primeira encontrada."""
    resultado = sp.search(q=nome_musica, type='track', limit=limite)
    tracks = resultado['tracks']['items']
    if not tracks:
        print("Nenhuma música encontrada.")
        return None
    return tracks[0]

def adicionar_musica_na_playlist(sp, playlist_id, track_id):
    """Adiciona uma música à playlist."""
    sp.playlist_add_items(playlist_id, [track_id])
    print("🎵 Música adicionada à playlist!")

def listar_musicas_na_playlist(sp, musicas, repetir=True):
    track_ids = []
    artistas = []
    
    for musica in musicas:
        print("musica add: ",musica)
        track = buscar_musica(sp, musica)
        # track_id = track['id'] if track else None
        track_id = {
            'id': track['id'],
            'name': track['name'],
            'artists': track['artists'],
            'images': track['album']['images'] if track['album']['images'] else None
        }

        artista = track['artists'][0]['name']
        
        if track_id:
            track_ids.append(track_id)
            artistas.append(artista)
            # print(f"Adicionando {nome} - {artista} à playlist...")
        
    if repetir:
        banda = item_mais_frequente(artistas)
        adicionar_banda(musicas, banda=banda)
        print(musicas)
        print("\n\n\n\n")
        listar_musicas_na_playlist(sp, musicas, repetir=False)

    print("BUCETA")
    print("BUCETA")

    return track_ids

def main(playlist_youtube_id: str , nome_playlist_spotify: str):
    musicas = main_youtube(playlist_youtube_id)
    load_dotenv()
    sp = configurar_spotify()
    tracks_ids = listar_musicas_na_playlist(sp, musicas)
    return tracks_ids


def converter(tracks_ids, sp, nome_playlist_spotify):
    playlist_spotify_id, link = criar_playlist(sp, nome_playlist_spotify, descricao="Playlist criada via Spotipy API")
    for id in tracks_ids:
            adicionar_musica_na_playlist(sp, playlist_spotify_id, id)
    print("\n🎉 Todas as músicas foram adicionadas à playlist com sucesso!")
    return link