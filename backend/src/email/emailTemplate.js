export function createEmailTemplate(clientName, clientURL) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Open Your Message</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:40px 20px;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td align="center"
              style="padding:40px;background:#4F46E5;color:#ffffff;">
              <h1 style="margin:0;font-size:28px;">
                 New Message
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;color:#333333;">

              <h2 style="margin-top:0;">
                Hello ${clientName},
              </h2>

              <p style="font-size:16px;line-height:1.7;">
                Someone has sent you a new message through our messaging platform.
              </p>

              <p style="font-size:16px;line-height:1.7;">
                Click the button below to securely open your conversation.
              </p>

              <table cellpadding="0" cellspacing="0" align="center" style="margin:35px auto;">
                <tr>
                  <td align="center" bgcolor="#4F46E5" style="border-radius:8px;">
                    <a href="${clientURL}"
                      style="
                        display:inline-block;
                        padding:16px 36px;
                        color:#ffffff;
                        text-decoration:none;
                        font-size:16px;
                        font-weight:bold;
                      ">
                      Open Conversation
                    </a>
                  </td>
                </tr>
              </table>

              <p style="font-size:14px;color:#666666;">
                If the button doesn't work, copy and paste the following link into your browser:
              </p>

              <p style="word-break:break-all;">
                <a href="${clientURL}" style="color:#4F46E5;">
                  ${clientURL}
                </a>
              </p>

              <hr style="border:none;border-top:1px solid #eeeeee;margin:30px 0;">

              <p style="font-size:13px;color:#999999;">
                If you weren't expecting this email, you can safely ignore it.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center"
              style="padding:20px;background:#fafafa;color:#999999;font-size:13px;">
              © ${new Date().getFullYear()} Your Messaging App. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
}
