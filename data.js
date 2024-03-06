const movieArray = [
  { id: 1, title: 'Sholay', year: 1975, description: 'Celebrate the timeless masterpiece, "Sholay", an impeccable blend of action, drama, and romance.', thumbleurl: 'https://filmfare.wwmindia.com/content/2023/jul/must-watch-bollywood-movies-sholay1690804216.jpg' },
  { id: 2, title: 'Mother India', year: 1957, description: 'Experience the moving saga of "Mother India," a testament to the resilience and strength of womanhood.', thumbleurl: 'https://filmfare.wwmindia.com/content/2023/jul/must-watch-bollywood-movies-motherindia1690804283.jpg' },
  { id: 3, title: 'Dilwale Dulhania Le Jayenge', year: 1995, description: 'The quintessential Bollywood love story, "Dilwale Dulhania Le Jayenge", is a heart-stealing masterpiece.', thumbleurl: "https://filmfare.wwmindia.com/content/2023/jul/must-watch-bollywood-movies-ddlj1690808577.jpg" },
  { id: 4, title: 'Mughal-e-Azam', year: 1960, description: 'Asif, is a cinematic gem that transports viewers back to the grandeur of the Mughal era.', thumbleurl: 'https://filmfare.wwmindia.com/content/2023/jul/must-watch-bollywood-movies-mughaleazam1690808627.jpg' },
  { id: 5, title: 'pyaasa', year: 1957, description: 'Narrates the heartrending tale of a struggling poet seeking recognition', thumbleurl: 'https://filmfare.wwmindia.com/content/2023/jul/must-watch-bollywood-movies-pyaasa1690808674.jpg' },
  { id: 6, title: 'Lagaan ', year: 2001, description: 'His cricket-centric drama captured the imagination of audiences worldwide', thumbleurl: 'https://filmfare.wwmindia.com/content/2023/jul/must-watch-bollywood-movies-lagaan1690808705.jpg' },
  { id: 7, title: '3 Idiots', year: 2009, description: 'Thought-provoking storyline and standout performances', thumbleurl: 'https://filmfare.wwmindia.com/content/2023/jul/must-watch-bollywood-movies-3idiots1690808741.jpg' },
  { id: 8, title: 'Dil Chahta Hai', year: 2001, description: 'This coming-of-age film became a cult favorite among the younger generation', thumbleurl: 'https://filmfare.wwmindia.com/content/2023/jul/must-watch-bollywood-movies-dilchahtahai1690808798.jpg' },
  { id: 9, title: 'Kabhi Khushi Kabhie Gham', year: 2001, description: 'The multi-starrer film features lavish sets, melodious songs, and unforgettable performances', thumbleurl: 'https://filmfare.wwmindia.com/content/2023/jul/must-watch-bollywood-movies-kabhikhushikabi1690808862.jpg' },
  { id: 10, title: ' Rang De Basanti', year: 2006, description: 'The powerful film touched upon corruption, youth activism, and the yearning for change', thumbleurl: 'https://filmfare.wwmindia.com/content/2023/jul/must-watch-bollywood-movies-rangdebasanti1690808900.jpg' },
  { id: 11, title: 'Padmaavat', year: 2018, description: 'Opulent sets, exquisite costumes, and powerful performances received critical acclaim', thumbleurl: 'https://filmfare.wwmindia.com/content/2023/jul/must-watch-bollywood-movies-padmavati1690809088.jpg' },
  { id: 12, title: 'Uri', year: 2019, description: 'The film, directed by Aditya Dhar, resonated with audiences for its realistic portrayal of military operations and bravery.', thumbleurl: 'https://filmfare.wwmindia.com/content/2023/jul/must-watch-bollywood-movies-uri1690809122.jpg' },
];
if (!localStorage.getItem('a')) {
  const jsonString = JSON.stringify(movieArray);
  localStorage.setItem('a', jsonString); 
}

const storedJsonString = localStorage.getItem('a');
const retrievedArray = JSON.parse(storedJsonString);
console.log(retrievedArray);
displayAllMovies();



function getNextId() {
  if (retrievedArray.length === 0) {
    return 1;
  }
  const maxId = Math.max(...retrievedArray.map(movie => movie.id));
  return maxId + 1;
}

document.getElementById('card-main').addEventListener('click', function (event) {
  if (event.target.classList.contains('btn-danger')) {
    const movieIdToDelete = parseInt(event.target.getAttribute('data-id'));
    if (!isNaN(movieIdToDelete)) {
      if (confirm('Are you sure you want to delete this movie?')) {
        deleteMovie(movieIdToDelete);
      }
    }
  }
});

