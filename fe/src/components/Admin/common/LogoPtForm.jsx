import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLogoPT, updateLogoPT } from "../../../services/api";

const LogoPTForm = ({ open, onClose, logo }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: logo ? updateLogoPT : createLogoPT,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logoPT"] });
      onClose();
      reset();
    },
  });

  useEffect(() => {
    if (logo) {
      reset(logo);
    } else {
      reset({ namaPT: "", logoImage: "" });
    }
  }, [logo, reset]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("namaPT", data.namaPT);
    if (data.logoImage[0]) {
      formData.append("logoImage", data.logoImage[0]);
    }
    if (logo) formData.append("_id", logo._id);

    mutation.mutate(formData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white dark:bg-base-200 p-6 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">
          {logo ? "Edit Logo PT" : "Tambah Logo PT"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">Nama PT</label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...register("namaPT", { required: true })}
            />
          </div>

          <div>
            <label className="label">Logo</label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              {...register("logoImage")}
            />
            {logo?.logoImage && (
              <img
                src={logo.logoImage}
                alt="Preview"
                className="mt-2 h-24 object-contain"
              />
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogoPTForm;
