exports.otpTemplate = (otp) => {
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OTP Verfication Email</title>
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
    </style>
  </head>
  <body>
    <div class="container">
      <a href="https://study-notion-platform.vercel.app/">
        <img src="https://i.ibb.co/7Xyj3PC/logo.png" alt="Logo" class="logo" />
      </a>
      <div class="Headingotp">OTP Verification Email</div>
      <div>
        <p>Dear User,</p>
        <p>
          Thank you for registering with StudyNotion. To complete your
          registration, please use the following OTP (One-Time Password) to
          verify your account:
        </p>
        <h2>${otp}</h2>
        <p>
          This OTP is valid for 5 minutes. If you did not request this
          verification, please disregard this email. Once your account is
          verified, you will have access to our platform and its features.
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
</html>

    `;
};

