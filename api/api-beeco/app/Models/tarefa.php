<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class tarefa extends Model
{
    protected $table = 'tarefas';
    protected $primaryKey = 'id_tarefa';
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
