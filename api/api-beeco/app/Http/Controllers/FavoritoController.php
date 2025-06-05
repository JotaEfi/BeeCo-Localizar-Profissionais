<?php
namespace App\Http\Controllers;

use App\Models\Favoritos;
use App\Models\Users;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class FavoritoController extends Controller
{
    public function index(Request $request)
    {
        $user = JWTAuth::user();
        
        $favoritos = Favoritos::where('id_contratante', $user->id)
            ->with('prestador')
            ->get();

        return response()->json([
            'status' => 'success',
            'favoritos' => $favoritos
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_prestador' => 'required|exists:users,id'
        ]);

        $user = JWTAuth::user();

        // Verifica se o usuário é um contratante
        if ($user->tipo !== 'contratante') {
            return response()->json([
                'status' => 'error',
                'message' => 'Apenas contratantes podem favoritar prestadores'
            ], 403);
        }

        // Verifica se o prestador existe e é do tipo prestador
        $prestador = Users::where('id', $request->id_prestador)
            ->where('tipo', 'prestador')
            ->firstOrFail();

        // Cria ou recupera o favorito
        $favorito = Favoritos::firstOrCreate([
            'id_contratante' => $user->id,
            'id_prestador' => $prestador->id
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Prestador adicionado aos favoritos',
            'favorito' => $favorito
        ], 201);
    }

    public function destroy($prestador_id)
    {
        $user = JWTAuth::user();

        $favorito = Favoritos::where('id_contratante', $user->id)
            ->where('id_prestador', $prestador_id)
            ->firstOrFail();

        $favorito->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Prestador removido dos favoritos'
        ]);
    }
}