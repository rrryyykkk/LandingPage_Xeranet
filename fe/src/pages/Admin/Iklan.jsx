import { useEffect, useState } from "react";
import IklanForm from "../../components/Admin/common/IklanForm"; // form create/update Hero
import { useDispatch, useSelector } from "react-redux";
import { fetchIklan, removeIklan } from "../../app/data/iklanSlice";

const Iklan = () => {
  const [openForm, setOpenForm] = useState(false);
  const [selectedIklan, setSelectedIklan] = useState(null);
  const [toast, setToast] = useState(null);
  const { iklan, isLoading } = useSelector((state) => state.iklan);

  console.log("iklan:", iklan);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIklan());
  }, [dispatch]);

  const handleEdit = (hero) => {
    setSelectedIklan(hero);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin hapus hero ini?");
    if (confirmDelete) {
      try {
        await dispatch(removeIklan(id));
        dispatch(fetchIklan());
        setToast({ type: "success", message: "Hero berhasil dihapus" });
      } catch (error) {
        setToast({ type: "error", message: "Gagal menghapus hero", error });
      }
    }
  };

  if (isLoading) return <div className="text-center py-6">Loading...</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Iklan Section</h2>
        <button
          onClick={() => {
            setSelectedIklan(null);
            setOpenForm(true);
          }}
          className="btn btn-primary"
        >
          Tambah Iklan
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
        {iklan?.map((iklan) => (
          <div key={iklan._id} className="card bg-base-100 shadow-md">
            <figure>
              <img
                src={iklan.iklanImage}
                alt={iklan.title}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{iklan.title}</h3>
              <p className="text-sm text-gray-500">
                Status: {iklan.isActive ? "Aktif" : "Tidak Aktif"}
              </p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => handleEdit(iklan)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => handleDelete(iklan._id)}
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <IklanForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        iklan={selectedIklan}
      />
    </div>
  );
};

export default Iklan;
