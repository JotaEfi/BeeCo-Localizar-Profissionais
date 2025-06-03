<?php

namespace App\Http\Controllers;
use App\Models\Profissoes;

use Illuminate\Http\Request;

class ProfissaoController extends Controller
{
    public function index()
    {
        return response()->json(Profissoes::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string',
            'descricao' => 'nullable|string',
            'categoria' => 'nullable|string',
            'profissao_customizada' => 'boolean',
            'created_by' => 'required|integer'
        ]);

        $profissao = Profissoes::create($request->all());

        return response()->json($profissao, 201);
    }
}