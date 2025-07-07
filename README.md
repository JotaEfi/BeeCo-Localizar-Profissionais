# BeeCo - Contratar Profissionais

## 📖 Sobre o Projeto

**BeeCo** é uma plataforma digital que conecta contratantes e prestadores de serviços profissionais. A aplicação permite que usuários encontrem, contratem e avaliem profissionais de diversas áreas, facilitando a conexão entre quem precisa de um serviço e quem pode fornecê-lo.

## 🏗️ Arquitetura do Sistema

### Backend (Laravel PHP)
- **Framework**: Laravel 11.x
- **Autenticação**: JWT (JSON Web Tokens)
- **Banco de Dados**: MySQL/PostgreSQL
- **API**: RESTful

### Frontend (React TypeScript)
- **Framework**: React 18 com TypeScript
- **Build Tool**: Vite
- **Roteamento**: React Router DOM
- **Styling**: TailwindCSS
- **State Management**: Context API + React Query

### Infraestrutura
- **Containerização**: Docker + Docker Compose
- **Servidor**: Nginx/Apache

## 🗄️ Estrutura do Banco de Dados

### Entidades Principais

#### 👤 **Users (Usuários)**
```php
- id (PK)
- nome
- email
- senha (password)
- tipo (contratante|prestador)
- data_nascimento
- sexo
- foto_perfil
- telefone
- id_endereco (FK)
- status (ativo|inativo)
```

#### 🏠 **Enderecos**
```php
- id (PK)
- cep
- logradouro
- numero
- cidade
- estado
- complemento
```

#### 👨‍💼 **Contratantes**
```php
- id_contratante (PK)
- id_usuario (FK) → Users
- foto_local
```

#### 🔧 **Prestadores**
```php
- id_prestador (PK)
- id_usuario (FK) → Users
- profissao
- sobre
- foto_servico_1
- foto_servico_2
- foto_servico_3
```

#### 🛠️ **Servicos**
```php
- id_servico (PK)
- nome
- descricao
- tipo
- valor
- id_prestador (FK) → Prestadores
- id_contratante (FK) → Contratantes (opcional)
```

#### 📄 **Contratos**
```php
- id_contrato (PK)
- data_inicio
- data_fim
- status
- valor_final
- id_prestador (FK) → Prestadores
- id_contratante (FK) → Contratantes
- id_servico (FK) → Servicos
```

#### ⭐ **Avaliacoes**
```php
- id_avaliacao (PK)
- nota
- comentario
- data_avaliacao
- id_contrato (FK) → Contratos
- id_prestador (FK) → Prestadores
- id_contratante (FK) → Contratantes
```

#### ❤️ **Favoritos**
```php
- id_favorito (PK)
- id_contratante (FK) → Contratantes
- id_prestador (FK) → Prestadores
```

## 🔄 Relacionamentos do Sistema

### 🔗 **Relacionamentos Principais:**

1. **User ↔ Contratante/Prestador**
   - Um usuário pode ser contratante OU prestador
   - Relacionamento 1:1 baseado no campo `tipo`

2. **Prestador → Serviços**
   - Um prestador pode oferecer múltiplos serviços
   - Relacionamento 1:N (hasMany)

3. **Contratante → Contratos**
   - Um contratante pode ter múltiplos contratos
   - Relacionamento 1:N (hasMany)

4. **Prestador → Contratos**
   - Um prestador pode ter múltiplos contratos
   - Relacionamento 1:N (hasMany)

5. **Serviço → Contratos**
   - Um serviço pode gerar múltiplos contratos
   - Relacionamento 1:N (hasMany)

6. **Contrato → Avaliações**
   - Cada contrato pode ter múltiplas avaliações
   - Relacionamento 1:N (hasMany)

7. **Contratante ↔ Prestador (Favoritos)**
   - Contratantes podem favoritar prestadores
   - Relacionamento N:N através da tabela `favoritos`

## 🚀 Funcionalidades

### 👥 **Para Contratantes:**
- Cadastro e autenticação
- Busca de profissionais por categoria/localização
- Visualização de perfis de prestadores
- Contratação de serviços
- Sistema de favoritos
- Avaliação de serviços contratados
- Chat com prestadores
- Histórico de contratações

### 🔧 **Para Prestadores:**
- Cadastro com portfolio (fotos dos serviços)
- Criação e gerenciamento de serviços oferecidos
- Dashboard para gerenciar contratos
- Recebimento de avaliações
- Chat com contratantes
- Gestão de perfil profissional

### 🔒 **Sistema de Autenticação:**
- JWT para sessões seguras
- Middleware de autorização por tipo de usuário
- Rotas protegidas no frontend e backend

## 📁 Estrutura de Diretórios

```
beeCo/
├── api/api-beeco/              # Backend Laravel
│   ├── app/
│   │   ├── Http/Controllers/   # Controladores da API
│   │   ├── Models/            # Modelos Eloquent
│   │   └── Providers/         # Service Providers
│   ├── routes/                # Definição de rotas
│   ├── database/              # Migrations e Seeders
│   └── config/                # Configurações
├── frontend/                  # Frontend React
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   ├── pages/            # Páginas da aplicação
│   │   ├── contexts/         # Context API
│   │   ├── api/              # Configuração de API
│   │   └── auth/             # Componentes de autenticação
│   └── public/               # Arquivos estáticos
└── docker-compose.yml        # Configuração Docker
```

## 🔧 Configuração e Instalação

### Pré-requisitos
- PHP 8.2+
- Composer
- Node.js 18+
- Docker (opcional)

### Backend (Laravel)
```bash
cd api/api-beeco
composer install
cp .env.example .env
php artisan key:generate
php artisan jwt:secret
php artisan migrate
php artisan serve
```

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

### Docker (Recomendado)
```bash
docker-compose up -d
```

## 📊 Fluxo de Dados

### 🔄 **Processo de Contratação:**
1. **Contratante** busca profissionais
2. **Contratante** visualiza perfil do **Prestador**
3. **Contratante** inicia contrato com **Serviço** específico
4. **Prestador** aceita/rejeita contrato
5. Execução do serviço
6. **Contratante** avalia o **Prestador**
7. Sistema atualiza reputação do **Prestador**

### 🔐 **Fluxo de Autenticação:**
1. Usuário faz login/registro
2. Sistema valida credenciais
3. JWT é gerado e retornado
4. Frontend armazena token
5. Requisições futuras incluem token no header
6. Backend valida token em rotas protegidas

## 🎯 Próximos Passos

- [ ] Sistema de pagamento integrado
- [ ] Notificações em tempo real
- [ ] Sistema de chat aprimorado
- [ ] Geolocalização avançada
- [ ] Sistema de disputas
- [ ] API mobile
- [ ] Dashboard analítico

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**BeeCo** - Conectando profissionais e oportunidades! 🐝