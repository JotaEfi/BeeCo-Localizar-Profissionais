import { SideMenu } from '@/components/SideMenu'
import { Input } from '@/components/Input'
import Button from '@/components/Button'
import { Search } from 'lucide-react'
import { ProfessionalCard } from '@/components/ProfessionalCard'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '@/utlis/api'

type Prestador = {
  id: number
  nome: string
  email: string
  foto_perfil: string | null
  tipo: string
}

export const Favorites = () => {
  const [prestadores, setPrestadores] = useState<Prestador[]>([])

  useEffect(() => {
    api
      .get('/users/type/prestador')
      .then((res) => {
        console.log('Prestadores recebidoss:', res.data)
        setPrestadores(res.data.users)
      })
      .catch((err) => {
        console.error('Erro ao buscar prestadores:', err)
      })
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

        {prestadores.length === 0 ? (
          <p className='text-gray-500'>Nenhum prestador foi encontrado.</p>
        ) : (
          <div className='grid grid-cols-5 gap-6.5 min-w-[1580px]'>
            {prestadores.map((item) => (
              <Link key={item.id} to='/professional'>
                <ProfessionalCard
                  img={item.foto_perfil || ''}
                  name={item.nome}
                  profession='Serviço'
                  valueService={0}
                />
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
