import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { FormEvent, useState } from 'react'
import { userLoginType } from '@/types/userTypes'
import { loginUser } from '@/api/userApi'
import { setCookie } from '@/utlis/cookies'


export const Login = () => {
  const [formData, setFormData] = useState<userLoginType>({
    email: '',
    senha: '',
  })

  const [errors, setErrors] = useState({
    email: '',
    senha: '',
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

    setErrors((prev) => ({
      ...prev,
      [field]: '',
    }))
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    let hasError = false
    const newErrors = {
      email: '',
      senha: '',
      general: '',
    }

    // Validação do email
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório'
      hasError = true
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido'
      hasError = true
    }

    // Validação da senha
    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória'
      hasError = true
    } else if (!validatePassword(formData.senha)) {
      newErrors.senha = 'A senha deve ter pelo menos 6 caracteres'
      hasError = true
    }

    if (hasError) {
      setErrors(newErrors)
      return
    }

    try {
      const { token, user } = await loginUser(formData)
      setCookie('token', token)
      if (user.tipo === 'prestador') {
        navigate('/dashboard-profissional')
        setTimeout(() => {
          window.location.reload()
        }, 0)
      } else if (user.tipo === 'contratante') {
        navigate('/contracting')
        setTimeout(() => {
          window.location.reload()
        }, 0)
      }
    } catch (error) {
      console.error('Erro no login:', error)
      setErrors((prev) => ({
        ...prev,
        general: 'Email ou senha incorretos',
      }))
    }
  }

  

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[url('./assets/login.jpg')] bg-cover bg-center">
      <div className='flex gap-30 justify-center items-center w-[800px]'>
        <div className='flex flex-col gap-4 w-[400px]'>
          <h1 className='font-[400] text-[3.7rem] text-dark-gray leading-[2.5rem]'>
            <span className='font-bold'>Bee</span>Co
          </h1>
          <p className='text-gray-500 text-[1.2rem] leading-[1.5rem] flex flex-col'>
            Bem vindo,
            <span>
              Faça login com a <span className='font-bold'>Bee</span>Co!
            </span>
          </p>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-4'>
            <form className='flex gap-3 flex-col' onSubmit={handleLogin}>
              <Input
                label='Email'
                type='text'
                placeholder='Digite seu email'
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                error={errors.email}
                className='w-[400px]'
              />
              <Input
                label='Senha'
                type='password'
                placeholder='Digite sua senha'
                value={formData.senha}
                onChange={(e) => handleChange('senha', e.target.value)}
                error={errors.senha}
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
                  className='uppercase w-[400px]'
                >
                  entrar
                </Button>
              </div>
            </form>
          </div>

          <p className='text-sm text-gray-500 text-center mt-3 flex justify-center items-center gap-1'>
            Não tem uma conta?
            <Link
              to='/select/register'
              className='text-light-yellow font-bold uppercase'
            >
              criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
