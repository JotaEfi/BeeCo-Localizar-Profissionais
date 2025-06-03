<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

// ============================================================================
// COMANDOS ARTISAN CUSTOMIZADOS
// ============================================================================

// Comando: php artisan inspire - Exibe uma citação inspiradora no terminal
// Uso: Execute no terminal para ver uma frase motivacional
// Response: Exibe texto inspirador no console
Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');
