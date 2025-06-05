<?php

namespace App\Http\Controllers;

use App\Models\Avaliacao;
use Illuminate\Http\Request;

class AvaliacaoController extends Controller
{
    public function index()
    {
        return Avaliacao::with(['prestador', 'contratante'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'prestador_id' => 'required|exists:users,id',
            'contratante_id' => 'required|exists:users,id',
            'nota' => 'required|integer|min:1|max:5',
            'comentario' => 'nullable|string',
            'tipo' => 'required|in:prestador,contratante',
        ]);

        $avaliacao = Avaliacao::create($validated);

        return response()->json($avaliacao, 201);
    }

    public function show($id)
    {
        $avaliacao = Avaliacao::with(['prestador', 'contratante'])->findOrFail($id);
        return response()->json($avaliacao);
    }

    public function update(Request $request, $id)
    {
        $avaliacao = Avaliacao::findOrFail($id);

        $validated = $request->validate([
            'nota' => 'sometimes|required|integer|min:1|max:5',
            'comentario' => 'nullable|string',
            'tipo' => 'sometimes|required|in:prestador,contratante',
        ]);

        $avaliacao->update($validated);

        return response()->json($avaliacao);
    }

    public function destroy($id)
    {
        $avaliacao = Avaliacao::findOrFail($id);
        $avaliacao->delete();

        return response()->json(null, 204);
    }
}


