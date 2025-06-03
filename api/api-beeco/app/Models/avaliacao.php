<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class avaliacao extends Model
{
     protected $table = 'avaliacao';
    protected $primaryKey = 'id_avaliacao';

    protected $fillable = [
        'prestador_id',
        'contratante_id',
        'nota',
        'comentario',
        'tipo',
    ];

    public function prestador()
    {
        return $this->belongsTo(Users::class, 'prestador_id');
    }

    public function contratante()
    {
        return $this->belongsTo(Users::class, 'contratante_id');
    }
}
