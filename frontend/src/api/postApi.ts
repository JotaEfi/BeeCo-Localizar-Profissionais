import { api } from '@/utlis/api'
import { Post } from '@/types/postTypes'

export const createPost = async (postData: Post) => {
  try {
    const response = await api.post('/posts', postData)
    console.log('Post criado com sucesso:', response.data)
    return response.data
  } catch (error) {
    console.error('Erro ao criar post:', error)
    throw error
  }
}

export const getPosts = async () => {
  try {
    const {data} = await api.get('/posts')
    console.log('Posts recebidos:', data)
    return data
  } catch (error) {
    console.error('Erro ao buscar posts:', error)
    throw error
  }
}

export const getPostsById = async (id?: string) => {
  try {
    const data = await api.get(`/posts/${id}`)
    console.log('Post recebidos:', data)
    return data
  } catch (error) {
    console.error('Erro ao buscar posts:', error)
    throw error
  }
}
