import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, FileInput, Select, TextInput } from "flowbite-react";

const CreatePostPage = () => {
  return (
    <div className="p-3 max-w-3xl mx-auto">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>

      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Select a category</option>
            <option value="technical">Technical</option>
            <option value="poltical">Poltical</option>
            <option value="news">News</option>
            <option value="others">Others</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput type="file" accept="image/*" />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
          >
            Upload Image
          </Button>
        </div>
        <ReactQuill required theme='snow' placeholder='Write Something...' className='h-96 mb-10 '/>
        <Button type='submit' gradientDuoTone='purpleToPink'>Publish</Button>
      </form>
    </div>
  );
};

export default CreatePostPage;
