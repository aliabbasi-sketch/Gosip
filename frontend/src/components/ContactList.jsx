import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore.js"
import UsersLoadingSkeleton from "../components/UserLoadingSkeleton.jsx";
import NoChatsFound from "../components/NoChatsFound.jsx"; 
import { useAuthStore } from "../store/useAuthStore.js";

function ContactList() {

  const { getAllContacts, allContacts, isUserLoading, setActiveUser } = useChatStore();
  const { onlineUsers } = useAuthStore()

  useEffect(() => {
    getAllContacts()
  }, [getAllContacts])

  if (isUserLoading) {
    return <UsersLoadingSkeleton />
  }

  if (allContacts.length === 0) {
    return <NoChatsFound/>
  }
  
  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setActiveUser(contact)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar ${onlineUsers.includes(contact._id) ? "online" : "offline"}`}>
              <div className="size-12 rounded-full">
                <img src={contact.profilePic || "/avatar.png"} alt={contact.fullname} />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium text-[17px] truncate">{contact.fullname}</h4>
          </div>
        </div>
      ))}
    </>
  );
}

export default ContactList;