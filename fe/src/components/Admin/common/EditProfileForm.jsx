const EditProfileForm = ({ open, onClose, profile }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-base-100 p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold mb-4">Edit Profil</h2>
        <form className="space-y-4">
          <input
            type="text"
            defaultValue={profile.fullName}
            className="input input-bordered w-full"
            placeholder="Nama Lengkap"
          />
          <input
            type="text"
            defaultValue={profile.username}
            className="input input-bordered w-full"
            placeholder="Username"
          />
          <input
            type="email"
            defaultValue={profile.email}
            className="input input-bordered w-full"
            placeholder="Email"
          />

          <div className="flex justify-end gap-2">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
