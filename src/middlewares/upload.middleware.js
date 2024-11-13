import multer from "multer";
import path from "path";

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("D:/Zebkazz/Cursos/Curso_mern/task/images/"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Configuración de multer para procesar los archivos de imagen
const upload = multer({
  limits: {
    fileSize: 10 * 2024 * 2024,
    fieldSize: 10 * 2024 * 2024,
  },
  storage: storage,
}).fields([
  { name: "photo", maxCount: 1 },
  { name: "background", maxCount: 1 },
]);

export default upload;
