import {Router} from "express";
import multer from "multer";
import { reportData, reportFinancial } from "../controllers/emergency.controller";



const router = Router();
const upload = multer ({
    storage: multer.memoryStorage(),
    limits: { fileSize: 15 * 1024 * 1024 }, // Limit file size to 15 MB
    fileFilter: (_, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Format file tidak didukung. Hanya JPG, PNG, dan WEBP yang diperbolehkan."));
        }}
})

// Route for report data
router.post("/data", upload.single("fileBukti"), reportData);

// Route for report financial
router.post("/financial", upload.single("file"), reportFinancial);


upload.single("fileBukti");

export default router;