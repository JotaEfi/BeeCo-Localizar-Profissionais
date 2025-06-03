interface Profissao {
  id: number | string
  nome: string
}

interface SelectProfissaoProps {
  profissoes: Profissao[]
  value: string
  onChange: (value: string) => void
}

export const SelectProfissao = ({
  profissoes,
  value,
  onChange,
}: SelectProfissaoProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none text-gray-400'
    >
      <option value='' disabled>
        Qual a sua profissão?
      </option>
      {profissoes.map((profissao) => (
        <option key={profissao.id} value={profissao.id}>
          {profissao.nome}
        </option>
      ))}
    </select>
  )
}
