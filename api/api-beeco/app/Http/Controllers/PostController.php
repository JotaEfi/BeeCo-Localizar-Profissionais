<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $tipo = $request->query('tipo'); 
        $query = Post::with('user'); 

        if ($tipo) {
            $query->where('tipo_postagem', $tipo); 
        }

        $posts = $query->latest()->get();

        foreach ($posts as $post) {
            if ($post->imagem) {
                $post->imagem_url = Storage::url($post->imagem);
            }
        }

        return response()->json($posts);
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descricao' => 'required|string',
            'tipo_postagem' => 'required|in:contratante,prestador',
            'preco' => 'nullable|numeric',
            'categoria' => 'nullable|string',
            'imagem' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Corrigido
        ]);

        $data = $request->only(['titulo', 'descricao', 'tipo_postagem', 'preco', 'categoria']);
        $data['user_id'] = Auth::id();

        if ($request->hasFile('imagem')) {
            $imagePath = $request->file('imagem')->store('posts', 'public');
            $data['imagem'] = asset('storage/' . $imagePath); // Gera URL completa
        }

        $post = Post::create($data);

        if ($post->imagem) {
            $post->imagem_url = Storage::url($post->imagem);
        }

        return response()->json($post, 201);
    }

    public function show($id)
    {
        $post = Post::with('user')->findOrFail($id);

        if ($post->imagem) {
            $post->imagem_url = Storage::url($post->imagem);
        }

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
            // Remove imagem antiga se existir
            if ($post->imagem) {
                $oldPath = str_replace(asset('storage/'), '', $post->imagem);
                Storage::disk('public')->delete($oldPath);
            }

            $imagePath = $request->file('imagem')->store('posts', 'public');
            $data['imagem'] = asset('storage/' . $imagePath); // Gera URL completa
        }

        $post->update($data);

        if ($post->imagem) {
            $post->imagem_url = Storage::url($post->imagem);
        }

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
