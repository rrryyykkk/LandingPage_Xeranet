import { useEffect, useState } from "react";
import LogoPTForm from "../../components/Admin/common/LogoPtForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogoPTs, removeLogoPT } from "../../app/data/logoPTSlice";

const LogoPT = () => {
  const [openForm, setOpenForm] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [toast, setToast] = useState(null);
  const { logoPTs, isLoading } = useSelector((state) => state.logoPTs);

  console.log("logoPTs:", logoPTs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLogoPTs());
  }, [dispatch]);

  const handleEdit = (logo) => {
    setSelectedLogo(logo);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin hapus logo ini?");
    if (confirmDelete) {
      try {
        await dispatch(removeLogoPT(id));
        dispatch(fetchLogoPTs());
        setToast({ type: "success", message: "Logo berhasil dihapus" });
      } catch (error) {
        setToast({ type: "error", message: "Gagal menghapus logo", error });
      }
    }
  };

  if (isLoading) return <div className="text-center py-6">Loading...</div>;

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
      {toast && (
        <div
          className={`toast ${
            toast.type === "success" ? "toast-success" : "toast-error"
          }`}
        >
          <div className="toast-body">{toast.message}</div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {logoPTs?.map((logo) => (
          <div key={logo._id} className="card bg-base-100 shadow-md">
            <figure>
              <img
                src={logo.logoPTImage}
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
