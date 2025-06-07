import { InputHTMLAttributes, forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  fullWidth?: boolean
  type?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      fullWidth = false,
      className = '',
      type = 'text',
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'

    return (
      <div className={`flex flex-col ${fullWidth ? 'w-full' : 'w-auto'}`}>
        {label && (
          <label className='text-[.9rem] font-[400] text-dark-gray mb-1'>
            {label}
          </label>
        )}
        <div className='relative'>
          <input
            ref={ref}
            className={`
              px-4 py-3
              border rounded-[8px]
              text-[16px] leading-[24px]
              ${error ? 'border-red-500' : 'border-gray-300'}
              focus:outline-none focus:ring-1 focus:ring-dark-gray
              placeholder:text-gray-400
              transition-all duration-200
              ${isPassword ? 'pr-10' : ''}
              ${className}
            `}
            {...props}
            type={isPassword ? (showPassword ? 'text' : 'password') : type}
          />
          {isPassword && (
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
        {error && (
          <span className='text-red-500 text-[12px] mt-1'>{error}</span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
