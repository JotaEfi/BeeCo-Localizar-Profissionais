import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getUserData, updateUserData } from '@/api/userApi'
import { getUserType } from '@/utlis/auth'

interface UserData {
  img: any
  categoria: string
  titulo: string
  preco: any
  descricao: string
  nome: string
  email: string
  telefone: string
  localizacao: string
  sexo: string
  cpf: string
  data_nascimento: string
  foto_perfil: string
  senha: string
  senha_confirmation: string
  tipo: string
}

interface UserContextType {
  userData: UserData
  setUserData: (data: Partial<UserData>) => void
  updateUser: (data: Partial<UserData>) => Promise<void>
  loading: boolean
  refreshUserData: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserDataState] = useState<UserData>({
    nome: '',
    email: '',
    telefone: '',
    localizacao: '',
    sexo: '',
    cpf: '',
    data_nascimento: '',
    foto_perfil: '',
    senha: '',
    senha_confirmation: '',
    tipo: getUserType() || '',
  })
  const [loading, setLoading] = useState(true)

  const setUserData = (data: Partial<UserData>) => {
    setUserDataState(prev => ({ ...prev, ...data }))
  }

  const updateUser = async (data: Partial<UserData>) => {
    try {
      const updatedData = { ...userData, ...data }
      await updateUserData(updatedData)
      setUserData(data)
      await refreshUserData()
    } catch (error) {
      console.error('Erro ao atualizar o usuário:', error)
      throw error
    }
  }

  const refreshUserData = async () => {
    
    try {
      setLoading(true)
      const response = await getUserData()
      setUserDataState(response)
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshUserData()
  }, [])

  return (
    <UserContext.Provider value={{ userData, setUserData, updateUser, loading, refreshUserData }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser deve ser usado dentro de um UserProvider')
  }
  return context
}