function displayAllMovies() {
  console.log(retrievedArray);
  const cardMain = document.getElementById('card-main');
  retrievedArray.forEach(function (item, id) {
    const cardMain = document.getElementById('card-main');
    let newDiv = document.createElement('div');
    newDiv.classList.add('col');
    newDiv.innerHTML = `
        <div class="card">
            <img class="card-img" src="${item.thumbleurl || 'https://filmfare.wwmindia.com/content/2023/jul/must-watch-bollywood-movies-padmavati1690809088.jpg'}" alt="Card image">
            <div class="card-body">
                <h3 class="card-title">${item.title}</h3>
                <p class="card-text">${item.description}</p>
                <p class="card-year">Year:${item.year}</p>
                <p class="card-text"><strong>ID:</strong> ${item.id}</p>
                  <div class="text-center button-margin">
                    <button type="button" class="btn btn-success" data-id="${item.id}" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editMovie(${JSON.stringify(item)})">Edit</button>
                    <button type="button" class="btn btn-danger" data-id="${item.id}">Delete</button>
                  </div>
            </div>
        </div>
    `;
    const editButton = newDiv.querySelector('.btn-success');
    editButton.addEventListener('click', function () {
      editMovie(item);
    });
    cardMain.appendChild(newDiv);
  });
}

function filterMovies(year) {
  const cardMain = document.getElementById('card-main');
  cardMain.innerHTML = '';
  const filteredMovies = retrievedArray.filter(movie => {
    if (year === '1') {
      return movie.year >= 1900 && movie.year <= 2000;
    }
    else if (year === '2') {
      return movie.year >= 2001 && movie.year <= 2020;
    }
    else if (year === '3') {
      return movie.year >= 2021 && movie.year <= 2024;
    }
  });

  filteredMovies.forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('col-lg-2', 'mb-4');

    card.innerHTML = `
          <div class="card">
              <img src="${movie.thumbleurl || 'https://filmfare.wwmindia.com/content/2023/jul/must-watch-bollywood-movies-padmavati1690809088.jpg'}" class="card-img-top">
              <div class="card-body">
                  <h5 class="card-title">${movie.title}</h5>
                  <p class="card-text">${movie.description}</p>
                  <p class="card-text"><strong>Year:</strong> ${movie.year}</p>
                  <p class="card-text"><strong>ID:</strong> ${movie.id}</p>
              </div>
          </div>
    `;
    cardMain.appendChild(card);
  });
}
const yearSelecter = document.getElementById('yearselecter');
yearSelecter.addEventListener('change', function () {
  const selectedYear = yearSelecter.value;
  filterMovies(selectedYear);
});

document.getElementById('submitBtn').addEventListener('click', function () {
  if (validateForm()) {
    const title = document.getElementById('recipient-name').value;
    const year = document.getElementById('message-text').value;
    const description = document.getElementById('Description').value;
    const thumbleurl = document.getElementById('url').value || "https://filmfare.wwmindia.com/content/2023/jul/must-watch-bollywood-movies-padmavati1690809088.jpg";

    const formData = {
      title: title,
      year: parseInt(year),
      description: description,
      thumbleurl: thumbleurl
    };
    console.log("this", this);
    if (this.getAttribute("data-id")) {
      console.log("id", this.getAttribute("data-id"));
      updateMovie(this.getAttribute("data-id"), formData);

    } else {
      addMovie(formData);
    }
    resetForm();
    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.hide();
    location.reload();
  }
});

function addMovie(formData) {
  const newMovie = {
    id: getNextId(),
    ...formData
  };
  retrievedArray.push(newMovie);
  localStorage.setItem('a', JSON.stringify(retrievedArray));
  displayAllMovies();
}

function updateMovie(movieId, formData) {
  const index = retrievedArray.findIndex(movie => movie.id == movieId);
  if (index !== -1) {
    retrievedArray[index].title = formData.title
    retrievedArray[index].year = formData.year
    retrievedArray[index].description = formData.description
    retrievedArray[index].thumbleurl = formData.thumbleurl
    console.log("updated movie data", retrievedArray);
    localStorage.setItem('a', JSON.stringify(retrievedArray));
    displayAllMovies();
  }
}

function validateForm() {
  let isValid = true;
  const requiredFields = document.querySelectorAll('#movieForm [required]');
  requiredFields.forEach(function (field) {
    if (!field.value.trim()) {
      isValid = false;
      field.classList.add('is-invalid');
    } else {
      field.classList.remove('is-invalid');
    }
  });
  return isValid;
}

function deleteMovie(id) {
  retrievedArray.splice(retrievedArray.findIndex(movie => movie.id === id), 1);
  localStorage.setItem('a', JSON.stringify(retrievedArray));
  location.reload();
}

function resetForm() {
  document.getElementById("movieForm").reset();
  const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
  modal.hide();
}

function editMovie(movie) {
  document.getElementById('recipient-name').value = movie.title;
  document.getElementById('message-text').value = movie.year;
  document.getElementById('Description').value = movie.description;
  document.getElementById('url').value = movie.thumbleurl || "https://filmfare.wwmindia.com/content/2023/jul/must-watch-bollywood-movies-padmavati1690809088.jpg";
  const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
  let submitBtn = document.getElementById("submitBtn")
  submitBtn.setAttribute("data-id", movie.id)
}

