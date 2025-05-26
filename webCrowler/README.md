# 🕸️ Web Crawler Inteligente

## 📝 Descrição do Projeto

Projeto de Web Crawler inteligente desenvolvido em **Node.js**, capaz de explorar e extrair informações de páginas HTML de forma recursiva e eficiente.

🎥 **Vídeo de Explicação**  
Assista ao vídeo explicativo sobre o funcionamento e uso do Web Crawler:

[Assista no YouTube](https://www.youtube.com/watch?v=4A6uHxRwgZU)

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- NPM (Node Package Manager)

## 🚀 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/web-crawler.git
cd web-crawler

# Instale as dependências
npm install

# Inicie o servidor
node app.js
# ou 
npm start
```

## 🔧 Configuração

### Parâmetros principais

- `BASE_URL`: URL base para crawling (padrão: `http://127.0.0.1:5500/paginas/`)  
- `paginasIniciais`: Lista de páginas iniciais para iniciar o processo de crawling

## 💻 Uso Básico

Existem duas formas de utilizar este web crawler:

### 1. Interface Web
Execute o arquivo `busca.html` em seu navegador

### 2. API REST
Utilize os seguintes endpoints:

#### Endpoints disponíveis:

```
# Iniciar o crawler (opcional)
GET http://localhost:3000/iniciar/

# Buscar ocorrências de um termo
GET http://localhost:3000/buscar?termo=PARAMETRO
```

## 📊 Resposta da API

### Iniciar Crawler

```json
{
  "sucesso": true,
  "mensagem": "Crawler executado com sucesso",
  "textoCompleto": {
    "duna": "Texto completo da página...",
    "blade_runner": "Texto completo da página...",
    "interestelar": "Texto completo da página..."
  },
  "totalPaginas": 5
}
```

### Buscar Termo

```json
{
  "termo": "ficção",
  "totalOcorrencias": 42,
  "ocorrenciasPorPagina": [
    {"pagina": "duna", "quantidade": 15},
    {"pagina": "blade_runner", "quantidade": 12},
    {"pagina": "matrix", "quantidade": 10},
    {"pagina": "interestelar", "quantidade": 5}
  ]
}
```

## 📝 Notas
- O crawler precisa ser executado antes de realizar buscas
- A segunda rota inicia automaticamente o crawler se ainda não foi executado
- As buscas são case-insensitive (não diferenciam maiúsculas de minúsculas)

---

## 🛠️ Tecnologias Utilizadas

- Node.js
- Express
- Axios
- Cheerio

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para mais detalhes.