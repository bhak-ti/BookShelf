const storage_KEY = "BookShelf";

let buku_s = [];

function hapusBuku(idBuku) {
    for (let i = 0; i < buku_s.length; i++) {
        if (buku_s[i].id == idBuku) {
            buku_s.splice(i, 1);
            break;
        }
    }
}

function updateJson() {   
        localStorage.setItem(storage_KEY, JSON.stringify(buku_s));
}

function fetchJson() {
    let data = JSON.parse(localStorage.getItem(storage_KEY));

    buku_s = data;

    document.dispatchEvent(new Event("onjsonfetched"));
}

function createBukuObject(id, judul, penulis, tahun, is_complete) {
    return {
        id, judul, penulis, tahun, is_complete,
    };
}

function render_buku_s() {
    for (Buku of buku_s) {
        const newBuku = createBuku(Buku.id, Buku.judul, Buku.penulis, Buku.tahun, Buku.is_complete);

        if (Buku.is_complete) {
            document.getElementById(selesai).append(newBuku);
        } else {
            document.getElementById(xSelesai).append(newBuku);
        }
    }
}

