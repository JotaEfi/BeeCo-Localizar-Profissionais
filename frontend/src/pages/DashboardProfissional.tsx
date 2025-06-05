import { SideMenu } from '@/components/SideMenu'
import { CardComment } from '@/components/CardComment'
import { comments } from '@/mock/Comments'
import { useEffect, useState } from 'react'
import { useUser } from '@/contexts/UserContext'

export const DashboardProfissional = () => {
  const { userData, refreshUserData } = useUser()
  const [reviewStartIdx, setReviewStartIdx] = useState(0)
  const reviewsPerPage = 3
  const totalReviews = comments.length

  useEffect(() => {
    refreshUserData()
  }, [])

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
    <>
      <SideMenu />
      <div className='bg-[#FFFAF3] min-h-screen flex flex-col gap-8 ml-24 p-8'>
        <div className='max-w-7xl mx-auto w-full flex flex-col gap-8'>
          {/* Header com fundo amarelo ou imagem */}
          <div
            className='rounded-xl h-40 flex items-end relative overflow-hidden bg-[#FFC75A]'
            style={{
              backgroundImage: userData?.img ? `url(${userData.img})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className='absolute left-8 bottom-[-15px] bg-white rounded-xl shadow-lg flex items-center p-4 gap-4 min-w-[350px]'>
              <img
                src={
                  userData?.foto_perfil
                }
                alt='Avatar'
                className='w-16 h-16 rounded-full border-4 border-white -mt-4'
              />
              <div>
                <div className='font-semibold text-lg'>
                  {userData?.nome || 'Carregando...'}
                </div>
                <div className='text-gray-500 text-sm'>
                  {userData?.email || 'Carregando...'}
                </div>
              </div>
            </div>
          </div>



          {/* Seção de Avaliações */}
          <div className='mt-8'>
            <div className='mb-4 flex items-center justify-between'>
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
            <div className='flex gap-6 flex-wrap'>
              {comments
                .slice(reviewStartIdx, reviewStartIdx + reviewsPerPage)
                .map((comment, idx) => (
                  <div
                    key={comment.name + idx}
                    className={
                      idx === 0 && reviewStartIdx === 0
                        ? 'border-2 border-[#FFC75A] bg-white rounded-[16px] shadow-sm'
                        : ''
                    }
                  >
                    <CardComment
                      name={comment.name}
                      profession={comment.profession}
                      rating={comment.rating}
                      comment={comment.comment}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
