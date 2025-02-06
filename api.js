const apiKey = "b5103149";
// titles: "http://www.omdbapi.com/?s=thor&page=1&apikey=b5103149"
//details: "http://www.omdbapi.com/?i=tt3896198&apikey=b5103149"
// const searchURL = `http://www.omdbapi.com/?t=${searchTerm}&page=1&apikey=b5103149`
const search = document.querySelector(".form__text_search");
const form = document.querySelector("form");
const label = document.querySelector("label");
const films = document.querySelector(".films")
const button = document.querySelector(".form__button");
const type = document.querySelector(".form__select_type");
const info = document.querySelector(".info");
const title = document.querySelector(".films__category");
const pagination = document.querySelector(".pagination");
const next = document.getElementById("next");
const back = document.getElementById("back");


let currentPage = 1;
const totalPages = 6



form.addEventListener("submit",(e) => {
    e.preventDefault(); 
    fetchMovies(1);
    function fetchMovies(page) {
        const searchValue = search.value;
        const typeValue = type.value;
        title.textContent = typeValue + ":";
        title.style.opacity = 1;
        pagination.innerHTML = "";
        

        if (searchValue.length > 0 ) {
        fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchValue}&type=${typeValue}&page=${page}`)
        .then(response => response.json())
        .then(data => {
        films.innerHTML = "";
        
        for (let i = 0; i < 3; i++) {
        const movie = data.Search[i];
        if (movie) {
        const movieCard = document.createElement("div");
        movieCard.innerHTML = `
        <div class="films__card">
                    <div class="films__card_img">
                        <img src="${movie.Poster}" alt="">
                    </div>
                    <div class="films__card_text">
                        <p>${movie.Type}</p>
                        <p><strong>${movie.Title}</strong></p>
                        <p>${movie.Year}</p>
                        <button class="flims__card_text-buttom" data-imdbid="${movie.imdbID}">Detalis</button>
                    </div>
                </div>
        `;
        films.appendChild(movieCard);
        movieCard.style.width = "35%";
        movieCard.querySelector(".flims__card_text-buttom").addEventListener("click",function() {
                const imdbID = this.getAttribute("data-imdbid");
                fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}&page=${page}`)
                .then(response => response.json())
                .then(data => {
                    info.innerHTML = "";
                        const movieInfoCard = document.createElement("div");
                            movieInfoCard.innerHTML = `
                            <h2 class="info__title">Film info!</h2>
                            <div class="info__card">
                <div class="info__card_img">
                    <img src="${data.Poster}" alt="">
                </div>
                <div class="info__card_text">
                    <span><b>Tittle:</b><p>${data.Title}</p></span>
                    <span><b>Released:</b><p>${data.Released}</p></span>
                    <span><b>Genre:</b><p>${data.Genre}</p></span>
                    <span><b>Country:</b><p>${data.Country}</p></span>
                    <span><b>Director:</b><p>${data.Director}</p></span>
                    <span><b>Writer:</b><p>${data.Writer}</p></span>
                    <span><b>Actors:</b><p>${data.Actors}</p></span>
                    <span><b>Awards:</b><p>${data.Awards}</p></span>
                </div>
            </div> 
            `;
            info.appendChild(movieInfoCard);
            movieInfoCard.style.width = "100%";
                });
                
            })
        }
        }

        })
        .catch(error => {
        console.error(error);
        title.textContent = "Movie not found!";

        });
        }

                function createButton(){
                    for (let i = 1;i <= totalPages;i++) {
                        const btn = document.createElement("button");
                        btn.classList.add("pagination__button")
                        btn.textContent = i;
                        if(i === currentPage) {
                            btn.disabled = true;
                        }
                        btn.addEventListener("click",function(){
                            currentPage = i;
                            fetchMovies(currentPage);
                        })
                        pagination.appendChild(btn);
                    }
                    const prevButton = document.createElement("button");
                    prevButton.textContent = "<<";
                    prevButton.classList.add("btnBack");
                    prevButton.addEventListener("click",function(){
                        if(currentPage > 1) {
                            currentPage--;
                            fetchMovies(currentPage)
                        }
                    })
                    pagination.appendChild(prevButton);
                    const nextButton = document.createElement("button");
                    nextButton.textContent = ">>"
                    nextButton.classList.add("btnNext");
                    nextButton.addEventListener("click",function(){
                        if(currentPage < totalPages) {
                            currentPage++;
                            fetchMovies(currentPage);
                        }
                    })
                    pagination.appendChild(nextButton);

            }
            createButton();
        };
    });




