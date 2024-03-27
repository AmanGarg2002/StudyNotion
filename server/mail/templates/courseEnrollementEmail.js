exports.courseEnrolled = (courseName,name) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Course Registration Confirmation</title>
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
            font-weight: bold;
            font-size: 18px;
          }
          .cta {
            display: inline-block;
            padding: 10px 20px;
            background-color: #FFD60A;
            color: #000000;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            margin-top: 20px;
        }
        </style>
      </head>
      <body>
        <div class="container">
          <a href="">
            <img src="https://i.ibb.co/7Xyj3PC/logo.png" alt="Logo" class="logo" />
          </a>
          <div class="Headingotp">Course Registration Confirmation</div>
          <div>
            <p>Dear <span>${name}</span>,</p>
            <p>
            You have successfully registered for the course <span class="head">${courseName}</span>  We
            are excited to have you as a participant!
            <p>
            Please log in to your learning dashboard to access the course materials and start your learning journey.
            </p>
            <a class="cta" href="">Go to Dashboard</a>
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
