# GatewayPay - Frontend

<div align="center">
  <img src="https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Vuetify-1867C0?style=for-the-badge&logo=vuetify&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
</div>

## 🖥️ Visão Geral

Frontend minimalista para integração com a **GatewayPay API**, desenvolvido com:

- **Vue 3** (Composition API)
- **Vuetify** para componentes UI
- **TypeScript** para tipagem segura
- **Pinia** para gerenciamento de estado
- **Polling** para atualização de status

## ✨ Funcionalidades

1. **Fluxo de Pagamento**:
    - Tela inicial de seleção de método
    - Formulário dinâmico por tipo de pagamento
    - Tela de processamento com polling
    - Confirmação final

2. **Métodos Suportados**:
    - Cartão de crédito (com validação básica)
    - Pix (geração automática)
    - Boleto bancário

## 🚀 Backend Oficial
- Disponível em: [GatewayPay API Backend](https://github.com/pedroerico/gateway-pay-api)

## 🐋 Executando com Docker

### Pré-requisitos
- Docker 20.10+
- Docker Compose 2.0+
- Git

### Passo a Passo

### 1. Configure as variáveis de ambiente:
```bash
git clone https://github.com/pedroerico/gateway-pay.git
cd gateway-pay
```

### 2. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env`:
```ini
VITE_API_BASE_URL=http://backend:8000/api
PORT=8000
```

### 3. Construa e inicie os containers
```bash
docker-compose up -d
```

### 4. Acesse a aplicação
Abra no navegador:  
[http://localhost:8000](http://localhost:8000)

### ⚠️ Observações importantes:
- Certifique-se que:
    - A porta 8000 está livre
    - O backend está rodando e acessível
    - O arquivo `.env` possui as permissões corretas

## 📄 Desenvolvido

Desenvolvido em 31 de março de 2025.

Desenvolvedor: Pedro Érico.
Email: pedroerico.desenvolvedor@gmail.com
