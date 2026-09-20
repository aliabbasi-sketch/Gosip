import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({  
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,

    setActiveTab: (tab) => set({ activeTab: tab }),         
    setActiveUser: (selectedUser) => set({ selectedUser }),

    getAllContacts: async () => {
        set({ isUserLoading: true }); 
        try {
            const res = await axiosInstance.get("/messages/contacts");
            set({ allContacts: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUserLoading: false });
        }
    },

    getMyChatPartners: async () => {
        set({ isUserLoading: true }); 
        try {
            const res = await axiosInstance.get("/messages/chats");
            set({ chats: res.data }); 
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUserLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong while loading messages");
        } finally {
            set({ isMessagesLoading: false });
        }
    }, 

    sendMessage: async (text) => {

        const { selectedUser, messages } = get();
        const {authUser} = useAuthStore.getState();

        const tempId = `temp-${Date.now()}`;

        const optimisticMessage = {
            _id: tempId,
            senderId: authUser._id,
            receiverId: selectedUser._id,
            text: text.text,
            image: text.image,
            createdAt: new Date().toISOString(),
            isOptimistic: true, // flag to identify optimistic messages (optional)
        };

        set({ messages: [...messages, optimisticMessage] });


        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, text);
            set({
                messages: get().messages
                    .filter(msg => msg._id !== tempId)  // remove optimistic
                    .concat(res.data)                   // add real message from server
            });
        } catch (error) {
            set({ messages: get().messages.filter(msg => msg._id !== tempId) });
            toast.error(error.response?.data?.message || "Something went wrong while Sending messages");
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get()
        if (!selectedUser) {
            return;
        }
        const socket = useAuthStore.getState().socket;

        socket.on("NewMessage", (newMessage) => {
            if (newMessage.senderId !== selectedUser._id) return;


            const currentMessages = get().messages
            set({ messages: [...currentMessages, newMessage] });
        })
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("NewMessage");
    }
}));