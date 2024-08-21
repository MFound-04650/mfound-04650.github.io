export default async function fetchData(){
    const url = "/data/topics.json";
    const result = await fetch(url);
    return await result.json();
}

window.state = {
    "toolBar": {"isTopicsExpanded": true},
    "sideBox":{
        "isResizing": false,
        "originalWidth": null,
        "boundingBox": null,
        "topic": null
    }
};
