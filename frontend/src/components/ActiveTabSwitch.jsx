import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="tabs tabs-boxed">
      <button
        onClick={() => setActiveTab("chats")}
        className={`tab transition-all duration-100000  ${activeTab === "chats"
            ? "tab-active text-cyan-400"
            : "text-slate-400"
          }`}
      >
        Chats
      </button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`tab transition-all duration-100000  ${activeTab === "contacts"
            ? "tab-active text-cyan-400"
            : "text-slate-400"
          }`}
      >
        Contacts
      </button>
    </div>
  );
}

export default ActiveTabSwitch;