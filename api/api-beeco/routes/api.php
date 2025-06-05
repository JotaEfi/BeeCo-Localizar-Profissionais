<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\EnderecoController;
use App\Http\Controllers\ProfissaoController;

// ============================================================================
// ROTAS DE AUTENTICAÇÃO (Públicas)
// ============================================================================

// POST /api/register - Cadastro de novo usuário
// Request: { "name": "João Silva", "email": "joao@email.com", "password": "senha123", "tipo": "contratante|prestador" }
// Response: { "user": { "id": 1, "name": "João Silva", "email": "joao@email.com", "tipo": "contratante" }, "token": "jwt_token_aqui" }
Route::post('/register', [AuthController::class, 'register']);

// POST /api/login - Login de usuário existente
// Request: { "email": "joao@email.com", "password": "senha123" }
// Response: { "token": "jwt_token_aqui", "user": { "id": 1, "name": "João Silva", "email": "joao@email.com", "tipo": "contratante" } }
Route::post('/login', [AuthController::class, 'login']);

// ============================================================================
// ROTAS DE ENDEREÇOS (Públicas)
// ============================================================================

// GET /api/enderecos - Listar todos os endereços
// Response: [{ "id": 1, "cep": "01234-567", "logradouro": "Rua A", "numero": "123", "cidade": "São Paulo", "estado": "SP" }]
Route::get('/enderecos', [EnderecoController::class, 'index']);

// POST /api/enderecos - Criar novo endereço
// Request: { "cep": "01234-567", "logradouro": "Rua B", "numero": "456", "cidade": "Rio de Janeiro", "estado": "RJ" }
// Response: { "id": 2, "cep": "01234-567", "logradouro": "Rua B", "numero": "456", "cidade": "Rio de Janeiro", "estado": "RJ" }
Route::post('/enderecos', [EnderecoController::class, 'store']);

// GET /api/enderecos/{id} - Obter endereço específico
// Response: { "id": 1, "cep": "01234-567", "logradouro": "Rua A", "numero": "123", "cidade": "São Paulo", "estado": "SP" }
Route::get('/enderecos/{id}', [EnderecoController::class, 'show']);

// PUT /api/enderecos/{id} - Atualizar endereço existente
// Request: { "cep": "01234-567", "logradouro": "Rua A Atualizada", "numero": "123", "cidade": "São Paulo", "estado": "SP" }
// Response: { "id": 1, "cep": "01234-567", "logradouro": "Rua A Atualizada", "numero": "123", "cidade": "São Paulo", "estado": "SP" }
Route::put('/enderecos/{id}', [EnderecoController::class, 'update']);

// DELETE /api/enderecos/{id} - Remover endereço
// Response: { "message": "Endereço removido com sucesso" }
Route::delete('/enderecos/{id}', [EnderecoController::class, 'destroy']);

