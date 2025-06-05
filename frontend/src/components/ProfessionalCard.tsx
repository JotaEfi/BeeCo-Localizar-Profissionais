interface ProfessionalCardProps {
  id?: number
  img?: string
  name: string
  rate?: number
  profession?: string
  valueService?: number | string
  titulo?: string
}

export const ProfessionalCard = ({
  img,
  name,
  titulo,
  profession = 'Profissional',
  valueService = 0,
}: ProfessionalCardProps) => {
  return (
    <div className='w-[300px] cursor-pointer text-dark-gray hover:shadow-lg transition-all duration-300 rounded-[10px] overflow-hidden bg-white'>
      <figure>
        <img
          src={img || 'https://via.placeholder.com/300x200.png?text=Sem+Imagem'}
          alt={name}
          className='w-full h-[200px] object-cover'
        />
      </figure>
      <div className='bg-gray-100/45 px-4 py-5 w-full flex flex-col items-start rounded-b-[10px] gap-2'>
        <div className="flex items-center gap-2 w-full">
          <div className='flex justify-between items-center w-full'>
            <h4 className='text-[1.3rem] font-semibold truncate max-w-[200px]'>
              {name}
            </h4>
          </div>
          <div className='flex gap-2'>
            <p className='text-[.8rem] border-[#fa9c058d] text-[#f9a826f0] border-[1px] font-semibold rounded-2xl px-2 py-1 w-auto bg-[#ffbf594a]'>
              {profession}
            </p>
          </div>
        </div>
        <div>
          <p>{titulo}</p>
        </div>
        {valueService !== 0 && (
          <div className='flex items-center justify-end w-full'>
            <p className='font-semibold text-[1.3rem]'>
              R${valueService}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
