import { useState } from "react";
import axios from "axios";

const Verify2FA = () => {
  const [uid, setUid] = useState(""); // isi dari Firebase Auth user UID
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/verify-2fa", { uid, otp });
      setMessage(res.data.message);
      // bisa redirect ke dashboard
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleVerify}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Verify 2FA</h2>

        <input
          type="text"
          placeholder="User UID"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {message && <p className="text-center mt-4 text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default Verify2FA;
