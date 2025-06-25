#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/*
 * SISTEMA DE APROVAÇÃO DE CRÉDITO USANDO ÁRVORE DE DECISÃO
 * 
 * Este programa implementa uma árvore de decisão simples para decidir
 * se um cliente deve ou não ter seu crédito aprovado baseado em:
 * - Idade (jovem: 18-25, adulto: 26-60, idoso: 60+)
 * - Renda (baixa: <3000, média: 3000-8000, alta: >8000)
 * - Histórico de crédito (bom, regular, ruim)
 * - Emprego estável (sim/não)
 */

// Enumerações para facilitar a leitura do código
typedef enum {
    JOVEM = 0,    // 18-25 anos
    ADULTO = 1,   // 26-60 anos
    IDOSO = 2     // 60+ anos
} FaixaIdade;

typedef enum {
    BAIXA = 0,    // < R$ 3.000
    MEDIA = 1,    // R$ 3.000 - R$ 8.000
    ALTA = 2      // > R$ 8.000
} FaixaRenda;

typedef enum {
    RUIM = 0,
    REGULAR = 1,
    BOM = 2
} HistoricoCredito;

typedef enum {
    NAO = 0,
    SIM = 1
} EmpregoEstavel;

typedef enum {
    NEGADO = 0,
    APROVADO = 1
} ResultadoCredito;

// Estrutura para representar os dados de um cliente
typedef struct {
    int idade;
    float renda;
    HistoricoCredito historico;
    EmpregoEstavel emprego_estavel;
    char nome[50];
} Cliente;

// Estrutura do nó da árvore de decisão
typedef struct No {
    int eh_folha;                    // 1 se for folha, 0 se for nó interno
    ResultadoCredito resultado;      // Resultado final (só válido se eh_folha = 1)
    
    // Para nós internos - critério de decisão
    char criterio[50];               // Descrição do critério
    struct No* esquerda;             // Ramo para condição verdadeira
    struct No* direita;              // Ramo para condição falsa
} No;

// Funções auxiliares para classificação dos dados
FaixaIdade classificar_idade(int idade) {
    if (idade <= 25) return JOVEM;
    else if (idade <= 60) return ADULTO;
    else return IDOSO;
}

FaixaRenda classificar_renda(float renda) {
    if (renda < 3000) return BAIXA;
    else if (renda <= 8000) return MEDIA;
    else return ALTA;
}

// Função para criar um nó folha (decisão final)
No* criar_folha(ResultadoCredito resultado) {
    No* no = (No*)malloc(sizeof(No));
    no->eh_folha = 1;
    no->resultado = resultado;
    no->esquerda = NULL;
    no->direita = NULL;
    strcpy(no->criterio, "");
    return no;
}

// Função para criar um nó interno (decisão intermediária)
No* criar_no_interno(const char* criterio, No* esquerda, No* direita) {
    No* no = (No*)malloc(sizeof(No));
    no->eh_folha = 0;
    no->resultado = NEGADO; // Valor padrão, não é usado em nós internos
    no->esquerda = esquerda;
    no->direita = direita;
    strcpy(no->criterio, criterio);
    return no;
}

// Função para construir a árvore de decisão
No* construir_arvore() {
    /*
     * ESTRUTURA DA ÁRVORE DE DECISÃO:
     * 
     * Raiz: Histórico de Crédito
     * ├── Se RUIM → NEGADO
     * └── Se REGULAR ou BOM
     *     ├── Emprego Estável?
     *     │   ├── Se NÃO
     *     │   │   ├── Renda ALTA? → APROVADO
     *     │   │   └── Renda BAIXA/MÉDIA? → NEGADO
     *     │   └── Se SIM
     *     │       ├── Idade JOVEM?
     *     │       │   ├── Renda >= MÉDIA? → APROVADO
     *     │       │   └── Renda BAIXA? → NEGADO
     *     │       └── Idade ADULTO/IDOSO?
     *     │           ├── Renda >= MÉDIA? → APROVADO
     *     │           └── Renda BAIXA? → NEGADO
     */
    
    // Criando as folhas (decisões finais)
    No* aprovado = criar_folha(APROVADO);
    No* negado = criar_folha(NEGADO);
    
    // Nível 4: Decisões de renda para diferentes cenários
    No* renda_jovem_empregado = criar_no_interno("Renda >= Média (Jovem com Emprego)",
                                                 aprovado, negado);
    
    No* renda_adulto_empregado = criar_no_interno("Renda >= Média (Adulto/Idoso com Emprego)",
                                                  aprovado, negado);
    
    No* renda_sem_emprego = criar_no_interno("Renda Alta (Sem Emprego Estável)",
                                             aprovado, negado);
    
    // Nível 3: Decisão por idade (quando tem emprego estável)
    No* idade_com_emprego = criar_no_interno("Idade Jovem (Com Emprego)",
                                             renda_jovem_empregado, renda_adulto_empregado);
    
    // Nível 2: Decisão por emprego estável
    No* emprego_estavel = criar_no_interno("Tem Emprego Estável",
                                           idade_com_emprego, renda_sem_emprego);
    
    // Nível 1 (Raiz): Decisão por histórico de crédito
    No* raiz = criar_no_interno("Histórico de Crédito Bom/Regular",
                                emprego_estavel, negado);
    
    return raiz;
}

