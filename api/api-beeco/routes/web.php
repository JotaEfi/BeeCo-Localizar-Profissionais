<?php

use Illuminate\Support\Facades\Route;

// ============================================================================
// ROTAS WEB PRINCIPAIS
// ============================================================================

// GET / - Endpoint de informações da aplicação
// Response: { "Laravel": "10.x.x" }
Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

// Inclusão das rotas de autenticação web (ver arquivo auth.php)
require __DIR__.'/auth.php';
