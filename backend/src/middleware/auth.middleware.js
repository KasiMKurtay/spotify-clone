import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
  if (!req.auth.userId) {
    //Eğer kullanıcı oturum açmamışsa
    return res
      .status(401)
      .json({ message: "Unauthorized - you must be logged in" }); //Hata mesajı döndürür
  }

  next(); //Eğer oturum açmışsa, sonraki middleware'ye gecirir
};

export const requireAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId); //Kullanıcının bilgilerini Clerck üzerinden alır
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;
    //Admin olup olmadığını e-posta adresi üzerinden kontrol eder
    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Unauthorized - you must be an admin" }); //Değilse hata mesajı döndürür
    }
    next(); //Adminse devam eder
  } catch (error) {
    next(error); //Hata varsa bir sonraki error handler'a gönderir
  }
};
