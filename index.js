const API_KEY = "69cb0c05a0a84be884131641b503279c";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById('card-container');
    const newsCardsTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = "";

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardsClone = newsCardsTemplate.content.cloneNode(true);
        fillDataInCard(cardsClone, article);
        cardsContainer.appendChild(cardsClone);
    });
}

function fillDataInCard(cardsClone, article) {
    const newImage = cardsClone.querySelector('#news-image');
    const newstitle = cardsClone.querySelector('#news-title');
    const newSource = cardsClone.querySelector('#news-source');
    const newdesc = cardsClone.querySelector('#news-desc');

    newImage.src = article.urlToImage;
    newstitle.innerHTML = article.title;
    newdesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newSource.innerHTML = `${article.source.name} • ${date}`;

    cardsClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    });
}

let curSelectedNav =null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const input = document.getElementById('search-text');

searchButton.addEventListener('click', ()=>{
    const query =input.value;
    if(!query) return;
    fetchNews(query);
});