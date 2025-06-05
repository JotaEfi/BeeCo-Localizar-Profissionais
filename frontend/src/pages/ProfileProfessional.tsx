import { useEffect, useState } from 'react'
import { Star, Heart } from 'lucide-react'
import { SideMenu } from '@/components/SideMenu'
import { CardComment } from '@/components/CardComment'
import { comments } from '@/mock/Comments'
import Button from '@/components/Button'
import { useParams } from 'react-router-dom'
import { getPostsById } from '@/api/postApi'
import { createRate, getRates } from '@/api/rateApi'
import { rateTypes, ReviewTypes } from '@/types/rateTypes'
import { useUser } from '@/contexts/UserContext'
import toast, { Toaster } from 'react-hot-toast'
import { getCookie } from '@/utlis/cookies'

export const ProfileProfessional = () => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [post, setPost] = useState<any>(null)
  const [isFavorited, setIsFavorited] = useState(false)
  const { id } = useParams<{ id: string }>()
  const [submitting, setSubmitting] = useState(false)
  const { userData } = useUser()
  const userId = getCookie('id')
  const [review, setReview] = useState<ReviewTypes[]>([])
  const userLoggedIn = useUser()
  
    useEffect(() => {
      const fetchReviews = async () => {
        try {
          
          const response = await getRates()
          console.log('Avaliações recebidas:', response)
          setReview(response)
        } catch (error) {
          console.error('Erro ao buscar avaliações:', error)
        }
      }
      fetchReviews() 
    }, [])

  const handleRatingClick = (index: number) => {
    setRating(index + 1)
  }

  const fetchPostById = async (id?: string) => {
    try {
      const { data } = await getPostsById(id)
      console.log('Post encontrado:', data)
      setPost(data)
      setPost(data)
    } catch (error) {
      console.error('Erro ao buscar post:', error)
    }
  }

  useEffect(() => {
    fetchPostById(id)
    console.log('ID do profissional:', id)
  }, [id])

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
  }

  const handleSubmit = async () => {
    if (!rating) {
      toast.error('Por favor, dê uma nota antes de enviar!')
      return
    }
    
    if (!comment.trim()) {
      toast.error('Por favor, escreva um comentário antes de enviar!')
      return
    }
    
    
    
    if (!post?.user?.id) {
      toast.error('Não foi possível identificar o profissional!')
      return
    }
    
    try {
      setSubmitting(true)
      
      if (!userId) {
        toast.error('Usuário não identificado!');
        return;
      }

      const rateData: rateTypes = {
        prestador_id: post.user.id,
        contratante_id: Number(userId),
        nota: rating,
        comentario: comment,
        tipo: 'prestador'
      }
      
      await createRate(rateData)
      
      toast.success('Avaliação enviada com sucesso!')
      setComment('')
      setRating(0)
      
      // Recarregar comentários
      fetchPostById(id)
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error)
      toast.error('Erro ao enviar avaliação. Tente novamente!')
    } finally {
      setSubmitting(false)
    }
  }

  const handleFavorite = () => {
    setIsFavorited((prev) => !prev)
    console.log('Favorito:', !isFavorited)
  }

  const [reviewStartIdx, setReviewStartIdx] = useState(0)
  const reviewsPerPage = 3
  const totalReviews = comments.length

  const handlePrev = () => {
    setReviewStartIdx((prev) =>
      prev - reviewsPerPage < 0 ? 0 : prev - reviewsPerPage
    )
  }


  const handleNext = () => {
    setReviewStartIdx((prev) =>
      prev + reviewsPerPage >= totalReviews ? prev : prev + reviewsPerPage
    )
  }

  return (
    <div className='flex min-h-screen bg-[#fcf8f3]'>
      <SideMenu />
      <main className='flex-1 flex flex-col items-center justify-start p-8'>
        <div className='w-full max-w-[1200px] mx-auto flex flex-col gap-16'>
          {/* Toaster para notificações */}
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
          
          {/* Galeria */}
          <div className='w-full flex gap-2'>
            <div className='w-1/3'>
              <div className='flex items-center justify-center bg-gray-200 rounded-md w-full h-full text-gray-500 text-center p-4'>
                Obra 1
              </div>
            </div>
            <div className='w-2/3 grid grid-cols-3 gap-2'>
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className='h-48 flex items-center justify-center bg-gray-200 rounded-md text-gray-500 text-center p-4'
                >
                  Obra {i + 2}
                </div>
              ))}
            </div>
          </div>

          {/* Informações do profissional */}
          <section className='w-full flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
              <img
                src={post?.user?.foto_perfil || '/default-avatar.png'}
                alt={post?.user?.nome || 'Profissional'}
                className='w-14 h-14 rounded-full object-cover border-2 border-white shadow'
              />
              <div className='flex items-center gap-25'>
                  <h2 className='text-2xl font-bold text-dark-gray'>
                    {post?.user?.nome || 'Nome do profissional'}
                  </h2>
                  <button onClick={handleFavorite}>
                    <Heart
                      size={24}
                      className={`transition-colors ${
                        isFavorited
                          ? 'fill-[#FFC75A] text-yellow-500'
                          : 'text-gray-400 hover:text-[#ffc85adf]'
                      }`}
                    />
                  </button>
                </div>
              </div>



            <p className='text-gray-600 text-base max-w-2xl mt-2'>
              {post?.descricao || 'Descrição não disponível no momento.'}
            </p>


            <div className='mt-2'>
              <span className='font-semibold text-dark-gray'>
                Serviço oferecido:
              </span>
              <ul className='text-gray-700 mt-2 space-y-1 text-base'>
                <li>{post?.titulo || 'Título do serviço'}</li>
              </ul>
              {post?.preco && (
                <p className='mt-2 text-base font-medium'>
                  Preço: R$ {post.preco}
                </p>
              )}
            </div>


            <div className='w-[300px]'>
              {post?.user?.telefone && (
                <a
                  href={`https://wa.me/55${post.user.telefone.replace(
                    /\D/g,
                    ''
                  )}?text=${encodeURIComponent(
                    `Olá, vi seu perfil no site da Beeco e gostaria de saber mais sobre o serviço "${post?.titulo}". Podemos conversar para um possível contrato?`
                  )}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Button>Entrar em contato</Button>
                </a>
              )}
            </div>
          </section>

          {/* Comentários */}
          <section className='w-full'>
            <h2 className='text-xl font-semibold text-dark-gray border-b border-gray-200 pb-4'>
              Comentários
            </h2>

            <div className='pt-6'>
              <div className='flex'>
                <div className='mr-4'>
                  <div className=' object-cover rounded-full bg-yellow-400'>
                    <img className='object-cover w-12 h-12 rounded-full' src={userLoggedIn.userData.foto_perfil} alt="" />
                  </div>
                </div>

                <div className='flex-1'>
                  {userData ? (
                    <textarea
                      className='w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none'
                      rows={3}
                      value={comment}
                      onChange={handleCommentChange}
                      placeholder="Compartilhe sua experiência com este profissional..."
                    />
                  ) : (
                    <div className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                      <p className="text-gray-500">Você precisa estar logado para deixar um comentário</p>
                      <a href="/login" className="text-yellow-500 font-medium hover:underline mt-1 block">Faça login para comentar</a>
                    </div>
                  )}

                  {userData && (
                    <div className='flex items-center justify-between mt-3'>
                      <div className='flex'>
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            size={24}
                            className={`cursor-pointer ${
                              index < rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                            onClick={() => handleRatingClick(index)}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-500">
                          {rating > 0 ? `${rating} ${rating === 1 ? 'estrela' : 'estrelas'}` : 'Selecione uma nota'}
                        </span>
                      </div>

                      <Button 
                        onClick={handleSubmit} 
                        disabled={submitting || !rating || !comment.trim()}
                      >
                        {submitting ? 'Enviando...' : 'Comentar'}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Avaliações */}
          <section className='w-full'>
            <div className='mb-6 flex items-center justify-between'>
              <div>
                <h2 className='text-2xl font-semibold text-gray-700'>
                  Avaliações
                </h2>
                <p className='text-gray-400 text-base mt-1'>
                  Confira o que as pessoas estão comentando sobre você!
                </p>
              </div>
              <div className='flex gap-2'>
                <button
                  onClick={handlePrev}
                  className='w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl transition-colors bg-[#FFC75A] hover:bg-[#e6b54e]'
                >
                  &#60;
                </button>
                <button
                  onClick={handleNext}
                  className='w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl transition-colors bg-[#FFC75A] hover:bg-[#e6b54e]'
                >
                  &#62;
                </button>
              </div>
            </div>

            <div className='grid grid-cols-3 gap-6'>
              {review
                .slice(reviewStartIdx, reviewStartIdx + reviewsPerPage)
                .map((review) => (
                  <div
                    key={review.id }
                  >
                    <CardComment
                      img_perfil={review.contratante.foto_perfil }
                      name={review.contratante.nome? review.contratante.nome : 'Anônimo'}
                      profession={review.contratante.tipo || 'Profissional'}
                      rating={review.nota}
                      comment={review.nota === 0 ? 'Nenhum comentário' : review.comentario || 'Sem comentário'}
                    />
                  </div>
                ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
