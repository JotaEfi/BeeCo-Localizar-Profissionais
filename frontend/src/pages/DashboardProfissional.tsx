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
                  userData?.foto_perfil ||
                  'https://randomuser.me/api/portraits/men/32.jpg'
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

          
          {/*
          <div className='bg-white rounded-xl shadow-md mt-12 p-6'>
            <div className='font-semibold text-lg mb-1'>Compromissos</div>
            <div className='text-gray-400 text-xs mb-3'>
              Status dos seus contratos
            </div>
            <div className='overflow-x-auto rounded-xl'>
              <table className='min-w-full text-sm'>
                <thead>
                  <tr className='bg-[#FFF6E3] text-gray-500 text-xs'>
                    <th className='px-4 py-2 text-left font-medium'>NOME</th>
                    <th className='px-4 py-2 text-left font-medium'>
                      DATA/HORA
                    </th>
                    <th className='px-4 py-2 text-left font-medium'>CIDADE</th>
                    <th className='px-4 py-2 text-left font-medium'>VALOR</th>
                    <th className='px-4 py-2 text-left font-medium'>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='bg-white hover:bg-[#FFF6E3] transition-colors'>
                    <td className='px-4 py-2 text-gray-700'>
                      Joara Maria da Silva
                    </td>
                    <td className='px-4 py-2 text-gray-500'>
                      Abr 23, 2025 19:30
                    </td>
                    <td className='px-4 py-2 text-gray-700'>
                      <span>Juazeiro do Norte</span>
                    </td>
                    <td className='px-4 py-2 font-semibold text-gray-700'>
                      R$2300
                    </td>
                    <td className='px-4 py-2'>
                      <span className='bg-green-100 text-green-600 rounded-full px-3 py-1 text-xs font-medium'>
                        Completo
                      </span>
                    </td>
                  </tr>
                  <tr className='bg-[#FFF6E3] hover:bg-white transition-colors'>
                    <td className='px-4 py-2 text-gray-700'>
                      Antonio Martin Sousa
                    </td>
                    <td className='px-4 py-2 text-gray-500'>
                      Abr 23, 2025 12:40
                    </td>
                    <td className='px-4 py-2 text-gray-700'>Crato</td>
                    <td className='px-4 py-2 font-semibold text-gray-700'>
                      R$670
                    </td>
                    <td className='px-4 py-2'>
                      <span className='bg-green-100 text-green-600 rounded-full px-3 py-1 text-xs font-medium'>
                        Completo
                      </span>
                    </td>
                  </tr>
                  <tr className='bg-white hover:bg-[#FFF6E3] transition-colors'>
                    <td className='px-4 py-2 text-gray-700'>
                      Ana maria Santana
                    </td>
                    <td className='px-4 py-2 text-gray-500'>
                      Abr 18, 2025 11:30
                    </td>
                    <td className='px-4 py-2 text-gray-700'>
                      <span>Juazeiro do Norte</span>
                    </td>
                    <td className='px-4 py-2 font-semibold text-gray-700'>
                      R$234
                    </td>
                    <td className='px-4 py-2'>
                      <span className='bg-blue-100 text-blue-500 rounded-full px-3 py-1 text-xs font-medium'>
                        Incompleto
                      </span>
                    </td>
                  </tr>
                  <tr className='bg-[#FFF6E3] hover:bg-white transition-colors'>
                    <td className='px-4 py-2 text-gray-700'>
                      Maria Eduarda Moreira
                    </td>
                    <td className='px-4 py-2 text-gray-500'>
                      Abr 15, 2025 10:00
                    </td>
                    <td className='px-4 py-2 text-gray-700'>Barbalha</td>
                    <td className='px-4 py-2 font-semibold text-gray-700'>
                      R$5000
                    </td>
                    <td className='px-4 py-2'>
                      <span className='bg-blue-100 text-blue-600 rounded-full px-3 py-1 text-xs font-medium'>
                        Incompleto
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>*/}

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
