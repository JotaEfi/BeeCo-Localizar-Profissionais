<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasTable('users')) {
            Schema::create('users', function (Blueprint $table) {
                $table->id(); // Chave primária 'id', auto-incrementada
                $table->string('nome'); // Obrigatório
                $table->string('email')->unique(); // Obrigatório, único
                $table->string('senha'); // Obrigatório
                $table->date('data_nascimento')->nullable(); // Opcional
                $table->enum('sexo', ['M', 'F', 'O'])->nullable(); // Opcional
                $table->enum('tipo', ['contratante', 'prestador']); // Obrigatório
                $table->string('foto_perfil')->nullable(); // Opcional
                $table->string('telefone')->nullable(); // Opcional
                $table->foreignId('id_endereco')->nullable()->constrained('endereco', 'id_endereco'); // Opcional, chave estrangeira
                $table->rememberToken(); // Adicionando o campo remember_token
                $table->timestamps(); // created_at, updated_at
                $table->enum('status', ['ativo', 'inativo'])->default('ativo'); // Status do usuário, padrão 'ativo'
            });
        } else {
            Schema::table('users', function (Blueprint $table) {
                if (!Schema::hasColumn('users', 'tipo')) {
                    $table->enum('tipo', ['contratante', 'prestador'])->after('email');
                }
                if (!Schema::hasColumn('users', 'remember_token')) {
                    $table->rememberToken();
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};

