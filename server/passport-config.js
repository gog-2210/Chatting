// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const LocalStrategy = require("passport-local").Strategy;
// const { User } = require("./userModel");
// const { Account } = require("./userModel");

// passport.use(
//   // Đăng nhập với tài khoản Google
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/api/auth/callback/google",
//     },
//     async function (accessToken, refreshToken, profile, cb) {
//       // Tìm hoặc tạo người dùng dựa trên ID Google
//       // Tìm người dùng dựa trên tên tài khoản hoặc email
//       try {
//         // Tìm người dùng dựa trên tên tài khoản hoặc email
//         let user = await User.findOne({ email: profile.emails[0].value });

//         if (!user) {
//           // Nếu người dùng không tồn tại, tạo người dùng mới
//           user = new User({
//             name: profile.displayName,
//             email: profile.emails[0].value,
//             image: profile.photos[0].value,
//           });

//           await user.save();
//           // Tạo tài khoản mới
//           const account = new Account({
//             userId: user._id, // Liên kết tài khoản với người dùng mới tạo
//             type: "oauth", // Loại tài khoản nội bộ
//             provider: "google", // Có thể là "local" hoặc một giá trị khác (ví dụ: "google", "facebook") tùy thuộc vào yêu cầu.
//             providerAccountId: user.email, // Sử dụng email người dùng làm providerAccountId, bạn có thể điều chỉnh nếu cần thiết
//             // refresh_token: refreshToken,
//             // access_token: accessToken,
//           });
//           // Lưu tài khoản vào cơ sở dữ liệu
//           account
//             .save()
//             .then((savedAccount) => {
//               // Xử lý sau khi lưu thành công
//               console.log("Tài khoản đã được lưu thành công:", savedAccount);
//             })
//             .catch((err) => {
//               // Xử lý lỗi khi lưu
//               console.error("Lỗi khi lưu tài khoản:", err);
//             });
//           // Thêm tài khoản vào danh sách tài khoản của người dùng
//           user.accounts.push(account._id);
//           await user.save();
//         }

//         cb(null, user);
//       } catch (err) {
//         cb(err);
//       }
//     }
//   ),
//   // Đăng nhập với tài khoản trưc tiếp
//   new LocalStrategy(
//     { usernameField: "email", passwordField: "password" },
//     async function (email, password, done) {
//       try {
//         const user = await User.findOne({ email });
//         if (!user.emailVerified === false)
//           return done(null, false, { message: "Email chưa được xác minh" });
//         if (!user)
//           return done(null, false, {
//             message: "Email hoặc mật khẩu không đúng",
//           });
//         const validPassword = await bcrypt.compare(
//           password,
//           user.hashedPassword
//         );
//         if (!validPassword)
//           return done(null, false, {
//             message: "Email hoặc mật khẩu không đúng",
//           });
//         return done(null, user);
//       } catch (err) {
//         return done(null, err);
//       }
//     }
//   )
// );
// // hàm được gọi khi xác thực thành công để lưu thông tin user vào session
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// //hàm được gọi bởi passport.session .Giúp ta lấy dữ liệu user dựa vào thông tin lưu trên session và gắn vào req.user
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });

// module.exports = passport;
