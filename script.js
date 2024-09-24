const API_KEY="0c00f36115d04a1ca6ad61d98891cc6f";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",() => fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const res= await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data= await res.json();
    console.log(data);
    bindData(data.articles);
}
function bindData(articles){
    const cardContainer=document.getElementById('card-container');
    const newsCardTemplate=document.getElementById('template-news-card');

    cardContainer.innerHTML="";

    articles.forEach(article =>{
        if(!article.urlToImage) return;
        const cardClone=newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardContainer.appendChild(cardClone);

    });
}
function fillDataInCard(cardClone,article){
    const newsImag= cardClone.querySelector('#news-image');
    const newsTitle= cardClone.querySelector('#news-title');
    const newsSource= cardClone.querySelector('#news-source');
    const newsDesc= cardClone.querySelector('#news-desc');

    newsImag.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    const date= new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML=`${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener("click",() =>{
        window.open(article.url, "_blank");
    });
}
let currSelectedNav=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    currSelectedNav?.classList.remove('active');
    currSelectedNav=navItem;
    currSelectedNav.classList.add('active');
}

const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('news-input');

searchButton.addEventListener("click",()=>{
    const query=searchText.value;
    if(!query) return;
    fetchNews(query);
    currSelectedNav?.classList.remove('active');
    currSelectedNav=null;

});
