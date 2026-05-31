// ======================
// DATA STORAGE
// ======================

let pelanggan = JSON.parse(localStorage.getItem("pelanggan")) || [];

let pemasangan = JSON.parse(localStorage.getItem("pemasangan")) || [];

let teknisi = JSON.parse(localStorage.getItem("teknisi")) || [];

let tiket = JSON.parse(localStorage.getItem("tiket")) || [];

let riwayat = JSON.parse(localStorage.getItem("riwayat")) || [];

let gudang = JSON.parse(localStorage.getItem("gudang")) || [
{
nama:"ONU ZTE",
stok:10,
satuan:"Unit"
},
{
nama:"Fast Connector",
stok:200,
satuan:"Pcs"
},
{
nama:"Kabel Dropcore",
stok:500,
satuan:"Meter"
}
];

// ======================
// NAVIGASI MENU
// ======================

function showPage(id, el){

document.querySelectorAll(".page").forEach(p=>{
p.classList.remove("active-page");
});

document.getElementById(id).classList.add("active-page");

document.querySelectorAll(".menu").forEach(m=>{
m.classList.remove("active");
});

el.classList.add("active");

}

// ======================
// TOAST
// ======================

function showToast(text){

let toast = document.getElementById("toast");

toast.innerText = text;
toast.style.display = "block";

setTimeout(()=>{
toast.style.display = "none";
},2500);

}

// ======================
// SAVE STORAGE
// ======================

function save(){

localStorage.setItem("pelanggan",JSON.stringify(pelanggan));
localStorage.setItem("pemasangan",JSON.stringify(pemasangan));
localStorage.setItem("teknisi",JSON.stringify(teknisi));
localStorage.setItem("tiket",JSON.stringify(tiket));
localStorage.setItem("riwayat",JSON.stringify(riwayat));
localStorage.setItem("gudang",JSON.stringify(gudang));

}

// ======================
// MODAL PELANGGAN
// ======================

function openTambahPelanggan(){
document.getElementById("modalPelanggan").style.display="flex";
}

function closeModalPelanggan(){
document.getElementById("modalPelanggan").style.display="none";
}

function simpanPelanggan(){

let nama = document.getElementById("namaPelanggan").value;
let wa = document.getElementById("waPelanggan").value;
let paket = document.getElementById("paketPelanggan").value;
let alamat = document.getElementById("alamatPelanggan").value;

if(!nama || !wa || !paket || !alamat){
showToast("Data belum lengkap");
return;
}

pelanggan.push({nama,wa,paket,alamat,status:"Aktif"});

save();
renderPelanggan();

closeModalPelanggan();

showToast("Pelanggan ditambahkan");

}

// ======================
// RENDER PELANGGAN
// ======================

function renderPelanggan(){

let body = document.getElementById("pelangganBody");
body.innerHTML = "";

pelanggan.forEach((p,i)=>{

body.innerHTML += `
<tr>
<td>${p.nama}</td>
<td>${p.wa}</td>
<td>${p.paket}</td>
<td>${p.alamat}</td>
<td>${p.status}</td>
<td>
<button class="btn-delete" onclick="hapusPelanggan(${i})">Hapus</button>
</td>
</tr>
`;

});

}

function hapusPelanggan(i){
pelanggan.splice(i,1);
save();
renderPelanggan();
showToast("Dihapus");
}

// ======================
// PEMASANGAN
// ======================

function openTambahPemasangan(){
document.getElementById("modalPemasangan").style.display="flex";
}

function closeModalPemasangan(){
document.getElementById("modalPemasangan").style.display="none";
}

function simpanPemasangan(){

let nama = document.getElementById("namaPemasangan").value;
let wa = document.getElementById("waPemasangan").value;
let lokasi = document.getElementById("lokasiPemasangan").value;
let maps = document.getElementById("mapsPemasangan").value;
let paket = document.getElementById("paketPemasangan").value;

if(!nama || !wa || !lokasi){
showToast("Lengkapi data");
return;
}

pemasangan.push({
nama,wa,lokasi,maps,paket,
status:"Menunggu Survey"
});

save();
renderPemasangan();

closeModalPemasangan();

showToast("Calon pelanggan ditambahkan");

}

function renderPemasangan(){

let body = document.getElementById("pemasanganBody");
body.innerHTML = "";

pemasangan.forEach((p,i)=>{

body.innerHTML += `
<tr>
<td>${p.nama}</td>
<td>${p.wa}</td>
<td>${p.lokasi}</td>
<td>
<a href="${p.maps}" target="_blank">Maps</a>
</td>
<td>${p.paket}</td>
<td>
<select onchange="ubahStatusPemasangan(${i},this.value)">
<option ${p.status=="Menunggu Survey"?"selected":""}>Menunggu Survey</option>
<option ${p.status=="Survey"?"selected":""}>Survey</option>
<option ${p.status=="Proses Instalasi"?"selected":""}>Proses Instalasi</option>
<option ${p.status=="Aktivasi"?"selected":""}>Aktivasi</option>
<option ${p.status=="Selesai"?"selected":""}>Selesai</option>
</select>
</td>
<td></td>
</tr>
`;

});

}

