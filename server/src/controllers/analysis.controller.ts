import type { Request, Response } from "express";



export const analyzePhoneNumber = async (req: Request, res: Response) => {
  const { nomorTelepon } = req.body ?? { };

  if(!nomorTelepon) {
    return res.status(400).json({ message: "Nomor telepon tidak boleh kosong." });
  }

  const phoneNumber = String(nomorTelepon).replace(/\s+/g, "").replace(/-/g, "").trim();

  if(!/^\+?\d{10,15}$/.test(phoneNumber)) {
    return res.status(400).json({ message: "Nomor telepon tidak valid. Pastikan hanya berisi angka dan memiliki panjang antara 10 hingga 15 digit." });
  }

 try {
    const aiRes = await fetch(
      `${process.env.AI_SERVICE_URL}/api/v1/analyze/phone`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Token": process.env.AI_API_TOKEN ?? "",
        },
        body: JSON.stringify({ phone_number : phoneNumber }),
        signal: AbortSignal.timeout(90_000),
      }
    );

    const data = await aiRes.json();

    if (!aiRes.ok) {
        return res.status(aiRes.status).json({ message: data.detail || "Terjadi kesalahan saat menganalisis nomor telepon." });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error analyzing phone number:", error);
    return res.status(500).json({ message: "Terjadi kesalahan internal server saat menganalisis nomor telepon." });
  } 
}

export const analyzeChat = async (req: Request, res: Response) => {
  if(!req.file) {
    return res.status(400).json({ message: "File bukti pesan harus diunggah." });
  }

  const { pesan } = req.body ?? { };

  if(!pesan) {
    return res.status(400).json({ message: "Pesan tidak boleh kosong." });
  }

  const fd = new FormData();
  fd.append("text_content", String(pesan));
  fd.append(
    "image",
    new Blob([new Uint8Array(req.file.buffer)], { type: req.file.mimetype }),
    req.file.originalname
  );  

  try {
    const aiRes = await fetch(
      `${process.env.AI_SERVICE_URL}/api/v1/analyze/text`,
      {
        method: "POST",
        headers: {
          "X-API-Token": process.env.AI_API_TOKEN ?? "",
        },
        body: fd,
        signal: AbortSignal.timeout(90_000),
      }
    );

    const data = await aiRes.json();

    if (!aiRes.ok) {
        return res.status(aiRes.status).json({ message: data.detail || "Terjadi kesalahan saat menganalisis pesan chat." });
    }
    return res.status(200).json(data);
  
  } catch (error) {
    console.error("Error analyzing chat message:", error);
    return res.status(500).json({ message: "Terjadi kesalahan internal server saat menganalisis pesan chat." });
  }

}

export const analyzeScreenshot = async (req: Request, res: Response) => {
  if(!req.file) {
    return res.status(400).json({ message: "File bukti screenshot harus diunggah." });
  }

  const { platform } = req.body ?? { };

  if(!platform) {
    return res.status(400).json({ message: "platform tidak boleh kosong." });
  }

  const fd = new FormData();
  fd.append("platform", String(platform));
  fd.append(
    "image",
    new Blob([new Uint8Array(req.file.buffer)], { type: req.file.mimetype }),
    req.file.originalname
  );  

  try {
    const aiRes = await fetch(
      `${process.env.AI_SERVICE_URL}/api/v1/analyze/image`,
      {
        method: "POST",
        headers: {
          "X-API-Token": process.env.AI_API_TOKEN ?? "",
        },
        body: fd,
        signal: AbortSignal.timeout(90_000),
      }
    );

    const data = await aiRes.json();

    if (!aiRes.ok) {
        return res.status(aiRes.status).json({ message: data.detail || "Terjadi kesalahan saat menganalisis platform chat." });
    }
    return res.status(200).json(data);
  
  } catch (error) {
    console.error("Error analyzing chat message:", error);
    return res.status(500).json({ message: "Terjadi kesalahan internal server saat menganalisis tangkapan layar chat." });
  }

}