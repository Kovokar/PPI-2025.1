import os
from typing import List, Optional, Tuple
from dataclasses import dataclass
from collections import Counter
from dotenv import load_dotenv
import spotipy
from spotipy.oauth2 import SpotifyOAuth


@dataclass
class Track:
    """Representa uma música com suas informações básicas."""
    id: str
    name: str
    artist: str
    spotify_url: str


class SpotifyPlaylistManager:
    """Gerenciador para criação e manipulação de playlists no Spotify."""
    
    def __init__(self):
        """Inicializa o gerenciador carregando configurações do .env"""
        load_dotenv()
        self.sp = None
        self._setup_spotify_client()
    
    def _setup_spotify_client(self) -> None:
        """Configura e autentica o cliente Spotify."""
        scope = "playlist-modify-public playlist-modify-private"
        
        sp_oauth = SpotifyOAuth(
            client_id=os.getenv("SPOTIPY_CLIENT_ID"),
            client_secret=os.getenv("SPOTIPY_CLIENT_SECRET"),
            redirect_uri=os.getenv("SPOTIPY_REDIRECT_URI"),
            scope=scope,
            cache_path=".cache"
        )
        
        # Obtém autorização do usuário
        auth_url = sp_oauth.get_authorize_url()
        print("🔗 Por favor, abra esta URL no navegador para autorizar o aplicativo:")
        print(auth_url)
        
        redirected_response = input("\n📋 Cole a URL para onde você foi redirecionado:\n")
        
        # Processa o token de acesso
        code = sp_oauth.parse_response_code(redirected_response)
        token_info = sp_oauth.get_access_token(code)
        
        self.sp = spotipy.Spotify(auth=token_info['access_token'])
        print("✅ Autenticação realizada com sucesso!")
    
    def create_playlist(self, name: str, description: str = "", is_public: bool = True) -> str:
        """
        Cria uma nova playlist na conta do usuário.
        
        Args:
            name: Nome da playlist
            description: Descrição da playlist
            is_public: Se a playlist deve ser pública
            
        Returns:
            ID da playlist criada
        """
        user_id = self.sp.me()['id']
        playlist = self.sp.user_playlist_create(
            user=user_id, 
            name=name, 
            public=is_public, 
            description=description
        )
        
        print(f"\n✅ Playlist '{name}' criada com sucesso!")
        print(f"🔗 Link: {playlist['external_urls']['spotify']}")
        
        return playlist['id']
    
    def search_track(self, track_name: str, limit: int = 1, verbose: bool = False) -> Optional[Track]:
        """
        Busca uma música pelo nome.
        
        Args:
            track_name: Nome da música a ser buscada
            limit: Número máximo de resultados
            verbose: Se deve imprimir mensagens de erro
            
        Returns:
            Objeto Track se encontrado, None caso contrário
        """
        try:
            results = self.sp.search(q=track_name, type='track', limit=limit)
            tracks = results['tracks']['items']
            
            if not tracks:
                if verbose:
                    print(f"❌ Música '{track_name}' não encontrada")
                return None
            
            track_data = tracks[0]
            return Track(
                id=track_data['id'],
                name=track_data['name'],
                artist=track_data['artists'][0]['name'],
                spotify_url=track_data['external_urls']['spotify']
            )
            
        except Exception as e:
            if verbose:
                print(f"❌ Erro ao buscar '{track_name}': {e}")
            return None
    
    def add_tracks_to_playlist(self, playlist_id: str, track_ids: List[str]) -> bool:
        """
        Adiciona múltiplas músicas a uma playlist.
        
        Args:
            playlist_id: ID da playlist
            track_ids: Lista de IDs das músicas
            
        Returns:
            True se todas as músicas foram adicionadas com sucesso
        """
        try:
            # Spotify API permite até 100 tracks por request
            batch_size = 100
            
            for i in range(0, len(track_ids), batch_size):
                batch = track_ids[i:i + batch_size]
                self.sp.playlist_add_items(playlist_id, batch)
            
            print(f"🎵 {len(track_ids)} música(s) adicionada(s) à playlist!")
            return True
            
        except Exception as e:
            print(f"❌ Erro ao adicionar músicas à playlist: {e}")
            return False
    
    def find_most_common_artist(self, tracks: List[Track]) -> str:
        """
        Encontra o artista mais comum em uma lista de tracks.
        
        Args:
            tracks: Lista de objetos Track
            
        Returns:
            Nome do artista mais comum
        """
        if not tracks:
            return ""
        
        artists = [track.artist for track in tracks]
        counter = Counter(artists)
        most_common_artist, _ = counter.most_common(1)[0]
        
        return most_common_artist
    
    def search_tracks_with_artist_enhancement(self, track_names: List[str]) -> List[Track]:
        """
        Busca músicas em duas etapas para maior precisão:
        1ª etapa: Busca inicial para identificar o artista mais comum
        2ª etapa: Nova busca de TODAS as músicas usando "nome_musica + artista_principal"
        
        Args:
            track_names: Lista de nomes das músicas
            
        Returns:
            Lista de objetos Track encontrados com maior precisão
        """
        print("🔍 ETAPA 1 - Busca inicial para identificar artista principal...")
        print("-" * 60)
        
        # Primeira etapa: busca inicial para identificar o artista principal
        initial_tracks = []
        artists_found = []
        
        for i, track_name in enumerate(track_names, 1):
            print(f"[{i}/{len(track_names)}] Buscando: {track_name}")
            track = self.search_track(track_name)
            
            if track:
                initial_tracks.append(track)
                artists_found.append(track.artist)
                print(f"    ✅ Encontrado: {track.name} - {track.artist}")
            else:
                print(f"    ❌ Não encontrado")
        
        if not initial_tracks:
            print("\n❌ Nenhuma música encontrada na busca inicial")
            return []
        
        # Identifica o artista mais comum
        main_artist = self.find_most_common_artist(initial_tracks)
        artist_count = Counter(artists_found)[main_artist]
        
        print(f"\n🎤 ARTISTA PRINCIPAL IDENTIFICADO: {main_artist}")
        print(f"📊 Aparições: {artist_count}/{len(initial_tracks)} músicas")
        
        # Segunda etapa: busca refinada de TODAS as músicas com o artista principal
        print(f"\n🔍 ETAPA 2 - Busca refinada com '{main_artist}'...")
        print("-" * 60)
        
        refined_tracks = []
        
        for i, track_name in enumerate(track_names, 1):
            enhanced_query = f"{track_name} {main_artist}"
            print(f"[{i}/{len(track_names)}] Buscando: {enhanced_query}")
            
            track = self.search_track(enhanced_query)
            
            if track:
                refined_tracks.append(track)
                print(f"    ✅ Encontrado: {track.name} - {track.artist}")
            else:
                print(f"    ⚠️  Busca refinada falhou, tentando busca original...")
                # Fallback para busca original se a busca refinada falhar
                fallback_track = self.search_track(track_name)
                if fallback_track:
                    refined_tracks.append(fallback_track)
                    print(f"    ✅ Fallback: {fallback_track.name} - {fallback_track.artist}")
                else:
                    print(f"    ❌ Música não encontrada em nenhuma busca")
        
        print(f"\n📈 RESULTADO FINAL:")
        print(f"   • Músicas encontradas na 1ª etapa: {len(initial_tracks)}")
        print(f"   • Músicas encontradas na 2ª etapa: {len(refined_tracks)}")
        print(f"   • Melhoria na precisão: {len(refined_tracks) - len(initial_tracks):+d}")
        
        return refined_tracks


