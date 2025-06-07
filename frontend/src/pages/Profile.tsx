import { api } from '@/utlis/api'
import Button from '@/components/Button'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { SideMenu } from '@/components/SideMenu'
import { Textarea } from '@/components/TextArea'
import { useUser } from '@/contexts/UserContext'
import { Post } from '@/types/postTypes'
import { useEffect, useState } from 'react'
import { domesticProfessions } from '@/mock/DomesticProfession'

export const Profile = () => {
  const [postData, setPostData] = useState<Post>({
    titulo: '',
    descricao: '',
    tipo_postagem: 'prestador',
    categoria: '',
    preco: '',
    status: 'ativo',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [cpfStatus, setCpfStatus] = useState<{
    message: string
    isValid: boolean
  }>({ message: '', isValid: false })
  const [dateStatus, setDateStatus] = useState<{
    message: string
    isValid: boolean
  }>({ message: '', isValid: false })
  const [emailStatus, setEmailStatus] = useState<{
    message: string
    isValid: boolean
  }>({ message: '', isValid: false })

  const { userData, updateUser } = useUser()
  const [activeMenu, setActiveMenu] = useState('Informações pessoais')
  const [titleContent, setTitleContent] = useState('Informações pessoais')
  const [tempUserData, setTempUserData] = useState(userData)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  const useDebounce = <T,>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)
      return () => clearTimeout(handler)
    }, [value, delay])
    return debouncedValue
  }

  const debouncedUserData = useDebounce(tempUserData, 500)

  useEffect(() => {
    updateUser(debouncedUserData)
  }, [debouncedUserData])

  const validateCPF = (cpf: string): boolean => {
    // Remove all non-numeric characters
    const cleanCPF = cpf.replace(/\D/g, '')

    // Check if CPF has 11 digits
    if (cleanCPF.length !== 11) return false

    // Check if all digits are the same
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false

    // Validate first digit
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i)
    }
    let rest = 11 - (sum % 11)
    let digit = rest > 9 ? 0 : rest
    if (digit !== parseInt(cleanCPF.charAt(9))) return false

    // Validate second digit
    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i)
    }
    rest = 11 - (sum % 11)
    digit = rest > 9 ? 0 : rest
    if (digit !== parseInt(cleanCPF.charAt(10))) return false

    return true
  }

  const validateDate = (date: string): boolean => {
    // Check if date is in DD/MM/YYYY format
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/
    if (!dateRegex.test(date)) return false

    const [day, month, year] = date.split('/').map(Number)

    // Check if date is valid
    const dateObj = new Date(year, month - 1, day)
    if (
      dateObj.getFullYear() !== year ||
      dateObj.getMonth() !== month - 1 ||
      dateObj.getDate() !== day
    ) {
      return false
    }

    // Check if date is not in the future
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (dateObj > today) return false

    // Check if date is not today or yesterday
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    if (dateObj >= yesterday) return false

    // Check if age is not more than 100 years
    const minDate = new Date()
    minDate.setFullYear(today.getFullYear() - 100)
    if (dateObj < minDate) return false

    return true
  }

  const validateEmail = (email: string): boolean => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement

    if (type === 'radio') {
      updateUser({ sexo: value })
    } else if (type === 'file' && files && files[0]) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setTempUserData((prev) => ({
          ...prev,
          foto_perfil: reader.result as string,
        }))
      }
      reader.readAsDataURL(files[0])
    } else {
      let formattedValue = value
      if (name === 'cpf') {
        // Remove all non-numeric characters
        const numbers = value.replace(/\D/g, '')
        // Apply CPF mask (000.000.000-00)
        formattedValue = numbers
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})/, '$1-$2')
          .replace(/(-\d{2})\d+?$/, '$1')

        // Update CPF status
        if (numbers.length < 11) {
          setCpfStatus({
            message: `Faltam ${11 - numbers.length} dígitos`,
            isValid: false,
          })
        } else if (numbers.length === 11) {
          const isValid = validateCPF(formattedValue)
          setCpfStatus({
            message: isValid ? '' : 'CPF inválido',
            isValid,
          })
        }
      } else if (name === 'data_nascimento') {
        // Format date as DD/MM/YYYY
        const numbers = value.replace(/\D/g, '')
        if (numbers.length > 0) {
          formattedValue = numbers
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{4})\d+?$/, '$1')

          // Validate date
          if (formattedValue.length === 10) {
            const isValid = validateDate(formattedValue)
            setDateStatus({
              message: isValid ? '' : 'Data inválida',
              isValid,
            })
          } else {
            setDateStatus({
              message: 'Data incompleta',
              isValid: false,
            })
          }
        }
      } else if (name === 'email') {
        // Validate email
        if (value.length > 0) {
          const isValid = validateEmail(value)
          setEmailStatus({
            message: isValid ? '' : 'Email inválido',
            isValid,
          })
        } else {
          setEmailStatus({
            message: '',
            isValid: false,
          })
        }
      }

      setTempUserData((prev) => ({
        ...prev,
        [name]: formattedValue,
      }))
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
    const newValue = name === 'preco' ? Math.max(0, Number(value)) : value
    setPostData((prev) => ({
      ...prev,
      [name]: newValue,
    }))
  }

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      postData.titulo.length > 50 ||
      postData.descricao.length > 500 ||
      !postData.titulo.trim() ||
      !postData.descricao.trim()
    ) {
      setModalMessage('Preencha corretamente os campos.')
      setModalOpen(true)
      return
    }

    try {
      // Cria um FormData para enviar dados multipart/form-data (para arquivos)
      const formData = new FormData()

      // Adiciona todos os campos do post ao FormData
      formData.append('titulo', postData.titulo)
      formData.append('descricao', postData.descricao)
      formData.append('tipo_postagem', postData.tipo_postagem)
      formData.append('categoria', postData.categoria)
      formData.append('preco', String(postData.preco))
      formData.append('status', postData.status)

      // Adiciona o arquivo de imagem ao FormData se existir
      if (imageFile) {
        formData.append('imagem', imageFile)
      }

      // Envia os dados para a API
      await api.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setModalMessage('Serviço criado com sucesso!')
      setModalOpen(true)
      setPostData({
        titulo: '',
        descricao: '',
        tipo_postagem: 'prestador',
        categoria: '',
        preco: '',
        status: 'ativo',
      })
      setImageFile(null)
    } catch (error) {
      setModalMessage('Erro ao criar serviço. Tente novamente.')
      setModalOpen(true)
    }
  }

  const closeModal = () => setModalOpen(false)

  const renderMenuContent = () => {
    switch (activeMenu) {
      case 'Informações pessoais':
        return (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <Input
                label='Nome'
                placeholder='Digite seu nome'
                value={tempUserData.nome}
                name='nome'
                maxLength={60}
                onChange={handleChange}
              />
              <div className='flex flex-col'>
                <Input
                  label='E-mail'
                  placeholder='Digite seu e-mail'
                  value={tempUserData.email}
                  name='email'
                  maxLength={60}
                  onChange={handleChange}
                />
                {emailStatus.message && (
                  <span
                    className={`text-sm mt-1 ${
                      emailStatus.isValid ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {emailStatus.message}
                  </span>
                )}
              </div>
              <Input
                label='Telefone'
                placeholder='Digite seu número'
                value={tempUserData.telefone}
                name='telefone'
                maxLength={13}
                onChange={handleChange}
              />
              <div className='flex flex-col'>
                <Input
                  label='CPF'
                  placeholder='000.000.000-00'
                  value={tempUserData.cpf}
                  name='cpf'
                  maxLength={14}
                  onChange={handleChange}
                />
                {cpfStatus.message && (
                  <span
                    className={`text-sm mt-1 ${
                      cpfStatus.isValid ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {cpfStatus.message}
                  </span>
                )}
              </div>
              <div className='mb-4'>
                <label className='block mb-1 text-sm text-gray-700'>
                  Foto de Perfil
                </label>
                <input
                  type='file'
                  accept='image/*'
                  name='foto_perfil'
                  onChange={handleChange}
                  className='w-full border border-gray-300 rounded-md px-5 py-2 text-base focus:outline-none focus:ring-2focus:border-transparent'
                />
                {tempUserData.foto_perfil && (
                  <img
                    src={tempUserData.foto_perfil}
                    alt='Preview'
                    className='mt-2 w-24 h-24 object-cover rounded-full border'
                  />
                )}
              </div>

              <div className='flex flex-col'>
                <Input
                  label='Data de nascimento'
                  placeholder='DD/MM/AAAA'
                  value={tempUserData.data_nascimento}
                  name='data_nascimento'
                  maxLength={10}
                  onChange={handleChange}
                />
                {dateStatus.message && (
                  <span
                    className={`text-sm mt-1 ${
                      dateStatus.isValid ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {dateStatus.message}
                  </span>
                )}
              </div>
            </div>

            <div className='mt-6'>
              <label className='block mb-3'>Sexo</label>
              <div className='flex space-x-6'>
                {['M', 'F', 'O'].map((sexo) => (
                  <label key={sexo} className='flex items-center'>
                    <input
                      type='radio'
                      name='sexo'
                      value={sexo}
                      checked={userData.sexo === sexo}
                      onChange={handleChange}
                      className='mr-2 h-4 w-4 accent-[#FFC75A]'
                    />
                    {sexo === 'M'
                      ? 'Masculino'
                      : sexo === 'F'
                      ? 'Feminino'
                      : 'Outros'}
                  </label>
                ))}
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
                maxLength={100}
              />
              <Textarea
                label='Descrição do serviço'
                placeholder='Fale sobre você e o seu serviço'
                className='min-h-[100px]'
                name='descricao'
                value={postData.descricao}
                onChange={handlePostChange}
                maxLength={500}
              />
              <Select
                label='Tipo do serviço'
                name='categoria'
                value={postData.categoria}
                onChange={handlePostChange}
              >
                <option value=''>Selecione uma categoria</option>
                {domesticProfessions.map((profession) => (
                  <option key={profession.id} value={profession.name}>
                    {profession.name}
                  </option>
                ))}
              </Select>
              <Input
                type='number'
                placeholder='R$0.00'
                label='Preço'
                name='preco'
                value={postData.preco}
                onChange={handlePostChange}
                min='0'
                step='0.01'
              />

              <div className='mb-4'>
                <label className='block mb-1 text-sm text-gray-700'>
                  Imagens dos serviços
                </label>
                <input
                  type='file'
                  accept='image/*'
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      // Armazenar o arquivo original para upload
                      setImageFile(file)

                      // Criar preview da imagem
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        setPostData((prev) => ({
                          ...prev,
                          imagem: reader.result as string, // apenas para preview
                        }))
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  className='w-full border border-gray-300 rounded-md px-5 py-2 text-base focus:outline-none focus:ring-2 focus:border-transparent'
                />
                {postData.imagem && (
                  <img
                    src={postData.imagem}
                    alt='Preview'
                    className='mt-2 w-24 h-24 object-cover rounded-md border'
                  />
                )}
              </div>

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
            <div className='h-16 w-16 rounded-full  mb-6 '>
              <img
                className='object-cover w-full h-full rounded-full'
                src={userData.foto_perfil}
                alt=''
              />
            </div>
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
                  className={`p-2 hover:shadow-md transition-all ease-in-out rounded-[8px] cursor-pointer ${
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
            </div>
            {renderMenuContent()}
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur bg-opacity-50'>
          <div className='bg-white rounded-lg shadow-lg p-6 max-w-sm text-center'>
            <p className='text-gray-800 mb-4'>{modalMessage}</p>
            <button
              onClick={closeModal}
              className='bg-[#FFC75A] text-white px-4 py-2 rounded hover:bg-[#ffc85acb] transition cursor-pointer'
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  )
}
