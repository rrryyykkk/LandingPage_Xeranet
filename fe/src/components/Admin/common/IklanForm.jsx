import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addIklan, editIklan, fetchIklan } from "../../../app/data/iklanSlice";

const IklanForm = ({ open, onClose, iklan }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    if (iklan) {
      setValue("title", iklan.title);
      setValue("isActive", iklan.isActive);
      setValue("iklanImage", iklan.iklanImage || "");
    } else {
      reset();
    }
  }, [iklan, setValue, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("isActive", data.isActive);
    formData.append("createdBy", "admin");

    if (data.iklanImageFile?.[0]) {
      formData.append("iklanImage", data.iklanImageFile[0]);
    } else if (data.iklanImage) {
      formData.append("iklanImage", data.iklanImage);
    }

    try {
      if (iklan) {
        await dispatch(editIklan({ id: iklan._id, formData })).unwrap();
      } else {
        await dispatch(addIklan(formData)).unwrap();
      }

      dispatch(fetchIklan());
      onClose();
      reset();
    } catch (error) {
      console.error("Gagal menyimpan iklan:", error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white dark:bg-base-100 p-6 rounded-xl w-full max-w-lg shadow-lg relative">
        <h3 className="text-xl font-bold mb-4">
          {iklan ? "Edit Iklan" : "Tambah Iklan"}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">Judul</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="input input-bordered w-full"
              placeholder="Judul Iklan"
            />
          </div>

          <div>
            <label className="label">Upload Gambar Iklan</label>
            <input
              type="file"
              accept="image/*"
              {...register("iklanImageFile")}
              className="file-input file-input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Atau Gunakan URL Gambar</label>
            <input
              type="text"
              {...register("iklanImage")}
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
              <span className="label-text">Aktifkan Iklan Ini</span>
            </label>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
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
                ? iklan
                  ? "Menyimpan..."
                  : "Menambahkan..."
                : iklan
                ? "Simpan Perubahan"
                : "Tambah Iklan"}
            </button>
          </div>
        </form>

        <button
          onClick={() => {
            reset();
            onClose();
          }}
          className="absolute top-3 right-3 btn btn-sm btn-circle btn-ghost curosr-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default IklanForm;
