var http = require("http");
var fs = require("fs");
var qs = require("querystring");
var url = require("url");

var profil = fs.readFileSync("profil.html");

var server = http.createServer(function (request, response) {
  if (request.url === "/login" && request.method === "GET") {
    //Tampilkan Form Login
    fs.readFile("login_form.html", (error, data) => {
      if (error) {
        //Tampilkan Pesan Error
        response.writeHead(404, { "Content-Type": "text/html" });
        return response.end("404 Not Found");
      }
      //Kirim Form login_form.html
      else {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        return response.end();
      }
    });
  }

  if (request.url === "/login" && request.method === "POST") {
    //Ambil data dari form dan proses
    var requestBody = "";
    request.on("data", function (data) {
      //Tangkap data dari Form
      requestBody += data;
    });

    //Data sudah berhasil didapatkan
    //Selanjutnya kita parse datanya
    request.on("end", function () {
      var formData = qs.parse(requestBody);

      //Cek Login
      if (formData.username === "sonypanca" && formData.password === "dosen") {
        // response.writeHead(200, { "Content-Type": "text/html" });
        // response.write("<h2>Selamat Datang Mahasiswa SP3.2</h2>");
        // response.write("<p>username: " + formData.username + "</p>");
        // response.write("<p>password: " + formData.password + "</p>");

        fs.readFile("profil.html", function (error, data) {
          if (error) {
            response.writeHead(404, { "Content-Type": "text/html" });
            response.end("Halaman Tidak ditemukan");
          } else {
            response.writeHead(200, { "Content-Type": "text/html" });
            response.write(data);
            response.write("<a href='/login'>Kembali</a>");
            response.end();
          }
        });

        // response.writeHead(200, { "Content-Type": "text/html" });
        // response.end(profil);
      } else {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write("<h2>Login Gagal </h2>");
        response.write("<a href='/login'>Coba Lagi</a>");
        response.end();
      }
    });
  }

  //Form Cari
  var q = url.parse(request.url, true);
  if (q.pathname == "/cari" && request.method == "GET") {
    //Ambil Parameter dari URL
    var keyword = q.query.keyword;

    if (keyword) {
      //Ambil data dari form HTLM dengan metode GET
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write("<h2>Pencarian</h2>");
      response.write("<p>Anda Mencari: <b>" + keyword + "</b></p>");
      response.write(
        " <h2><b>Tidak Ada Hasil ! Maaf Website ini masih dalam tahap Pengembangan</h2></b><h2>Oleh Mahasiswa STIKOM PGRI Banyuwangi Semester 3</h2>"
      );
      response.end("<a href='/login'>Kembali</a>");
    }
  }
});
server.listen(3000);
console.log("Sever Berjalan Lancar");
