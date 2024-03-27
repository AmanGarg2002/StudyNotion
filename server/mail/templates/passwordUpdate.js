exports.passwordChangeTemplate = (name, email) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Password Update Confirmation</title>
        <style>
          body {
            background-color: white;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            font-size: 16px;
            color: #333333;
            line-height: 1.4;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            text-align: center;
            margin-top: 20px;
          }
          .logo {
            max-width: 200px;
            margin-bottom: 20px;
          }
          .Headingotp {
            font-weight: bold;
            font-size: 18px;
            margin-bottom: 20px;
          }
          .support {
            font-size: 14px;
            margin-top: 20px;
            color: #999999;
          }
          .head{
            font-weight:bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <a href="">
            <img src="https://i.ibb.co/7Xyj3PC/logo.png" alt="Logo" class="logo" />
          </a>
          <div class="Headingotp">Password Update Confirmation</div>
          <div>
            <p>Hey ${name},</p>
            <p>
            Your password has been successfully updated for the email <span class="head">${email}</span>.
            </p>
            <p>
            If you did not request this password change, please contact us immediately to secure your account.
            </p>
          </div>
          <div class="support">
            If you have any questions or need assistance, please feel free to reach
            out to us at
            <a href="mailto:info@studynotion.com">info@studynotion.com</a>. We are
            here to help!
          </div>
        </div>
      </body>
    </html>`;
};
