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
        Schema::create('avaliacoes', function (Blueprint $table) {
             $table->id('id_avaliacao');
        $table->unsignedBigInteger('prestador_id');
        $table->unsignedBigInteger('contratante_id');
        $table->tinyInteger('nota');
        $table->text('comentario')->nullable();
        $table->enum('tipo', ['prestador', 'contratante']);
        $table->timestamps();

        $table->foreign('prestador_id')->references('id')->on('users')->onDelete('cascade');
        $table->foreign('contratante_id')->references('id')->on('users')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('avaliacao');
    }
};