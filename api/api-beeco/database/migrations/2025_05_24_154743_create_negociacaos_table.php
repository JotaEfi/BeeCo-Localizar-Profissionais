<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('negociacaos', function (Blueprint $table) {
            $table->id('id_negociacao');
            $table->foreignId('id_contratante')->constrained('users', 'id')->onDelete('cascade');
            $table->foreignId('id_prestador')->constrained('users', 'id')->onDelete('cascade');
            $table->string('nome');
            $table->float('valor');
            $table->string('descricao');
            $table->boolean('confirmacao')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('negociacaos');
    }
};
