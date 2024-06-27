console.log('Fetching data from backend...');
fetch("https://gmii.gajiin.my.id/kegiatan_gereja")
  .then((res) => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  })
  .then((data) => {
    console.log('Data received:', data);
    
    // Fungsi untuk menghasilkan HTML berdasarkan data
    function generateHTML(data) {
      let html = '';

      // Jika data tidak kosong, buat elemen untuk setiap item data
      if (data.length > 0) {
        data.forEach((row) => {
          const kegiatan_gereja = document.createElement("div");
          kegiatan_gereja.classList.add("kegiatan");

          const kiri = document.createElement("div");
          kiri.classList.add("left");
          const kanan = document.createElement("div");
          kanan.classList.add("right");
          const waktu = document.createElement("div");
          waktu.classList.add("waktu");
          const jalan = document.createElement("div");
          jalan.classList.add("jalan");

          const image1 = document.createElement("img");
          image1.src = "assets/images/fotodoa.jpg";
          kiri.appendChild(image1);

          const para1 = document.createElement("h2");
          const node1 = document.createTextNode(row.tanggal_kegiatan);
          para1.appendChild(node1);
          waktu.appendChild(para1);

          const para2 = document.createElement("h5");
          const node2 = document.createTextNode(row.jam_kegiatan);
          para2.appendChild(node2);
          waktu.appendChild(para2);

          const para3 = document.createElement("h5");
          const node3 = document.createTextNode(row.nama_kegiatan);
          para3.appendChild(node3);
          kanan.appendChild(para3);

          const image2 = document.createElement("img");
          image2.src = "assets/images/location.png";
          const para4 = document.createElement("p");
          const node4 = document.createTextNode(row.lokasi_kegiatan);
          para4.appendChild(image2);
          para4.appendChild(node4);
          jalan.appendChild(para4);

          kegiatan_gereja.appendChild(kiri);
          kegiatan_gereja.appendChild(kanan);
          kanan.appendChild(waktu);
          kanan.appendChild(jalan);
          kegiatan_gereja.classList.add("jadwal-item");

          document.getElementById("event").appendChild(kegiatan_gereja);
        });
      } else {
        // Jika data kosong, tampilkan pesan "Data Tidak Ditemukan"
        html = `
          <div class="jadwal-item">
            Data Tidak Ditemukan !
          </div>
        `;
        document.getElementById("event").innerHTML = html;
      }
    }

    // Panggil fungsi generateHTML dengan data yang diterima dari backend
    generateHTML(data);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
    // Jika terjadi kesalahan, tampilkan pesan di elemen kontainer
    const container = document.getElementById('event');
    container.innerHTML = `
      <div class="jadwal-item">
        Error fetching data. Please try again later.
      </div>
    `;
  });