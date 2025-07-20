# Social IFPI - Blog

Blog institucional do Instituto Federal do Piauí (IFPI) desenvolvido com TypeScript, HTML e CSS puro.

## 📋 Descrição

O Social IFPI é uma plataforma de blog moderna e responsiva que permite o compartilhamento de conhecimento, inovação e transformação educacional. O sistema foi desenvolvido com foco na simplicidade e performance, utilizando tecnologias web fundamentais.

## 🚀 Funcionalidades

- **Listagem de Posts**: Visualização em grid responsivo de todos os artigos publicados
- **Visualização Individual**: Página dedicada para cada post com conteúdo completo
- **Sistema de Interação**:
  - Curtidas em posts
  - Compartilhamentos
  - Comentários com autor e data
- **Modal de Nova Publicação**: Interface para criar novos posts
- **Tema Dark**: Interface escura moderna e confortável para leitura

## 🛠️ Tecnologias Utilizadas

- **TypeScript**: Para tipagem estática e melhor manutenibilidade
- **HTML5**: Estrutura semântica das páginas
- **CSS3**: Estilização com variáveis CSS e design responsivo
- **API REST**: Integração com backend via fetch API

## 🔧 Configuração e Instalação

1. **Clone o repositório**

   ```
   git clone https://github.com/Kovokar/PPI-2025.1
   cd blog-trabalho-final
   ```

2. **Entre na pasta do backend e rode a aplicação**

   ```
    cd blog-backend
    npm run dev

   ```

3. **Execute o index.html com a extensão live server**

## 📡 API Endpoints

O projeto espera os seguintes endpoints da API:

- `GET /socialifpi/postagem` - Lista todos os posts
- `GET /socialifpi/postagem/:id` - Busca um post específico
- `POST /socialifpi/postagem/:id/curtir` - Adiciona curtida ao post
- `POST /socialifpi/postagem/:id/compartilhar` - Registra compartilhamento
- `GET /socialifpi/postagem/:id/comentarios` - Lista comentários do post
- `POST /socialifpi/postagem/:id/comentarios` - Adiciona novo comentário

## 🎨 Personalização

### Cores

As cores podem ser personalizadas através das variáveis CSS em `estilos.css`:

```
:root {
--cor-principal: #1A1A1A;
--cor-secundaria: #333333;
--cor-fundo: #121212;
--cor-texto: #EAEAEA;
--cor-texto-secundario: #CCCCCC;
--cor-borda: #444444;
--cor-hover: #555555;
}
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Autores

- Gisele Bianca
- Luiz Felipe
- Pedro Guilherme
