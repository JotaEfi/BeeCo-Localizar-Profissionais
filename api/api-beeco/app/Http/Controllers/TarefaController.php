<?php

namespace App\Http\Controllers;

use App\Models\Tarefa;
use Illuminate\Http\Request;

class TarefaController extends Controller
{
    public function index()
    {
        return response()->json(Tarefa::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_negociacao' => 'required|exists:negociacaos,id_negociacao',
            'id_prestador' => 'required|exists:users,id',
            'id_contratante' => 'required|exists:users,id',
            'andamento' => 'required|string|in:pendente,em_andamento,finalizada',
        ]);

        $tarefa = Tarefa::create($validated);

        return response()->json($tarefa, 201);
    }

    public function show($id)
    {
        $tarefa = Tarefa::find($id);

        if (!$tarefa) {
            return response()->json(['message' => 'Tarefa não encontrada'], 404);
        }

        return response()->json($tarefa);
    }

    public function update(Request $request, $id)
    {
        $tarefa = Tarefa::find($id);

        if (!$tarefa) {
            return response()->json(['message' => 'Tarefa não encontrada'], 404);
        }

        $validated = $request->validate([
            'andamento' => 'sometimes|required|string|in:pendente,em_andamento,finalizada',
        ]);

        $tarefa->update($validated);

        return response()->json($tarefa);
    }

    public function destroy($id)
    {
        $tarefa = Tarefa::find($id);

        if (!$tarefa) {
            return response()->json(['message' => 'Tarefa não encontrada'], 404);
        }

        $tarefa->delete();

        return response()->json(['message' => 'Tarefa deletada com sucesso']);
    }
}
