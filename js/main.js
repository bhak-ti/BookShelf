const xSelesai = "xSelesaiList";
const selesai = "SelesaiList";

function addBuku() {
    const idBuku = +new Date();
    const i_bukujudul = document.getElementById("i_bukujudul").value;
    const i_bukupenulis = document.getElementById("i_bukupenulis").value;
    const i_bukutahun = document.getElementById("i_bukutahun").value;
    const i_buku_selesai = document.getElementById("i_buku_selesai").checked;

    const Buku = createBuku(idBuku, i_bukujudul, i_bukupenulis, i_bukutahun, i_buku_selesai);
    const BukuObject = createBukuObject(idBuku, i_bukujudul, i_bukupenulis, i_bukutahun, i_buku_selesai);

    buku_s.push(BukuObject);

    if (i_buku_selesai) {
        document.getElementById(selesai).append(Buku);
    } else {
        document.getElementById(xSelesai).append(Buku);
    }

    updateJson();
}

function createBuku(idBuku, i_bukujudul, i_bukupenulis, i_bukutahun, i_buku_selesai) {
    const Buku = document.createElement("article");
    Buku.setAttribute("id", idBuku)
    Buku.classList.add("card", "my-3");

    const Bukujudul = document.createElement("h5");
    Bukujudul.innerText = i_bukujudul;

    const Bukupenulis = document.createElement("span");
    Bukupenulis.innerText = i_bukupenulis;

    const Bukutahun = document.createElement("span");
    Bukutahun.innerText = i_bukutahun;

    const br = document.createElement("br");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-body", "border-start", "border-4", "border-warning", "d-flex", "justify-content-between");

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const cardAction = addAction(i_buku_selesai, idBuku);

    cardContent.append(Bukujudul, Bukupenulis, br, Bukutahun);
    cardContainer.append(cardContent);
    cardContainer.append(cardAction);
    Buku.append(cardContainer);

    return Buku;
}

function createHapus(idBuku) {
    const Hapus = document.createElement("button");
    Hapus.classList.add("btn", "btn-md", "btn-danger", "mx-1");
    Hapus.innerHTML = '<i class="bi bi-x">Hapus</i>';

    Hapus.addEventListener("click", function () {
        let confirmation = confirm("hapus buku?");

        if (confirmation) {
            const card_p = document.getElementById(idBuku);
            card_p.addEventListener("eventDelete", function (event) {
                event.target.remove();
            });
            card_p.dispatchEvent(new Event("eventDelete"));

            deleteBuku(idBuku);
            updateJson();
        }
    });

    return Hapus;
}

function createBaca(idBuku) {
    const action = document.createElement("button");
    action.classList.add("btn", "btn-md", "btn-primary");
    action.innerHTML = '<i class="bi bi-check">Selesai</i>';

    action.addEventListener("click", function () {
        const card_p = document.getElementById(idBuku);

        const Bukujudul = card_p.querySelector(".card-content > h5").innerText;
        const Bukupenulis = card_p.querySelectorAll(".card-content > span")[0].innerText;
        const Bukutahun = card_p.querySelectorAll(".card-content > span")[1].innerText;

        card_p.remove();

        const Buku = createBuku(idBuku, Bukujudul, Bukupenulis, Bukutahun, true);
        document.getElementById(selesai).append(Buku);

        deleteBuku(idBuku);
        const BukuObject = createBukuObject(idBuku, Bukujudul, Bukupenulis, Bukutahun, true);

        buku_s.push(BukuObject);
        updateJson();
    })

    return action;
}

function createActionUndo(idBuku) {
    const action = document.createElement("button");

    action.addEventListener("click", function () {
        const card_p = document.getElementById(idBuku);

        const Bukujudul = card_p.querySelector(".card-content > h5").innerText;
        const Bukupenulis = card_p.querySelectorAll(".card-content > span")[0].innerText;
        const Bukutahun = card_p.querySelectorAll(".card-content > span")[1].innerText;

        card_p.remove();

        const Buku = createBuku(idBuku, Bukujudul, Bukupenulis, Bukutahun, false);
        document.getElementById(xSelesai).append(Buku);

        deleteBuku(idBuku);
        const BukuObject = createBukuObject(idBuku, Bukujudul, Bukupenulis, Bukutahun, false);

        buku_s.push(BukuObject);
        updateJson();
    })

    return action;
}

function addAction(i_buku_selesai, idBuku) {
    const cardActions = document.createElement("div");

    const Hapus = createHapus(idBuku);
    const Baca = createBaca(idBuku);

    cardActions.append(Hapus);

    if (i_buku_selesai) {
        cardActions.append(Hapus);
    } else {
        cardActions.append(Baca);
    }

    return cardActions;
}

