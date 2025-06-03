<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[WebReinvent](https://webreinvent.com/)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Jump24](https://jump24.co.uk)**
- **[Redberry](https://redberry.international/laravel/)**
- **[Active Logic](https://activelogic.com)**
- **[byte5](https://byte5.de)**
- **[OP.GG](https://op.gg)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

# BeeCo API Documentation

## Sobre o Projeto

BeeCo é uma plataforma que conecta prestadores de serviços e contratantes. Esta API fornece todos os endpoints necessários para gerenciar usuários, serviços, negociações e avaliações.

## Setup

1. Clone o repositório
2. Execute `composer install`
3. Configure o arquivo `.env` com suas credenciais de banco de dados
4. Execute `php artisan migrate` para criar as tabelas
5. Execute `php artisan serve` para iniciar o servidor

## Autenticação

A API utiliza JWT (JSON Web Token) para autenticação. Para rotas protegidas, inclua o token no header:

```
Authorization: Bearer <seu_token_jwt>
```

## Endpoints da API

### Autenticação

#### Registro de Usuário
```http
POST /api/register
```

**Request:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123",
  "tipo": "contratante"
}
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com",
    "tipo": "contratante"
  },
  "token": "jwt_token_aqui"
}
```

#### Login
```http
POST /api/login
```

**Request:**
```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Response:**
```json
{
  "token": "jwt_token_aqui",
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com"
  }
}
```

### Usuários

#### Obter Perfil do Usuário
```http
GET /api/user
```

**Response:**
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@email.com",
  "tipo": "contratante",
  "endereco": {
    "id": 1,
    "logradouro": "Rua A",
    "numero": "123",
    "cidade": "São Paulo"
  }
}
```

#### Atualizar Perfil
```http
PUT /api/user
```

**Request:**
```json
{
  "name": "João Silva Atualizado",
  "email": "joao.novo@email.com"
}
```

### Endereços

#### Listar Endereços
```http
GET /api/enderecos
```

**Response:**
```json
[
  {
    "id": 1,
    "logradouro": "Rua A",
    "numero": "123",
    "cidade": "São Paulo",
    "estado": "SP"
  }
]
```

#### Criar Endereço
```http
POST /api/enderecos
```

**Request:**
```json
{
  "cep": "01234-567",
  "logradouro": "Rua B",
  "numero": "456",
  "cidade": "Rio de Janeiro",
  "estado": "RJ"
}
```

### Posts (Serviços)

#### Listar Posts
```http
GET /api/posts
```

**Response:**
```json
[
  {
    "id": 1,
    "titulo": "Preciso de encanador",
    "descricao": "Vazamento na cozinha",
    "user_id": 1,
    "created_at": "2025-01-01T00:00:00.000000Z"
  }
]
```

#### Criar Post
```http
POST /api/posts
```

**Request:**
```json
{
  "titulo": "Preciso de eletricista",
  "descricao": "Instalação de ventilador",
  "categoria": "eletrica"
}
```

### Negociações

#### Listar Negociações
```http
GET /api/negociacao
```

**Response:**
```json
[
  {
    "id": 1,
    "post_id": 1,
    "prestador_id": 2,
    "valor": 150.00,
    "status": "pendente",
    "created_at": "2025-01-01T00:00:00.000000Z"
  }
]
```

#### Criar Negociação
```http
POST /api/negociacao
```

**Request:**
```json
{
  "post_id": 1,
  "prestador_id": 2,
  "valor": 150.00,
  "observacoes": "Disponível amanhã"
}
```

### Avaliações

#### Criar Avaliação
```http
POST /api/avaliacoes
```

**Request:**
```json
{
  "avaliado_id": 2,
  "nota": 5,
  "comentario": "Serviço excelente, recomendo!",
  "tarefa_id": 1
}
```

**Response:**
```json
{
  "id": 1,
  "nota": 5,
  "comentario": "Serviço excelente, recomendo!",
  "avaliador_id": 1,
  "avaliado_id": 2,
  "created_at": "2025-01-01T00:00:00.000000Z"
}
```

## Status Codes

A API retorna os seguintes códigos de status:

| Status Code | Descrição |
| :--- | :--- |
| 200 | `OK` - Requisição bem sucedida |
| 201 | `CREATED` - Recurso criado com sucesso |
| 400 | `BAD REQUEST` - Requisição inválida |
| 401 | `UNAUTHORIZED` - Não autorizado |
| 404 | `NOT FOUND` - Recurso não encontrado |
| 500 | `INTERNAL SERVER ERROR` - Erro no servidor |

## Rate Limiting

As requisições são limitadas a 60 por minuto por IP.

## Suporte

Para suporte, envie um email para support@beeco.com

## License

[MIT License](LICENSE.md)
