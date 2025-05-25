import Button from "@/components/Button";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { SideMenu } from "@/components/SideMenu";
import { Textarea } from "@/components/TextArea";
import { getUserType } from "@/utlis/auth";
import { useState } from "react";



export const Profile = () => {

    const [formData, setFormData] = useState({
        name: 'Pedro Alexandre',
        email: 'pedro@email.com',
        phone: '(55) 99999-1313',
        location: 'Juazeiro do Norte',
        gender: 'masculino',
        cpf: '123-123-123-12',
        birth: '12/12/12'
      });

    const userType = getUserType();

      const menuContent = userType === 'prestador' 
        ? ['Informações pessoais', 'Serviços']
        : ['Informações pessoais'];
      const [activeMenu, setActiveMenu] = useState('Informações pessoais')
      const [titleContent, setTitleContent] = useState('Informações pessoais')

      
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        
        if (type === 'radio') {
          setFormData({
            ...formData,
            gender: name
          });
        } else {
          setFormData({
            ...formData,
            [name]: value
          });
        }
      };

      const handleMenuClick = (menu: string) => {
            setActiveMenu(menu)
            setTitleContent(menu)
      }

      const renderMenuContent = () => {
        switch(activeMenu) {
            case 'Informações pessoais':
                return (
                    <>   
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                    placeholder="Digite seu nome"
                                    label="Nome"
                                    value={formData.name} 
                                    />

                                    <Input
                                    placeholder="Digite email"
                                    label="E-mail"
                                    value={formData.email} 
                                    />

                                    <Input
                                    placeholder="Digite seu número"
                                    label="Telefone"
                                    value={formData.phone} 
                                    />

                                    <Input
                                    placeholder="Adicione sua localização"
                                    label="Localização"
                                    value={formData.location} 
                                    />

                                    <Input
                                    placeholder="***.***.***-**"
                                    label="CPF"
                                    value={formData.cpf} 
                                    />

                                    <Input
                                    placeholder="00/00/0000"
                                    label="Data de nascimento"
                                    value={formData.birth} 
                                    />
                    
                        </div>
                            
                        <div className="mt-6">
                                    <label className="block  mb-3">Sexo</label>
                                    <div className="flex space-x-6">
                                    <div className="flex items-center">
                                        <input
                                        type="radio"
                                        id="male"
                                        name="masculino"
                                        checked={formData.gender === 'masculino'}
                                        onChange={handleChange}
                                        className="mr-2 h-4 w-4 accent-yellow-400"
                                        />
                                        <label htmlFor="male" className="">masculino</label>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="female"
                                            name="feminino"
                                            checked={formData.gender === 'feminino'}
                                            onChange={handleChange}
                                            className="mr-2 h-4 w-4"
                                        />
                                        <label htmlFor="female" className="">feminino</label>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <input
                                        type="radio"
                                        id="other"
                                        name="outros"
                                        checked={formData.gender === 'outros'}
                                        onChange={handleChange}
                                        className="mr-2 h-4 w-4"
                                        />
                                        <label htmlFor="other" className="">outros</label>
                                    </div>
                                    </div>
                        </div>
                    </>
                        
                )
            case 'Serviços':
                return (
                    <div className="w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Textarea 
                                label="Descrição do serviço"
                                placeholder="Detalhe como é seu serviço..."
                                className="min-h-[100px]"
                            />
                            <Textarea 
                                label="Descrição de experiência"
                                placeholder="Detalhe sobre sua experiência"
                                className="min-h-[100px]"
                            />
                            <Select label="Tipo do serviço">
                                <option value="pedreiro">Pedreiro</option>
                                <option value="faxineiro">Faxineiro</option>
                            </Select>
                            <Input 
                                type="number"
                                placeholder="R$0.00"
                                label="Preço"
                            />
                            <Select label="Cobrado por">
                                <option value="hora">Hora</option>
                                <option value='diária'>Diária</option>
                            </Select>
                          
                        </div>

                        {/* <div className="flex w-full mt-8">
                            <Button
                            size="sm"
                            width="full"
                            >
                                Salvar
                            </Button>
                        </div> */}

                    </div>
                )
            default:
                return null
        }
      }

    return (
        <>
            <SideMenu />
            <div className="flex h-screen w-screenitems-center justify-center gap-10 text-dark-gray p-12">
      {/* Side Menu */}
                <div className="w-70 flex flex-col shadow-2xl rounded-[8px]">
                    <div className="p-6 flex flex-col items-center">
                    <div className="h-16 w-16 rounded-full bg-yellow-300 mb-6"></div>

                    <span className="text-[1.2rem]">Pedro Alexandre</span>
                    <span className="text-gray-400">Agricultor</span>

                    <div className="w-full border-t border-gray-200 my-5"></div>

                    <ul className="w-full text-center py-4 hover:gray-200 transition gap-3 flex flex-col ">
                        {menuContent.map((menu, index) => (
                            <li 
                                key={index}
                                className={`p-2 hover:shadow-md transition-all ease-in-out rounded-[8px] cursor-pointer  ${menu === activeMenu ?  'border-2 text-light-yellow' : ''}`}
                                onClick={() => handleMenuClick(menu)}
                            >
                                {menu}
                            </li>
                        ))}
                    </ul>
                    
                </div>
            </div>
      
            {/* Main Content */}
            <div className="flex p-8 shadow-2xl gap-20 rounded-[8px]">
                <div className="max-w-4xl">
                    <div className="flex justify-between items-center mb-8">
                            <h2 className=" text-xl">{titleContent}</h2>
                                <Button
                                    variant="outline"
                                    size="sm"
                                >
                                    Editar
                                </Button>
                            </div>
                        {renderMenuContent()}
                    </div>
            </div>
                
        </div>
        </>
    )
}
