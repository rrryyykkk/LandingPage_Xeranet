import { useEffect, useState } from "react";
import HeroForm from "../../components/Admin/common/heroForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchHeroes, removeHero } from "../../app/data/heroSlice";

const Hero = () => {
  const [openForm, setOpenForm] = useState(false);
  const [selectedHero, setSelectedHero] = useState(null);
  const [toast, setToast] = useState(null);
  const { heroes, isLoading, error } = useSelector((state) => state.hero);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHeroes());
  }, [dispatch]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleEdit = (hero) => {
    setSelectedHero(hero);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin hapus hero ini?");
    if (confirmDelete) {
      try {
        await dispatch(removeHero(id)).unwrap();
        dispatch(fetchHeroes());
        setToast({ type: "success", message: "Hero berhasil dihapus" });
      } catch (error) {
        setToast({ type: "error", message: "Gagal menghapus hero", error });
      }
    }
  };

  if (isLoading) return <div className="text-center py-6">Loading...</div>;

  return (
    <div className="p-4">
      {toast && (
        <div
          className={`alert mb-4 ${
            toast.type === "success" ? "alert-success" : "alert-error"
          }`}
        >
          {toast.message}
        </div>
      )}
      {error && <div className="text-red-500">Error: {error}</div>}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Hero Section</h2>
        <button
          onClick={() => {
            setSelectedHero(null);
            setOpenForm(true);
          }}
          className="btn btn-primary"
        >
          Tambah Hero
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {heroes?.map((hero) => (
          <div key={hero._id} className="card bg-base-100 shadow-md">
            <figure>
              <img
                src={hero.heroImage}
                alt={hero.title}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{hero.title}</h3>
              <p className="text-sm text-gray-500">
                Status: {hero.isActive ? "Aktif" : "Tidak Aktif"}
              </p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => handleEdit(hero)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => handleDelete(hero._id)}
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <HeroForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setSelectedHero(null);
        }}
        hero={selectedHero}
      />
    </div>
  );
};

export default Hero;
