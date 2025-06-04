import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import { SideMenu } from '@/components/SideMenu'
import { CardComment } from '@/components/CardComment'
import { comments } from '@/mock/Comments'
import Button from '@/components/Button'
import { Link, useParams } from 'react-router-dom'
import { getPostsById } from '@/api/postApi'

export const ProfileProfessional = () => {
  const [rating, setRating] = useState(4)
  const [comment, setComment] = useState('')
  const [post, setPost] = useState<any>(null)
  const { id } = useParams<{ id: string }>()

  const handleRatingClick = (index: number) => {
    setRating(index + 1)
  }

  const fetchPostById = async (id?: string) => {
    try {
      const { data } = await getPostsById(id)
      console.log('Post encontrado:', data)
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

  const handleSubmit = () => {
    console.log('Comentário enviado:', { comment, rating })
    setComment('')
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
          {/* Galeria */}
          <div className='w-full flex gap-2'>
            <div className='w-1/3'>
              <img
                src='https://images.unsplash.com/photo-1506744038136-46273834b3fb'
                alt='Obra 1'
                className='object-cover rounded-md w-full h-full'
              />
            </div>
            <div className='w-2/3 grid grid-cols-3 gap-2'>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className='h-48'>
                  <img
                    src={`https://source.unsplash.com/random/300x200?sig=${i}`}
                    alt={`Obra ${i + 2}`}
                    className='object-cover rounded-md h-full w-full'
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Informações do profissional */}
          <section className='w-full flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
              <img
                src='https://randomuser.me/api/portraits/men/32.jpg'
                alt={post?.user?.nome || 'Profissional'}
                className='w-14 h-14 rounded-full object-cover border-2 border-white shadow'
              />
              <div>
                <h2 className='text-2xl font-bold text-dark-gray flex items-center gap-2'>
                  {post?.user?.nome || 'Nome do profissional'}
                </h2>
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
              <Button as={Link} to='/chat'>
                Entrar em contato
              </Button>
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
                  <div className='w-12 h-12 rounded-full bg-yellow-400'></div>
                </div>

                <div className='flex-1'>
                  <textarea
                    className='w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none'
                    rows={3}
                    value={comment}
                    onChange={handleCommentChange}
                  />

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
                    </div>

                    <Button onClick={handleSubmit}>Comentar</Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Avaliações */}
          <section className='w-full'>
            <div className='mb-6 flex items-center justify-between'>
              <div>
                <h2 className='text-2xl font-semibold text-gray-700'>
                  Suas avaliações
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
              {comments
                .slice(reviewStartIdx, reviewStartIdx + reviewsPerPage)
                .map((comment) => (
                  <CardComment
                    key={comment.name}
                    name={comment.name}
                    profession={comment.profession}
                    rating={comment.rating}
                    comment={comment.comment}
                  />
                ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
