const sportNewsUrl = "https://inshorts.deta.dev/news?category=sports"

function getData(url){
    return new Promise((response, reject)=>{
        let xhttp = new XMLHttpRequest()
        xhttp.open("GET", url)
        xhttp.send()
        xhttp.onload = function(){
            if(xhttp.status == 200 || xhttp.status == 304){
                console.log(xhttp.response)
                response(xhttp.response)
            }
            else{
                let errObj = {
                    errorStatus: xhttp.status,
                    errorText: xhttp.statusText
                }
                reject(errObj)
            }
            
        }
    })
}

function createCard(cardData, index){

    let card = `
        <div class="newsCard">
            <div class="imgContainer">
                <img src="${cardData.imageUrl}">
            </div>
            <div class="authorContainer">
                <h3 class="authorName">${cardData.author}</h3>
                <h3 class="postDate">${cardData.date}</h3>
            </div>
            <div class="titleContainer">
                <h2>${cardData.title}</h2>
            </div>
        </div>`
   
    $("#news").append(card);

    
    let rmDiv = document.createElement("div");
    let rmLabel = document.createElement("label");
    let rmText = document.createTextNode("Read More...");
    let close = document.getElementById("close");


    rmDiv.setAttribute("class", "readMoreContainer");
    rmLabel.appendChild(rmText);
    rmDiv.appendChild(rmLabel);
   
    rmLabel.addEventListener("click", function(){
        $("#openedNew").show()
        openNews(cardData)
    })

   
   
    


    document.getElementsByClassName("newsCard")[index].appendChild(rmDiv);
    

    
}

function openNews(newData){
    let card = `<div class="newsCard">
    <div class="imgContainer">
        <img src="${newData.imageUrl}">
    </div>
    <div class="authorContainer">
        <h3 class="authorName">${newData.author}</h3>
        <h3 class="postDate">${newData.date}</h3>
    </div>
    <div class="titleContainer">
        <h2>${newData.title}</h2>
    </div>
    <div class="content">
        <p>${newData.content}</p>
    </div>
    <div class="readMoreContainer">
        <label id="close">close</label>
    </div>

</div>`

$("#openedNew").append(card)
}

getData(sportNewsUrl).then(res=>{
    let resJson = JSON.parse(res)
    let index = 1;
    for(let cardData of resJson.data){
        createCard(cardData, index)
        index += 1;
    }
    
})
.catch(err=>{
    console.error(err)
})