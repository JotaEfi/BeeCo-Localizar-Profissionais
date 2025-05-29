<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class negociacao extends Model
{
    protected $table = 'negociacaos';
    protected $primaryKey = 'id_negociacao';
    public $timestamps = false;

    protected $fillable = [
        'id_contratante',
        'id_prestador',
        'nome',
        'valor',
        'descricao',
        'confirmacao'
    ];

    public function contratante()
    {
        return $this->belongsTo(Users::class, 'id_contratante');
    }

    public function prestador()
    {
        return $this->belongsTo(Users::class, 'id_prestador');
    }
}
