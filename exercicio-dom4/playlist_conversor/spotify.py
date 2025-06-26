import os
from dotenv import load_dotenv
import spotipy
from spotipy.oauth2 import SpotifyOAuth

load_dotenv()

musicas = [
    "Te Amo (Carrie)",
    "Tudo de Novo",
    "Te Amo Tanto",
    "Refém",
    "Mulheres Perdidas",
    "Chorando Se Foi / Lambamor (Pout-Pourri)",
    "Coração Bobo",
    "Quero Ser Seu Namorado / Não Venha Mais Me Ver (Pout-Pourri)",
    "Não Diga Não",
    "Vendaval",
    "Seu Amor É Bom / Um Novo Amor (Pout-Pourri)",
    "Não Fique Longe de Mim (I Live My Life For Love)",
    "Não Faz Sentido",
    "O Gemidinho"
]


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
    return tracks[0]['id']

def adicionar_musica_na_playlist(sp, playlist_id, track_id):
    """Adiciona uma música à playlist."""
    sp.playlist_add_items(playlist_id, [track_id])
    print("🎵 Música adicionada à playlist!")

if __name__ == "__main__":
    sp = configurar_spotify()
    
    
    
    
    
    # nome_playlist = "Minha Playlist Legal"
    # playlist_id = criar_playlist(sp, nome_playlist, descricao="Playlist criada via Spotipy API")
    
    # nome_musica = input("\nDigite o nome da música para adicionar na playlist: ")
    # track_id = buscar_musica(sp, nome_musica)
    
    # if track_id:
    #     adicionar_musica_na_playlist(sp, playlist_id, track_id)
    # else:
    #     print("Não foi possível adicionar a música porque não foi encontrada.")
