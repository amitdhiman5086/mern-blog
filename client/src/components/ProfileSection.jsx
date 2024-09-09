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

const ProfileSection = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imgaeFile, setImageFile] = useState(null);
  const [imageFileProgress, setImageFileProgress] = useState(null);
  const [imageFileProgressError, setImageFileProgressError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  console.log(imageFileProgress, imageFileProgressError);
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
      (error) => {
        setImageFileProgressError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileProgress(null);
        setImageUrl(null);
        setImageFile(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
        });
      }
    );
  };

  return (
    <div className=" mx-auto p-3 w-[40%]">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col">
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
          />
          <TextInput
            type="email"
            id="email"
            placeholder="Email"
            defaultValue={currentUser.email}
          />
          <TextInput type="password" id="password" placeholder="Password" />
          <Button type="submit" gradientDuoTone="purpleToBlue" outline>
            Update
          </Button>
        </div>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default ProfileSection;
