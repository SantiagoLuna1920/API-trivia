
const trivia = {"trivia_categories":[{"id":9,"name":"General Knowledge"},{"id":10,"name":"Entertainment: Books"},{"id":11,"name":"Entertainment: Film"},{"id":12,"name":"Entertainment: Music"},{"id":13,"name":"Entertainment: Musicals & Theatres"},{"id":14,"name":"Entertainment: Television"},{"id":15,"name":"Entertainment: Video Games"},{"id":16,"name":"Entertainment: Board Games"},{"id":17,"name":"Science & Nature"},{"id":18,"name":"Science: Computers"},{"id":19,"name":"Science: Mathematics"},{"id":20,"name":"Mythology"},{"id":21,"name":"Sports"},{"id":22,"name":"Geography"},{"id":23,"name":"History"},{"id":24,"name":"Politics"},{"id":25,"name":"Art"},{"id":26,"name":"Celebrities"},{"id":27,"name":"Animals"},{"id":28,"name":"Vehicles"},{"id":29,"name":"Entertainment: Comics"},{"id":30,"name":"Science: Gadgets"},{"id":31,"name":"Entertainment: Japanese Anime & Manga"},{"id":32,"name":"Entertainment: Cartoon & Animations"}]}
let question_correct = [];
let question_correctC= [];
const categories = document.getElementById("selectC");



trivia.trivia_categories.forEach((element)=> {
    categories.innerHTML+=`<option id=${element.id} value=${element.id}>${element.name}</option>`;
})


function valueI () {
const selectD = document.getElementById("selectD").value;
const selectT = document.getElementById("selectT").value;
const selectC = document.getElementById("selectC").value;
const form2 = document.getElementById("form2");
const number = document.getElementById("number").value;
if (selectD!=="Selecciona la dificultad" && selectT!=="Selecciona el tipo" && selectC!=="Selecciona la categoria") {

    fetch(`https://opentdb.com/api.php?amount=${number}&category=${selectC}&difficulty=${selectD}&type=${selectT}`)
.then((response)=>response.json())
.then((data)=>addDatas(data))
} else {
    form2.innerHTML="";
    form2.innerHTML=`<div class="col-md-6" style="margin: auto;">
    <div class="alert alert-info">
        <div class="alert-body">
        Debes rellenar los campos necesarios para generar tu QUIZ.
        </div>
    </div>
</div>`;
}

}

function addDatas (data) {
    for (let i=0; i<data.results.length; i++) {
        question_correct.push(data.results[i].correct_answer);
    }
    question_correctC=[];
    question_correctC.push(...question_correct);
    console.log(question_correctC);
    question_correct=[];
const button = document.createElement("button");
const selectT = document.getElementById("selectT").value;
button.textContent="Enviar respuestas";
button.classList.add("btn", "btn-primary","button-add");
const container2 = document.getElementById("container2");

container2.lastElementChild.innerHTML="";

if (data.response_code==0) {
     if (selectT==="multiple") {
    for (let i=0; i<data.results.length; i++) {
        let copy = [];
        copy.push(...data.results[i].incorrect_answers); //copy = [1,2,4,3]
        let dato = Math.round(Math.random()*3); //0-3 2
        copy.splice(dato,0,data.results[i].correct_answer);
        container2.lastElementChild.innerHTML+=`<div class="col-md-6" style="margin: auto; margin-top: 30px;">
        <div class="card">
            <div class="card-body">
                ${data.results[i].question}
            </div>
            <select id="Value-select${i}" style="width: 30%; display: inline-block;" class="form-select" aria-label="Default select example">
                                                    <option id="${copy[0]}" value="${copy[0]}">${copy[0]}</option>
                                                    <option id="${copy[1]}" value="${copy[1]}">${copy[1]}</option>
                                                    <option id="${copy[2]}" value="${copy[2]}">${copy[2]}</option>
                                                    <option id="${copy[3]}" value="${copy[3]}">${copy[3]}</option>
                                                  </select>
        </div>`;
    }
    container2.lastElementChild.innerHTML+=`<button id="buttonC" class="btn btn-primary button-add">Enviar respuestas</button>`;
} else {
    let booleano=["False","True"];
    for (let i=0; i<data.results.length; i++) {
        container2.lastElementChild.innerHTML+=`<div class="col-md-6" style="margin: auto; margin-top: 30px;">
                                                        <div class="card">
                                                            <div class="card-body">
                                                            ${data.results[i].question}
                                                        </div>
                                                        <select id="Value-select${i}" style="width: 30%; display: inline-block;" class="form-select" aria-label="Default select example">
                                                    <option id="${booleano[0]}" value="${booleano[0]}">${booleano[0]}</option>
                                                    <option id="${booleano[1]}" value="${booleano[1]}">${booleano[1]}</option>
                                                  </select>
                                                </div>`;
    }
        container2.lastElementChild.innerHTML+=`<button id="buttonC" class="btn btn-primary button-add form-check">Enviar respuestas</button>`;
        }
    } else {    
        container2.lastElementChild.innerHTML+=`<div class="col-md-6" style="margin: auto;">
                                                            <div class="alert alert-info">
                                                                <div class="alert-body">
                                                                Sin resultados, no se pudieron devolver los resultados. La API no tiene suficientes preguntas para su consulta. (Por ejemplo, pedir 50 preguntas en una categoría que solo tiene 20)
                                                                </div>
                                                            </div>
                                                 </div>`;
        }
    } 

function buttonD () {
    buttonCS();
}

function buttonCS () {

    const selec = document.getElementById("selectT").value;
    const form2 = document.getElementById("form2");
    let cont=0;

console.log (question_correctC)
if (selec=="boolean") {
    for (let i = 0; i<question_correctC.length; i++) {
        console.log (document.getElementById(`Value-select${i}`).value)
            if (document.getElementById(`Value-select${i}`).value===question_correctC[i]) {
                        cont++;
                    }
        }
} else {
    for (let i = 0; i<question_correctC.length; i++) {
            if (document.getElementById(`Value-select${i}`).value===question_correctC[i]) {
                        cont++;
                    }
        }
}
form2.innerHTML="";
    form2.innerHTML=`<div class="col-md-6" style="margin: auto;">
    <div class="alert alert-info">
        <div class="alert-body">
        Tienes ${cont} respuestas correctas de un total de ${question_correctC.length} preguntas.
        </div>
    </div>
</div>`;
question_correctC = [];
}
