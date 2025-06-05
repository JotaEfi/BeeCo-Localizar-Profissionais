import { Star } from 'lucide-react'

interface CardCommentProps {
  img_perfil?: string
  name: string
  profession: string
  rating: number
  comment: string
}

export const CardComment = ({ 
  name, 
  profession, 
  rating, 
  comment,
  img_perfil,
}: CardCommentProps) => {
  return (
    <div className="rounded-[16px] border border-[#FFC75A] p-6 shadow-sm transition-all hover:shadow-lg min-w-[400px] max-w-[600px] w-full border-[#FFC75A] bg-white">
      <div className="flex items-center gap-4 ">
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden bg-gray-500">
            <div className="w-full h-full flex items-center justify-center text-white text-[1rem] font-bold">
              {img_perfil ? (
                <img src={img_perfil} alt={name} className="w-full h-full object-cover" />
              ) : (
                <span>{name.charAt(0).toUpperCase()}</span>
              )}
            </div>
        </div>
        
        <div className="flex flex-col mb-2">
          <h2 className="text-[1.1rem] font-semibold text-dark-gray">{name}</h2>
          <p className=" text-gray-500">{profession}</p>
          
          <div className="flex items-center gap-2 ">
            <span className="text-[1rem] font-medium text-gray-800">{rating.toFixed(1)}</span>
            <Star className="fill-yellow-400 text-yellow-400" size={20} />
          </div>
        </div>
      </div>
      
      <blockquote className="text-[1rem] text-gray-700 leading-relaxed">
        "{comment}"
      </blockquote>
    </div>
  )
}