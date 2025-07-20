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
var apiUrl2 = 'http://localhost:3000/socialifpi/postagem';
function getPostIdFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var id = params.get('id');
    return id ? parseInt(id, 10) : null;
}
function fetchPost(id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(apiUrl2, "/").concat(id))];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        return [2 /*return*/, null];
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 3:
                    error_1 = _a.sent();
                    console.error('Erro ao buscar post:', error_1);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function renderPost(post) {
    var postSection = document.getElementById('post-detalhe');
    if (!postSection)
        return;
    if (!post) {
        postSection.innerHTML = '<p>Post não encontrado.</p>';
        return;
    }
    var categoria = (post.categorias && post.categorias.length > 0) ? post.categorias[0] : '';
    postSection.innerHTML = "\n        <div class=\"post-detalhe-card\">\n            <div class=\"post-image\" style=\"font-size:3.5rem;\">\uD83D\uDCDD</div>\n            <div class=\"post-content\">\n                <div class=\"post-meta\">\n                    <span class=\"post-category\">".concat(categoria, "</span>\n                    <span class=\"post-date\">").concat(new Date(post.data).toLocaleDateString(), "</span>\n                </div>\n                <h2 class=\"post-title\">").concat(post.titulo, "</h2>\n                <div class=\"post-body\">").concat(post.conteudo, "</div>\n                <div class=\"post-extra\">\n                    <span>\uD83D\uDC4D Curtidas: <span id=\"curtidasCount\">").concat(post.curtidas, "</span></span> |\n                    <span>\uD83D\uDD01 Compartilhamentos: <span id=\"sharesCount\">").concat(post.shares, "</span></span>\n                </div>\n                <div class=\"post-actions\">\n                    <button id=\"btnCurtir\" class=\"btn-action btn-curtir\">\uD83D\uDC4D Curtir</button>\n                    <button id=\"btnCompartilhar\" class=\"btn-action btn-compartilhar\">\uD83D\uDD01 Compartilhar</button>\n                </div>\n            </div>\n        </div>\n    ");
}
function listarComentarios(postId, container) {
    return __awaiter(this, void 0, void 0, function () {
        var response, comentarios, comentariosDiv_1, tituloComentarios, semComentarios, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(apiUrl2, "/").concat(postId, "/comentarios"))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    comentarios = _a.sent();
                    comentariosDiv_1 = document.createElement('div');
                    comentariosDiv_1.className = 'comentarios';
                    tituloComentarios = document.createElement('h3');
                    tituloComentarios.textContent = '🗨️ Comentários';
                    comentariosDiv_1.appendChild(tituloComentarios);
                    if (comentarios.length === 0) {
                        semComentarios = document.createElement('p');
                        semComentarios.textContent = 'Nenhum comentário ainda.';
                        comentariosDiv_1.appendChild(semComentarios);
                    }
                    else {
                        comentarios.forEach(function (comentario) {
                            var comentarioDiv = document.createElement('div');
                            comentarioDiv.className = 'comentario';
                            // Corpo do comentário
                            var corpoComentario = document.createElement('div');
                            corpoComentario.className = 'corpo-comentario';
                            var autorLinha = document.createElement('div');
                            autorLinha.className = 'autor-linha';
                            autorLinha.innerHTML = "<strong>".concat(comentario.autor, "</strong> <span class=\"data-comentario\">").concat(new Date(comentario.data).toLocaleString(), "</span>");
                            var conteudo = document.createElement('p');
                            conteudo.textContent = comentario.conteudo;
                            corpoComentario.appendChild(autorLinha);
                            corpoComentario.appendChild(conteudo);
                            comentarioDiv.appendChild(corpoComentario);
                            comentariosDiv_1.appendChild(comentarioDiv);
                        });
                    }
                    container.appendChild(comentariosDiv_1);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Erro ao carregar comentários:', error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
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
    botao.className = 'btn-comentar';
    form.appendChild(inputAutor);
    form.appendChild(inputConteudo);
    form.appendChild(botao);
    form.addEventListener('submit', function (e) { return __awaiter(_this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!inputAutor.value.trim() || !inputConteudo.value.trim())
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(apiUrl2, "/").concat(postId, "/comentarios"), {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                autor: inputAutor.value.trim(),
                                conteudo: inputConteudo.value.trim(),
                                likes: 0
                            })
                        })];
                case 2:
                    _a.sent();
                    inputAutor.value = '';
                    inputConteudo.value = '';
                    atualizar();
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error('Erro ao enviar comentário:', error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    return form;
}
function atualizarContadores(postId) {
    return __awaiter(this, void 0, void 0, function () {
        var post, curtidasElement, sharesElement, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchPost(postId)];
                case 1:
                    post = _a.sent();
                    if (post) {
                        curtidasElement = document.getElementById('curtidasCount');
                        sharesElement = document.getElementById('sharesCount');
                        if (curtidasElement)
                            curtidasElement.textContent = String(post.curtidas);
                        if (sharesElement)
                            sharesElement.textContent = String(post.shares);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.error('Erro ao atualizar contadores:', error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function configurarBotoesInteracao(postId) {
    var _this = this;
    var btnCurtir = document.getElementById('btnCurtir');
    var btnCompartilhar = document.getElementById('btnCompartilhar');
    if (!btnCurtir || !btnCompartilhar) {
        console.error('Botões de interação não encontrados');
        return;
    }
    btnCurtir.replaceWith(btnCurtir.cloneNode(true));
    btnCompartilhar.replaceWith(btnCompartilhar.cloneNode(true));
    var novoBtnCurtir = document.getElementById('btnCurtir');
    var novoBtnCompartilhar = document.getElementById('btnCompartilhar');
    novoBtnCurtir.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
        var response, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    novoBtnCurtir.classList.add('clicked');
                    novoBtnCurtir.disabled = true;
                    return [4 /*yield*/, fetch("".concat(apiUrl2, "/").concat(postId, "/curtir"), {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' }
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, atualizarContadores(postId)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    setTimeout(function () {
                        novoBtnCurtir.classList.remove('clicked');
                        novoBtnCurtir.disabled = false;
                    }, 500);
                    return [3 /*break*/, 5];
                case 4:
                    error_5 = _a.sent();
                    console.error('Erro ao curtir post:', error_5);
                    novoBtnCurtir.disabled = false;
                    novoBtnCurtir.classList.remove('clicked');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    novoBtnCompartilhar.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
        var response, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    novoBtnCompartilhar.classList.add('clicked');
                    novoBtnCompartilhar.disabled = true;
                    return [4 /*yield*/, fetch("".concat(apiUrl2, "/").concat(postId, "/compartilhar"), {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' }
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, atualizarContadores(postId)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    setTimeout(function () {
                        novoBtnCompartilhar.classList.remove('clicked');
                        novoBtnCompartilhar.disabled = false;
                    }, 500);
                    return [3 /*break*/, 5];
                case 4:
                    error_6 = _a.sent();
                    console.error('Erro ao compartilhar post:', error_6);
                    novoBtnCompartilhar.disabled = false;
                    novoBtnCompartilhar.classList.remove('clicked');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
}
document.addEventListener('DOMContentLoaded', function () {
    return __awaiter(this, void 0, void 0, function () {
        function renderizarSecaoComentarios() {
            return __awaiter(this, void 0, void 0, function () {
                var comentariosSection, btn;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            comentariosSection = document.getElementById('comentarios-section');
                            if (!(comentariosSection && postId_1 !== null)) return [3 /*break*/, 2];
                            comentariosSection.innerHTML = '<button id="btnAbrirModalComentario" class="btn-comentar" style="margin: 20px 0 0 0;">Comentar</button>';
                            return [4 /*yield*/, listarComentarios(postId_1, comentariosSection)];
                        case 1:
                            _a.sent();
                            btn = document.getElementById('btnAbrirModalComentario');
                            if (btn)
                                btn.onclick = abrirModalComentario;
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        }
        function abrirModalComentario() {
            if (!modalComentario_1)
                return;
            modalComentario_1.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            if (autorComentario_1)
                autorComentario_1.value = '';
            if (conteudoComentario_1)
                conteudoComentario_1.value = '';
            if (autorComentario_1)
                autorComentario_1.focus();
        }
        function fecharModal() {
            if (!modalComentario_1)
                return;
            modalComentario_1.style.display = 'none';
            document.body.style.overflow = 'auto';
            if (formModalComentario_1)
                formModalComentario_1.reset();
        }
        var postId_1, post, btnAbrirModalComentario, modalComentario_1, fecharModalComentario, btnCancelarModalComentario, formModalComentario_1, autorComentario_1, conteudoComentario_1, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    postId_1 = getPostIdFromUrl();
                    if (!postId_1) {
                        console.error('ID do post não encontrado na URL');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, fetchPost(postId_1)];
                case 1:
                    post = _a.sent();
                    if (!post) {
                        console.error('Post não encontrado');
                        return [2 /*return*/];
                    }
                    renderPost(post);
                    configurarBotoesInteracao(postId_1);
                    btnAbrirModalComentario = document.getElementById('btnAbrirModalComentario');
                    modalComentario_1 = document.getElementById('modalComentario');
                    fecharModalComentario = document.getElementById('fecharModalComentario');
                    btnCancelarModalComentario = document.getElementById('btnCancelarModalComentario');
                    formModalComentario_1 = document.getElementById('formModalComentario');
                    autorComentario_1 = document.getElementById('autorComentario');
                    conteudoComentario_1 = document.getElementById('conteudoComentario');
                    if (btnAbrirModalComentario)
                        btnAbrirModalComentario.onclick = abrirModalComentario;
                    if (fecharModalComentario)
                        fecharModalComentario.onclick = fecharModal;
                    if (btnCancelarModalComentario)
                        btnCancelarModalComentario.onclick = fecharModal;
                    window.addEventListener('keydown', function (e) {
                        if (e.key === 'Escape')
                            fecharModal();
                    });
                    if (modalComentario_1) {
                        modalComentario_1.addEventListener('click', function (e) {
                            if (e.target === modalComentario_1)
                                fecharModal();
                        });
                    }
                    if (formModalComentario_1) {
                        formModalComentario_1.onsubmit = function (e) {
                            return __awaiter(this, void 0, void 0, function () {
                                var err_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            e.preventDefault();
                                            if (!autorComentario_1.value.trim() || !conteudoComentario_1.value.trim())
                                                return [2 /*return*/];
                                            _a.label = 1;
                                        case 1:
                                            _a.trys.push([1, 4, , 5]);
                                            return [4 /*yield*/, fetch("".concat(apiUrl2, "/").concat(postId_1, "/comentarios"), {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({
                                                        autor: autorComentario_1.value.trim(),
                                                        conteudo: conteudoComentario_1.value.trim(),
                                                        likes: 0
                                                    })
                                                })];
                                        case 2:
                                            _a.sent();
                                            fecharModal();
                                            return [4 /*yield*/, renderizarSecaoComentarios()];
                                        case 3:
                                            _a.sent();
                                            return [3 /*break*/, 5];
                                        case 4:
                                            err_1 = _a.sent();
                                            alert('Erro ao enviar comentário.');
                                            return [3 /*break*/, 5];
                                        case 5: return [2 /*return*/];
                                    }
                                });
                            });
                        };
                    }
                    // Renderiza comentários ao carregar a página
                    renderizarSecaoComentarios();
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _a.sent();
                    console.error('Erro ao carregar a página:', error_7);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
