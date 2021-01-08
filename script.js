
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
    const button = document.createElement("button");
    const selectT = document.getElementById("selectT").value;
    button.textContent="Enviar respuestas";
    button.classList.add("btn", "btn-primary","button-add");
    const container2 = document.getElementById("container2");
    let v=0;
    let inC=0;
    let inCC=0;
    let mult=0;
    let allA=[];

    container2.lastElementChild.innerHTML="";

    if (data.response_code==0) {
         if (selectT==="multiple") {
        for (let i=0; i<data.results.length; i++) {
            container2.lastElementChild.innerHTML+=`<div class="col-md-6" style="margin: auto; margin-top: 30px;">
            <div class="card">
                <div class="card-body">
                    ${data.results[i].question}
                </div>
            </div>`;
            for (let j=0; j<3; j++) {

                container2.lastElementChild.innerHTML+=`<div class="form-check col-md-6" style="margin: auto;">
                <input value="${data.results[i].incorrect_answers[j]}" class="form-check-input" type="radio" name="${v}" id="${mult++}" required>
                <label class="form-check-label" for="flexRadioDefault1">
                ${data.results[i].incorrect_answers[j]}
                </label>
                </div>`;
            }
            v++;
        }
        container2.lastElementChild.innerHTML+=`<button id="buttonM" class="btn btn-primary button-add">Enviar respuestas</button>`;

    } else {
        let booleano=["False","True"];
        console.log (booleano)
        for (let i=0; i<data.results.length; i++) {
            container2.lastElementChild.innerHTML+=`<div class="col-md-6" style="margin: auto; margin-top: 30px;">
            <div class="card">
                <div class="card-body">
                    ${data.results[i].question}
                </div>
            </div>`;
            for (let j=0; j<2; j++) {
                container2.lastElementChild.innerHTML+=`<div class="form-check col-md-6" style="margin: auto;">
                <input value="${booleano[j]}" class="form-check-input" type="radio" name="${inC}" id="${inCC++}" required>
                <label class="form-check-label" for="flexRadioDefault1">
                ${booleano[j]}
                </label>
                </div>`;
            }
            inC++;
        }
        container2.lastElementChild.innerHTML+=`<button id="buttonC" class="btn btn-primary button-add form-check">Enviar respuestas</button>`;

    }
        
        } else {
            container2.innerHTML+=`<div class="col-md-6" style="margin: auto;">
                                                                <div class="card">
                                                                    <div class="card-body">
                                                                    Sin resultados, no se pudieron devolver los resultados. La API no tiene suficientes preguntas para su consulta. (Por ejemplo, pedir 50 preguntas en una categoría que solo tiene 20)
                                                                    </div>
                                                                </div>
                                                     </div>`;
    }
} 


function buttonD () {
    const selectD = document.getElementById("selectD").value;
    const selectT = document.getElementById("selectT").value;
    const selectC = document.getElementById("selectC").value;
    const number = document.getElementById("number").value;

    fetch(`https://opentdb.com/api.php?amount=${number}&category=${selectC}&difficulty=${selectD}&type=${selectT}`)
    .then((response)=>response.json())
    .then((data)=> buttonC(data))
    alert("hola")
}

function buttonC (data) {
    /* let j=0; */
    
    if (document.getElementById("buttonC")) {
        let j=1;
        let aux=0;
        for (let i=0; i<data.results.length; i++) {
            aux++;
            if (document.getElementById(`${i}`).value==data.results[i].correct_answer) {
                j++;
            }
        }
        
        alert(`Tu puntaje fue de ${j} respuestas correctas de ${aux} respuestas correctas`);
    } else {
        alert("putoo");
    }
}
