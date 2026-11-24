import Swal from "sweetalert2";

export const showLoginAlert = async (): Promise<boolean> => {
  const result = await Swal.fire({
    title: "Login Diperlukan!",
    text: "Silakan login terlebih dahulu untuk mengakses layanan ini.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Login Sekarang",
    cancelButtonText: "Batal",
    confirmButtonColor: "#1A56DB",
    cancelButtonColor: "#6B7280",
    reverseButtons: true,
  });

  return result.isConfirmed;
};