function ubahStatusPemasangan(i,status){

pemasangan[i].status = status;

// kalau selesai pindah ke pelanggan
if(status === "Selesai"){

pelanggan.push({
nama:pemasangan[i].nama,
wa:pemasangan[i].wa,
paket:pemasangan[i].paket,
alamat:pemasangan[i].lokasi,
status:"Aktif"
});

riwayat.push({
tipe:"Pemasangan",
nama:pemasangan[i].nama,
keterangan:"Instalasi selesai",
status:"Done"
});

pemasangan.splice(i,1);

showToast("Instalasi selesai");

}

save();
renderPemasangan();
renderPelanggan();
renderRiwayat();

}

// ======================
// TEKNISI
// ======================

function openTambahTeknisi(){

let nama = prompt("Nama pelanggan");
let teknisiNama = prompt("Nama teknisi");
let tanggal = new Date().toLocaleDateString();

if(!nama || !teknisiNama) return;

teknisi.push({
nama,
teknisi:teknisiNama,
tanggal,
status:"Dikerjakan"
});

save();
renderTeknisi();

showToast("Jadwal ditambahkan");

}

function renderTeknisi(){

let body = document.getElementById("teknisiBody");
body.innerHTML = "";

teknisi.forEach(t=>{

body.innerHTML += `
<tr>
<td>${t.nama}</td>
<td>${t.teknisi}</td>
<td>${t.tanggal}</td>
<td>${t.status}</td>
</tr>
`;

});

}

// ======================
// HELPDESK
// ======================

function openTambahTiket(){
document.getElementById("modalTiket").style.display="flex";
}

function closeModalTiket(){
document.getElementById("modalTiket").style.display="none";
}

function simpanTiket(){

let nama = document.getElementById("namaTiket").value;
let keluhan = document.getElementById("keluhanTiket").value;

if(!nama || !keluhan){
showToast("Lengkapi data");
return;
}

tiket.push({
id:"TK"+Math.floor(Math.random()*9999),
nama,
keluhan,
status:"Open"
});

save();
renderTiket();

closeModalTiket();

showToast("Tiket dibuat");

}

function renderTiket(){

let body = document.getElementById("tiketBody");
body.innerHTML = "";

tiket.forEach((t,i)=>{

body.innerHTML += `
<tr>
<td>${t.id}</td>
<td>${t.nama}</td>
<td>${t.keluhan}</td>
<td>
<select onchange="ubahStatusTiket(${i},this.value)">
<option ${t.status=="Open"?"selected":""}>Open</option>
<option ${t.status=="Proses"?"selected":""}>Proses</option>
<option ${t.status=="Done"?"selected":""}>Done</option>
</select>
</td>
<td></td>
</tr>
`;

});

}

function ubahStatusTiket(i,status){

tiket[i].status = status;

if(status === "Done"){
riwayat.push({
tipe:"Tiket",
nama:tiket[i].nama,
keterangan:tiket[i].keluhan,
status:"Done"
});

tiket.splice(i,1);

showToast("Tiket selesai");
}

save();
renderTiket();
renderRiwayat();

}

// ======================
// GUDANG
// ======================

function tambahBarang(){

let nama = prompt("Nama barang");
let stok = prompt("Stok");
let satuan = prompt("Satuan");

if(!nama || !stok) return;

gudang.push({nama,stok,satuan});

save();
renderGudang();

showToast("Barang ditambah");

}

function renderGudang(){

let body = document.getElementById("gudangBody");
body.innerHTML = "";

gudang.forEach((g,i)=>{

body.innerHTML += `
<tr>
<td>${g.nama}</td>
<td>${g.stok}</td>
<td>${g.satuan}</td>
<td>
<button class="btn-edit" onclick="editStok(${i})">Edit</button>
</td>
</tr>
`;

});

}

function editStok(i){

let stok = prompt("Update stok",gudang[i].stok);

if(stok){
gudang[i].stok = stok;
save();
renderGudang();
showToast("Stok diperbarui");
}

}

// ======================
// RIWAYAT
// ======================

function renderRiwayat(){

let body = document.getElementById("riwayatBody");
body.innerHTML = "";

riwayat.forEach(r=>{

body.innerHTML += `
<tr>
<td>${r.tipe}</td>
<td>${r.nama}</td>
<td>${r.keterangan}</td>
<td>${r.status}</td>
</tr>
`;

});

}

// ======================
// DARK MODE
// ======================

document.getElementById("darkModeBtn").onclick = () => {
document.body.classList.toggle("dark-mode");
};

// ======================
// INIT
// ======================

renderPelanggan();
renderPemasangan();
renderTeknisi();
renderTiket();
renderGudang();
renderRiwayat();