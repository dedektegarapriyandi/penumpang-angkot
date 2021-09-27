const input = document.querySelector(".input-form");
const submitBtn = document.querySelector(".submit-btn");
const daftarPenumpang = document.querySelector(".daftar-penumpang");

const createElement = (namaPenumpang) => {
    // div
    const newDiv = document.createElement("div");
    newDiv.classList.add("penumpang");

    // li
    const newLi = document.createElement("li");
    newLi.classList.add("nama");
    newLi.innerText = namaPenumpang;
    newDiv.appendChild(newLi);

    // button
    const newBtn = document.createElement("button");
    newBtn.classList.add("turun");
    newBtn.innerText = "turun";
    newDiv.appendChild(newBtn);

    // add to ul
    daftarPenumpang.appendChild(newDiv);
}

const addPenumpang = (e) => {
    e.preventDefault();

    if (localStorage.getItem("penumpang") === null) {
        penumpang = [];
    } else {
        penumpang = JSON.parse(localStorage.getItem("penumpang"));
    }

    if (input.value === "") {
        return alert("Tidak boleh kosong");
    }

    for(i = 0; i < penumpang.length; i++) {
        if(penumpang[i] == input.value) {
            input.value = "";
            return alert(penumpang[i] + " sudah naik ke angkot");
        }
    }

    createElement(input.value);
    penumpang.push(input.value);
    localStorage.setItem("penumpang", JSON.stringify(penumpang));

    input.value = "";

}

const getPenumpang = () => {
    if (localStorage.getItem("penumpang") === null) {
        penumpang = [];
    } else {
        penumpang = JSON.parse(localStorage.getItem("penumpang"));
    }

    penumpang.forEach((nama) => {
        createElement(nama);
    })

}

window.addEventListener("DOMContentLoaded", getPenumpang);
submitBtn.addEventListener("click", addPenumpang);