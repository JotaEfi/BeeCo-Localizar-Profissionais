<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profissoes extends Model
{
    protected $table = 'profissoes';
    protected $primaryKey = 'id_profissao';


    protected $fillable = [
        'nome',
        'descricao',
        'categoria',
        'profissao_customizada',
        'created_by'
    ];

    protected $casts = [
        'profissao_customizada' => 'boolean'
    ];

    public function creator()
    {
        return $this->belongsTo(Users::class, 'created_by');
    }
}
