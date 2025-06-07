import { SideMenu } from '@/components/SideMenu'
import { Input } from '@/components/Input'
import Button from '@/components/Button'
import { Search } from 'lucide-react'
import { ProfessionalCard } from '@/components/ProfessionalCard'
import { useEffect, useState } from 'react'
import { getFavorites } from '@/api/favApi'
import { FavoriteResponse } from '@/types/favTypes'
import { Link } from 'react-router-dom'

export const Favorites = () => {
  const [favorites, setFavorites] = useState<FavoriteResponse[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getFavorites()
        console.log('Posts recebidos:', response)
        // Verificar se a resposta tem a estrutura esperada
        if (
          response &&
          response.favoritos &&
          Array.isArray(response.favoritos)
        ) {
          setFavorites(response.favoritos)
        } else {
          console.error('Formato de resposta inesperado:', response)
          setFavorites([])
        }
      } catch (error) {
        console.error('Erro ao buscar posts:', error)
        setFavorites([])
      }
    }
    fetchPosts()
  }, [])

  return (
    <>
      <SideMenu />
      <section className='flex justify-center items-center px-30 w-full pt-10 pb-40 flex-col gap-5'>
        <div className='flex gap-2 w-[500px]'>
          <Input placeholder='Ex.: Pedreiro' fullWidth={true} />
          <Button icon={<Search size={20} />} size='sm'>
            Pesquisar
          </Button>
        </div>

        <div className='w-[1580px] flex justify-between pb-5 items-center'>
          <h3 className='text-[1.3rem]'>Seus favoritos</h3>
        </div>

        {favorites.length === 0 ? (
          <p className='text-gray-500'>Nenhum prestador foi encontrado.</p>
        ) : (
          <div className='grid grid-cols-5 gap-6.5 min-w-[1580px]'>
            {favorites.map((favorite) => (
              <Link
                to={`/professional/${favorite.id_prestador}`}
                key={favorite.id_favorito}
              >
                <ProfessionalCard
                  name={favorite.prestador?.nome || 'Nome não disponível'}
                  img={favorite.prestador?.foto_perfil}
                  id={favorite.id_prestador}
                />
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
