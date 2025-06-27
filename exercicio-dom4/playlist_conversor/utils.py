from collections import Counter
import json

def formata_url(url: str) -> str:
    return url.split('=')[-1]  #RETorna o ID do vídeo ou playlist

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
        
def remove_aspas(lista):
    """Remove aspas duplas e simples de strings em uma lista."""
    return [s.replace('"', '').replace("'", '') for s in lista]

def save_json(data, filename):
    """Salva os dados em um arquivo JSON."""
    try:
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=4, default=str)
        print(f"Dados salvos em {filename}")
    except Exception as e:
        print(f"Erro ao salvar JSON: {e}")
