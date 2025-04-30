# Projeto: Buscador Web com Armazenamento de Relações

## Descrição

Este projeto tem como objetivo hospedar páginas, realizar buscas em seu conteúdo, extrair e armazenar links e relações entre páginas, além de implementar um sistema de pontuação baseado em critérios definidos.

---

## Parte 1: Coleta e Armazenamento de Dados

### 1. Hospedagem
- Hospedar 5 páginas HTML.

### 2. Crawling (Rastreamento)
1. Receber um **link inicial** de uma das páginas.
2. Fazer um **GET** na página e extrair:
   - Um **array com o conteúdo** textual da página.
   - Um **array com todos os links** (hrefs) encontrados.
3. Para **cada link extraído**:
   - Fazer um **GET** na nova página.
   - Armazenar os **links e suas relações** (origem → destino).
4. Persistir todos os dados em um **banco de dados**:
   - Conteúdo das páginas.
   - Links encontrados.
   - Relações entre páginas (grafo).

---

## Parte 2: Implementação do Buscador

### Regras de Pontuação

#### 1. Quantidade de Links
- **Cada link** em uma página: **+10 pontos**.
- **Auto-referência** (página linkando para si mesma): **-15 pontos**.

#### 2. Frequência de Termos Buscados
- Cada **ocorrência** do termo buscado no código-fonte da página: **+10 pontos**.

---

## Objetivos

- Construir um mecanismo básico de busca e análise de páginas.
- Avaliar páginas com base em **estrutura de links** e **relevância do conteúdo textual**.
- Persistir e analisar relações entre páginas em forma de **grafo**.

---

## Tecnologias Sugeridas

- **Node.js / Python / Go** (para o crawler e buscador)
- **SQLite / PostgreSQL / MongoDB** (para persistência de dados)
- **Express / Flask** (para hospedar as páginas, se necessário)

---

## Exemplo de Banco de Dados

### Tabela: `pages`
| id | url             | content           |
|----|------------------|-------------------|
| 1  | http://.../a.html | "Conteúdo da página A" |

### Tabela: `links`
| from_page_id | to_page_id |
|--------------|-------------|
| 1            | 2           |
| 2            | 3           |
| 3            | 3 (auto)    |

---

## Execução

1. Iniciar o serviço e apontar para o link inicial.
2. O sistema rastreia os links e popula o banco.
3. O buscador pode ser executado com um termo:
   ```bash
   buscar termo
