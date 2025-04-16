import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addLogoPT, editLogoPT } from "../../../app/data/logoPTSlice";

const LogoPTForm = ({ open, onClose, logo }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    if (logo) {
      reset({
        namaPT: logo.title || "", // sesuai field backend
        logoImage: null,
      });
    } else {
      reset({ namaPT: "", logoImage: null });
    }
  }, [logo, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.namaPT);
    if (data.logoImage && data.logoImage[0]) {
      formData.append("logoPTImage", data.logoImage[0]);
    }

    try {
      if (logo) {
        await dispatch(editLogoPT({ id: logo._id, formData })).unwrap();
      } else {
        await dispatch(addLogoPT(formData)).unwrap();
      }

      onClose();
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
    }
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
            {logo?.logoPTImage && (
              <img
                src={logo.logoPTImage}
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
