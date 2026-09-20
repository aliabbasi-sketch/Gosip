import { useState , useRef } from "react"
import { LogOutIcon } from "lucide-react"
import { useAuthStore } from "../store/useAuthStore.js"

function ProfileHeader() {

  const { logout, authUser, updateProfile } = useAuthStore()
  const [ selectedImg, setSelectedImg] = useState(null)

  const fileInputRef = useRef(null)
 
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async() => {
      const base64Img = reader.result;
      setSelectedImg(base64Img);
      await updateProfile({ profilePic: base64Img });
    }
  }
  
  return (
    <div className="p-6 border-[2px] border-slate-700/50 rounded-b-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* AVATAR */}
          <div className="avatar online">
            <button
              className="size-16 rounded-full overflow-hidden relative group"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="User image"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">Change</span>
              </div>
            </button>

            <input type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          {/* Username and online test */}
          <div>
            <h2 className="text-slate-200 font-bold text-[20px] max-w-[180px] truncate">
              {authUser.fullname}
            </h2>
            <p className="text-slate-400 text-[14px]">
              Online
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 items-center">
          <button
            className="text-slate-400 hover:text-slate-200 transition-color"
            title="logout"
            onClick={logout}
          >
            <LogOutIcon className="size-5" />
          </button>

      
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader