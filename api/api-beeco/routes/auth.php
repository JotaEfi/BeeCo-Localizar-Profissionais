<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

// ============================================================================
// ROTAS DE AUTENTICAÇÃO WEB (Para aplicações web com sessões)
// ============================================================================

// POST /register - Cadastro de usuário via web
// Request: { "name": "João Silva", "email": "joao@email.com", "password": "senha123", "password_confirmation": "senha123" }
// Response: Redirect ou { "message": "Usuário cadastrado com sucesso" }
Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware('guest')
    ->name('register');

// POST /login - Login via web com sessão
// Request: { "email": "joao@email.com", "password": "senha123", "remember": true }
// Response: Redirect ou { "message": "Login realizado com sucesso" }
Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('guest')
    ->name('login');

// POST /forgot-password - Solicitar link de reset de senha
// Request: { "email": "joao@email.com" }
// Response: { "message": "Link de reset enviado para o email" }
Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
    ->middleware('guest')
    ->name('password.email');

// POST /reset-password - Redefinir senha com token
// Request: { "token": "reset_token", "email": "joao@email.com", "password": "novaSenha123", "password_confirmation": "novaSenha123" }
// Response: { "message": "Senha redefinida com sucesso" }
Route::post('/reset-password', [NewPasswordController::class, 'store'])
    ->middleware('guest')
    ->name('password.store');

// GET /verify-email/{id}/{hash} - Verificar email do usuário
// Response: Redirect ou { "message": "Email verificado com sucesso" }
Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
    ->middleware(['auth', 'signed', 'throttle:6,1'])
    ->name('verification.verify');

// POST /email/verification-notification - Reenviar email de verificação
// Response: { "message": "Email de verificação reenviado" }
Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
    ->middleware(['auth', 'throttle:6,1'])
    ->name('verification.send');

// POST /logout - Logout e invalidar sessão
// Response: Redirect ou { "message": "Logout realizado com sucesso" }
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');
