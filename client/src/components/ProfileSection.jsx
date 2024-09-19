import { Alert, Button, TextInput } from "flowbite-react";
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
} from "../redux/userSlice.js";
import { useDispatch } from "react-redux";

const ProfileSection = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imgaeFile, setImageFile] = useState(null);
  const [imageFileProgress, setImageFileProgress] = useState(null);
  const [imageFileProgressError, setImageFileProgressError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
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

  console.log(formData);
  return (
    <div className=" mx-auto p-3 w-[40%]">
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
          <Button type="submit" gradientDuoTone="purpleToBlue" outline>
            Update
          </Button>
        </div>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
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
    </div>
  );
};

export default ProfileSection;
