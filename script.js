// Mengecek halaman aktif
const page = location.pathname.split("/").pop();

// Proteksi halaman (harus login)
if (page !== "index.html" && localStorage.getItem("isLogin") !== "true") {
  location.href = "index.html";
}

if (page === "index.html" && localStorage.getItem("isLogin") === "true") {
  location.href = "beranda.html";
}

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (username.value === "admin" && password.value === "123") {
      localStorage.setItem("isLogin", "true");
      location.href = "beranda.html";
    } else {
      alert("Login gagal");
    }
  });
}

// LOGOUT
function logout() {
  localStorage.removeItem("isLogin");
  location.href = "index.html";
}

// ================= TRANSAKSI =================
const form = document.getElementById("formTransaksi");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Ambil value input dengan aman
    const peminjam = document.getElementById("peminjam").value;
    const nama = document.getElementById("nama").value;
    const jumlah = document.getElementById("jumlah").value;
    const kategori = document.getElementById("kategori").value;
    const status = document.getElementById("status").value;
    const tanggal = document.getElementById("tanggal").value;

    // Validasi
    if (
      peminjam === "" ||
      nama === "" ||
      jumlah === "" ||
      kategori === "" ||
      status === "" ||
      tanggal === ""
    ) {
      alert("Semua data wajib diisi");
      return;
    }

    // Ambil data lama
    const data = JSON.parse(localStorage.getItem("transaksi")) || [];

    // Simpan data baru
    data.push({
      peminjam: peminjam,
      nama: nama,
      jumlah: jumlah,
      kategori: kategori,
      status: status,
      tanggal: tanggal,
    });

    localStorage.setItem("transaksi", JSON.stringify(data));

    form.reset();
    tampilkan();
  });
}

// ================= TAMPILKAN DATA =================
function tampilkan() {
  const tbody = document.getElementById("tabelTransaksi");
  if (!tbody) return;

  tbody.innerHTML = "";

  const data = JSON.parse(localStorage.getItem("transaksi")) || [];

  data.forEach((d, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${d.peminjam}</td>
        <td>${d.nama}</td>
        <td>${d.jumlah}</td>
        <td>${d.kategori}</td>
        <td>${d.status}</td>
        <td>${d.tanggal}</td>
      </tr>
    `;
  });
}

document.addEventListener("DOMContentLoaded", tampilkan);
