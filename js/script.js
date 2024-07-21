let view = document.getElementById("view")
let modalVersesContent = document.getElementById('modalVersesContent')

const displayChapters = () => {
  fetch('https://vedicscriptures.github.io/chapters')
    .then(response => response.json())
    .then(data => {

      data.forEach(chapterObj => {
        let chapterNumber = chapterObj.chapter_number;
        let chapterName = chapterObj.name;
        let versesCount = chapterObj.verses_count;
        let translation = chapterObj.translation;
        let summary = chapterObj.summary ? chapterObj.summary : 'Summary not available';
        
        view.innerHTML += `
          <div class="chapter mt-5 p-4" style="">
            <h2 class="cha">${chapterNumber}. ${chapterName}</h2>
            <p class="mt-4">Translation: ${translation}</p>
           
            <p class="mt-">Summary: ${typeof summary === 'object' ? JSON.stringify(summary.en) : summary.en}</p>

            <p class="mt-3">हिंदी सारांश: ${typeof summary === 'object' ? JSON.stringify(summary.hi) : summary.hi}</p>
            <p class="Verses count fs-4 pt-2" onclick="versesCount(${chapterNumber}, ${versesCount})" style="cursor: pointer;">Verses Count: ${versesCount}</p>

            <div class="line"> </div>
          </div>
        `;
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
};

const versesCount = (number, count) => {
  modalVersesContent.innerHTML = '';
  for (let i = 1; i <= count; i++) {
    fetch(`https://vedicscriptures.github.io/slok/${number}/${i}`)
      .then(response => response.json())
      .then(data => {
        modalVersesContent.innerHTML += `
          <h1 class="my-8 text-4xl text-white font-extrabold text-center" >${data.verse}</h1>
          <h3 class="text-white text-lg uppercase font-medium text-center my-6">${data.slok}</h3>
          <br></br>
        `;
      })
      .catch(err => {
        console.log("Error", err);
      });
  }
  var versesModal = new bootstrap.Modal(document.getElementById('versesModal'));
  versesModal.show();
}



displayChapters();