// Função para avaliar um cliente na árvore de decisão
ResultadoCredito avaliar_cliente(No* arvore, Cliente cliente) {
    if (arvore->eh_folha) {
        return arvore->resultado;
    }
    
    // Lógica de decisão baseada no critério do nó
    if (strcmp(arvore->criterio, "Histórico de Crédito Bom/Regular") == 0) {
        if (cliente.historico == RUIM) {
            return avaliar_cliente(arvore->direita, cliente);  // Vai para NEGADO
        } else {
            return avaliar_cliente(arvore->esquerda, cliente); // Continua avaliação
        }
    }
    else if (strcmp(arvore->criterio, "Tem Emprego Estável") == 0) {
        if (cliente.emprego_estavel == SIM) {
            return avaliar_cliente(arvore->esquerda, cliente);  // Tem emprego
        } else {
            return avaliar_cliente(arvore->direita, cliente);   // Não tem emprego
        }
    }
    else if (strcmp(arvore->criterio, "Idade Jovem (Com Emprego)") == 0) {
        FaixaIdade faixa = classificar_idade(cliente.idade);
        if (faixa == JOVEM) {
            return avaliar_cliente(arvore->esquerda, cliente);  // É jovem
        } else {
            return avaliar_cliente(arvore->direita, cliente);   // É adulto/idoso
        }
    }
    else if (strstr(arvore->criterio, "Renda") != NULL) {
        FaixaRenda faixa = classificar_renda(cliente.renda);
        
        if (strstr(arvore->criterio, "Jovem com Emprego") != NULL ||
            strstr(arvore->criterio, "Adulto/Idoso com Emprego") != NULL) {
            // Para pessoas com emprego: renda média ou alta = aprovado
            if (faixa >= MEDIA) {
                return avaliar_cliente(arvore->esquerda, cliente);  // APROVADO
            } else {
                return avaliar_cliente(arvore->direita, cliente);   // NEGADO
            }
        }
        else if (strstr(arvore->criterio, "Sem Emprego") != NULL) {
            // Para pessoas sem emprego estável: só renda alta = aprovado
            if (faixa == ALTA) {
                return avaliar_cliente(arvore->esquerda, cliente);  // APROVADO
            } else {
                return avaliar_cliente(arvore->direita, cliente);   // NEGADO
            }
        }
    }
    
    // Caso padrão (não deveria chegar aqui)
    return NEGADO;
}

// Função para imprimir a árvore (para debug)
void imprimir_arvore(No* no, int nivel) {
    if (no == NULL) return;
    
    // Indentação baseada no nível
    for (int i = 0; i < nivel; i++) {
        printf("  ");
    }
    
    if (no->eh_folha) {
        printf("DECISÃO: %s\n", (no->resultado == APROVADO) ? "APROVADO" : "NEGADO");
    } else {
        printf("CRITÉRIO: %s\n", no->criterio);
        imprimir_arvore(no->esquerda, nivel + 1);
        imprimir_arvore(no->direita, nivel + 1);
    }
}

// Função para liberar memória da árvore
void liberar_arvore(No* no) {
    if (no == NULL) return;
    
    liberar_arvore(no->esquerda);
    liberar_arvore(no->direita);
    free(no);
}

