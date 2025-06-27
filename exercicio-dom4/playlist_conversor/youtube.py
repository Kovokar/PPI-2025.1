import os
from dotenv import load_dotenv
from youtube_api import YouTubeDataAPI
from utils import remove_aspas

# ----------------------------
# Configuração e inicialização
# ----------------------------

def load_api_key():
    """Carrega a chave da API do .env."""
    load_dotenv()
    return os.environ.get("API_KEY")

def init_youtube_api(api_key):
    """Inicializa o cliente da API do YouTube."""
    return YouTubeDataAPI(api_key)

# ----------------------------
# Coleta de dados
# ----------------------------

def get_video_ids_from_playlist(yt, playlist_id):
    """Retorna uma lista de IDs de vídeos de uma playlist."""
    try:
        playlist_videos = yt.get_videos_from_playlist_id(playlist_id)
        return [video['video_id'] for video in playlist_videos]
    except Exception as e:
        print(f"Erro ao obter vídeos da playlist: {e}")
        return []

def get_video_metadata_list(yt, video_ids):
    """Retorna uma lista com os metadados de cada vídeo."""
    infos_videos = []
    for video_id in video_ids:
        try:
            info = yt.get_video_metadata(video_id)
            infos_videos.append(info["video_title"])
        except Exception as e:
            print(f"Erro ao obter metadados do vídeo {video_id}: {e}")
    return infos_videos

def main(playlist_id: str):
    api_key = load_api_key()
    yt = init_youtube_api(api_key)

    video_ids = get_video_ids_from_playlist(yt, playlist_id)
    video_data = get_video_metadata_list(yt, video_ids)
    
    video_data = remove_aspas(video_data)  
    
    print(video_data)
    return video_data