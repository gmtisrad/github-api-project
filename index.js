'use strict'

const searchUrl = (userName) => {return (`https://api.github.com/users/${userName}/repos`);}

function getRepos () {
    let userName = $('.js-search-input').val();

    let url = searchUrl(userName);

    fetch(url).then(response => {
        if (response.ok){
            return (response.json());
        }
        throw new Error (response.statusText);
    })
    .then(responseJson => {displayResults(responseJson);})
    .catch(error => alert (`Error: ${error.message}`));
}

function displayResults (responseJson) {
    $('.js-results-list').empty();
    for (let i = 0; i < responseJson.length; i++) {
        $('.js-results-list').append(
            `<li class='result'>
                <h3>${responseJson[i].name}</h3>
                <a href='${responseJson[i].html_url}'>Repository</a>
            </li>`);
    }
    $('.js-results').removeClass('hidden');
}

function watchForm () {
    $('.js-repo-search').on('submit', event => {
        event.preventDefault();
        getRepos();
    })
}

$(watchForm);