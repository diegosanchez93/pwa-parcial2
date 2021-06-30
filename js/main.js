const YOUR_API_KEY_OMDB = '';
const URL_OMDB = 'https://www.omdbapi.com/';



const button = document.getElementById("sendButton");
const main = document.getElementById("main");
const inputElement = document.getElementById("title");


button.addEventListener("click", ()=> {    
	buscarPelicula(inputElement.value);        
});



function buscarPelicula(peliculaAbuscar) {              
	console.log('Palabra',peliculaAbuscar);

	const fetchPromiseOMDB = fetch(`${URL_OMDB}?i=tt3896198&apikey=${YOUR_API_KEY_OMDB}&t=${peliculaAbuscar}`);
	
                                                   
	fetchPromiseOMDB.then(response => {               
		console.log('result', response);
		return response.json();

	}).then(result => {                        
		console.log('data', result);
        madeGrid(result);
        
	}).catch(err => {                          
		console.log('Hubo un error: ', err)
	});
}


function madeGrid(data) {  
    const img = data.Poster 
	const title = data.Title
    const year = data.Year
    const genre = data.Genre
    const director = data.Director
    const actors = data.Actors
    const plot = data.Plot
    const rating1 = data.Ratings[0].Source
    const rating2 = data.Ratings[1].Source
    const rating3 = data.Ratings[2].Source
   


	console.log(`Titulo: ${data.Title}`);
	console.log(`Año: ${data.Year}`);
	console.log(`Genero: ${data.Genre}`);
	console.log(`Director: ${data.Director}`);
	console.log(`Actores: ${data.Actors}`);
	console.log(`Sinopsis: ${data.Plot}`);
    console.log(`Rating 1: ${data.Ratings[0].Source} - ${data.Ratings[0].Value}`);
    console.log(`Rating 2: ${data.Ratings[1].Source} - ${data.Ratings[1].Value}`);
	console.log(`Rating 3: ${data.Ratings[2].Source} - ${data.Ratings[2].Value}`);



    main.innerHTML = `<div class="col-5">
                         <img src="${img}" alt="Poster de la pelicula" width="100%" id="poster-pelicula"></img>
                      </div>
                      <div class="col-7">
                         <div class="row">
                            <p class="col-12"><strong>${title}</strong></p>
					        <ul class="col-12" id="ul-datos">
					           <li class="row">Año: ${year}</li>
                               <li class="row">Genero: ${genre}</li>
                               <li class="row">Director: ${director}</li>
                               <li class="row">Actores: ${actors}</li>
                               <li class="row">Sinopsis (En inglés): ${plot}</li>
                               <li class="row">
                                  <div class="col-2">Ratings:</div>
                                  <div class="col-10>
                                     <div class="row">
                                        <div class="col-12">${rating1} - ${data.Ratings[0].Value}</div>
                                        <div class="col-12">${rating2} - ${data.Ratings[1].Value}</div>
                                        <div class="col-12">${rating3} - ${data.Ratings[2].Value}</div>                                       
                                     </div>                                                                   
                                  </div>                          
                               </li>                     				 	      
				            </ul>                         
                         </div>                      
                      </div>`	
					  

};




function abrirGracias() {
   document.getElementById("gracias").style.display="block";
}

function cerrarGracias() {
   document.getElementById("gracias").style.display="none";
}
 