// Função para ler dados do cliente
Cliente ler_cliente() {
    Cliente cliente;
    int historico_int, emprego_int;
    
    printf("\n=== ANÁLISE DE CRÉDITO ===\n");
    printf("Nome do cliente: ");
    fgets(cliente.nome, sizeof(cliente.nome), stdin);
    cliente.nome[strcspn(cliente.nome, "\n")] = 0; // Remove quebra de linha
    
    printf("Idade: ");
    scanf("%d", &cliente.idade);
    
    printf("Renda mensal (R$): ");
    scanf("%f", &cliente.renda);
    
    printf("Histórico de crédito (0=Ruim, 1=Regular, 2=Bom): ");
    scanf("%d", &historico_int);
    cliente.historico = (HistoricoCredito)historico_int;
    
    printf("Tem emprego estável? (0=Não, 1=Sim): ");
    scanf("%d", &emprego_int);
    cliente.emprego_estavel = (EmpregoEstavel)emprego_int;
    
    return cliente;
}

// Função para exibir informações do cliente
void exibir_cliente(Cliente cliente) {
    printf("\n=== DADOS DO CLIENTE ===\n");
    printf("Nome: %s\n", cliente.nome);
    printf("Idade: %d anos (%s)\n", cliente.idade,
           (classificar_idade(cliente.idade) == JOVEM) ? "Jovem" :
           (classificar_idade(cliente.idade) == ADULTO) ? "Adulto" : "Idoso");
    printf("Renda: R$ %.2f (%s)\n", cliente.renda,
           (classificar_renda(cliente.renda) == BAIXA) ? "Baixa" :
           (classificar_renda(cliente.renda) == MEDIA) ? "Média" : "Alta");
    printf("Histórico: %s\n",
           (cliente.historico == RUIM) ? "Ruim" :
           (cliente.historico == REGULAR) ? "Regular" : "Bom");
    printf("Emprego estável: %s\n",
           (cliente.emprego_estavel == SIM) ? "Sim" : "Não");
}

int main() {
    printf("=== SISTEMA DE APROVAÇÃO DE CRÉDITO ===\n");
    printf("Este sistema usa uma árvore de decisão para avaliar pedidos de crédito.\n\n");
    
    // Constrói a árvore de decisão
    No* arvore = construir_arvore();
    
    printf("Árvore de decisão construída com sucesso!\n");
    printf("\nEstrutura da árvore:\n");
    imprimir_arvore(arvore, 0);
    
    char continuar = 's';
    
    while (continuar == 's' || continuar == 'S') {
        // Lê dados do cliente
        Cliente cliente = ler_cliente();
        
        // Avalia o cliente
        ResultadoCredito resultado = avaliar_cliente(arvore, cliente);
        
        // Exibe resultado
        exibir_cliente(cliente);
        printf("\n=== RESULTADO DA ANÁLISE ===\n");
        if (resultado == APROVADO) {
            printf("✅ CRÉDITO APROVADO!\n");
            printf("Parabéns %s, seu crédito foi aprovado.\n", cliente.nome);
        } else {
            printf("❌ CRÉDITO NEGADO!\n");
            printf("Infelizmente %s, seu crédito foi negado.\n", cliente.nome);
        }
        
        printf("\nDeseja avaliar outro cliente? (s/n): ");
        scanf(" %c", &continuar);
        getchar(); // Limpa o buffer
    }
    
    // Libera memória
    liberar_arvore(arvore);
    
    printf("\nObrigado por usar o sistema de aprovação de crédito!\n");
    return 0;
}

/*
 * EXEMPLOS DE TESTE:
 * 
 * Cliente 1 - APROVADO:
 * Nome: João Silva
 * Idade: 30
 * Renda: 5000
 * Histórico: 2 (Bom)
 * Emprego: 1 (Sim)
 * 
 * Cliente 2 - NEGADO:
 * Nome: Maria Santos
 * Idade: 22
 * Renda: 2000
 * Histórico: 0 (Ruim)
 * Emprego: 0 (Não)
 * 
 * Cliente 3 - APROVADO:
 * Nome: Pedro Costa
 * Idade: 45
 * Renda: 12000
 * Histórico: 1 (Regular)
 * Emprego: 0 (Não)
 */