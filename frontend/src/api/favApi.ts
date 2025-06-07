import { api } from '@/utlis/api'

export const getFavorites = async () => {
  try {
    const { data } = await api.get(`/favoritos`)
    console.log('Favorite added successfully:', data)
    return data
  } catch (error) {
    console.error('Error fetching favorites:', error)
    throw error
  }
}

export const addFavorite = async (profissionalId: string) => {
  try {
    const { data } = await api.post(`/favoritos`, {
      id_prestador: profissionalId,
    })
    console.log('Favorite added successfully:', data)
    return data
  } catch (error) {
    console.error('Error adding favorite:', error)
    throw error
  }
}

export const removeFavorite = async (profissionalId: string) => {
  try {
    const { data } = await api.delete(`/favoritos/${profissionalId}`)
    console.log('Favorite removed successfully:', data)
    return data
  } catch (error) {
    console.error('Error removing favorite:', error)
    throw error
  }
}
