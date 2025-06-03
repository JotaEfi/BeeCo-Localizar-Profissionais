import { SideMenu } from '@/components/SideMenu'
import { Input } from '@/components/Input'
import Button from '@/components/Button'
import { Search } from 'lucide-react'
import { ProfessionalCard } from '@/components/ProfessionalCard'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { PostResponse } from '@/types/postTypes'
import { getPosts } from '@/api/postApi'

export const Favorites = () => {
   const [post, setPosts] = useState<PostResponse[]>([])
    
  
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await getPosts()
          console.log('Posts recebidos:', response)
          setPosts(response)
        } catch (error) {
          console.error('Erro ao buscar posts:', error)
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

        {post.length === 0 ? (
          <p className='text-gray-500'>Nenhum prestador foi encontrado.</p>
        ) : (
          <div className="grid grid-cols-5 gap-6.5 min-w-[1580px]">
                    {post.map((item) => (
                      <Link to={`/professional/${item.id}`} key={item.id}> 
                        <ProfessionalCard
                          img={item.imagem}  
                          name={item.user.nome}
                          profession={item.categoria}
                          valueService={item.preco}
                          titulo={item.titulo}
                        />
                      
                      </Link>
                    ))}
                </div>
        )}
      </section>
    </>
  )
}
