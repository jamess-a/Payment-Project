import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useUser } from "./userContext";
import { postRequest, getRequest } from "../../utils/requestUtil";
import Swal from "sweetalert2";

const GoogleAuth = () => {
  const [signInWithGoogle, userCredential, loading, error, flowcancel] =
    useSignInWithGoogle(auth);
  const navigate = useNavigate();
  const { updateUser } = useUser();

  const handleSignOut = () => {
    auth.signOut();
  };

  const handleGoogleLogin = async () => {
    try {
      // รอผลการล็อกอินจาก Google
      const result = await signInWithGoogle();

      // ตรวจสอบว่า userCredential ถูกคืนค่าหรือไม่
      if (flowcancel) {
        Swal.fire({
          title: "Login Canceled",
          text: "You have canceled the login process.",
          icon: "warning",
          timer: 3000,
          showConfirmButton: false,
        });
        console.log("User canceled the login.");
        return;
      }

      console.log("Google login success:", result);

      const user = result.user;

      if (user) {
        const { email, displayName, photoURL, uid } = user;

        console.log("ผู้ใช้เข้าสู่ระบบสำเร็จ:", user);

        const response = await getRequest(`/auth/login?uid=${uid}`);

        if (response.success) {
          const existingUser = response.user;
          Swal.fire({
            title: "Success",
            text: "Welcome Back!",
            icon: "success",
            timer: 3000,
            showConfirmButton: false,
          }).then(() => {
            setTimeout(() => {
              navigate("/home");
            }, 3000);
          });

          updateUser({
            uid: existingUser.uid,
            displayName: existingUser.username,
            photoURL: user.photoURL,
            email: existingUser.email,
            age: existingUser.ages,
            height: existingUser.height,
            phone: existingUser.phone,
          });
        } else {
          Swal.fire({
            title: "No User",
            text: "Data is not match",
            icon: "error",
            timer: 3000,
            showConfirmButton: false,
          }).then(() => {
            setTimeout(() => {
              handleSignOut();
            }, 3000);
          });
          const userData = {
            id: uid,
            username: displayName || "New User",
            email: email,
            photoURL: photoURL || "",
            age: 0,
            height: 0,
            phone: "",
          };

          const newUser = await postRequest("/auth/register", userData);
          Swal.fire({
            title: "Success",
            text: "Create User successfully completed!",
            icon: "success",
            timer: 3000,
            showConfirmButton: false,
          }).then(() => {
            setTimeout(() => {
              navigate("/home");
            }, 3000);
          });

          updateUser({
            id: newUser.id,
            displayName: newUser.username,
            email: newUser.email,
            photoURL: newUser.photoURL,
          });
        }
      } else {
        console.log("❌ ไม่พบข้อมูลผู้ใช้จากการล็อกอิน");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Swal.fire({
          title: "User is not registered yet",
          text: "Please contact us",
          icon: "error",
          timer: 3000,
          showConfirmButton: false,
        }).then(() => {
          setTimeout(() => {
            handleSignOut();
          }, 3000);
        });
      } else {
        console.error("❌ Error during login:", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default GoogleAuth;
