<?php

namespace App\Http\Controllers;

use App\Models\negociacao;
use Illuminate\Http\Request;

class NegociacaoController extends Controller
{
    public function index()
    {
        return response()->json(negociacao::all(), 200);
    }

    public function show($id)
    {
        $negociacao = negociacao::find($id);

        if (!$negociacao) {
            return response()->json(['message' => 'Negociação não encontrada'], 404);
        }

        return response()->json($negociacao, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_contratante' => 'required|integer',
            'id_prestador' => 'required|integer',
            'nome' => 'required|string|max:255',
            'valor' => 'required|numeric',
            'descricao' => 'nullable|string',
            'confirmacao' => 'nullable|boolean'
        ]);

        $negociacao = negociacao::create($request->all());
        return response()->json($negociacao, 201);
    }

    public function update(Request $request, $id)
    {
        $negociacao = negociacao::find($id);

        if (!$negociacao) {
            return response()->json(['message' => 'Negociação não encontrada'], 404);
        }

        $validated = $request->validate([
            'nome' => 'sometimes|required|string|max:255',
            'valor' => 'sometimes|required|numeric',
            'descricao' => 'nullable|string',
            'confirmacao' => 'nullable|boolean',
        ]);

        $negociacao->update($validated);

        return response()->json($negociacao);
    }

    public function destroy($id)
    {
        $negociacao = negociacao::find($id);

        if (!$negociacao) {
            return response()->json(['message' => 'Negociação não encontrada'], 404);
        }

        $negociacao->delete();

        return response()->json(['message' => 'Negociação deletada com sucesso'], 200);
    }
}
