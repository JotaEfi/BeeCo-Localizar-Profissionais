import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { SelectProfissao } from '@/components/SelectProfissao'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const profissoesExemplo = [
  { id: '1', nome: 'Babá' },
  { id: '2', nome: 'Diarista' },
  { id: '3', nome: 'Jardineiro' },
  { id: '4', nome: 'Eletricista' },
]

export const RegisterProfessional = () => {
  const [profissao, setProfissao] = useState('')

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-[url("./assets/register-professional.jpg")] bg-cover bg-center'>
      <div className='flex gap-30 justify-center items-center w-[800px] '>
        <div className='flex flex-col gap-4 w-[300px]'>
          <Input label='Nome' type='text' placeholder='Digite seu nome' />
          <Input label='Email' type='text' placeholder='Digite seu email' />
          <Input label='Senha' type='password' placeholder='Digite sua senha' />
          <Input
            label='Confirmar Senha'
            type='password'
            placeholder='Confirme sua senha'
          />

          <div className='flex flex-col gap-1'>
            <label className='text-dark-gray'>
              Qual a sua profissão?
            </label>
            <SelectProfissao
              profissoes={profissoesExemplo}
              value={profissao}
              onChange={setProfissao}
            />
          </div>

          <div className='flex justify-between items-center mt-6'>
            <Button
              variant='primary'
              size='md'
              width='full'
              className='uppercase'
            >
              continuar
            </Button>
          </div>

          <p className='text-[0.7rem] text-gray-500 underline'>
            Ao se inscrever no <span className='font-bold'>Bee</span>Co, você
            concorda com nossa Política de Privacidade e Termos de Serviço
          </p>

          {/* <p className='text-sm text-gray-500 text-center mt-3 flex justify-center items-center gap-1'>
            Não tem uma conta?
            <Link
              to='/register'
              className='text-light-yellow font-bold uppercase'
            >
              criar conta
            </Link>
          </p> */}
        </div>

        <div className='flex flex-col gap-4 w-[400px]'>
          <h1 className='font-[400] text-[3.7rem] text-dark-gray leading-[2.5rem]'>
            <span className='font-bold'>Bee</span>Co
          </h1>
          <p className='text-gray-500 text-[1.2rem] leading-[1.5rem]'>
            Faça parte da <span className='font-bold'>Bee</span>Co como
            prestador de serviços!
          </p>
        </div>
      </div>
    </div>
  )
}
