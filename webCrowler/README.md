# 🕷️ Web Crawler Inteligente

## 📝 Descrição do Projeto

Projeto de Web Crawler inteligente desenvolvido em **Node.js**, capaz de explorar e extrair informações de páginas HTML de forma recursiva e eficiente.

---

## 🚀 Funcionalidades Principais

- Crawling recursivo de páginas web  
- Extração de links e conteúdo textual  
- Busca e contagem de ocorrências de termos  
- Análise de links e rastreamento de páginas visitadas  

---

## 🛠️ Tecnologias Utilizadas

- Node.js  
- Axios (requisições HTTP)  
- Cheerio (parser de HTML)  
- Path (manipulação de caminhos)  

---

## 📦 Instalação

### Pré-requisitos

- Node.js (versão 14 ou superior)  
- npm (gerenciador de pacotes)  

### Passos

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/web-crawler.git
cd web-crawler

# Instale as dependências
npm install

```

## 🔧 Configuração

### Parâmetros principais

- `BASE_URL`: URL base para crawling (exemplo: `http://127.0.0.1:5500/paginas/`)  
- `paginasIniciais`: Lista de páginas iniciais para iniciar o processo  

---

## 💻 Uso Básico

### Exemplo de código

```javascript
const { executarCrawler } = require('./back/services/webCrawler');

async function main() {
  // Executa o crawler
  const resultado = await executarCrawler();

  // Busca ocorrências de um termo
  const ocorrenciasDuna = resultado.buscarOcorrencias('duna');
  console.log(ocorrenciasDuna);
}

main();
```

---

## ⚙️ Configuração

As configurações principais podem ser encontradas em `config.js` (ou no local onde você definiu as constantes):

```javascript
const BASE_URL = 'http://127.0.0.1:5500/paginas/';
const paginasIniciais = ['index.html'];

```
BASE_URL: Define a URL base para o processo de crawling. Certifique-se de que ela aponte para uma pasta local com páginas HTML.

paginasIniciais: Lista de páginas iniciais que o crawler deve visitar primeiro.

Você pode personalizar essas variáveis para apontar para outras páginas locais ou estruturas diferentes.


---