import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="flex flex-col items-center gap-[20px]">
      <label
        htmlFor="fileUpload"
        className="w-[400px] bg-[#FFC059] text-white px-6 py-2 rounded cursor-pointer font-semibold flex justify-center"
      >
        Adicionar arquivos
      </label>
      <div
        {...getRootProps()}
        className="bg-[#F4F4F5] w-[400px] h-[200px] rounded-lg border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-500 cursor-pointer"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Solte o arquivo aqui...</p>
        ) : (
          <p>Mova o arquivo aqui</p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
