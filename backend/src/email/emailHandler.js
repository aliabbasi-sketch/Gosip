import { resendClient, sender } from "../lib/resend.js"
import { createEmailTemplate } from "../email/emailTemplate.js"
    
export const sendWelcomingEmail = async (email, name, clientURl) => {
    const {data, error} = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: "Welcome to Gosip",
        html: createEmailTemplate(name, clientURl)
    });

    if (error) {
        console.log("Error sending the welcome mesage: ", error);
        throw new Error("Failed to end welcome email:", data);
    }

    console.log("Welcome message sunccesfully sent to : ",data);
}