import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import fs from "fs";
import path from "path";

export const register = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const userFound = await User.findOne({ email: email });
    if (userFound)
      return res.status(400).json(["Este correo en uso, por favor verifique"]);

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json(["Ya existe un usuario, por favor verifique"]);
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({
      $or: [{ email: email }, { username: email }],
    });
    if (!userFound)
      return res
        .status(400)
        .json(["No se encuentra un Usuario o Correo, por favor verifique"]);

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json(["Contraseña Incorrecta"]);

    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username,
    });

    res.cookie("token", token, {
      // httpOnly: process.env.NODE_ENV !== "development",
      sameSite: "none",
      secure: true,
      httpOnly: false,
    });

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
      background: userFound.background,
      photo: userFound.photo,
    });
  } catch (error) {
    res.status(500).json([error.message]);
  }
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json(["Usuario no encontrado"]);

  const { username, email, password, photo } = req.body;

  if (username) {
    const existingUsername = await User.findOne({
      username: username,
      _id: { $ne: req.user.id },
    });
    if (existingUsername) {
      return res
        .status(400)
        .json({ error: "El nombre de usuario ya está en uso." });
    }
    userFound.username = username;
  }

  if (email) {
    const existingEmail = await User.findOne({
      email: email,
      _id: { $ne: req.user.id },
    });
    if (existingEmail) {
      return res.status(400).json({ error: "El email ya está en uso." });
    }
    userFound.email = email;
  }

  if (password) {
    const passwordHash = await bcrypt.hash(password, 10);
    userFound.password = passwordHash;
  }

  if (req.files["background"] && req.files["background"][0]) {
    userFound.background = req.files["background"][0].filename;
  }

  if (photo) {
    const matches = photo.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (matches.length !== 3) {
      return res.status(400).json({ error: "Invalid input string" });
    }

    const imageBuffer = Buffer.from(matches[2], "base64");
    const imageType = matches[1];
    const imageExtension = imageType.split("/")[1];
    const imageName = `photo-${Date.now()}.${imageExtension}`;
    const imagePath = path.join(
      "D:/Zebkazz/Cursos/Curso_mern/task/images/",
      imageName
    );

    fs.writeFile(imagePath, imageBuffer, (error) => {
      if (error) {
        return res.status(500).json({ error: "Could not save the image" });
      }
      userFound.photo = imageName;
      userFound.save().then(() =>
        res.json({
          id: userFound._id,
          username: userFound.username,
          email: userFound.email,
          photo: userFound.photo,
          background: userFound.background,
          createdAt: userFound.createdAt,
          updatedAt: userFound.updatedAt,
        })
      );
    });
  } else {
    await userFound.save();
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
      background: userFound.background,
      photo: userFound.photo,
    });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(401).json(["No autorizado por favor autentifiquese"]);

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json(["No autorizado"]);

    const userFound = await User.findById(user.id);
    if (!userFound)
      return res.status(401).json(["No autorizado usuario no encontrado"]);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      background: userFound.background,
      photo: userFound.photo,
    });
  });
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};
