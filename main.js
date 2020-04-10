function loaData(){

    let api = "https://gateway.marvel.com/v1/public/comics?ts=1&apikey=e9c6dd7742850d64d0cca8fa39a9ce9c&hash=7571bf773d320ed0d498c9787f225ee2";


    $.ajax({
        method:"GET", 
        url:api,
        dataType: 'json',


        beforeSend: function(){
            document.getElementById("para").innerHTML = "Loading..."
        },
        success: function(dataRecevied,status,xhr){
            // console.log(status);
            // console.log(xhr);
            // console.log(dataRecevied);
            let footDescript = document.getElementById("footer");
            let element = dataRecevied.data.results;
            footDescript.innerHTML = dataRecevied.attributionHTML;
            // console.log(document.getElementsByTagName("main"));
            let filmDiv;

            for(i=3;i<element.length;i++){                
                // console.log(dataRecevied.data.results[i].urls[0].url)
                // console.log(dataRecevied.data.results[i].thumbnail.path)
                let creatorSpan;
                let creatorRole;
                let filmThumb = dataRecevied.data.results[i].thumbnail.path;
                let filmThumbExtension = dataRecevied.data.results[i].thumbnail.extension;
                let filmUrlAdress = dataRecevied.data.results[i].urls[0].url;
                let filmName = dataRecevied.data.results[i].title;


                if (dataRecevied.data.results[i].creators.items.length > 0){
                    creatorSpan = dataRecevied.data.results[i].creators.items[0].name;
                    creatorRole = dataRecevied.data.results[i].creators.items[0].role;
                }else{
                    creatorSpan = "no main actor";
                    console.log("NOt Found")
                }

                filmDiv = `
                <div class="film">
                    <div class="film-image"></div>
                        <img src="${filmThumb}/portrait_incredible.${filmThumbExtension}">
                        <br>
                        <a class="filmLink" href="${filmUrlAdress}" target="_blank"
                            <h4 class="film-name">${filmName}</h4>
                        
                        <br>
                        <br>
                        <span class="creator">
                            ${creatorSpan}
                        </span>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <i>
                            ${creatorRole}
                        </i>
                        </a>
                    </div>
                </div>
                ` 

                document.getElementById("main").innerHTML += filmDiv;

            }


        },
        error: function(xhr,status,erro){
            document.getElementById("main").innerHTML = "<div class='error'>Something Wrong Happend With the server Please Try Again Later..</div>"
        },
        complete:function(){
            document.getElementById("para").innerHTML = "Done Loading...";
        }

    })
    
};
loaData();
