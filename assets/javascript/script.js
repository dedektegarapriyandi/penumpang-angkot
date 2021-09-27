const input = document.querySelector(".input-form");
const submitBtn = document.querySelector(".submit-btn");
const daftarPenumpang = document.querySelector(".daftar-penumpang");
const daftarPenumpangTurun = document.querySelector(".daftar-penumpang-turun");

const createElement = (namaPenumpang, section) => {
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
    section.appendChild(newDiv);
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

    for (i = 0; i < penumpang.length; i++) {
        if (penumpang[i] == input.value) {
            input.value = "";
            return alert(penumpang[i] + " sudah naik ke angkot");
        }
    }

    createElement(input.value, daftarPenumpang);
    penumpang.push(input.value);
    localStorage.setItem("penumpang", JSON.stringify(penumpang));

    input.value = "";

}

const getPenumpangNaik = () => {
    if (localStorage.getItem("penumpang") === null) {
        penumpang = [];
    } else {
        penumpang = JSON.parse(localStorage.getItem("penumpang"));
    }

    penumpang.forEach((nama) => {
        createElement(nama, daftarPenumpang);
    });
}

const turunPenumpang = (e) => {
    if (e.target.classList.contains("turun")) {
        if(localStorage.getItem("penumpangTurun") === null) {
            penumpangTurun = [];
        }else {
            penumpangTurun = JSON.parse(localStorage.getItem("penumpangTurun"));
        }

        const index = e.target.parentElement.children[0].innerText;
        const namaPTurun = penumpang.splice(penumpang.indexOf(index), 1);

        namaPTurun.forEach((nama) => {
            penumpangTurun.push(nama);
            createElement(nama, daftarPenumpangTurun)
        });

        e.target.parentElement.remove();

        localStorage.setItem("penumpang", JSON.stringify(penumpang));
        localStorage.setItem("penumpangTurun", JSON.stringify(penumpangTurun));
    }
}

const getPenumpangTurun = () => {
    if(localStorage.getItem("penumpangTurun") === null) {
        penumpangTurun = [];
    }else {
        penumpangTurun = JSON.parse(localStorage.getItem("penumpangTurun"));
    }

    penumpangTurun.forEach((nama) => {
        createElement(nama, daftarPenumpangTurun);
    });
}

window.addEventListener("DOMContentLoaded", getPenumpangNaik);
window.addEventListener("DOMContentLoaded", getPenumpangTurun);
submitBtn.addEventListener("click", addPenumpang);
daftarPenumpang.addEventListener("click", turunPenumpang);