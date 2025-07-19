var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function getById(id) {
    return document.getElementById(id);
}
var apiUrl = 'http://localhost:3000/socialifpi/postagem'; // Atualize a URL conforme necessário
var comentariosApiUrl = 'http://localhost:3000/socialifpi/postagem'; // Mesma base, rota de comentarios por post
// Função para listar todas as postagens (atualizada para incluir comentários)
function listarPostagens() {
    return __awaiter(this, void 0, void 0, function () {
        var response, postagens, postagensElement;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(apiUrl)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    postagens = _a.sent();
                    postagensElement = getById('postagens');
                    if (postagensElement) {
                        postagensElement.innerHTML = ''; // Limpa as postagens anteriores
                        postagens.forEach(function (postagem) {
                            var article = document.createElement('article');
                            var titulo = document.createElement('h2');
                            titulo.textContent = postagem.titulo;
                            var conteudo = document.createElement('p');
                            conteudo.textContent = postagem.conteudo;
                            var data = document.createElement('p');
                            data.className = 'data';
                            data.textContent = new Date(postagem.data).toLocaleDateString();
                            var curtidas = document.createElement('p');
                            curtidas.textContent = "Curtidas: ".concat(postagem.curtidas);
                            curtidas.style.fontWeight = 'bold';
                            var botaoCurtir = document.createElement('button');
                            botaoCurtir.textContent = 'Curtir';
                            botaoCurtir.addEventListener('click', function () { return curtirPostagem(postagem.id, curtidas); });
                            article.appendChild(titulo);
                            article.appendChild(conteudo);
                            article.appendChild(data);
                            article.appendChild(curtidas);
                            article.appendChild(botaoCurtir);
                            // Comentários
                            var comentariosContainer = document.createElement('div');
                            comentariosContainer.className = 'container-comentarios';
                            // Função para atualizar comentários e formulário
                            var atualizarComentarios = function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            comentariosContainer.innerHTML = '';
                                            return [4 /*yield*/, listarComentarios(postagem.id, comentariosContainer)];
                                        case 1:
                                            _a.sent();
                                            comentariosContainer.appendChild(criarFormularioComentario(postagem.id, atualizarComentarios));
                                            return [2 /*return*/];
                                    }
                                });
                            }); };
                            atualizarComentarios();
                            article.appendChild(comentariosContainer);
                            postagensElement.appendChild(article);
                        });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// Função para curtir uma postagem
function curtirPostagem(id, curtidasElement) {
    return __awaiter(this, void 0, void 0, function () {
        var response, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("".concat(apiUrl, "/").concat(id, "/curtir"), {
                        method: 'POST'
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = _a.sent();
                    curtidasElement.textContent = "Curtidas: ".concat(result.curtidas);
                    return [2 /*return*/];
            }
        });
    });
}
// Função para buscar comentários de uma postagem
function listarComentarios(postId, container) {
    return __awaiter(this, void 0, void 0, function () {
        var response, comentarios, comentariosDiv, tituloComentarios, semComentarios;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("".concat(comentariosApiUrl, "/").concat(postId, "/comentarios"))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    comentarios = _a.sent();
                    comentariosDiv = document.createElement('div');
                    comentariosDiv.className = 'comentarios';
                    tituloComentarios = document.createElement('h3');
                    tituloComentarios.textContent = 'Comentários';
                    comentariosDiv.appendChild(tituloComentarios);
                    if (comentarios.length === 0) {
                        semComentarios = document.createElement('p');
                        semComentarios.textContent = 'Nenhum comentário ainda.';
                        comentariosDiv.appendChild(semComentarios);
                    }
                    else {
                        comentarios.forEach(function (comentario) {
                            var comentarioDiv = document.createElement('div');
                            comentarioDiv.className = 'comentario';
                            var autor = document.createElement('strong');
                            autor.textContent = comentario.autor + ': ';
                            comentarioDiv.appendChild(autor);
                            var conteudo = document.createElement('span');
                            conteudo.textContent = comentario.conteudo;
                            comentarioDiv.appendChild(conteudo);
                            var data = document.createElement('span');
                            data.className = 'data-comentario';
                            data.textContent = ' (' + new Date(comentario.data).toLocaleString() + ')';
                            comentarioDiv.appendChild(data);
                            comentariosDiv.appendChild(comentarioDiv);
                        });
                    }
                    container.appendChild(comentariosDiv);
                    return [2 /*return*/];
            }
        });
    });
}
// Função para criar formulário de novo comentário
function criarFormularioComentario(postId, atualizar) {
    var _this = this;
    var form = document.createElement('form');
    form.className = 'form-comentario';
    var inputAutor = document.createElement('input');
    inputAutor.type = 'text';
    inputAutor.placeholder = 'Seu nome';
    inputAutor.required = true;
    inputAutor.name = 'autor';
    var inputConteudo = document.createElement('input');
    inputConteudo.type = 'text';
    inputConteudo.placeholder = 'Seu comentário';
    inputConteudo.required = true;
    inputConteudo.name = 'conteudo';
    var botao = document.createElement('button');
    botao.type = 'submit';
    botao.textContent = 'Comentar';
    form.appendChild(inputAutor);
    form.appendChild(inputConteudo);
    form.appendChild(botao);
    form.addEventListener('submit', function (e) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!inputAutor.value.trim() || !inputConteudo.value.trim())
                        return [2 /*return*/];
                    return [4 /*yield*/, fetch("".concat(comentariosApiUrl, "/").concat(postId, "/comentarios"), {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                autor: inputAutor.value,
                                conteudo: inputConteudo.value,
                                likes: 0
                            })
                        })];
                case 1:
                    _a.sent();
                    inputAutor.value = '';
                    inputConteudo.value = '';
                    atualizar();
                    return [2 /*return*/];
            }
        });
    }); });
    return form;
}
// Função para incluir uma nova postagem
function incluirPostagem() {
    return __awaiter(this, void 0, void 0, function () {
        var tituloInput, conteudoInput, novaPostagem, response, postagemIncluida;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tituloInput = getById('titulo');
                    conteudoInput = getById('conteudo');
                    if (!(tituloInput && conteudoInput)) return [3 /*break*/, 3];
                    novaPostagem = {
                        titulo: tituloInput.value,
                        conteudo: conteudoInput.value,
                        data: new Date().toISOString(),
                        curtidas: 0
                    };
                    return [4 /*yield*/, fetch(apiUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(novaPostagem)
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    postagemIncluida = _a.sent();
                    listarPostagens(); // Atualiza a lista de postagens
                    // Limpa os campos do formulário
                    tituloInput.value = '';
                    conteudoInput.value = '';
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Inicializa a aplicação
listarPostagens();
var botaoNovaPostagem = getById("botaoNovaPostagem");
if (botaoNovaPostagem) {
    botaoNovaPostagem.addEventListener('click', incluirPostagem);
}
