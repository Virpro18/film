document.getElementsByClassName("search-button")[0].addEventListener("click", () => {
  const inpVal = document.getElementsByClassName("input-keyword")[0].value
  fetch(`https://www.omdbapi.com/?apikey=dca61bcc&s=${inpVal}`)
    .then((response) => response.json())
    .then((data) => {
      const movies = data.Search;
      console.log(movies);
      let cards = ``
      movies.forEach(m => {
        cards += `
        <div class="col-md-4 my-5">
          <div class="card"">
            <img src="${m.Poster}" class=" card-img-top" alt="">
            <div class="card-body">
              <h5 class="card-title">${m.Title}</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
              <a href="#" class="btn btn-primary modal-details-btn" data-bs-toggle="modal" data-bs-target="#MovieInfoModal" data-imdbid="${m.imdbID}">Go somewhere</a>
            </div>
          </div>
        </div>`
        document.getElementsByClassName("movie-cards")[0].innerHTML = cards
      })
      for (const modalButton of document.getElementsByClassName("modal-details-btn")) {
        modalButton.addEventListener("click", async function () {
          const imdbID = this.getAttribute("data-imdbid");
          try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=dca61bcc&i=${imdbID}`);
            if (!response.ok) {
              throw new Error(`Gagal mengambil data film. Status: ${response.status}`);
            }
            const dataID = await response.json();
            
            // Pastikan respons berhasil dan data valid
            if (dataID.Response === "True") {
              const movieDetails = `
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-md">
                      <img src="${dataID.Poster}" alt="img-fluid">
                    </div>
                    <div class="col-md">
                      <ul class="list-group">
                        <li class="list-group-item">Title: ${dataID.Title} (${dataID.Year})</li>
                        <li class="list-group-item">Genre: ${dataID.Genre}</li>
                        <li class="list-group-item">Director: ${dataID.Director}</li>
                        <li class="list-group-item">Rating: ${dataID.imdbRating}</li>
                        <li class="list-group-item">Actors: ${dataID.Actors}</li>
                        <li class="list-group-item">Plot: ${dataID.Plot}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              `;
      
              document.getElementsByClassName("modal-body")[0].innerHTML = movieDetails;
      
              // Jika modal menggunakan library seperti Bootstrap, tampilkan di sini
              // Contoh: $('#movieModal').modal('show'); 
            } else {
              // Tangani jika film tidak ditemukan atau ada masalah lainnya
              document.getElementsByClassName("modal-body")[0].innerHTML = "<p>Film tidak ditemukan atau terjadi kesalahan.</p>";
            }
          } catch (error) {
            console.error("Error fetching movie data:", error);
            document.getElementsByClassName("modal-body")[0].innerHTML = "<p>Terjadi kesalahan saat mengambil data film.</p>";
          }
        });
      }
      
    });
})

