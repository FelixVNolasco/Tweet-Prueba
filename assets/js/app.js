//variables
const listaTweets = document.getElementById('lista-tweets');    

//event listener

eventListeners();
function eventListeners(){

//cuando se envia el formulario

    document.querySelector('#formulario').addEventListener('submit', agregarTweet);


    //borrar tweet
    listaTweets.addEventListener('click', borrarTweet);
    //Contenido Cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);

}

//Añadir tweet al formulario
function agregarTweet (e){
         e.preventDefault();
    
    //obtener el texto del Text Area del formulario\
    const texto = document.getElementById('tweet').value;

    //boton de eliminar
        const eliminar = document.createElement('a');
        eliminar.classList = 'boton-eliminar';
        eliminar.innerText = 'X';
        //crear elemento y añadir contenido
        const li = document.createElement('li');
        li.innerText = texto;
        //agrega el boton de eliminar al tweet
        li.appendChild(eliminar);
        //Funciona para agregar al DOM el elemento de 'li'
        listaTweets.appendChild(li);


    //Añadir al local storage
        agregarTweetLocalStorage(texto);
}

//ELiminar del Dom el tweet
function borrarTweet(e){

    e.preventDefault();

    if(e.target.className === 'boton-eliminar'){
        e.target.parentElement.remove()
        
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }

}

function localStorageListo (){
    let tweets;
    tweets = obtenerTweetsLocalStorage()
    tweets.forEach(function(texto) {

        //boton de eliminar
        const eliminar = document.createElement('a');
        eliminar.classList = 'boton-eliminar';
        eliminar.innerText = 'X';
        //crear elemento y añadir contenido
        const li = document.createElement('li');
        li.innerText = texto;
        //agrega el boton de eliminar al tweet
        li.appendChild(eliminar);
        //Funciona para agregar al DOM el elemento de 'li'
        listaTweets.appendChild(li);
    });
}

//Funcion de Local Storage

function agregarTweetLocalStorage(texto) {

        let tweets;
        tweets = obtenerTweetsLocalStorage();
        //Agrega el nuevo tweet
        tweets.push(texto);
        //conversion
        localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Validar que haya elementos en Local Storage
function obtenerTweetsLocalStorage () {
    let tweets;

    if(localStorage.getItem('tweets') === null){
        tweets = [];
    }   else {
        tweets = JSON.parse(localStorage.getItem('tweets') );
    }
    return tweets;
}

//eliminar el Tweet del local storage
function borrarTweetLocalStorage(texto) {
    let tweets, tweetBorrar;

    //Elimina la X del Tweet 
    tweetBorrar = texto.substring(0, texto.length -1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(texto, index){
        if (tweetBorrar === texto){
            tweets.splice(index, 1);
        }
    });

   localStorage.setItem('tweets', JSON.stringify(tweets));
}

