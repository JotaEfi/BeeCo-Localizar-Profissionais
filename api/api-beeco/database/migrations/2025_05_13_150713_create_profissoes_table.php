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
        Schema::create('profissoes', function (Blueprint $table) {
            $table->id('id_profissao');
            $table->string('nome');
            $table->string('descricao')->nullable();
            $table->string('categoria');
            $table->boolean('profissao_customizada')->default(false);
            $table->foreignId('created_by')->nullable();
            $table->timestamps();

            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profissoes');
    }
};
