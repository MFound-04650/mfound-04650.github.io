import __ from "./components/base.js"; // load all components

window.addEventListener("DOMContentLoaded", main);
window.addEventListener("hashchange", handleHashChange);
window.mainContentPage = "";


function main(){
    
    handleHashChange();
}

function handleHashChange(){
    const hash = window.location.hash;
    const mainContent = document.querySelector(".main-content-container");

    mainContent.innerHTML = "";
    if(hash.length > 1){
        const topicMarkup = `topics/${hash.slice(1)}.html`;
        fetch(topicMarkup).then(res => res.text().then(res => {
            mainContent.innerHTML = res;
            MathJax.typeset();
        }))
    }
}