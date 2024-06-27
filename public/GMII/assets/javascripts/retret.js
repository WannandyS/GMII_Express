console.log ('text');
fetch("https://gmii.gajiin.my.id/retret")
.then((res) => res.json())
.then((res) => {
    res.forEach((row) => {
    console.log(row);
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
    });
})
.catch((error) => {
    console.error(error)
});
