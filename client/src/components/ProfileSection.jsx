import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../firebase/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateFailure,
  updateSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutSuccess,
} from "../redux/userSlice.js";
import { useDispatch } from "react-redux";
import { FaExclamationCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProfileSection = () => {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imgaeFile, setImageFile] = useState(null);
  const [imageFileProgress, setImageFileProgress] = useState(null);
  const [imageFileProgressError, setImageFileProgressError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [showModel, setModel] = useState(false);
  const [userProfileUpdated, setUserProfileUpdated] = useState(null);
  const [userProfileUpdatedError, setUserProfileUpdatedError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  // console.log(imageFileProgress, imageFileProgressError);
  const filePicker = useRef();
  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(e.target.files[0]);
      setImageUrl(URL.createObjectURL(file));
    }
    // setImageFile(Array.from(e.target.files));
  };
  useEffect(() => {
    if (imgaeFile) {
      uploadImage();
    }
  }, [imgaeFile]);
  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileProgressError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imgaeFile.name;
    const storageRef = ref(storage, fileName);
    console.log(storageRef);
    const uploadTask = uploadBytesResumable(storageRef, imgaeFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileProgress(progress.toFixed(0));
      },
      () => {
        setImageFileProgressError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileProgress(null);
        setImageUrl(null);
        setImageFile(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
          setImageFileProgress(null)
        });
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setUserProfileUpdatedError(null)
    // setUserProfileUpdated(null)
    if (Object.keys(formData).length === 0) {
      setUserProfileUpdatedError("No Changes Made");
      setTimeout(() => {
        setUserProfileUpdatedError(null);
      }, 5000);
      return;
    }
    if (imageFileUploading) {
      setUserProfileUpdatedError("Ruk Ja Bhai Image Upload Ho Rahi Hai ");
      setTimeout(() => {
        setUserProfileUpdatedError(null);
      }, 5000);
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/routes/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUserProfileUpdatedError(data.message);
        setTimeout(() => {
          setUserProfileUpdatedError(null);
        }, 5000);
      } else {
        dispatch(updateSuccess(data));
        setUserProfileUpdated("User Profile Updated Successfully !");
        setTimeout(() => {
          setUserProfileUpdated(null);
        }, 5000);
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUserProfileUpdatedError(error.message);
      setTimeout(() => {
        setUserProfileUpdatedError(null);
      }, 5000);
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/routes/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess());
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/routes/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className=" mx-auto p-3 w-full md:w-[40%]">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          hidden
          type="file"
          accept="image/.*"
          onChange={handleImageFile}
          ref={filePicker}
        />
        {/* <input type="file" accept="image/*"  onChange={handleImageFile} multiple/> */}
        <div
          onClick={() => filePicker.current.click()}
          className="relative w-32 h-32 self-center cursor-pointer shadow-md rounded-full"
        >
          {" "}
          {imageFileProgress && (
            <CircularProgressbar
              value={imageFileProgress || 0}
              text={`${imageFileProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,199,${imageFileProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageUrl || currentUser.profilePicture}
            alt="User"
            referrerPolicy="no-referrer"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileProgress && imageFileProgress < 100 && `opacity-50`
            }`}
          />
        </div>
        {imageFileProgressError && (
          <Alert color="failure">{imageFileProgressError}</Alert>
        )}
        <div className="w-full  flex gap-y-5 py-2 flex-col ">
          <TextInput
            type="text"
            id="username"
            placeholder="Username"
            defaultValue={currentUser.username}
            onChange={handleChange}
          />
          <TextInput
            type="email"
            id="email"
            placeholder="Email"
            defaultValue={currentUser.email}
            onChange={handleChange}
          />
          <TextInput
            type="password"
            onChange={handleChange}
            id="password"
            placeholder="Password"
          />
          <Button
            type="submit"
            gradientDuoTone="purpleToBlue"
            outline
            disabled={imageFileUploading || loading}
          >
            {loading ? "Loading.." : "Update"}
          </Button>
          {currentUser.isAdmin && (
            <Link to={"/create-post"}>
              <Button
                type="button"
                gradientDuoTone={"purpleToPink"}
                className="w-full"
              >
                Create a post
              </Button>
            </Link>
          )}
        </div>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={() => setModel(true)} className="cursor-pointer">
          Delete Account
        </span>
        <span onClick={handleSignOut} className="cursor-pointer">
          Sign Out
        </span>
      </div>
      {userProfileUpdated && (
        <Alert color="success" className="mt-5 ">
          {userProfileUpdated}
        </Alert>
      )}
      {userProfileUpdatedError && (
        <Alert color="failure" className="mt-5 ">
          {userProfileUpdatedError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5 ">
          {error}
        </Alert>
      )}
      <Modal popup size="md" show={showModel} onClose={() => setModel(false)}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <FaExclamationCircle className="size-16 text-gray-600 mx-auto dark:text-gray-200" />
          <h3 className="text-center my-4 font-bold text-xl dark:text-gray-200 text-gray-600">
            Are You Sure want to delete the account
          </h3>
          <div className="flex justify-around ">
            <Button onClick={handleDeleteUser} color={"failure"}>
              Yes, I am Sure
            </Button>
            <Button onClick={() => setModel(false)} color={"success"} outline>
              No
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProfileSection;
