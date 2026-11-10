import type { Request, Response } from "express";

export const reportFinancial = async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ message: "File bukti transfer harus diunggah." });
    }

    const {
        jenisBank,
        kanalMedia,
        tanggalKejadian,
        tujuanTransaksi,
        namaInstitusi,
        nomorRekening,
        namaPemilikRekening,
        nominalKerugian,
        detailKronologi,
    } = req.body ?? {};

    if (!jenisBank) {
        return res.status(400).json({ message: "Bank/dompet digital korban harus diisi." });
    }
    if (!kanalMedia) {
        return res.status(400).json({ message: "Kanal media kejadian harus diisi." });
    }
    if (!tanggalKejadian) {
        return res.status(400).json({ message: "Tanggal kejadian harus diisi." });
    }
    if (!tujuanTransaksi) {
        return res.status(400).json({ message: "Tujuan transaksi harus diisi." });
    }
    if (!nomorRekening) {
        return res.status(400).json({ message: "Nomor rekening penipu harus diisi." });
    }
    if (nominalKerugian === undefined || nominalKerugian === "" || Number.isNaN(Number(nominalKerugian))) {
        return res.status(400).json({ message: "Nominal kerugian harus berupa angka." });
    }

    const fd = new FormData();
    fd.append("bank_korban", String(jenisBank));
    fd.append("platform_kejadian", String(kanalMedia));
    fd.append("tanggal_kejadian", String(tanggalKejadian));
    fd.append("tujuan_transaksi", String(tujuanTransaksi));
    fd.append("nomor_rekening_penipu", String(nomorRekening));
    fd.append("nominal_kerugian", String(Number(nominalKerugian)));
    if (namaInstitusi) fd.append("nama_institusi_penipu", String(namaInstitusi));
    if (namaPemilikRekening) fd.append("nama_pemilik_penipu", String(namaPemilikRekening));
    if (detailKronologi) fd.append("kronologi_user", String(detailKronologi));
    fd.append(
        "bukti_transfer",
        new Blob([new Uint8Array(req.file.buffer)], { type: req.file.mimetype }),
        req.file.originalname
    );

    try {
        const aiRes = await fetch(
            `${process.env.AI_SERVICE_URL}/api/v1/emergency/financial`,
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
            return res.status(aiRes.status).json({ message: data.detail || "Terjadi kesalahan saat mengirim laporan." });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error("Error reporting financial:", error);
        return res.status(500).json({ message: "Terjadi kesalahan internal server saat mengirim laporan." });
    }
}

export const reportData = async (req: Request, res: Response) => {
    if(!req.file) {
        return res.status(400).json({ message: "File bukti screenshot harus diunggah." });
    }

    const { jenisData } = req.body ?? { };
    const { tanggalKejadian } = req.body ?? { };
    const { kanalMedia } = req.body ?? { };
    const { tindakanPelaku } = req.body ?? { };
    const {detailKronologi} = req.body ?? { };
    const { statusAkses } = req.body ?? { };


    if(!jenisData) {
        return res.status(400).json({ message: "jenisData tidak boleh kosong." });
    }

    if (!tanggalKejadian) {
        return res.status(400).json({ message: "tanggalKejadian tidak boleh kosong." });
    }

    if (!kanalMedia) {
        return res.status(400).json({ message: "kanalMedia tidak boleh kosong." });
    }

    if (!tindakanPelaku) {
        return res.status(400).json({ message: "tindakanPelaku tidak boleh kosong." });
    }

    if (!detailKronologi) {
        return res.status(400).json({ message: "detailKronologi tidak boleh kosong." });
    }

    if (!statusAkses) {
        return res.status(400).json({ message: "statusAkses tidak boleh kosong." });
    }

    if (!req.file) {
        return res.status(400).json({ message: "File bukti tidak boleh kosong." });
    }

    const fd = new FormData();
    fd.append("jenis_data", String(jenisData));
    fd.append("tanggal_kejadian", String(tanggalKejadian));
    fd.append("platform_kejadian", String(kanalMedia));
    fd.append("tindakan_pelaku", String(tindakanPelaku));
    fd.append("detailKronologi", String(detailKronologi));
    fd.append("status_akses", String(statusAkses));
    fd.append(
        "bukti_percakapan",
        new Blob([new Uint8Array(req.file.buffer)], { type: req.file.mimetype }),
        req.file.originalname
    );

    try {
        const aiRes = await fetch(
            `${process.env.AI_SERVICE_URL}/api/v1/emergency/data-breach`,
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
            return res.status(aiRes.status).json({ message: data.detail || "Terjadi kesalahan saat mengirim laporan." });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error("Error reporting data:", error);
        return res.status(500).json({ message: "Terjadi kesalahan internal server saat mengirim laporan." });
    }



}