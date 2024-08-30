import __ from "./components/base.js"; // load all components

window.addEventListener("DOMContentLoaded", main);
window.addEventListener("hashchange", handleHashChange);
window.mainContentPage = "";


function main(){
    
    handleHashChange();
}

function handleHashChange(){
    const hash = window.location.hash;
    const mainContent = document.querySelector(".main-content");

    mainContent.innerHTML = "";
    if(hash.length > 1){
        const topicMarkup = `topics/${hash.slice(1)}.html`;
        // const topicsSVGOpen = document.querySelector("#topics-svg-open");
        // const topicsSVGClose = document.querySelector("#topics-svg-close");
        // const sideBoxObject = document.querySelector(".side-box");

        // state.toolBar.isTopicsExpanded = false;
        // topicsSVGClose.style.display = "none";
        // topicsSVGOpen.style.display = "block";
        // sideBoxObject.style.display = "none";

        fetch(topicMarkup).then(res => res.text().then(res => {
            mainContent.innerHTML = res;
            MathJax.typeset();
        }))
    }
}