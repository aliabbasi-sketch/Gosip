import cloudinary from "../lib/cloudinary.js";
import { io, getReceiverSocketId } from "../lib/socket.js";
import Message from "../models/Message.js";
import User from "../models/User.js";



export const getAllContacts = async (req, res) => {
    try {
        const loggedInUserid = req.user._id;
        const filterUsers = await User.find({
            _id: {
                $ne: loggedInUserid
            }
        }).select("-password");

        res.status(200).json(filterUsers);
    } catch (error) {
        console.log("Error Fetching Contacts for the User:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getMessagesById = async (req, res) => {
    try {
        const myId = req.user._id;

        const { id: ChatPartner } = req.params;

        const messages = await Message.find({
            $or: [
                {
                    senderId: myId, recieverId: ChatPartner
                },
                {
                    senderId: ChatPartner, recieverId: myId
                }
            ]
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error Fetching chats for User : ", req.user.fullname);
        res.status(500).json({ message: "Server Error" });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user._id;

        let imageURL;

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageURL = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image: imageURL,
        });
        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(recieverId.toString())
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("NewMessage", newMessage)
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error Sending Message to User : ", req.params);
        res.status(500).json({ message: "Server Error" });
    }
};
export const getChatPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const messages = await Message.find({
            $or: [
                {
                    senderId: loggedInUserId
                },
                {
                    recieverId: loggedInUserId
                }
            ]
        });

        const chatPartnersId = [
            ...new Set(
                messages.map((msg) =>
                    msg.senderId.toString() == loggedInUserId.toString()
                        ? msg.recieverId.toString()
                        : msg.senderId.toString()
                )
            )
        ];

        const chatPartners = await User.find({
            _id: { $in: chatPartnersId }
        }).select("-password");

        res.status(200).json(chatPartners);
         
    } catch (error) {
        console.log("Error Gettign the chat Partners for User : ", error);
        res.status(500).json({ message: "Server Error" });
    }
};