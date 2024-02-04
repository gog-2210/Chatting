const passport = require("passport");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const express = require("express");
require("express-session");
const router = express.Router();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../model/userModel");
const { Account } = require("../model/userModel");
const { Session } = require("../model/userModel");
const crypto = require("crypto");
/*Với từng request passport gắn thêm cho bạn 4 hàm :
    req.login()
    req.logout()
    req.isAuthenticated()
    req.isUnauthenticated()*/

passport.use(
  // Đăng nhập với tài khoản Google
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/callback/google",
    },
    async function (accessToken, refreshToken, profile, done) {
      // Tìm hoặc tạo người dùng dựa trên ID Google
      // Tìm người dùng dựa trên tên tài khoản hoặc email
      try {
        // Tìm người dùng dựa trên tên tài khoản hoặc email
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          // Nếu người dùng không tồn tại, tạo người dùng mới
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
            emailVerified: true,
          });

          await user.save();
          // Tạo tài khoản mới
          const account = new Account({
            userId: user._id, // Liên kết tài khoản với người dùng mới tạo
            type: "oauth", // Loại tài khoản nội bộ
            provider: "google", // Có thể là "local" hoặc một giá trị khác (ví dụ: "google", "facebook") tùy thuộc vào yêu cầu.
            providerAccountId: user.email, // Sử dụng email người dùng làm providerAccountId, bạn có thể điều chỉnh nếu cần thiết
            // refresh_token: refreshToken,
            // access_token: accessToken,
          });
          // Lưu tài khoản vào cơ sở dữ liệu
          account
            .save()
            .then((savedAccount) => {
              // Xử lý sau khi lưu thành công
              console.log("Tài khoản đã được lưu thành công:", savedAccount);
            })
            .catch((err) => {
              // Xử lý lỗi khi lưu
              console.error("Lỗi khi lưu tài khoản:", err);
            });
          // Thêm tài khoản vào danh sách tài khoản của người dùng
          user.accounts.push(account._id);
          await user.save();
        }
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);
passport.use(
  // Đăng nhập với tài khoản trưc tiếp
  new LocalStrategy( //dùng verify callback để xác thực người dùng
    { usernameField: "email", passwordField: "password" },
    async function (email, password, done) {
      const user = await User.findOne({ email });
      if (!user || user.emailVerified === false)
        return done("Tài khoản hoặc mật khẩu honk đún", false); //done là hàm trả về cho passport.authenticate là false nếu không tìm thấy user hoặc sai mật khẩu
      const validPassword = await bcrypt.compare(password, user.hashedPassword);
      if (!validPassword)
        return done("Tài khoản hoặc mật khẩu honk đún", false); //done là hàm trả về cho passport.authenticate là false nếu không tìm thấy user hoặc sai mật khẩu
      return done(null, user); //done là hàm trả về cho passport.authenticate là user nếu đúng mật khẩu và email
    }
  )
);
passport.serializeUser((user, done) => {
  // hàm serializeUser được gọi khi sau khi Strategy thành công và lưu thông tin user vào session
  done(null, user.id);
});
//gọi bởi passport.session. Giúp ta lấy dữ liệu user dựa vào thông tin lưu trên session và gắn vào req.user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (err) {
    done(err);
  }
});
//Oauth
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/auth/callback/google",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),
  function (req, res) {
    // Xác thực thành công, chuyển hướng về trang chủ.
    res.redirect("http://localhost:3000/user?userID=" + req.user._id);
  }
);

// Đăng nhập
// router.post("/auth/login", async (req, res) => {
//   try {
//     // Tìm người dùng dựa trên tên tài khoản hoặc email
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) return res.status(400).send("Email hoặc mật khẩu không đúng");
//     // So sánh mật khẩu đã được mã hóa với mật khẩu người dùng gửi lên
//     const validPassword = await bcrypt.compare(
//       req.body.password,
//       user.hashedPassword
//     );
//     if (!validPassword) return res.send("Email hoặc mật khẩu không đúng");
//     res.send("Đăng nhập thành công");
//   } catch (error) {
//     res.status(500).send("Đăng nhập thất bại ");
//   }
// });
router.post("/auth/login", (req, res) => {
  passport.authenticate("local", (err, user) => {
    //callback
    if (err) {
      res.json({ message: err, sign: false });
      return;
    }
    if (!user) {
      // Xác thực không thành công, chuyển hướng đến trang đăng nhập với thông báo lỗi
      res.json({ message: err, sign: false }); //err là null (fix)
      return;
    }
    req.logIn(user, (err) => {
      //lệnh err chạy vào Login thì đã có req.user có nghiã là đã đăng nhập thành công nhưng null
      // Xác thực thành công, lưu thông tin người dùng vào session và chuyển hướng đến trang chủ
      //(user: Express.User, done: (err: any) không thì return res.send("/user?userID=" + user._id))
      if (err) {
        res.json({ message: err, sign: false });
        return;
      }
      return res.send({ message: "/user?userID=" + user._id, sign: true });
    });
  })(req, res);
});
// Kiểm tra xem người dùng đã đăng nhập hay chưa
router.get("/auth/session", (req, res) => {
  try {
    if (req.isAuthenticated()) {
      res.send({
        loggedIn: true,
        redirectURL: `/conversations?u_id=${req.user.id}`,
      });
    }
  } catch (error) {
    console.log("aaa", error);
  }
});
// Lấy thông tin người dùng hiện tại
router.get("/auth/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user);
    res.send("sussecful");
  } else {
    res.send(null);
  }
});
// Đăng xuất (xóa session)
router.post("/auth/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send("/login");
  });
});

