import { createPost } from '@/api/postApi'
import Button from '@/components/Button'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { SideMenu } from '@/components/SideMenu'
import { Textarea } from '@/components/TextArea'
import { useUser } from '@/contexts/UserContext'
import { Post } from '@/types/postTypes'
import { useState } from 'react'

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [postData, setPostData] = useState<Post>({
    titulo: '',
    descricao: '',
    tipo_postagem: 'prestador',
    categoria: '',
    preco: 0,
    status: 'ativo',
  })
  const { userData, updateUser } = useUser()

  const [activeMenu, setActiveMenu] = useState('Informações pessoais')
  const [titleContent, setTitleContent] = useState('Informações pessoais')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target

    if (type === 'radio') {
      updateUser({ sexo: value })
    } else {
      updateUser({ [name]: value })
    }
  }

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu)
    setTitleContent(menu)
  }

  const handlePostChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setPostData((prev) => ({
      ...prev,
      [name]: name === 'preco' ? Number(value) : value,
    }))
  }

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createPost(postData)
  }

  const renderMenuContent = () => {
    switch (activeMenu) {
      case 'Informações pessoais':
        return (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <Input
                placeholder='Digite seu nome'
                label='Nome'
                value={userData.nome}
                name='nome'
                onChange={handleChange}
              />
              <Input
                placeholder='Digite seu e-mail'
                label='E-mail'
                value={userData.email}
                name='email'
                onChange={handleChange}
              />
              <Input
                placeholder='Digite seu número'
                label='Telefone'
                value={userData.telefone}
                name='telefone'
                onChange={handleChange}
              />
              <Input
                placeholder='Localização'
                label='Localização'
                value={userData.localizacao}
                name='localizacao'
                onChange={handleChange}
              />
              <Input
                placeholder='***.***.***-**'
                label='CPF'
                value={userData.cpf}
                name='cpf'
                onChange={handleChange}
              />
              <Input
                placeholder='YYYY-MM-DD'
                label='Data de nascimento'
                value={userData.data_nascimento}
                name='data_nascimento'
                onChange={handleChange}
              />
            </div>

            <div className='mt-6'>
              <label className='block mb-3'>Sexo</label>
              <div className='flex space-x-6'>
                <label className='flex items-center'>
                  <input
                    type='radio'
                    name='sexo'
                    value='M'
                    checked={userData.sexo === 'M'}
                    onChange={handleChange}
                    className='mr-2 h-4 w-4 accent-yellow-400'
                  />
                  Masculino
                </label>
                <label className='flex items-center'>
                  <input
                    type='radio'
                    name='sexo'
                    value='F'
                    checked={userData.sexo === 'F'}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className='mr-2 h-4 w-4 accent-yellow-400'
                  />
                  Feminino
                </label>
                <label className='flex items-center'>
                  <input
                    type='radio'
                    name='sexo'
                    value='O'
                    checked={userData.sexo === 'O'}
                    onChange={handleChange}
                    className='mr-2 h-4 w-4 accent-yellow-400'
                  />
                  Outros
                </label>
              </div>
            </div>
          </>
        )
      case 'Serviços':
        return (
          <div className='w-full'>
            <form
              onSubmit={handlePostSubmit}
              className='flex flex-col gap-4 w-[600px]'
            >
              <Input
                type='text'
                placeholder='Dê um título ao seu serviço'
                label='Título'
                name='titulo'
                value={postData.titulo}
                onChange={handlePostChange}
              />
              <Textarea
                label='Descrição do serviço'
                placeholder='Detalhe como é seu serviço...'
                className='min-h-[100px]'
                name='descricao'
                value={postData.descricao}
                onChange={handlePostChange}
              />
              <Select
                label='Tipo do serviço'
                name='categoria'
                value={postData.categoria}
                onChange={handlePostChange}
              >
                <option value=''>Selecione uma categoria</option>
                <option value='pedreiro'>Pedreiro</option>
                <option value='faxineiro'>Faxineiro</option>
              </Select>
              <Input
                type='number'
                placeholder='R$0.00'
                label='Preço'
                name='preco'
                value={postData.preco}
                onChange={handlePostChange}
              />
              <Button type='submit' className='mt-4'>
                Criar Serviço
              </Button>
            </form>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <>
      <SideMenu />
      <div className='flex h-screen w-screen items-center justify-center gap-10 text-dark-gray p-12'>
        <div className='w-70 flex flex-col shadow-2xl rounded-[8px]'>
          <div className='p-6 flex flex-col items-center'>
            <div className='h-16 w-16 rounded-full bg-yellow-300 mb-6'></div>

            <span className='text-[1.2rem]'>{userData.nome || 'Usuário'}</span>
            <span className='text-gray-400 capitalize'>
              {userData.tipo || 'Usuário'}
            </span>

            <div className='w-full border-t border-gray-200 my-5'></div>

            <ul className='w-full text-center py-4 transition gap-3 flex flex-col'>
              {[
                'Informações pessoais',
                ...(userData.tipo === 'prestador' ? ['Serviços'] : []),
              ].map((menu, index) => (
                <li
                  key={index}
                  className={`p-2 hover:shadow-md transition-all ease-in-out rounded-[8px] cursor-pointer  ${
                    menu === activeMenu ? 'border-2 text-light-yellow' : ''
                  }`}
                  onClick={() => handleMenuClick(menu)}
                >
                  {menu}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='flex p-8 shadow-2xl gap-20 rounded-[8px]'>
          <div className='max-w-4xl'>
            <div className='flex justify-between items-center mb-8'>
              <h2 className=' text-xl'>{titleContent}</h2>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancelar' : 'Editar'}
              </Button>
            </div>
            {renderMenuContent()}
          </div>
        </div>
      </div>
    </>
  )
}
