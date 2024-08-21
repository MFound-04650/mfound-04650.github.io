
const toolBarContent = `
<div id="tool-bar-topics">
<svg id="topics-svg-open" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
    <path d="M13 17l5-5-5-5M6 17l5-5-5-5"/>
    </svg>
<svg id="topics-svg-close" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#088" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
    <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/>
    </svg>

</div>
`;

export default class ToolBar extends HTMLElement {
    constructor(){
        super();
        state.toolBar.isTopicsExpanded = true;

    }

    connectedCallback(){
        this.className = "tool-bar";
        this.style.display = "block";
        this.innerHTML = toolBarContent;

        const toolBarTopics = document.querySelector("#tool-bar-topics");
        const topicsSVGOpen = toolBarTopics.querySelector("#topics-svg-open");
        const topicsSVGClose = toolBarTopics.querySelector("#topics-svg-close");
        topicsSVGOpen.style.display = "none";

        toolBarTopics.addEventListener("click", toggleToolBar);
        toolBarTopics.addEventListener("touch", toggleToolBar);

        function toggleToolBar(event){
            event.preventDefault();
            state.toolBar.isTopicsExpanded = !state.toolBar.isTopicsExpanded;
            const toggleEvent = new CustomEvent("toolBarToggleEvent", {});
            if(!state.toolBar.isTopicsExpanded){
                topicsSVGClose.style.display = "none";
                topicsSVGOpen.style.display = "block";
                window.dispatchEvent(toggleEvent);
                // side_box.style.display = "none";
            }
            else{
                topicsSVGClose.style.display = "block";
                topicsSVGOpen.style.display = "none";
                window.dispatchEvent(toggleEvent);
                // side_box.style.display = "block";
            }
        }

    }
}

customElements.define("mf-tool-bar", ToolBar)