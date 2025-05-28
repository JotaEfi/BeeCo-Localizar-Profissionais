import { useState } from 'react'
import { Star } from 'lucide-react'
import { SideMenu } from '@/components/SideMenu'
import { CardComment } from '@/components/CardComment'
import { comments } from '@/mock/Comments'
import Button from '@/components/Button'
import { Link } from 'react-router-dom'

export const ProfileProfessional = () => {
  const [rating, setRating] = useState(4)
  const [comment, setComment] = useState('')

  const handleRatingClick = (index: number) => {
    setRating(index + 1)
  }

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
        {/* Container com largura máxima controlada para todas as seções */}
        <div className='w-full max-w-[1200px] mx-auto flex flex-col gap-16'>
          {/* Seção de galeria */}
          <div className='w-full flex gap-2'>
            <div className='w-1/3'>
              <img
                src='https://images.unsplash.com/photo-1506744038136-46273834b3fb'
                alt='Obra 1'
                className='object-cover rounded-md w-full h-full'
              />
            </div>
            <div className='w-2/3 grid grid-cols-3 gap-2'>
              <div className='h-48'>
                <img
                  src='https://images.unsplash.com/photo-1464983953574-0892a716854b'
                  alt='Obra 2'
                  className='object-cover rounded-md h-full w-full'
                />
              </div>
              <div className='h-48'>
                <img
                  src='https://images.unsplash.com/photo-1515378791036-0648a3ef77b2'
                  alt='Obra 3'
                  className='object-cover rounded-md h-full w-full'
                />
              </div>
              <div className='h-48'>
                <img
                  src='https://images.unsplash.com/photo-1523413363574-c30aa1c2a516'
                  alt='Obra 4'
                  className='object-cover rounded-md h-full w-full'
                />
              </div>
              <div className='h-48'>
                <img
                  src='https://images.unsplash.com/photo-1501594907352-04cda38ebc29'
                  alt='Obra 5'
                  className='object-cover rounded-md h-full w-full'
                />
              </div>
              <div className='h-48'>
                <img
                  src='https://images.unsplash.com/photo-1465101046530-73398c7f28ca'
                  alt='Obra 6'
                  className='object-cover rounded-md h-full w-full'
                />
              </div>
              <div className='h-48'>
                <img
                  src='https://images.unsplash.com/photo-1519125323398-675f0ddb6308'
                  alt='Obra 7'
                  className='object-cover rounded-md h-full w-full'
                />
              </div>
            </div>
          </div>

          {/* Seção de informações do profissional */}
          <section className='w-full flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
              <img
                src='https://randomuser.me/api/portraits/men/32.jpg'
                alt='João Bosco'
                className='w-14 h-14 rounded-full object-cover border-2 border-white shadow'
              />
              <div>
                <h2 className='text-2xl font-bold text-dark-gray flex items-center gap-2'>
                  João Bosco
                </h2>
              </div>
            </div>
            <p className='text-gray-600 text-base max-w-2xl mt-2'>
              Sou pedreiro com experiência em construção civil, especializado em
              alvenaria, acabamento, revestimentos e reformas em geral. Trabalho
              com seriedade, qualidade e compromisso, garantindo serviços bem
              executados e dentro do prazo.
            </p>
            <div className='mt-2'>
              <span className='font-semibold text-dark-gray'>
                Serviços oferecidos:
              </span>
              <ul className='text-gray-700 mt-2 space-y-1 text-base'>
                <li>✔️ Construção de paredes e muros</li>
                <li>✔️ Assentamento de pisos e revestimentos</li>
                <li>✔️ Reboço e acabamento fino</li>
                <li>✔️ Pequenas reformas e reparos</li>
                <li>✔️ Manutenção e melhorias residenciais</li>
              </ul>
            </div>
            <p className='text-gray-500 mt-2'>
              Entre em contato para um orçamento sem compromisso!
            </p>
            <div className='w-[300px]'>
              <Button as={Link} to='/chat'>
                Entrar em contato
              </Button>
            </div>
          </section>

          {/* Seção de adicionar comentário */}
          <section className='w-full'>
            <h2 className='text-xl font-semibold text-dark-gray border-b border-gray-200 pb-4'>
              Comentarios
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
                    placeholder=''
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

          {/* Seção de avaliações */}
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
                  aria-label='Voltar avaliações'
                >
                  &#60;
                </button>
                <button
                  onClick={handleNext}
                  className='w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl transition-colors bg-[#FFC75A] hover:bg-[#e6b54e]'
                  aria-label='Avançar avaliações'
                >
                  &#62;
                </button>
              </div>
            </div>

            <div className='grid grid-cols-3 gap-6'>
              {comments
                .slice(reviewStartIdx, reviewStartIdx + reviewsPerPage)
                .map((comment) => (
                  <div>
                    <CardComment
                      name={comment.name}
                      profession={comment.profession}
                      rating={comment.rating}
                      comment={comment.comment}
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
