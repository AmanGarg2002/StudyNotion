exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>"Questions about Our Company's Background</title>
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
      .head {
        font-weight: bold;
        font-size: 18px;
      }
      .cta {
        display: inline-block;
        padding: 10px 20px;
        background-color: #ffd60a;
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
      <div class="Headingotp">Course Payment Confirmation</div>
      <div>
          <p>Dear ${name},</p>
          <p>We have received a payment of <span class="head">₹${amount}</span></p>
          <p>Your Payment ID is <b>${paymentId}</b></p>
          <p>Your Order ID is <b>${orderId}</b></p>
      </div>
      <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
              href="mailto:info@studynotion.com">info@studynotion.com</a>. We are here to help!</div>
    </div>
  </body>
</html>



`;
};
