
const trivia = {"trivia_categories":[{"id":9,"name":"General Knowledge"},{"id":10,"name":"Entertainment: Books"},{"id":11,"name":"Entertainment: Film"},{"id":12,"name":"Entertainment: Music"},{"id":13,"name":"Entertainment: Musicals & Theatres"},{"id":14,"name":"Entertainment: Television"},{"id":15,"name":"Entertainment: Video Games"},{"id":16,"name":"Entertainment: Board Games"},{"id":17,"name":"Science & Nature"},{"id":18,"name":"Science: Computers"},{"id":19,"name":"Science: Mathematics"},{"id":20,"name":"Mythology"},{"id":21,"name":"Sports"},{"id":22,"name":"Geography"},{"id":23,"name":"History"},{"id":24,"name":"Politics"},{"id":25,"name":"Art"},{"id":26,"name":"Celebrities"},{"id":27,"name":"Animals"},{"id":28,"name":"Vehicles"},{"id":29,"name":"Entertainment: Comics"},{"id":30,"name":"Science: Gadgets"},{"id":31,"name":"Entertainment: Japanese Anime & Manga"},{"id":32,"name":"Entertainment: Cartoon & Animations"}]}

    const categories = document.getElementById("selectC");
    
    
    
    trivia.trivia_categories.forEach((element)=> {
        categories.innerHTML+=`<option id=${element.id} value=${element.id}>${element.name}</option>`;
    })


function valueI () {
    const selectD = document.getElementById("selectD").value;
    const selectT = document.getElementById("selectT").value;
    const selectC = document.getElementById("selectC").value;
    const number = document.getElementById("number").value;
    if (selectD!=="Selecciona la dificultad" && selectT!=="Selecciona el tipo" && selectC!=="Selecciona la categoria") {
    
        fetch(`https://opentdb.com/api.php?amount=${number}&category=${selectC}&difficulty=${selectD}&type=${selectT}`)
    .then((response)=>response.json())
    .then((data)=>addDatas(data))
    } else {
        alert("no se pudo")
    }
    
}

function addDatas (data) {
    const container2 = document.getElementById("container2");
    container2.innerHTML="";
    if (selectD!=="Selecciona la dificultad" && selectT!=="Selecciona el tipo" && selectC!=="Selecciona la categoria") {
    if (data.response_code==0) {
        data.results.forEach(element => {
            container2.innerHTML+=`<div class="col-md-6" style="margin: auto;">
                                                                <div class="card">
                                                                    <div class="card-body">
                                                                        ${element.question}
                                                                    </div>
                                                                </div>
                                                     </div>`
        });
        } else {
            alert("Sin resultados No se pudieron devolver los resultados. La API no tiene suficientes preguntas para su consulta. (Por ejemplo, pedir 50 preguntas en una categoría que solo tiene 20.)")
        }
    }
    
} 
