// JS data representation

const movieList = [];

// need to keep track of where the html element is in the JS representation
let currIndex = 0;

// On submission of form
$('#submit').on("click", function(e){
    e.preventDefault(); 

    // jQuery objects
    const $title = $('#title');
    const $rating = $('#rating');

    // retrieve input values
    const title = $title.val();
    const rating = $rating.val();

    // clear inputs
    $('input').val('');

    const movie = [title, rating, currIndex];
    const newHTML = makeHTML(movie);
    
    // increase current index
    currIndex++;

    // add movie to movie list
    movieList.push(movie);

    // append new HTML to the list
    $(newHTML).appendTo('ul');
    
})

// create a new li element with the movie title and rating, and includes a remove button
function makeHTML([title, rating, index]) {
    return  `
    <li id="${index}">
        ${title}: ${rating} 
        <button class="remove">
            REMOVE
        </button>
    </li>
    `
}

// event delegation on sorting buttons
// when a sorting button is clicked, sort the list
$('#sort').on("click", "button", function(e) {
    // retrieve the proper sorting method
    const sortMethod = e.target.id;
    // sort the movieList using the sorting method
    sortMovies(sortMethod);
    // reprint HTML based on new movieList ordering
    refreshHTML();
})

// sort movieList array using proper compare function based on sortMethod
function sortMovies(sortMethod) {
    if (sortMethod === "az") {
        movieList.sort(azCompare);
    } else
    if (sortMethod === "za") {
        movieList.sort(zaCompare);
    } else
    if (sortMethod === "up") {
        movieList.sort(upCompare);
    } else
    if (sortMethod === "down") {
        movieList.sort(downCompare);
    } else {
         throw new Error('Unknown sorting method', sortMethod) 
        }
    // New indeces to match actual ordering
    refreshIndeces();

}

const azCompare = (a, b) => a[0] > b[0] ? 1 : -1; 
const zaCompare = (a, b) => a[0] < b[0] ? 1 : -1;
const upCompare = (a, b) => Number(a[1]) < Number(b[1]) ? 1 : -1;
const downCompare = (a, b) => Number(a[1]) > Number(b[1]) ? 1 : -1;

// new indeces to match array ordering
const refreshIndeces = () => movieList.map((v, i) => v[2] = i);

// new HTML to match movieList order
function refreshHTML() {
    $('ul').html(movieList.reduce((accum, movie) => accum += makeHTML(movie), ""))
}
// event delagation on list element
// when a remove button is clicked within the list, remove the corresponding movie
$('ul').on("click", ".remove", function (e) {
    // remove proper index from movieList
    movieList.splice(Number(e.target.id), 1);
    // remove element from HTML
    $(e.target.parentElement).remove();
})