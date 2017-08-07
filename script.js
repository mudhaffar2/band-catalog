
var url = './data.json';

fetch(url)
.then(function(response){
  console.log(response);
  return response.json();
})
.then(function(json){
  var bandblock = '';
  json.forEach(function(band){
    var name = `<h2>${band.name}</h2>`;
    var genre = `<h3>${band.genre}</h3>`;
    var memberList ='';
    var albumList ='';
    band.members.forEach(function(member){
      var memberName = `<li>${member.name} ${member.instrument}</li>`;
      memberList += `${memberName}`;
    });
    band.albums.forEach(function(album){
      var memberAlbum = `<li>${album.title} (${album.releaseYear})</li>`;
      albumList += `${memberAlbum}`;
    });
    bandblock += `<div class="band">${name}${genre}
                    <ul><h4>Members</h4>${memberList}</ul>
                    <ul><h4>Albums</h4>${albumList}</ul>
                  </div>`;
  });
  document.querySelector('#container').innerHTML = `${bandblock}`;
})
.catch(function(err){
  console.info(err);
});

