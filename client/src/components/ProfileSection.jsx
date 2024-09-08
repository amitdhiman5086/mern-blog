import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

const ProfileSection = () => {
  const {currentUser} = useSelector(state=>state.user)
  return (
    <div className=" mx-auto p-3 w-[40%]">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md rounded-full">
          <img
            src={currentUser.profilePicture}
            alt="User"
            referrerPolicy="no-referrer"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
          />
        </div>
       <div className="w-full  flex gap-y-5 py-2 flex-col ">
       <TextInput  type="text" id="username" placeholder="Username" defaultValue={currentUser.username}/>
        <TextInput  type="email" id="email" placeholder="Email" defaultValue={currentUser.email}/>
        <TextInput  type="password" id="password" placeholder="Password" />
        <Button type="submit" gradientDuoTone='purpleToBlue' outline  >
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
