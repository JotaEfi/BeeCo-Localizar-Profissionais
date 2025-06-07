import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { useNavigate } from 'react-router-dom'
import { createUser } from '@/api/userApi'
import { userType } from '@/types/userTypes'

import { FormEvent, useState } from 'react'
import { setCookie } from '@/utlis/cookies'

export const RegisterClient = () => {
  const [formData, setFormData] = useState<userType>({
    nome: '',
    email: '',
    senha: '',
    senha_confirmation: '',
    tipo: 'contratante',
  })
  const [errors, setErrors] = useState({
    nome: '',
    email: '',
    senha: '',
    senha_confirmation: '',
    general: '',
  })
  const navigate = useNavigate()

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string): boolean => {
    return password.length >= 6
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear field error when user starts typing
    setErrors((prev) => ({
      ...prev,
      [field]: '',
    }))
  }

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()
    let hasError = false
    const newErrors = {
      nome: '',
      email: '',
      senha: '',
      senha_confirmation: '',
      general: '',
    }

    // Name validation
    if (!formData.nome) {
      newErrors.nome = 'Nome é obrigatório'
      hasError = true
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório'
      hasError = true
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido'
      hasError = true
    }

    // Password validation
    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória'
      hasError = true
    } else if (!validatePassword(formData.senha)) {
      newErrors.senha = 'A senha deve ter pelo menos 6 caracteres'
      hasError = true
    }

    // Password confirmation validation
    if (!formData.senha_confirmation) {
      newErrors.senha_confirmation = 'Confirmação de senha é obrigatória'
      hasError = true
    } else if (formData.senha !== formData.senha_confirmation) {
      newErrors.senha_confirmation = 'As senhas não coincidem'
      hasError = true
    }

    if (hasError) {
      setErrors(newErrors)
      return
    }

    try {
      const response = await createUser(formData)
      const { token, user } = response
      setCookie('token', token)
      setCookie('id', user.id)
      navigate('/contracting')
      console.log('Usuário criado:', response)
      setTimeout(() => {
        window.location.reload()
      }, 0)
    } catch (error) {
      console.error('Erro no cadastro:', error)
      setErrors((prev) => ({
        ...prev,
        general: 'Erro ao criar usuário. Tente novamente.',
      }))
    }
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-[url("./assets/register-client.jpg")] bg-cover bg-center'>
      <div className='flex gap-30 justify-center items-center w-[800px] '>
        <div className='flex flex-col gap-4 w-[400px]'>
          <h1 className='font-[400] text-[3.7rem] text-dark-gray leading-[2.5rem]'>
            <span className='font-bold'>Bee</span>Co
          </h1>
          <p className='text-gray-500 text-[1.2rem] leading-[1.5rem]'>
            Faça parte da <span className='font-bold'>Bee</span>Co como
            contratante!
          </p>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-4'>
            <form onSubmit={handleRegister} className='flex gap-3 flex-col'>
              <Input
                label='Nome'
                type='text'
                value={formData.nome}
                placeholder='Digite seu nome'
                onChange={(e) => handleChange('nome', e.target.value)}
                error={errors.nome}
                className='w-[400px]'
              />
              <Input
                label='Email'
                type='text'
                value={formData.email}
                placeholder='Digite seu email'
                onChange={(e) => handleChange('email', e.target.value)}
                error={errors.email}
                className='w-[400px]'
              />
              <Input
                label='Senha'
                type='password'
                value={formData.senha}
                placeholder='Digite sua senha'
                onChange={(e) => handleChange('senha', e.target.value)}
                error={errors.senha}
                className='w-[400px]'
              />
              <Input
                label='Confirmar Senha'
                type='password'
                value={formData.senha_confirmation}
                placeholder='Confirme sua senha'
                onChange={(e) =>
                  handleChange('senha_confirmation', e.target.value)
                }
                error={errors.senha_confirmation}
                className='w-[400px]'
              />
              {errors.general && (
                <span className='text-red-500 text-sm'>{errors.general}</span>
              )}

              <div className='flex justify-between items-center mt-6'>
                <Button
                  variant='primary'
                  size='md'
                  width='full'
                  className='uppercase'
                  type='submit'
                >
                  continuar
                </Button>
              </div>
            </form>
          </div>
          <p className='text-[0.7rem] text-gray-500 underline'>
            Ao se inscrever no <span className='font-bold'>Bee</span>Co, você
            concorda com nossa Política de Privacidade e Termos de Serviço
          </p>

          {/* <p className='text-sm text-gray-500 text-center mt-3 flex justify-center items-center gap-1'>
            Não tem uma conta?
            <Link
              to='/register-option'
              className='text-light-yellow font-bold uppercase'
            >
              criar conta
            </Link>
          </p> */}
        </div>
      </div>
    </div>
  )
}
