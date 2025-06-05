<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Avaliacao extends Model
{
    use HasFactory;

    protected $table = 'avaliacoes';

    protected $fillable = [
        'prestador_id',
        'contratante_id',
        'nota',
        'comentario',
        'tipo',
    ];

    // Relacionamentos
    public function prestador()
    {
        return $this->belongsTo(Users::class, 'prestador_id');
    }

    public function contratante()
    {
        return $this->belongsTo(Users::class, 'contratante_id');
    }
}