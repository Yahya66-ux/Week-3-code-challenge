document.addEventListener("DOMContentLoaded", () => {

    let filmsUrl = "http://localhost:3000/films";

    //get the place to display the data on the html page
    let ul = document.querySelector("#films");
    let film = document.querySelector("#film");
    let filmTitle = film.querySelector("#title");
    let filmPoster = film.querySelector("#poster");
    let filmRuntime = film.querySelector("#runtime");
    let filmShowtime = film.querySelector("#showtime");
    let filmAvailableTickets = document.getElementById('available-tickets');
   
    

    fetchFilms();


    function displayFirstFilm() {
        fetch(filmsUrl + '/' + 1)
        .then(res => res.json())
        .then(film => displayFilmDetails(film))
        .catch(err => console.log(err))
    }

    function fetchFilms(){
        displayFirstFilm();
        fetch(filmsUrl)
        .then(res => res.json())
        .then(films => films.forEach(film => addAsList(film)))
        .catch(err => console.log(err))
    
    }

    //create li for the film and append it to the ul
    function addAsList(film) {
        let li = document.createElement("li");
        li.textContent = film.title;
        li.addEventListener('click', () => displayFilmDetails(film,li));
        ul.append(li);
    }

    function displayFilmDetails(filmObj,li){
        console.log(filmObj.tickets_sold);
        //calculate the available tickets
        let availableTickets = filmObj.capacity - filmObj.tickets_sold;

        //create a new button for every ticket and remove the previous button to avoid conflict
        let btnChild = document.querySelector('#purchase-ticket');
        film.removeChild(btnChild);
        let purchaseBtn = document.createElement('button');

        //set button id and text it displays
        purchaseBtn.setAttribute('id', 'purchase-ticket');
        purchaseBtn.textContent = "Purchase a ticket";

        //set film details
        filmTitle.textContent = filmObj.title;
        filmPoster.src = filmObj.poster;
        filmRuntime.textContent = filmObj.runtime;
        filmShowtime.textContent = filmObj.showtime;
        if(availableTickets <= 0){
            filmAvailableTickets.textContent = "Sold out!";
        }else{
            filmAvailableTickets.textContent = availableTickets;
        }

        //check if tickets are still available
        purchaseBtn.addEventListener('click', () => { 
            availableTickets -= 1;
            filmObj.tickets_sold += 1; //increase for the next li click listener

            if(availableTickets <= 0){
                filmAvailableTickets.textContent = "Sold out!";
            
            }else{
                filmAvailableTickets.textContent = availableTickets;
            }
            
           
             
              if(availableTickets <= 0){
                // alert("No more tickets for this movie!");
                if(li){
                    li.className = "sold-out";
                }
                purchaseBtn.textContent = "Sold out!";
                purchaseBtn.classList.add("sold-out"); 
                filmAvailableTickets.textContent = "Sold out !";
                availableTickets = 0;
                return
            }
            
           
            return;
                
                
     
        
        })

        film.append(purchaseBtn);  

    }
    

    function purchaseTicket(filmObj) {
        console.log(obj.id);
    }

    function checkTicketAvailability(availableTickets) {
        
    }
})