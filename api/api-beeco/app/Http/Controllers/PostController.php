<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    
    public function index(Request $request)
    {
        $tipo = $request->query('tipo'); 
        $query = Post::with('user'); 

        if ($tipo) {
            $query->where('tipo_postagem', $tipo); 
        }

        return response()->json($query->latest()->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descricao' => 'required|string',
            'tipo_postagem' => 'required|in:contratante,prestador',
            'preco' => 'nullable|numeric',
            'categoria' => 'nullable|string',
            'imagem' => 'nullable|image|max:2048', // Aceita arquivo de imagem
        ]);

        $data = $request->only(['titulo', 'descricao', 'tipo_postagem', 'preco', 'categoria']);
        $data['user_id'] = Auth::id();

        if ($request->hasFile('imagem')) {
            $data['imagem'] = $request->file('imagem')->store('posts', 'public');
        }

        $post = Post::create($data);

        return response()->json($post, 201);
    }

    public function show($id)
    {
        $post = Post::with('user')->findOrFail($id); 

        return response()->json($post);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descricao' => 'required|string',
            'tipo_postagem' => 'required|in:contratante,prestador',
            'preco' => 'nullable|numeric',
            'categoria' => 'nullable|string',
            'imagem' => 'nullable|image|max:2048',
        ]);

        $post = Post::findOrFail($id);

        if ($post->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $data = $request->only(['titulo', 'descricao', 'tipo_postagem', 'preco', 'categoria']);

        if ($request->hasFile('imagem')) {
            $data['imagem'] = $request->file('imagem')->store('posts', 'public');
        }

        $post->update($data);

        return response()->json($post);
    }

    public function destroy($id)
    {
        $post = Post::findOrFail($id); 

        if ($post->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        
        $post->delete();

        return response()->json(['message' => 'Postagem deletada com sucesso']);
    }
}