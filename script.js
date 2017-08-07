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

function whenJsonLoad(bands){
  var bandblock = '';

  bands
    .sort(sortByName)
    .forEach(function(band){
      var name = `<h2>${band.name}</h2>`;
      var genre = `<h3>${band.genre}</h3>`;
      var memberList ='';
      var albumList ='';
      band.members.sort(sortByName).forEach(function(member){
        var memberName = `<li>${member.name} ${member.instrument}</li>`;
        memberList += `${memberName}`;
      });
      band.albums.sort(sortByReleaseYear).forEach(function(album){
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





var url = './data.json';

fetch(url)
.then(function(response){
  console.log(response);
  return response.json();
})
.then(whenJsonLoad)
.catch(function(err){
  console.info(err);
});

