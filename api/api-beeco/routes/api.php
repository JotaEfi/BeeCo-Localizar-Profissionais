<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\EnderecoController;
use App\Http\Controllers\ProfissaoController;

// Autenticação
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

   // Endereços
Route::get('/enderecos', [EnderecoController::class, 'index']);
Route::post('/enderecos', [EnderecoController::class, 'store']);
Route::get('/enderecos/{id}', [EnderecoController::class, 'show']);
Route::put('/enderecos/{id}', [EnderecoController::class, 'update']);
Route::delete('/enderecos/{id}', [EnderecoController::class, 'destroy']);

// Protegidas por JWT
Route::middleware('auth:api')->group(function () {
     
    Route::get('/me', [AuthController::class, 'me']);

    // Usuário
    Route::get('/user', [UserController::class, 'show']);
    Route::put('/user', [UserController::class, 'update']);
    Route::get('/users/type/{type}', [UserController::class, 'getUsersByType']);
    Route::delete('/user', [UserController::class, 'destroy']);

    // Posts
    Route::get('/posts', [PostController::class, 'index']);
    Route::post('/posts', [PostController::class, 'store']);
    Route::get('/posts/{id}', [PostController::class, 'show']);
    Route::put('/posts/{id}', [PostController::class, 'update']);
    Route::delete('/posts/{id}', [PostController::class, 'destroy']);


   

    // Profissões
    Route::get('/profissoes', [\App\Http\Controllers\ProfissaoController::class, 'index']);
    Route::post('/profissoes', [\App\Http\Controllers\ProfissaoController::class, 'store']);

});
  
  // Favoritos
    Route::get('/favoritos', [\App\Http\Controllers\FavoritoController::class, 'index']);
    Route::post('/favoritos', [\App\Http\Controllers\FavoritoController::class, 'store']);
    Route::delete('/favoritos/{prestador_id}', [\App\Http\Controllers\FavoritoController::class, 'destroy']);

 // Endereços
    Route::get('/enderecos', [EnderecoController::class, 'index']);
    Route::post('/enderecos', [EnderecoController::class, 'store']);
    Route::get('/enderecos/{id}', [EnderecoController::class, 'show']);
    Route::put('/enderecos/{id}', [EnderecoController::class, 'update']);
    Route::delete('/enderecos/{id}', [EnderecoController::class, 'destroy']);

  // negociacao
    Route::get('/negociacao', [\App\Http\Controllers\NegociacaoController::class, 'index']);
    Route::post('/negociacao', [\App\Http\Controllers\NegociacaoController::class, 'store']);
    Route::get('/negociacao/{id}', [\App\Http\Controllers\NegociacaoController::class, 'show']);
    Route::put('/negociacao/{id}', [\App\Http\Controllers\NegociacaoController::class, 'update']);
    Route::delete('/negociacao/{id}', [\App\Http\Controllers\NegociacaoController::class, 'destroy']);

      //tarefas
      Route::get('/tarefas', [\App\Http\Controllers\TarefaController::class, 'index']);
      Route::post('/tarefas', [\App\Http\Controllers\TarefaController::class, 'store']);
      Route::get('/tarefas/{id}', [\App\Http\Controllers\TarefaController::class, 'show']);
      Route::put('/tarefas/{id}', [\App\Http\Controllers\TarefaController::class, 'update']);
      Route::delete('/tarefas/{id}', [\App\Http\Controllers\TarefaController::class, 'destroy']);
      
   

