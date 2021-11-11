document.addEventListener("DOMContentLoaded", function () {

    const inputForm = document.getElementById("i_buku");

    inputForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addBuku();

        document.getElementById("i_bukujudul").value = "";
        document.getElementById("i_bukupenulis").value = "";
        document.getElementById("i_bukutahun").value = "";
        document.getElementById("i_buku_selesai").checked = false;
    });
});

document.addEventListener("onjsonfetched", function () {
    render_buku_s();
});
