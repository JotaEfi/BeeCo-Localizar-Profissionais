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

export const getPosts = async (): Promise<Post[]> => {
  try {
    const response = await api.get('/posts')
    console.log('Posts obtidos com sucesso:', response.data)
    return response.data
  } catch (error) {
    console.error('Erro ao obter posts:', error)
    throw error
  }
}
