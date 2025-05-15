import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { FormEvent, useState } from "react";
import { userLoginType } from "@/types/userTypes";
import { loginUser } from "@/api/userApi";


export const Login = () => {
    const [formData, setFormData] = useState<userLoginType>({
        email: '',
        senha: '',
    });
    
    const [error, setError] = useState('')
    const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !formData.email || !formData.senha
    ) {
      setError('Preencha o campo vazio');
      return;
    }

    try {
      const response = await loginUser(formData);
      navigate('/dashboard-profissional')
      console.log('Usuário criado:', response);
    } catch (error) {
      console.error('Erro no cadastro:', error);
    }
  };
  return (
        <div className="flex flex-col justify-center items-center h-screen bg-[url('./assets/login.jpg')] bg-cover bg-center">
            <div className="flex gap-30 justify-center items-center w-[800px]">
                <div className="flex flex-col gap-4 w-[400px]">
                    <h1 className="font-[400] text-[3.7rem] text-dark-gray leading-[2.5rem]">
                        <span className="font-bold">Bee</span>Co
                    </h1>
                    <p className="text-gray-500 text-[1.2rem] leading-[1.5rem] flex flex-col">
                        Bem vindo,
                        <span>Faça login com a <span className="font-bold">Bee</span>Co!</span>
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        <form className='flex gap-3 flex-col' onSubmit={handleLogin}>
                            <Input label="Email" type="text" placeholder="Digite seu email"
                            onChange={(e) => handleChange("email", e.target.value)}
                            error={error} />
                            <Input label="Senha" type="password" placeholder="Digite sua senha" onChange={(e) => handleChange("senha", e.target.value)}
                            error={error}/>
                            <div className="flex justify-between items-center mt-6">
                                <Button 
                                    variant="primary" 
                                    size="md" 
                                    width="full" 
                                    className="uppercase"
                                >
                                    entrar
                                </Button>
                            </div>
                    </form>
                    
                    </div>
                    <p className="text-[0.7rem] text-gray-500 underline">Ao se inscrever no <span className="font-bold">Bee</span>Co, você concorda com nossa Política de Privacidade e Termos de Serviço</p>
                    
                    <p className="text-sm text-gray-500 text-center mt-3 flex justify-center items-center gap-1">Não tem uma conta?
                            <Link 
                                to="/select/register"
                                className="text-light-yellow font-bold uppercase"
                            >
                                criar conta
                            </Link>
                    </p>
                </div>
            </div>
        </div>
  )
}
