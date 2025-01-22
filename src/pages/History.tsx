import { DataTable } from "@/components/voucherTable/data-table";
import { columns } from "@/components/voucherTable/columns";
import { supabase } from "@/hooks/useSupabase";
import { Voucher } from "@/models/Voucher";
import { useEffect, useState } from "react";

export const History = () => {
  const [dataVoucher, setDataVoucher] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: data, error } = await supabase.from("voucher").select("*");

      if (error) console.log("ERROR fetching data:", error);
      else setDataVoucher(data);

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="m-20 mx-40">
        <h2 className="my-10 text-center font-bold text-3xl">
          Historial de Consultas Realizadas
        </h2>
        <DataTable columns={columns} data={dataVoucher} />
      </div>
    </>
  );
};
