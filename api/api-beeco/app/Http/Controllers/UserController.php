<?php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Routing\Controller; // Import necessário para Controller

class UserController extends Controller
{


    /**
     * Read: Obter dados do usuário logado
     */
    public function show(Request $request)
    {
        try {
            $user = auth()->user();

            return response()->json([
                'message' => 'Dados do usuário recuperados com sucesso',
                'user' => $user,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao recuperar dados do usuário',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update: Atualizar dados do usuário logado
     */
    public function update(Request $request)
    {
        try {
            $user = auth()->user();

            $validated = $request->validate([
                'nome' => 'sometimes|string|max:255',
                'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id . ',id',
                'senha' => 'sometimes|string|min:8|confirmed',
                'tipo' => 'sometimes|in:contratante,prestador',
                'data_nascimento' => 'nullable|date',
                'sexo' => 'nullable|in:M,F,O',
                'foto_perfil' => 'nullable|string',
                'telefone' => 'nullable|string',
                'id_endereco' => 'nullable|exists:endereco,id_endereco',
            ]);

            // Hash da senha, se fornecida
            if (isset($validated['senha'])) {
                $validated['senha'] = Hash::make($validated['senha']);
            }

            $user->update($validated);

            return response()->json([
                'message' => 'Usuário atualizado com sucesso',
                'user' => $user,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao atualizar usuário',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function getUsersByType($type)
    {
        try {
            // Validate type parameter
            if (!in_array($type, ['contratante', 'prestador'])) {
                return response()->json([
                    'message' => 'Tipo inválido. Use "contratante" ou "prestador"',
                ], 400);
            }

            // Get users by type
            $users = Users::where('tipo', $type)
                ->select('id', 'nome', 'email', 'foto_perfil', 'tipo')
                ->get();

            return response()->json([
                'message' => "Lista de usuários do tipo {$type}",
                'users' => $users,
                'count' => $users->count()
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao buscar usuários',
                'error' => $e->getMessage()
            ], 500);
        }
     }
    /**
     * Delete: Excluir conta do usuário logado
     */
    public function destroy(Request $request)
    {
        try {
            $user = auth()->user();

            // Invalidar o token JWT
            JWTAuth::invalidate(JWTAuth::getToken());

            $user->delete();

            return response()->json([
                'message' => 'Conta excluída com sucesso',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao excluir conta',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function desativarConta(Request $request)
{
    try {
        $user = auth()->user();
        $user->status = 'inativo';
        $user->save();

        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->json([
            'mensagem' => 'Conta desativada com sucesso'
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'mensagem' => 'Erro ao desativar conta',
            'erro' => $e->getMessage()
        ], 500);
    }
}


public function reativarConta(Request $request)
{
    try {
        $request->validate([
            'email' => 'required|email',
            'senha' => 'required'
        ]);

        $user = Users::withoutGlobalScope('ativo')
            ->where('email', $request->email)
            ->where('status', 'inativo')
            ->first();

        if (!$user || !Hash::check($request->senha, $user->senha)) {
            return response()->json([
                'mensagem' => 'Credenciais inválidas'
            ], 401);
        }

        $user->status = 'ativo';
        $user->save();

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'mensagem' => 'Conta reativada com sucesso',
            'token' => $token,
            'usuario' => $user
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'mensagem' => 'Erro ao reativar conta',
            'erro' => $e->getMessage()
        ], 500);
    }
}
}