// Hàm gửi email xác minh
async function sendVerificationEmail(email, verificationCode) {
  // Tạo transporter (người gửi)
  let transporter = nodemailer.createTransport({
    // // This is the SMTP mail server to use for notifications.
    // // GCDS uses this mail server as a relay host.
    // host: "smtp.gmail.com",
    // // SMTP is unlike most network protocols, which only have a single port number.
    // // SMTP has at least 3. They are port numbers 25, 587, and 465.
    // // Port 25 is still widely used as a **relay** port from one server to another.
    // // Port for SSL: 465
    // // Port for TLS/STARTTLS: 587
    // port: 587,
    // //  if true the connection will use TLS when connecting to server. If false (the
    // // default) then TLS is used if server supports the STARTTLS extension. In most
    // // cases set this value to true if you are connecting to port 465. For port 587 or
    // // 25 keep it false
    // secure: false, // use TLS
    service: "gmail",
    auth: {
      user: process.env.ACCOUNT_EMAIL,
      pass: process.env.ACCOUNT_PASSWORD,
    },
  });
  // Tạo email xác minh
  let mailOptions = {
    from: process.env.ACCOUNT_EMAIL, // Thay bằng email của bạn
    to: email,
    subject: "Xác minh email",
    text: `Nhấp vào liên kết sau để xác minh email của bạn:`,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }

            .email-container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
            }

            .email-container h1 {
                color: #333;
            }

            .email-container p {
                color: #666;
            }

            .email-container a {
                display: inline-block;
                padding: 10px 20px;
                margin-top: 20px;
                background-color: #3498db;
                color: #fff;
                text-decoration: none;
                border-radius: 3px;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <h1>Xác minh email của bạn</h1>
            <p>Nhấp vào liên kết sau để xác minh email của bạn:</p>
            <a href="${process.env.CLIENT_URL}/verify?email=${email}&code=${verificationCode}">Xác minh email</a>
        </div>
    </body>
    </html>
  `,
  };

  // Gửi email
  await transporter.sendMail(mailOptions);
}
// Hàm tạo mã xác minh ngẫu nhiên
function generateRandomString(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}
// Đăng ký
router.post("/auth/register", async (req, res) => {
  try {
    // Kiểm tra xem email đã tồn tại trong csdl chưa
    let user = await User.findOne({ email: req.body.email }); // dùng let thay vì const vì user sẽ được gán lại
    if (user) {
      //nếu user đã tồn tại và đã xác minh email
      return res.json({ message: "Email đã tồn tại", sign: false });
    } else {
      // Mã hóa mật khẩu người dùng với bcrypt
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      //random 6 số với crypto
      const verificationCode = generateRandomString(10);
      user = new User({
        name: req.body.name,
        email: req.body.email,
        hashedPassword: hashedPassword,
        verificationCode: verificationCode,
      });
      await user.save();

      const account = new Account({
        userId: user._id, // Liên kết tài khoản với người dùng mới tạo
        type: "internal", // Loại tài khoản nội bộ
        provider: "local", // Có thể là "local" hoặc một giá trị khác (ví dụ: "google", "facebook") tùy thuộc vào yêu cầu.
        providerAccountId: user.email, // Sử dụng email người dùng làm providerAccountId
      });
      await account.save();
      // Gửi email xác minh
      await sendVerificationEmail(user.email, verificationCode);
      res.json({
        message: "Check Email để trở thành thành viên của Green Horny",
        sign: true,
      });
    }
  } catch (error) {
    res.json({ message: "Đăng ký lỗi ở server", error: error });
    console.log(error);
  }
});
// Xác minh email
/*
Xác minh email: Bạn đang sử dụng ID người dùng trong URL để xác minh email. 
Điều này có thể không an toàn vì nếu ai đó có được ID người dùng, họ có thể
 xác minh email mà không cần truy cập vào email. Một cách tiếp cận tốt hơn 
 là tạo một mã xác minh ngẫu nhiên, lưu mã này vào cơ sở dữ liệu liên kết 
 với người dùng, và sau đó gửi mã này trong email. Khi người dùng nhấp vào 
 liên kết, bạn kiểm tra mã từ URL với mã trong cơ sở dữ liệu.
 Lỗi xử lý: Nếu việc gửi email thất bại, bạn có thể muốn xóa người dùng khỏi cơ sở dữ 
 liệu vì họ sẽ không thể xác minh email của mình.
*/
router.get("/auth/verify", async (req, res) => {
  try {
    const verificationCode = req.query.code;
    const email = req.query.email;
    const user = await User.findOne({ email });
    if (!user || user.verificationCode !== verificationCode) {
      return res.json({ message: "Mã xác minh không hợp lệ", verify: false });
    }
    //cập nhật trạng thái xác minh email
    user.emailVerified = true;
    user.verificationCode = undefined;
    await user.save();
    res.json({ message: "Xác minh email thành công", verify: true });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Đã xảy ra lỗi khi xác minh email",
      verify: false,
    });
  }
});

module.exports = router;
