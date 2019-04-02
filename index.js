'use strict';
/* global $ */
const apiKey = 'ba1WENf4DlKSZsOo2JxfW4jukcnBuPJ1FVQRBabG';
// &api_key=INSERT-API-KEY-HERE
// /parks?stateCode=&limit=&
const url = 'https://developer.nps.gov/api/v1/parks';

// function formatQueryParams(params) {
//   const queryItems = Object.keys(params)
//     .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
//   return queryItems.join('&');
// }

function updateResults(responseJson) {
  $('.results-list').empty();
  console.log(responseJson.data[0]['fullName']);
  console.log(responseJson.data[0]['description']);
  console.log(responseJson.data[0]['url']);


  for (let i = 0; i < responseJson.data.length; i++) {
    $('.results-list').append(`
    <li>
      <h2>${responseJson.data[i]['fullName']}</h2>
      <h3>Description</h3>
      <p>${responseJson.data[i]['description']}</p>
      <h3>Directions</h3>
      <p>${responseJson.data[i]['directionsInfo']}</p>
      <h4>Link to Website</h4>
      <a href = "${responseJson.data[i]['url']}">${responseJson.data[i]['fullName']}</a>
    </li>
    `);
  }
  $('.hidden').removeClass('hidden');
}

function getParkInfo(state, maxResults=10) {
  const updatedUrl = `https://developer.nps.gov/api/v1/parks?stateCode=${state}&limit=${maxResults-1}&api_key=${apiKey}`;
  console.log(updatedUrl);
  fetch(updatedUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      } 
      throw new Error('Please enter a valid input');
    })
    .then(responseJson => {
      console.log(responseJson)
      updateResults(responseJson)
    })
    .catch(err => {
      $('.results-list').append(alert('Something went wrong'));
    });
}

function handleSubmit() {
  $('.js-form').submit(function(event) {
    event.preventDefault();
    const state = $('.js-search-term').val();
    const maxResults = $('.js-max-results').val();
    console.log(state);
    console.log(maxResults);
    getParkInfo(state, maxResults);
  });
}



$(handleSubmit);