// ============================================================================
// ROTAS PROTEGIDAS POR JWT (Requer autenticação)
// Header necessário: Authorization: Bearer {jwt_token}
// ============================================================================
Route::middleware('auth:api')->group(function () {
    
    // GET /api/me - Obter dados do usuário autenticado
    // Response: { "id": 1, "name": "João Silva", "email": "joao@email.com", "tipo": "contratante", "created_at": "2025-01-01T00:00:00.000000Z" }
    Route::get('/me', [AuthController::class, 'me']);

    // ============================================================================
    // GERENCIAMENTO DE USUÁRIO
    // ============================================================================

    // GET /api/user - Obter perfil do usuário autenticado
    // Response: { "id": 1, "name": "João Silva", "email": "joao@email.com", "tipo": "contratante", "endereco": {...} }
    Route::get('/user', [UserController::class, 'show']);

    // PUT /api/user - Atualizar perfil do usuário
    // Request: { "name": "João Silva Atualizado", "email": "joao.novo@email.com" }
    // Response: { "message": "Perfil atualizado com sucesso", "user": { "id": 1, "name": "João Silva Atualizado", "email": "joao.novo@email.com" } }
    Route::put('/user', [UserController::class, 'update']);

    // GET /api/users/type/{type} - Obter usuários por tipo (contratante|prestador)
    // Response: [{ "id": 2, "name": "Maria", "email": "maria@email.com", "tipo": "prestador", "profissao": "Encanador" }]
    Route::get('/users/type/{type}', [UserController::class, 'getUsersByType']);

    // DELETE /api/user - Excluir conta do usuário
    // Response: { "message": "Conta excluída com sucesso" }
    Route::delete('/user', [UserController::class, 'destroy']);

    // ============================================================================
    // GERENCIAMENTO DE POSTS
    // ============================================================================

    // GET /api/posts - Listar todos os posts
    // Response: [{ "id": 1, "titulo": "Preciso de encanador", "descricao": "Vazamento na cozinha", "user_id": 1, "created_at": "2025-01-01T00:00:00.000000Z" }]
    Route::get('/posts', [PostController::class, 'index']);

    // POST /api/posts - Criar novo post
    // Request: { "titulo": "Preciso de eletricista", "descricao": "Instalação de ventilador", "categoria": "eletrica" }
    // Response: { "id": 2, "titulo": "Preciso de eletricista", "descricao": "Instalação de ventilador", "user_id": 1, "created_at": "2025-01-01T00:00:00.000000Z" }
    Route::post('/posts', [PostController::class, 'store']);

    // GET /api/posts/{id} - Obter post específico
    // Response: { "id": 1, "titulo": "Preciso de encanador", "descricao": "Vazamento na cozinha", "user": { "name": "João Silva" } }
    Route::get('/posts/{id}', [PostController::class, 'show']);

    // PUT /api/posts/{id} - Atualizar post existente
    // Request: { "titulo": "Preciso de encanador urgente", "descricao": "Vazamento grave na cozinha" }
    // Response: { "id": 1, "titulo": "Preciso de encanador urgente", "descricao": "Vazamento grave na cozinha", "updated_at": "2025-01-01T12:00:00.000000Z" }
    Route::put('/posts/{id}', [PostController::class, 'update']);

    // DELETE /api/posts/{id} - Remover post
    // Response: { "message": "Post removido com sucesso" }
    Route::delete('/posts/{id}', [PostController::class, 'destroy']);

    // ============================================================================
    // GERENCIAMENTO DE PROFISSÕES
    // ============================================================================

    // GET /api/profissoes - Listar todas as profissões
    // Response: [{ "id": 1, "nome": "Encanador", "descricao": "Serviços hidráulicos", "created_at": "2025-01-01T00:00:00.000000Z" }]
    Route::get('/profissoes', [\App\Http\Controllers\ProfissaoController::class, 'index']);

    // POST /api/profissoes - Criar nova profissão
    // Request: { "nome": "Eletricista", "descricao": "Serviços elétricos residenciais e comerciais" }
    // Response: { "id": 2, "nome": "Eletricista", "descricao": "Serviços elétricos residenciais e comerciais", "created_at": "2025-01-01T00:00:00.000000Z" }
    Route::post('/profissoes', [\App\Http\Controllers\ProfissaoController::class, 'store']);


    // ============================================================================
    // ROTAS DE FAVORITOS (Públicas - mas devem ser protegidas)
    // ============================================================================

    // GET /api/favoritos - Listar favoritos do usuário
    // Response: [{ "id": 1, "prestador": { "id": 2, "name": "Maria", "profissao": "Encanador" }, "created_at": "2025-01-01T00:00:00.000000Z" }]
    Route::get('/favoritos', [\App\Http\Controllers\FavoritoController::class, 'index']);

    // POST /api/favoritos - Adicionar prestador aos favoritos
    // Request: { "id_prestador": 2 }
    // Response: { "message": "Prestador adicionado aos favoritos", "favorito": { "id": 1, "prestador_id": 2, "user_id": 1 } }
    Route::post('/favoritos', [\App\Http\Controllers\FavoritoController::class, 'store']);

    // DELETE /api/favoritos/{prestador_id} - Remover prestador dos favoritos
    // Response: { "message": "Prestador removido dos favoritos" }
    Route::delete('/favoritos/{prestador_id}', [\App\Http\Controllers\FavoritoController::class, 'destroy']);

    // ============================================================================
    // ROTAS DE NEGOCIAÇÃO (Públicas - mas devem ser protegidas)
    // ============================================================================

    // GET /api/negociacao - Listar negociações do usuário
    // Response: [{ "id": 1, "post_id": 1, "prestador_id": 2, "valor": 150.00, "status": "pendente", "created_at": "2025-01-01T00:00:00.000000Z" }]
    Route::get('/negociacao', [\App\Http\Controllers\NegociacaoController::class, 'index']);

    // POST /api/negociacao - Criar nova negociação
    // Request: { "post_id": 1, "prestador_id": 2, "valor": 150.00, "observacoes": "Disponível amanhã" }
    // Response: { "id": 1, "post_id": 1, "prestador_id": 2, "valor": 150.00, "status": "pendente", "created_at": "2025-01-01T00:00:00.000000Z" }
    Route::post('/negociacao', [\App\Http\Controllers\NegociacaoController::class, 'store']);

    // GET /api/negociacao/{id} - Obter negociação específica
    // Response: { "id": 1, "post": { "titulo": "Preciso de encanador" }, "prestador": { "name": "Maria" }, "valor": 150.00, "status": "pendente" }
    Route::get('/negociacao/{id}', [\App\Http\Controllers\NegociacaoController::class, 'show']);

    // PUT /api/negociacao/{id} - Atualizar negociação
    // Request: { "valor": 200.00, "status": "aceita" }
    // Response: { "id": 1, "valor": 200.00, "status": "aceita", "updated_at": "2025-01-01T12:00:00.000000Z" }
    Route::put('/negociacao/{id}', [\App\Http\Controllers\NegociacaoController::class, 'update']);

    // DELETE /api/negociacao/{id} - Cancelar negociação
    // Response: { "message": "Negociação cancelada com sucesso" }
    Route::delete('/negociacao/{id}', [\App\Http\Controllers\NegociacaoController::class, 'destroy']);

    // ============================================================================
    // ROTAS DE TAREFAS (Públicas - mas devem ser protegidas)
    // ============================================================================

    // GET /api/tarefas - Listar tarefas do usuário
    // Response: [{ "id": 1, "titulo": "Consertar vazamento", "descricao": "Vazamento no banheiro", "status": "em_andamento", "created_at": "2025-01-01T00:00:00.000000Z" }]
    Route::get('/tarefas', [\App\Http\Controllers\TarefaController::class, 'index']);

    // POST /api/tarefas - Criar nova tarefa
    // Request: { "titulo": "Instalar ventilador", "descricao": "Ventilador de teto na sala", "data_prazo": "2025-01-15" }
    // Response: { "id": 2, "titulo": "Instalar ventilador", "descricao": "Ventilador de teto na sala", "status": "pendente", "created_at": "2025-01-01T00:00:00.000000Z" }
    Route::post('/tarefas', [\App\Http\Controllers\TarefaController::class, 'store']);

    // GET /api/tarefas/{id} - Obter tarefa específica
    // Response: { "id": 1, "titulo": "Consertar vazamento", "descricao": "Vazamento no banheiro", "status": "em_andamento", "prestador": { "name": "Maria" } }
    Route::get('/tarefas/{id}', [\App\Http\Controllers\TarefaController::class, 'show']);

    // PUT /api/tarefas/{id} - Atualizar tarefa
    // Request: { "status": "concluida", "observacoes": "Serviço finalizado com sucesso" }
    // Response: { "id": 1, "status": "concluida", "observacoes": "Serviço finalizado com sucesso", "updated_at": "2025-01-01T18:00:00.000000Z" }
    Route::put('/tarefas/{id}', [\App\Http\Controllers\TarefaController::class, 'update']);

    // DELETE /api/tarefas/{id} - Remover tarefa
    // Response: { "message": "Tarefa removida com sucesso" }
    Route::delete('/tarefas/{id}', [\App\Http\Controllers\TarefaController::class, 'destroy']);

    // ============================================================================
    // ROTAS DE AVALIAÇÕES (Públicas - mas devem ser protegidas)
    // ============================================================================

    // GET /api/avaliacoes - Listar avaliações
    // Response: [{ "id": 1, "nota": 5, "comentario": "Excelente serviço", "avaliador": { "name": "João" }, "avaliado": { "name": "Maria" }, "created_at": "2025-01-01T00:00:00.000000Z" }]
    Route::get('/avaliacoes', [\App\Http\Controllers\AvaliacaoController::class, 'index']);

    // POST /api/avaliacoes - Criar nova avaliação
    // Request: { "avaliado_id": 2, "nota": 5, "comentario": "Serviço excelente, recomendo!", "tarefa_id": 1 }
    // Response: { "id": 1, "nota": 5, "comentario": "Serviço excelente, recomendo!", "avaliador_id": 1, "avaliado_id": 2, "created_at": "2025-01-01T00:00:00.000000Z" }
    Route::post('/avaliacoes', [\App\Http\Controllers\AvaliacaoController::class, 'store']);

    // GET /api/avaliacoes/{avaliacao} - Obter avaliação específica
    // Response: { "id": 1, "nota": 5, "comentario": "Excelente serviço", "avaliador": { "name": "João" }, "avaliado": { "name": "Maria" }, "tarefa": { "titulo": "Consertar vazamento" } }
    Route::get('/avaliacoes/{avaliacao}', [\App\Http\Controllers\AvaliacaoController::class, 'show']);

    // PUT /api/avaliacoes/{avaliacao} - Atualizar avaliação
    // Request: { "nota": 4, "comentario": "Bom serviço, mas pode melhorar" }
    // Response: { "id": 1, "nota": 4, "comentario": "Bom serviço, mas pode melhorar", "updated_at": "2025-01-01T12:00:00.000000Z" }
    Route::put('/avaliacoes/{avaliacao}', [\App\Http\Controllers\AvaliacaoController::class, 'update']);

    // DELETE /api/avaliacoes/{avaliacao} - Remover avaliação
    // Response: { "message": "Avaliação removida com sucesso" }
    Route::delete('/avaliacoes/{avaliacao}', [\App\Http\Controllers\AvaliacaoController::class, 'destroy']);



});
