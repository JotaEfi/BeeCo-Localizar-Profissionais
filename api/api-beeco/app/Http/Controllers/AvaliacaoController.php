<?php

namespace App\Http\Controllers;

use App\Models\avaliacao;
use Illuminate\Http\Request;

class AvaliacaoController extends Controller
{
    // Listar todas as avaliações
    public function index()
    {
        return avaliacao::all();
    }

    // Criar uma nova avaliação
    public function store(Request $request)
    {
        $validated = $request->validate([
            'prestador_id' => 'required|exists:users,id',
            'contratante_id' => 'required|exists:users,id',
            'nota' => 'required|integer|min:1|max:5',
            'comentario' => 'nullable|string',
            'tipo' => 'required|in:prestador,contratante',
        ]);

        $avaliacao = avaliacao::create($validated);

        return response()->json($avaliacao, 201);
    }

    // Mostrar uma avaliação específica
    public function show(avaliacao $avaliacao)
    {
        return $avaliacao;
    }

    // Atualizar uma avaliação
    public function update(Request $request, avaliacao $avaliacao)
    {
        $validated = $request->validate([
            'nota' => 'sometimes|required|integer|min:1|max:5',
            'comentario' => 'nullable|string',
            'tipo' => 'sometimes|required|in:prestador,contratante',
        ]);

        $avaliacao->update($validated);

        return response()->json($avaliacao);
    }

    // Deletar uma avaliação
    public function destroy(avaliacao $avaliacao)
    {
        $avaliacao->delete();

        return response()->json(null, 204);
    }
}
