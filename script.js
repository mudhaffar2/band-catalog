function sortByName(a,b){
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

function sortByReleaseYear(a,b){
  return a.releaseYear-b.releaseYear;
}

function renderBands(bands){
  var bandblock = '';
  bands
    .sort(sortByName)
    .forEach(function(band){
      var name = `<h2>${band.name}</h2>`;
      var genre = `<h3>${band.genre}</h3>`;
      var memberList ='';
      var albumList ='';
      band.members
      .sort(sortByName)
      .forEach(function(member){
        var memberName = `<li>${member.name} ${member.instrument}</li>`;
        memberList += `${memberName}`;
      });
      band.albums
      .sort(sortByReleaseYear)
      .forEach(function(album){
        var memberAlbum = `<li>${album.title} (${album.releaseYear})</li>`;
        albumList += `${memberAlbum}`;
      });
      bandblock += `<div class="band">${name}${genre}
                      <ul><h4>Members</h4>${memberList}</ul>
                      <ul><h4>Albums</h4>${albumList}</ul>
                    </div>`;
    });
  document.querySelector('#container').innerHTML = `${bandblock}`;
}

function whenJsonLoad(bands) {
  _bands = bands;
  renderBands(bands);

  searched.addEventListener('keyup', function(){

    if (searched.value === '') {
      renderBands(bands);
    } else {
      _bands = bands.filter(function(band){
        return band.name.toLowerCase().indexOf(searched.value.toLowerCase()) === 0;
      }); 
      renderBands(_bands);
    }
  });
}

/////// functions above this line
/////////////////////////////////////////////////////////////////////


var url = './data.json';
var _bands;
var searched = document.getElementById("search-field");


fetch(url)
.then(function(response){
  console.log(response);
  return response.json();
})
.then(whenJsonLoad)
.catch(function(err){
  console.info(err);
});






