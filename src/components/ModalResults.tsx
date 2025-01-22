import { Voucher } from "@/models/Voucher";
import { FaCheckCircle } from "react-icons/fa";
interface ModalResultsProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  voucher: Voucher | null;
}

const ModalResults: React.FC<ModalResultsProps> = ({
  setOpenModal,
  voucher,
}) => {
  const formattedDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();

    return `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year}`;
  };
  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <div className="font-bold mb-7 text-xl ">
                    <FaCheckCircle className="text-green-300 text-4xl" />
                    RESULTADOS
                  </div>
                  <div className="mt-2 align-center">
                    <p className="my-2">
                      <strong>Usuario: </strong>
                      {voucher?.user_name}
                    </p>
                    <p className="my-2">
                      <strong>Número de Transacción: </strong>
                      {voucher?.transaction_number}
                    </p>
                    <p className="my-2">
                      <strong>Fecha del Voucher: </strong>
                      {formattedDate(voucher?.date_voucher)}
                      {/* {voucher?.date_voucher} */}
                    </p>
                    <p className="my-2">
                      <strong>Total: </strong>
                      {voucher?.total}
                    </p>
                    <p className="text-sm text-gray-500 mt-6">
                      Los datos fueron almacenados correctamente.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => {
                  setOpenModal(false);
                }}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalResults;
