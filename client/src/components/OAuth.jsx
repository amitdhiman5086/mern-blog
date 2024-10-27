import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { app } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signInSucess } from "../redux/userSlice";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth(app);
  // const hadleGoogleOAuth = async () => {
  //   const provider = new GoogleAuthProvider();
  //   provider.setCustomParameters({ prompt: "select_account" });

  //   try {
  //     const resultFromGoogle = await signInWithPopup(auth, provider);
  //     console.log(resultFromGoogle);
  //     const res = await fetch("/api/auth/google", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         name: resultFromGoogle.user.displayName,
  //         email: resultFromGoogle.user.email,
  //         googlePhotoUrl: resultFromGoogle.user.photoURL,
  //       }),
  //     });
  //     const data = await res.json();
  //     if (res.ok) {
  //       dispatch(signInSucess(data));
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const hadleGoogleOAuth = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
  
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      
      const res = await fetch("/api/auth/routes/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhotoUrl: resultFromGoogle.user.photoURL,
        }),
      });
  
      // Check if response is OK (status 200-299)
      if (!res.ok) {
        const errorResponse = await res.text(); // Get error message from response body
        throw new Error(`Error: ${res.status} - ${errorResponse}`);
      }
  
      const data = await res.json(); // Ensure response is valid JSON
      dispatch(signInSucess(data));
      navigate("/");
  
    } catch (error) {
      console.error("OAuth error:", error);
    }
  };
  
  return (
    <div>
      <button
        onClick={hadleGoogleOAuth}
        className="w-full   flex text-center justify-center  gap-4  border border-double  py-2 active:scale-90 "
      >
        <FaGoogle className="size-5" />
        SignIn With Google
      </button>
    </div>
  );
};

export default OAuth;
