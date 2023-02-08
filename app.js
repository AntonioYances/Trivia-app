let preguntas = document.getElementById("preguntas")
let respuestas = document.querySelector(".respuestas")
const container = document.querySelector(".container")
let reset = document.getElementById('reset')
let crear = document.getElementById('crear')
let optionCategory = document.getElementById('optionCategory')
let botonCrear = document.getElementById('botonCrear_container')
let marcador = document.getElementById('marcador')
let selectCategory
let category;
let difficulty;
let type;
let url = "https://opentdb.com/api.php?amount=10"
let url2 = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type${type}`;
let urlCategorias = "https://opentdb.com/api_category.php"
let contador = 0
var cod
preguntas.innerHTML = ``
function crearTrivia(){   
    fetch(urlCategorias)
    .then((response)=>response.json())
    .then((data)=>{
        category = data.trivia_categories
        console.log(category)                                                       
    })
    .then((data)=>{                    
                    optionCategory.innerHTML += `<select id="categoria">${category.map((category)=>`                    
                    <option value=${category.id}>${category.name}</option>                                    
                    `).join('')}</select>`;  
                    selectCategory = document.getElementById('categoria')
                    selectCategory.addEventListener('change', function(){
                        var selectedOption = this.options[selectCategory.selectedIndex]
                        category = selectedOption.value
                        //console.log(category)
                    })
                    
                    var selectDifficulty = document.getElementById('difficulty')
                    selectDifficulty.addEventListener('change', function(){
                        var selectedDifficulty = this.options[selectDifficulty.selectedIndex]
                        difficulty = selectedDifficulty.value
                        //console.log(difficulty)
                    })
                    var selectType = document.getElementById('type')
                    selectType.addEventListener('change', function(){
                        var selectedType = this.options[selectType.selectedIndex]
                        type = selectedType.value
                        //console.log(type)
                    })                   
    })
    
}
crearTrivia()
function getData(){
    console.log(category)
    console.log(type)
    console.log(difficulty)
    fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=${type}`)
    .then((response)=> response.json())
    .then((data)=>{
        console.log(data)
        mostrarPregunta(data)        
        seleccionar(data)
    })
}

 function mostrarPregunta(data){ 
    marcador.innerHTML = `${contador}/10`
    document.getElementById('preguntas').style.display= 'flex'
    botonCrear.innerHTML = ``
    let respuestaC = data.results[contador].correct_answer
    let respuestaI = data.results[contador].incorrect_answers
    let opcionlista = respuestaI
    preguntas.innerHTML = `${data.results[contador].question} <br>`   
    console.log(opcionlista)
    opcionlista.splice(Math.floor(Math.random() * (respuestaI.length + 1)), 0, respuestaC)
    respuestas.innerHTML = `<br>${opcionlista.map((opcion, index)=>`
                            <button class="boton${index}">${opcion}</button>
                                `).join('')}`;    
}
function seleccionar(data){
        optionCategory.innerHTML = ``

        let correct_answer = data.results[contador].correct_answer        
        respuestas.addEventListener('click', (e)=>{
           let seleccion = e.target.textContent
            if(seleccion === correct_answer && contador<=9){
                contador++
                mostrarPregunta(data)                
                seleccionar(data)
            }else{
                console.log("Respuesta incorrecta quieres volver a intentar")
                document.getElementById('preguntas').style.display='none'
                document.querySelector('.respuestas').style.display='none'
                document.getElementById('reset').style.display = 'flex'
                reset.innerHTML = `<button id="boton_reset" onclick = location.reload()>Play againg</button>`
            }
        })    
}  
 



