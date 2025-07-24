````md
# 🛠️ ProjetoOS – Sistema de Ordem de Serviço (API REST)

Este é um sistema backend para gerenciamento de Ordens de Serviço (OS), voltado para empresas ou equipes técnicas. Com autenticação baseada em JWT, o projeto permite que **administradores** cadastrem OS e técnicos acompanhem seus atendimentos.

> Projeto em desenvolvimento contínuo para fins de aprendizado e prática com Node.js, MongoDB e controle de acesso por tipo de usuário.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** com **Express**
- **MongoDB** com **Mongoose**
- **JWT** para autenticação
- **dotenv** para variáveis de ambiente
- **Postman / Insomnia** para testes
- *(bcrypt será adicionado em breve para segurança de senha)*

---

## 📁 Estrutura de Pastas

```bash
ProjetoOS/
├── controllers/
│   └── authController.js       # Lógica de login
├── middleware/
│   └── auth.js                 # Middleware de autenticação JWT
├── models/
│   ├── Order.js                # Modelo de Ordem de Serviço
│   └── User.js                 # Modelo de Usuário
├── routes/
│   ├── auth.js                 # Rotas de login
│   └── os.js                   # Rotas de OS
├── .env                        # Configurações sensíveis (não versionar)
├── server.js                   # Arquivo principal do app
└── package.json
````

---

## 🔐 Funcionalidades

### 👤 Usuários

* Login com email e senha
* Autenticação via token JWT
* Dois tipos de usuário: `admin` e `tecnico`

### 📋 Ordem de Serviço

* **Admin**:

  * Cria ordens de serviço
  * Lista todas as OS
* **Técnico**:

  * Lista apenas as suas OS
  * Atualiza status da OS atribuída

### 🔄 Status da OS:

* `pendente` (padrão)
* `em andamento`
* `finalizado`

---

## ▶️ Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/RKOSilva/ProjetoOS.git
cd ProjetoOS
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o `.env`

Crie um arquivo `.env` na raiz com:

```env
MONGO_URI=seu_link_mongodb
JWT_SECRET=sua_chave_secreta
```

### 4. Rode a aplicação

```bash
npm start
```

O servidor rodará na porta `3000` por padrão:
[http://localhost:3000](http://localhost:3000)

---

## 📬 Rotas principais

| Método | Rota                 | Descrição                       | Acesso  |
| ------ | -------------------- | ------------------------------- | ------- |
| POST   | `/api/auth/login`    | Login e geração de token        | Público |
| POST   | `/api/os`            | Criar nova ordem de serviço     | Admin   |
| GET    | `/api/os`            | Listar todas as ordens          | Admin   |
| GET    | `/api/os/minhas`     | Listar ordens do técnico logado | Técnico |
| PATCH  | `/api/os/:id/status` | Atualizar status da OS          | Técnico |

---

## 🧪 Exemplos de JSON para testes

### Login

```json
{
  "email": "admin@email.com",
  "password": "123456"
}
```

### Criar OS (admin)

```json
{
  "descricao": "Instalação de impressora",
  "cliente": "Empresa XPTO",
  "tecnico": "id_do_tecnico"
}
```

### Atualizar status da OS (técnico)

```json
{
  "status": "finalizado"
}
```

---

## 📈 Futuras melhorias

* ✅ Validação de campos obrigatórios
* 🔒 Criptografia de senhas com `bcrypt`
* 🌐 Frontend para interface do usuário
* 📎 Upload de arquivos (fotos dos serviços)
* 🧾 Exportação de ordens em PDF
* 📅 Filtro por data e status

---

## 🙋‍♂️ Autor

Desenvolvido por [Robson Silva](https://github.com/RKOSilva)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-robson--silva-blue?style=flat\&logo=linkedin)](https://www.linkedin.com/in/robson-silva-a7b34a213/)

---

> “A prática leva à perfeição. Cada linha de código é um passo rumo à excelência.” 🚀

```
