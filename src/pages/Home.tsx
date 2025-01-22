import { GoAlertFill } from "react-icons/go";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import ModalResults from "@/components/ModalResults";
import { Voucher } from "@/models/Voucher";

export const Home: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showModalResult, setShowModalResult] = useState(false);
  const [resultsVoucher, setResultsVoucher] = useState<Voucher | null>(null);

  const URL_API_BACK = "http://localhost:3000/groq/procesar-voucher";

  // Metodo para validar el archivo seleccionado
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

      if (!allowedTypes.includes(selectedFile.type)) {
        alert("Solo se permiten archivos de imagen (JPEG, PNG, JPG).");
        return;
      }

      setFile(selectedFile);
    }
  };

  // Metodo para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("voucher-img", file);

    try {
      const response = await fetch(URL_API_BACK, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      //Manejo de la respuesta del servidor
      if (result.success) {
        console.log("Datos del voucher:", result.voucher);
        setResultsVoucher(result.voucher);
        setShowModalResult(true);
        setShowErrorAlert(false);
      } else {
        console.error("Detalles del error:", result.error);
        setShowModalResult(false);
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);

      setShowModalResult(false);
      setShowErrorAlert(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="m-10 flex flex-col	justify-center items-center text-center">
      <div className="my-10">
        <h3 className="font-bold text-4xl my-6">ESCANEA TUS VOUCHER CON IA</h3>
        <p className="text-2xl my-6">
          Sube tu imagen y deja que la IA obtenga el texto y lo almacene por tí.
        </p>
      </div>
      {showModalResult && (
        <ModalResults
          setOpenModal={setShowModalResult}
          voucher={resultsVoucher}
        ></ModalResults>
      )}
      {showErrorAlert && (
        <div>
          <Alert
            variant="destructive"
            className="rounded text-red-600 bg-red-50"
          >
            <div className="flex py-1 justify-center">
              <GoAlertFill className="mx-3" />
              <AlertTitle> Error: Intente Nuevamente</AlertTitle>
              <br />
            </div>
            <AlertDescription>
              Nuestro servidor presentó un incoveniente al analizar.
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div className="my-10 w-3/6">
        <p className="m-2 text-gray-600	">
          <i>Formato de imágenes: JPG, JPEG, PNG.</i>
        </p>
        <form onSubmit={handleSubmit}>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isSubmitting}
            style={{
              height: "100px",
              border: "3px dashed",
              cursor: "pointer",
            }}
            className="bg-blue-100 p-10"
          />
          <Button
            className="bg-black text-white rounded m-6 text-xl p-6 hover:bg-neutral-600"
            type="submit"
            disabled={isSubmitting || !file}
          >
            {isSubmitting ? "Subiendo..." : "Escanear"}
          </Button>
        </form>
      </div>
    </div>
  );
};
