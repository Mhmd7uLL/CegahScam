import {Router} from "express";
import { analyzeChat, analyzeScreenshot } from "../controllers/analysis.controller";
import { analyzePhoneNumber } from "../controllers/analysis.controller";
import multer from "multer";


const router = Router();
const upload = multer ({
    storage: multer.memoryStorage(),
    limits: { fileSize: 15 * 1024 * 1024 }, // Limit file size to 15 MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Format file tidak didukung. Hanya JPG, PNG, dan WEBP yang diperbolehkan."));
        }}
})

// Route for analyzing phone numbers
router.post("/phone", analyzePhoneNumber);

// Route for analyzing chat messages
router.post("/chat", upload.single("fileBukti"), analyzeChat);

// Route for analyzing screenshots
router.post("/screenshot", upload.single("fileBukti"), analyzeScreenshot);

upload.single("fileBukti");

export default router;