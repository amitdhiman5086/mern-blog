import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase/firebase.js";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UpdatePost = () => {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { postId } = useParams();
  console.log(formData);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/routes/getposts?postId=${postId}`);
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      };
      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please Select an Image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        () => {
          setImageUploadError("Image Upload Failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            console.log("Here");
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadProgress(null);
      setImageUploadError("Image Upload Failed");
      console.log(error);
    }
  };

  const handleSumitFormData = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/post/routes/updatepost/${formData._id}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
      setPublishError(null);
    } catch (error) {
      console.log(error);
      setPublishError(error.message);
    }
  };
  return !formData ? null : (
    <div className="p-3 max-w-3xl mx-auto">
      <h1 className="text-center text-3xl my-7 font-semibold">Update post</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSumitFormData}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
            value={formData?.title}
          />
          <Select
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value });
            }}
            value={formData?.category}
          >
            <option value="uncategorized">Select a category</option>
            <option value="technical">Technical</option>
            <option value="poltical">Poltical</option>
            <option value="news">News</option>
            <option value="others">Others</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-10 h-10">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && (
          <Alert color={"failure"}>{imageUploadError}</Alert>
        )}
        {formData && formData.image && (
          <img
            src={formData?.image}
            alt="upload"
            className="object-cover w-full h-80"
          />
        )}
        <ReactQuill
          required
          theme="snow"
          placeholder="Write Something..."
          className="h-96 mb-10 "
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
          value={formData?.content}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Update the post
        </Button>
        {publishError && <Alert color={"failure"}>{publishError}</Alert>}
      </form>
    </div>
  );
};

export default UpdatePost;