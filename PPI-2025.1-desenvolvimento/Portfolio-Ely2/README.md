## 🌱 Fluxo de Desenvolvimento com Git

### 🔀 Branches principais

- `main`: branch de produção (código testado e pronto para deploy)
- `desenvolvimento`: branch principal onde ficam as funcionalidades em progresso

Todas as novas funcionalidades devem ser criadas a partir da branch `desenvolvimento`.

---

### 🚀 1. Criando uma nova funcionalidade

```bash
# Vá para a branch de desenvolvimento
git switch desenvolvimento

# Atualize seu repositório local
git pull origin desenvolvimento

# Crie e mude para uma nova branch
git switch -c nome_da_funcionalidade
# Exemplo: git switch -c add_header
```

---

### 💻 2. Trabalhando na funcionalidade

```bash
# Após fazer alterações, adicione e commit
git add .
git commit -m "Descrição do que foi alterado ou implementado"
```

---

### 🔄 3. Atualizando sua branch com a desenvolvimento

```bash
# Volte para a branch de desenvolvimento e atualize
git switch desenvolvimento
git pull origin desenvolvimento

# Volte para sua branch de funcionalidade
git switch nome_da_funcionalidade

# Faça o merge das atualizações
git merge desenvolvimento
```

---

### 📤 4. Subindo sua branch para o repositório remoto

Se não houver conflitos:

```bash
git push origin nome_da_funcionalidade
```

Se houver conflitos que não conseguir resolver, peça ajuda.  
Caso consiga resolver:

```bash
# Após resolver os conflitos
git add .
git commit -m "Resolve conflitos com desenvolvimento"
git push origin nome_da_funcionalidade
```
