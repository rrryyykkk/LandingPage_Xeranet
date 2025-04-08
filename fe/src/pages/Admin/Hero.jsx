import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getHeroes, deleteHero } from "../../services/api"; // sesuaikan path
import HeroForm from "../../components/Admin/common/heroForm"; // form create/update Hero

const Hero = () => {
  const [openForm, setOpenForm] = useState(false);
  const [selectedHero, setSelectedHero] = useState(null);
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ["heroes"],
    queryFn: getHeroes,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteHero,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["heroes"] });
    },
  });

  const handleEdit = (hero) => {
    setSelectedHero(hero);
    setOpenForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("Yakin hapus hero ini?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isPending) return <div className="text-center py-6">Loading...</div>;

  return (
    <div className="p-4">
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
        {data?.heroes?.map((hero) => (
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
        onClose={() => setOpenForm(false)}
        hero={selectedHero}
      />
    </div>
  );
};

export default Hero;
