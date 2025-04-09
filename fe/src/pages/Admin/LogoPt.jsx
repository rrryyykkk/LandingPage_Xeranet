import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLogoPTs, deleteLogoPT } from "../../services/api";
import LogoPTForm from "../../components/Admin/common/LogoPtForm";

const LogoPT = () => {
  const [openForm, setOpenForm] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ["logoPT"],
    queryFn: getLogoPTs,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLogoPT,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logoPT"] });
    },
  });

  const handleEdit = (logo) => {
    setSelectedLogo(logo);
    setOpenForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("Yakin hapus logo ini?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isPending) return <div className="text-center py-6">Loading...</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Logo PT</h2>
        <button
          onClick={() => {
            setSelectedLogo(null);
            setOpenForm(true);
          }}
          className="btn btn-primary"
        >
          Tambah Logo
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.logoPTs?.map((logo) => (
          <div key={logo._id} className="card bg-base-100 shadow-md">
            <figure>
              <img
                src={logo.logoImage}
                alt={logo.namaPT}
                className="w-full h-32 object-contain p-4"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{logo.namaPT}</h3>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => handleEdit(logo)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => handleDelete(logo._id)}
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <LogoPTForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        logo={selectedLogo}
      />
    </div>
  );
};

export default LogoPT;