def main():
    """Função principal do programa."""
    
    # Lista de músicas a serem adicionadas
    TRACK_NAMES = [
        "Conde & Drácula - Tá Faltando Ôme",
        "Conde & Drácula - Carimbó Do Marajó",
        "Conde & Drácula - De Cabaré Em Cabaré",
        "Conde & Drácula - Nem Lá, Nem Cá",
        "Conde & Drácula - Bruxa Feiticeira",
        "Conde & Drácula - O Tropeiro",
        "Conde & Drácula - Café Do Paissandu",
        "Conde & Drácula - Vira Fazendeiro",
        "Conde & Drácula - O Corvo",
        "Conde & Drácula - Véu De Noiva",
        "Conde & Drácula - A Noite Dos Vampiros",
        "Conde & Drácula - Cavalo De Aço"
    ]
    
    try:
        # Inicializa o gerenciador
        manager = SpotifyPlaylistManager()
        
        # Busca as músicas com melhoria baseada no artista principal
        found_tracks = manager.search_tracks_with_artist_enhancement(TRACK_NAMES)
        
        if not found_tracks:
            print("❌ Nenhuma música foi encontrada. Encerrando...")
            return
        
        print(f"\n📊 Resumo: {len(found_tracks)} de {len(TRACK_NAMES)} músicas encontradas")
        
        # Cria a playlist
        playlist_name = "CONDE E DRACULA - Playlist Completa"
        playlist_description = f"Playlist criada automaticamente com {len(found_tracks)} músicas"
        
        playlist_id = manager.create_playlist(
            name=playlist_name,
            description=playlist_description,
            is_public=True
        )
        
        # Adiciona as músicas à playlist
        track_ids = [track.id for track in found_tracks]
        success = manager.add_tracks_to_playlist(playlist_id, track_ids)
        
        if success:
            print(f"\n🎉 Playlist '{playlist_name}' criada com sucesso!")
            print(f"📋 Total de músicas adicionadas: {len(found_tracks)}")
        else:
            print("\n❌ Erro ao adicionar músicas à playlist")
            
    except Exception as e:
        print(f"❌ Erro geral: {e}")


if __name__ == "__main__":
    main()