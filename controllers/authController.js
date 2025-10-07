//import bcrypt from 'bcryptjs';
import getConnection from "../dbconfig/config.js";
import sql from "mssql";
import md5 from "md5";
//import session from 'express-session';
//import Users from "../models/usermodel";

export const Login = async (req, res) => {
  try {
    if (req.session.userId) {
      return res.status(401).json({ message: "Existing Login Account!" });
    }
    const { username, password } = req.body;
    const hashPassword = md5(password);

    const conn = await getConnection();

    const result = await conn
      .request()
      .input("kodePemakai", sql.VarChar, username)
      .query(
        "SELECT KodePemakai, NamaPemakai, KodeGroup, SandiPemakai FROM dbGeneral..UtilUser WHERE KodePemakai = @kodePemakai"
      );
    const user = result.recordsets[0];
    await conn.close();
    if (!user[0]) return res.status(404).json({ message: "User not found!" });

    //const match = await bcrypt.compare(password, user.SandiPemakai);
    //if(!match) return res.status(400).json({message: "Login : Incorrect username or password"});
    if (hashPassword !== user[0].SandiPemakai)
      return res
        .status(400)
        .json({ message: "Incorrect username or password" });
    req.session.userId = user[0].KodePemakai;
    const userID = user[0].KodePemakai;
    const NamaPemakai = user[0].NamaPemakai;
    const KodeGroup = user[0].KodeGroup;
    //console.log(user);
    //console.log(res.status(200).json([{ userID, NamaPemakai, KodeGroup }]));
    res.status(200).json([{ userID, NamaPemakai, KodeGroup }]);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Login : " + err.message });
  }
};

export const GetMe = async (req, res) => {
  try {
    //console.log(req, res);
    //console.log(req.session);
    if (!req.session.userId) {
      return res.status(401).json({ message: "Please login to your account!" });
    }
    const conn = await getConnection();
    const result = await conn
      .request()
      .input("kodePemakai", sql.VarChar, req.session.userId)
      .query(
        "SELECT KodePemakai AS UserID, NamaPemakai, KodeGroup FROM dbGeneral..UtilUser WHERE KodePemakai = @kodePemakai"
      );
    const user = result.recordsets[0];
    await conn.close();
    // console.log("SUCCES GETME");
    if (!user[0]) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "GetMe : " + err.message });
  }
};

export const logOut = (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Your not logged in yet" });
    }

    req.session.destroy((err) => {
      if (err)
        return res
          .status(400)
          .json({ message: "Logout Failed! Please Try Again!" });
      res.status(200).json({ message: "You have successfully logged out" });
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Logout : " + err.message });
  }
};
