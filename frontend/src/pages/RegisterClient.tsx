import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Link, useNavigate } from 'react-router-dom'
import { createUser } from '@/api/userApi'
import { userType } from '@/types/userTypes'

import { FormEvent, useState } from 'react'

export const RegisterClient = () => {

  const [formData, setFormData] = useState<userType>({
    nome: '',
    email: '',
    senha: '',
    senha_confirmation: '',
    tipo: 'contratante',
    data_nascimento: '1990-01-01',
    sexo: 'M',
    foto_perfil: 'null',
    telefone: '12121221212',
    id_endereco: 1
  });
  const [error, setError] = useState('')
  const navigate = useNavigate();
  

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.nome ||
      !formData.senha ||
      !formData.senha_confirmation
    ) {
      setError('Preencha o campo vazio');
      return;
    }

    try {
      const response = await createUser(formData);
      navigate('/search')
      console.log('Usuário criado:', response);
    } catch (error) {
      console.error('Erro no cadastro:', error);
      setError('Erro ao registrar usuário');
    }
  };


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
                label="Nome"
                type="text"
                placeholder="Digite seu nome"
                onChange={(e) => handleChange("nome", e.target.value)}
                error={error}
              />
              <Input
                label="Email"
                type="text"
                placeholder="Digite seu email"
                onChange={(e) => handleChange("email", e.target.value)}
                error={error}
              />
              <Input
                label="Senha"
                type="password"
                placeholder="Digite sua senha"
                onChange={(e) => handleChange("senha", e.target.value)}
                error={error}
              />
              <Input
                label="Confirmar Senha"
                type="password"
                placeholder="Confirme sua senha"
                onChange={(e) => handleChange("senha_confirmation", e.target.value)}
                error={error}
              />

              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="primary"
                  size="md"
                  width="full"
                  className="uppercase"
                  type="submit"
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
