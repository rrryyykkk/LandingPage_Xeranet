import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createHero, updateHero } from "../../../services/api";

const HeroForm = ({ open, onClose, hero }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,

    formState: { isSubmitting },
  } = useForm();

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createHero,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["heroes"] });
      onClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, formData }) => updateHero(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["heroes"] });
      onClose();
    },
  });

  useEffect(() => {
    if (hero) {
      setValue("title", hero.title);
      setValue("isActive", hero.isActive);
      setValue("heroImage", hero.heroImage || "");
    } else {
      reset();
    }
  }, [hero, setValue, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("isActive", data.isActive);
    formData.append("createdBy", "admin");

    if (data.heroImageFile?.[0]) {
      formData.append("file", data.heroImageFile[0]);
    } else if (data.heroImage) {
      formData.append("heroImage", data.heroImage);
    }

    if (hero) {
      await updateMutation.mutateAsync({ id: hero._id, formData });
    } else {
      await createMutation.mutateAsync(formData);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white dark:bg-base-100 p-6 rounded-xl w-full max-w-lg shadow-lg relative">
        <h3 className="text-xl font-bold mb-4">
          {hero ? "Edit Hero" : "Tambah Hero"}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">Judul</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="input input-bordered w-full"
              placeholder="Judul hero"
            />
          </div>

          <div>
            <label className="label">Upload Gambar Hero</label>
            <input
              type="file"
              accept="image/*"
              {...register("heroImageFile")}
              className="file-input file-input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Atau Gunakan URL Gambar</label>
            <input
              type="text"
              {...register("heroImage")}
              className="input input-bordered w-full"
              placeholder="https://contoh.com/gambar.jpg"
            />
          </div>

          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-2">
              <input
                type="checkbox"
                {...register("isActive")}
                className="checkbox checkbox-primary"
              />
              <span className="label-text">Aktifkan Hero Ini</span>
            </label>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
              disabled={isSubmitting}
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? hero
                  ? "Menyimpan..."
                  : "Menambahkan..."
                : hero
                ? "Simpan Perubahan"
                : "Tambah Hero"}
            </button>
          </div>
        </form>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 btn btn-sm btn-circle btn-ghost"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default HeroForm;
