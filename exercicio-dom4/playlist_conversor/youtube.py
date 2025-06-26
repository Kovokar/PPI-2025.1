import os
import json
from dotenv import load_dotenv
from youtube_api import YouTubeDataAPI

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

# ----------------------------
# Armazenamento
# ----------------------------

def save_json(data, filename):
    """Salva os dados em um arquivo JSON."""
    data = remove_aspas(data)  # Remove aspas duplas e simples
    try:
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=4, default=str)
        print(f"Dados salvos em {filename}")
    except Exception as e:
        print(f"Erro ao salvar JSON: {e}")

def remove_aspas(lista):
    """Remove aspas duplas e simples de strings em uma lista."""
    return [s.replace('"', '').replace("'", '') for s in lista]


# ----------------------------
# Execução principal
# ----------------------------

def main():
    api_key = load_api_key()
    yt = init_youtube_api(api_key)

    playlist_id = "PL50zbRK-zJSzZDsfHJ7f0VdYPOPOAHZ-j"
    video_ids = get_video_ids_from_playlist(yt, playlist_id)
    video_data = get_video_metadata_list(yt, video_ids)

    save_json(video_data, "pablo.json")

if __name__ == "__main__":
    main()
