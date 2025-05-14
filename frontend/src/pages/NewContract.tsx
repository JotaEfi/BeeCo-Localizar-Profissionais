import { SideMenu } from "@/components/SideMenu";
import DatePickerComponent from "@/components/DatePicker";

function NewContract() {
  return (
    <div>
      <SideMenu />
      <div className="flex flex-col max-w-4xl mx-auto pt-[80px] pb-[80px] gap-[20px]">
        <h1 className="w-[100px] text-3xl text-dark-gray font-bold">
          NOVO CONTRATO
        </h1>
        <div className="flex flex-col">
          <label className="text-dark-gray text-sm ">Data</label>
          <DatePickerComponent />
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-[20px]">
            <div className="w-[450px] h-[30px] bg-[#FFE5B9] rounded pl-[10px]"></div>
            <div className="flex gap-[10px]">
              <input
                type="text"
                placeholder="Nome Cliente"
                className="w-[220px] h-[30px] border border-b-gray-300 rounded pl-[10px]"
              />
              <input
                type="text"
                placeholder="Cidade"
                className="w-[220px] h-[30px] border border-b-gray-300 rounded pl-[10px]"
              />
            </div>
            <div className="flex gap-[10px]">
              <input
                type="text"
                placeholder="Email"
                className="w-[220px] h-[30px] border border-b-gray-300 rounded pl-[10px]"
              />
              <div className="w-[220px] h-[30px] border border-b-gray-300 rounded pl-[10px] flex items-center">
                <DatePickerComponent />
              </div>
            </div>
            <textarea
              placeholder="Descrição do serviço"
              className="w-[450px] h-[120px] border border-gray-300 rounded pl-2 pt-2 resize-none"
            />
          </div>
          <div className="w-px h-[270px] bg-gray-300 mx-4" />
          <div className="flex flex-col gap-[20px] items-end">
            <div>
              <p className="text-[10px]">Valor do serviço</p>
              <input
                type="text"
                placeholder="R$ 0,00"
                className="w-[100px] h-[20px] border border-b-gray-300 rounded pl-[10px] text-[10px]"
              />
            </div>
            <button className="w-[300px] h-[35px] bg-[#FFC059] rounded text-white font-medium text-[15px] flex justify-center items-center hover:bg-[#FFAD28] transition-colors duration-300">
              Finalizar
            </button>
            <button className="w-[300px] h-[35px] border border-[#F95F5F] rounded text-[#F95F5F] font-medium text-[15px] flex justify-center items-center houver:bg-[#F95F5F] hover:bg-[#F95F5F] hover:text-white transition-colors duration-300">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewContract;
