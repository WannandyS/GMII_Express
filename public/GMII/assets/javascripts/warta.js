console.log ('text');
fetch("https://gmii.gajiin.my.id/warta")
.then((res) => {
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
})
.then((res) => {
    console.log('Data received:', res);
    res.forEach((row) => {
    const warta = document.createElement("div");
    const link1 = document.createElement("a");
    const link2 = document.createElement("a");
    link1.href = row.link_file_bacaan_warta;
    const image = document.createElement("img");
    image.src = "assets/images/fotowarta.svg";
    link2.href = row.bacaan_warta;
    const para = document.createElement("p");
    const node = document.createTextNode (row.tanggal_warta);
    
    para.appendChild(node);
    link1.appendChild(image);
    link2.appendChild(para);
    warta.appendChild(link1);
    warta.appendChild(link2);
    warta.classList.add("isiwarta");
    document.getElementById("bebas").appendChild(warta);
    });
})
.catch((error) => {
    console.error('Error fetching data:', error);
});
