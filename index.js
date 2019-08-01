(function(){
    const BASE_URL = 'https://movie-list.alphacamp.io'
    const INDEX_URL = BASE_URL + '/api/v1/movies/'
    const POSTER_URL = BASE_URL + '/posters/'
    const data = []
    const dataPanel = document.querySelector(".data-panel")
    const dataGenres = document.querySelector(".data-genres")
    
    const genresObj = {
        "1": "Action",
        "2": "Adventure",
        "3": "Animation",
        "4": "Comedy",
        "5": "Crime",
        "6": "Documentary",
        "7": "Drama",
        "8": "Family",
        "9": "Fantasy",
        "10": "History",
        "11": "Horror",
        "12": "Music",
        "13": "Mystery",
        "14": "Romance",
        "15": "Science Fiction",
        "16": "TV Movie",
        "17": "Thriller",
        "18": "War",
        "19": "Western"
    }


//----------抓API---------------------

    axios.get(INDEX_URL)
    .then((response) => {
		data.push(...response.data.results)
        displayMovieList(data)
    }).catch((err) => console.log(err))


//-----------函式區----------------------

    //render movie list
    function displayMovieList(data){
        let html = ""
        data.forEach(function(item){
            html += `
            <div class="col-sm-3">
              <div class="card mb-2">
                <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
                <div class="card-body movie-item-body">
                  <h6 class="card-title">${item.title}</h5>
                </div>
                <div class="card-footer">
            `
            item.genres.forEach(function(item){
                html += `
                <ui class="list-inline">
                    <li class="list-inline-item">${genresObj[item]}</li>
                </ul>
                `
            })
            html+= `
                </div>
              </div>
            </div>
            ` 
        })
        dataPanel.innerHTML = html
    }

    //render genres list
    function displayGenresList(){
        let genresHtml = ""
        for(let item in genresObj){
            genresHtml += `
            <label class="btn btn-outline-dark" data-genres="${item}">
            <input type="radio"autocomplete="off">${genresObj[item]}
          </label>    
            `
        }
        dataGenres.innerHTML = genresHtml
    }
    displayGenresList()


//--------------監聽器區--------------------

    //mapping 點擊的genres list跟move的genres，render符合的movie
    dataGenres.addEventListener("click",function(e){
        let results = []
        let dataGenres = event.target.dataset.genres

        results = data.filter(function(item) {
          return (item.genres).includes(Number(dataGenres))   
        })             
        displayMovieList(results)
    })



})()

