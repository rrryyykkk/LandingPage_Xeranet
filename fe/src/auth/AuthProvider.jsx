import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { getMe } from "../app/users/authSlice";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        console.log("User is logged in:", firebaseUser);

        const token = await firebaseUser.getIdToken();
        console.log("Firebase ID Token:", token);

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        });
        setIdToken(token);
        dispatch(getMe(token)); // <<<<< BENERAN BAWA TOKEN
      } else {
        console.log("No user is logged in");
        setUser(null);
        setIdToken(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ user, loading, idToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
