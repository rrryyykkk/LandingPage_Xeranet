import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase"; // Pastikan import firebase sudah benar
import { getMe } from "../app/users/authSlice"; // Sesuaikan dengan action redux kamu

// Membuat Context untuk Auth
const AuthContext = createContext();

// Hook untuk mengakses AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider untuk mengelola status login
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Mendengarkan perubahan status login
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        // Jika pengguna sudah login
        console.log("User is logged in:", firebaseUser);

        // Ambil ID token pengguna
        const token = await firebaseUser.getIdToken();
        console.log("Firebase ID Token:", token);

        // Simpan informasi user
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        });
        setIdToken(token); // Simpan token
        dispatch(getMe()); // Ambil data pengguna dari API jika diperlukan
      } else {
        // Jika pengguna belum login
        console.log("No user is logged in");
        setUser(null);
        setIdToken(null);
      }
      setLoading(false); // Set loading ke false setelah proses selesai
    });

    // Bersihkan listener saat komponen unmount
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ user, loading, idToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
