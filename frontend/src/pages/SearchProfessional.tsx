import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { ProfessionalCard } from '@/components/ProfessionalCard'
import { SideMenu } from '@/components/SideMenu'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getPosts } from '@/api/postApi'
import { PostResponse } from '@/types/postTypes'

export const SearchProfessional = () => {
  const [post, setPosts] = useState<PostResponse[]>([])
  const [filteredPosts, setFilteredPosts] = useState<PostResponse[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)
      try {
        const response = await getPosts()
        console.log('Posts recebidos:', response)
        setPosts(response)
        setFilteredPosts(response)
      } catch (error) {
        console.error('Erro ao buscar posts:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const handleSearch = () => {
    setIsSearching(true);
    
    if (!searchTerm.trim()) {
      setFilteredPosts(post);
      setIsSearching(false);
      return;
    }
    
    const results = post.filter(item => {
      const searchLower = searchTerm.toLowerCase();
      
      return (
        (item.titulo && item.titulo.toLowerCase().includes(searchLower)) ||
        (item.categoria && item.categoria.toLowerCase().includes(searchLower)) ||
        (item.descricao && item.descricao.toLowerCase().includes(searchLower)) ||
        (item.user && item.user.nome && item.user.nome.toLowerCase().includes(searchLower))
      );
    });
    
    setFilteredPosts(results);
    setIsSearching(false);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 500); 

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <>
      <SideMenu />
      <section className='flex justify-center items-center px-30 w-full pt-10 pb-40 flex-col gap-5'>
        <div className='flex gap-2 w-[500px] relative'>
          <Input 
            placeholder='Ex.: Pedreiro, Encanador, Faxina...' 
            fullWidth={true} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          
          <Button 
            icon={<Search size={20} />} 
            size='sm'
            onClick={handleSearch}
            disabled={isSearching}
          >
            {isSearching ? 'Buscando...' : 'Pesquisar'}
          </Button>
        </div>

        <div className='w-[1580px] flex flex-col gap-3 pb-5'>
          <div className='flex justify-between items-center'>
            <h3 className='text-[1.3rem]'>
              {searchTerm ? `Resultados para "${searchTerm}"` : 'Todos os profissionais'}
              <span className="text-gray-500 ml-2">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'serviço encontrado' : 'serviços encontrados'}
              </span>
            </h3>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {['Pedreiro', 'Faxina', 'Encanador', 'Eletricista', 'Pintor', 'Jardinagem'].map((categoria) => (
              <button 
                key={categoria}
                onClick={() => setSearchTerm(categoria)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  searchTerm === categoria 
                    ? 'bg-yellow-400 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {categoria}
              </button>
            ))}
          </div>
        </div>

                <div className="grid grid-cols-5 gap-6.5 min-w-[1580px]">
                    {isLoading ? (
                      Array(10).fill(0).map((_, index) => (
                        <div key={index} className="bg-gray-100 rounded-lg h-[300px] animate-pulse">
                          <div className="h-[180px] bg-gray-200 rounded-t-lg"></div>
                          <div className="p-3">
                            <div className="w-3/4 h-5 bg-gray-200 rounded mb-2"></div>
                            <div className="w-1/2 h-4 bg-gray-200 rounded mb-2"></div>
                            <div className="w-1/3 h-4 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                      ))
                    ) : filteredPosts.length > 0 ? (
                      filteredPosts.map((item) => (
                        <Link to={`/professional/${item.id}`} key={item.id}> 
                          <ProfessionalCard
                            key={item.id}
                            img={item.imagem}  
                            name={item.user.nome}
                            profession={item.categoria}
                            valueService={item.preco}
                            titulo={item.titulo}
                          />
                        </Link>
                      ))
                    ) : (
                      <div className="col-span-5 flex flex-col items-center justify-center py-10">
                        <Search size={40} className="text-gray-300 mb-3" />
                        <p className="text-gray-500 text-lg">Nenhum resultado encontrado para "{searchTerm}"</p>
                        <p className="text-gray-400 mt-2">Tente buscar por outro termo ou categoria</p>
                      </div>
                    )}
                </div>
            </section>
        </>
    )
}
