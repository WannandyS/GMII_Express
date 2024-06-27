console.log ('text');
fetch("https://gmii.gajiin.my.id/retret")
.then((res) => {
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
})
.then((res) => {
    console.log('Data received:', res);
    for (let i = 0; i < res.length; i++) {
        const row = res[i];

        const frame = document.createElement("div");
        const para = document.createElement("p");
        const node = document.createTextNode(row.informasi_retret);
        const embed = document.createElement("embed");
        embed.src = row.link_file_informasi_retret;
        
        para.appendChild(node);
        document.getElementById("mundur").appendChild(para);
        frame.appendChild(embed);
        frame.classList.add("framework");
        document.getElementById("mundur").appendChild(frame);
    }
})
.catch((error) => {
    console.error('Error fetching data:', error);
});
