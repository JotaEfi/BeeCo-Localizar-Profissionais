<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Favoritos extends Model
{
    protected $table = 'favoritos';
    protected $primaryKey = 'id_favorito';

    protected $fillable = [
        'id_contratante',
        'id_prestador',
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

