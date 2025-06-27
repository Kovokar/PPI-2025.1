import os
from dotenv import load_dotenv
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from collections import Counter
from youtube import main as main_youtube


def configurar_spotify():
    """Configura autenticação com Authorization Code Flow e abre URL de login."""
    scope = "playlist-modify-public playlist-modify-private"
    sp_oauth = SpotifyOAuth(
        client_id=os.getenv("SPOTIPY_CLIENT_ID"),
        client_secret=os.getenv("SPOTIPY_CLIENT_SECRET"),
        redirect_uri=os.getenv("SPOTIPY_REDIRECT_URI"),
        scope=scope,
        cache_path=".cache"  # Salva o token para não pedir toda hora
    )
    
    # Obtém URL para autorização do usuário
    auth_url = sp_oauth.get_authorize_url()
    print("Por favor, abra essa URL no navegador para autorizar o app:")
    print(auth_url)
    
    # Pede para o usuário colar a URL para onde foi redirecionado
    redirected_response = input("\nCole a URL para onde você foi redirecionado:\n")
    
    # Pega o token a partir da URL de callback
    code = sp_oauth.parse_response_code(redirected_response)
    token_info = sp_oauth.get_access_token(code)
    
    # Cria o cliente autenticado
    sp = spotipy.Spotify(auth=token_info['access_token'])
    return sp

def criar_playlist(sp, nome_playlist, descricao="", publica=True):
    """Cria uma nova playlist na conta do usuário autenticado."""
    user_id = sp.me()['id']
    playlist = sp.user_playlist_create(user=user_id, name=nome_playlist, public=publica, description=descricao)
    print(f"\n✅ Playlist '{nome_playlist}' criada com sucesso!")
    print(f"🔗 Link da playlist: {playlist['external_urls']['spotify']}")
    print(f"ID da playlist: {playlist['id']}")
    return playlist['id']

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
        print("musica add:::::: ",musica)
        track = buscar_musica(sp, musica)
        track_id = track['id'] if track else None
        
        nome = track['name']
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
    print("BUCETA")
    print("BUCETA")
    print("BUCETA")
    print("BUCETA")

    return track_ids


    """Lista as músicas de uma playlist."""

def item_mais_frequente(lista):
    """Retorna o item que mais se repete em uma lista e a quantidade."""
    if not lista:
        return None, 0

    contador = Counter(lista)
    item_mais_comum, _ = contador.most_common(1)[0]
    return item_mais_comum

def adicionar_banda(lista, banda):
    """Adiciona ' joiao' ao final de cada item da lista."""
    for i in range(len(lista)):
        lista[i] += f" {banda}"


def main(playlist_youtube_id: str = "PL50zbRK-zJSzZDsfHJ7f0VdYPOPOAHZ-j", nome_playlist_spotify: str = "teste pablo3"):
    
    musicas = main_youtube(playlist_youtube_id)
    load_dotenv()
    sp = configurar_spotify()
    nome_playlist = nome_playlist_spotify
    playlist_spotify_id = criar_playlist(sp, nome_playlist, descricao="Playlist criada via Spotipy API")
    tracks_ids = listar_musicas_na_playlist(sp, musicas)
    
    print(tracks_ids)
    print("\n\n\n")
    
    for id in tracks_ids:
        adicionar_musica_na_playlist(sp, playlist_spotify_id, id)
    
    print("\n🎉 Todas as músicas foram adicionadas à playlist com sucesso!")
    
