const containerNumeros = document.querySelector('.containerNumeros');
const containerCaracteres = document.querySelector('.containerCaracteres');
const display = document.querySelector('.display')
const input = document.getElementById('inputCalculadora')

const caracteres = []
let conta =[]

let digitouOperador = true
let contadorExpressao = 0;

document.addEventListener('DOMContentLoaded',()=>{
    adicionaNumeros();
    adicionaCaracteres();
})

function adicionaNumeros(){
    
    for(let numero = 9 ; numero >= 0 ; numero--){
        containerNumeros.innerHTML+=`
            <button onclick=apertouTeclaVirtual(${numero}) id =${numero}>${numero}</button>
        `
    }
    containerNumeros.innerHTML+=`
            <button onclick=apertouTeclaVirtual('${String.fromCharCode(61)}') id =${String.fromCharCode(61)}>${String.fromCharCode(61)}</button>
             <button onclick="apertouTeclaVirtual('√')" id='√'>√</button>
    `
    
}

function adicionaCaracteres(){
    posicaoArray = 0;
    ascii = 94;

    containerCaracteres.innerHTML+=`
            <button onclick="apertouTeclaVirtual('Delete')" id='Backspace'>Delete</button>
    `

    for( ; ascii >= 42 ;ascii--){
        
        if(ascii == 42 ||ascii == 43 || ascii == 45 || ascii == 47 || ascii == 67 || ascii == 94  ){
            caracteres[posicaoArray] = String.fromCharCode(ascii);
            containerCaracteres.innerHTML+=`
            <button onclick="apertouTeclaVirtual('${caracteres[posicaoArray]}')" id=${caracteres[posicaoArray]}>${caracteres[posicaoArray]}</button>
        `
            posicaoArray++
        }
        if(ascii == 61){
        }
       
    }
    containerCaracteres.innerHTML+=`
           
    `
}

let teclaVirtualAtivada = document.querySelector('#inputCalculadora');

input.addEventListener('keydown', verificaValor);

function verificaValor(e){
    let tecla = e.key
    
   if(tecla.charCodeAt() == 80){
    console.log(tecla.charCodeAt())
    event.preventDefault()
   }
    

       if(tecla == 'Backspace'){
        texto = input.value
        if(texto[texto.length-1] == '+' || texto[texto.length-1] == '-' ||texto[texto.length-1] == '/' ||texto[texto.length-1] == '*' ||texto[texto.length-1] == '^'){
            contadorExpressao--
            digitouOperador = false
            console.log('apagouOperador')
        }
        desativaTeclaVirtual(tecla)
        ativaNovaTeclaVirtual(tecla)
        return
       }
       if(tecla == 'C' || tecla == 'c'){
        input.value = ''
        event.preventDefault()
        return
       }
       if(tecla == 'R' || tecla == 'r'){
        tecla = '√'
       }
       if(tecla == 'P' || tecla == 'p'){
        tecla = '^'
       }

       console.log(tecla)

       if(tecla == 'Enter' || tecla == '='){
        verificaCalculo()
        digitouOperador = false;
        desativaTeclaVirtual('=')
        ativaNovaTeclaVirtual('=')
        event.preventDefault()
        return
       }

       if(tecla.charCodeAt() >=48 && tecla.charCodeAt() <= 57  ){
        desativaTeclaVirtual(tecla)
        ativaNovaTeclaVirtual(tecla)
        
        
        input.value+=tecla
        digitouOperador = false;
       }

       if(tecla.charCodeAt() >=42 && tecla.charCodeAt() <= 47 && tecla.charCodeAt() != 46 && tecla.charCodeAt() != 44 && tecla.charCodeAt() != 126  || tecla == '√' || tecla == '^' ){
        let conta = input.value;
        desativaTeclaVirtual(tecla)
        ativaNovaTeclaVirtual(tecla)

        if(input.value==''){
            event.preventDefault();
        }
            for(contador = 0 ; contador <=conta.length ; contador++){
                if(conta[contador] == '+' || conta[contador] == '-' || conta[contador] == '/' || conta[contador] == '*'|| conta[contador] == '√' || conta[contador] == '^'){
                    digitouOperador = true;
                }
            }

            if(tecla == '√' && digitouOperador == false){
                event.preventDefault()
                let alteraInput = input.value;
                input.value = '√' + alteraInput
                digitouOperador = true
                desativaTeclaVirtual(tecla)
                ativaNovaTeclaVirtual(tecla)
                return
            }
            if(digitouOperador == true ){
                event.preventDefault();
            }else{
                contadorExpressao++;
                input.value+=tecla
                digitouOperador = true
            }
           
               
                
       }

       const teclasBloqueadas = /[a-zA-Z~´]|^(?!Shift$)\^$/;
    
    if (teclasBloqueadas.test(tecla)) {
        e.preventDefault();
        return;
    }
        event.preventDefault();
}

function desativaTeclaVirtual(tecla){
    teclaVirtualAtivada.classList.remove('teclaVirtualAtivada');
    teclaVirtualAtivada = document.getElementById(tecla);
}

function ativaNovaTeclaVirtual(tecla){
    let novaTeclaAtivada = document.getElementById(tecla)
    novaTeclaAtivada.classList.add('teclaVirtualAtivada');
}

function apertouTeclaVirtual(tecla){
    if(input.value == 'Error'){
        input.value = 0
        digitouOperador = true
        return
    }
    if(tecla == 'Delete'){
        texto = input.value
        if(texto[texto.length-1] == '+' || texto[texto.length-1] == '-' ||texto[texto.length-1] == '/' ||texto[texto.length-1] == '*' ||texto[texto.length-1] == '^' || texto[texto.length-1] == '√'){
            contadorExpressao--
            digitouOperador = false
            console.log('apagouOperador')
        }
        input.value = texto.slice(0,input.value.length-1);
        desativaTeclaVirtual('Backspace')
        ativaNovaTeclaVirtual('Backspace')
       return
    }
    if(tecla ==  'C'){
        input.value = ''
        digitouOperador = true
        
        return
    }
    if(tecla == '='){
        verificaCalculo()
        return
    }
    if(tecla == '+' ||tecla == '-' ||tecla == '*' ||tecla == '/' || tecla == '.' || tecla == '^' || tecla =='√'){
        let conta = input.value;
        if(input.value==''){
            console.log('entroup')
            event.preventDefault();
            return
        }
        for(contador = 0 ; contador <=conta.length ; contador++){
                if(conta[contador] == '+' || conta[contador] == '-' || conta[contador] == '/' || conta[contador] == '*' || conta[contador] == '^' || conta[contador] == '√'){
                 if(digitouOperador == false){
                    contadorExpressao++;
                    digitouOperador = true;
                    return
                 }else{
                    event.preventDefault();
                    return
                 }
                   
                }
        }

        if(tecla == '√'){
            event.preventDefault()
            let alteraInput = input.value;
            console.log(alteraInput)
            input.value = '√' + alteraInput
            desativaTeclaVirtual(tecla)
            ativaNovaTeclaVirtual(tecla)
            return
        }
    }
    desativaTeclaVirtual(tecla)
    ativaNovaTeclaVirtual(tecla)
    input.value +=`${tecla}`
    digitouOperador = false;

}

function verificaCalculo(){
   conta = input.value;
   let numero1 = 0
    let numero2 = 0
    let operador ;
    let calculo =0

   for(let contador = 0 ; contador < conta.length; contador++){
    
    if(conta[contador].charCodeAt() >= 42 && conta[contador].charCodeAt()  <= 47 || conta[contador].charCodeAt()  == 94 ||conta[contador] == '√' ){
        numero1 = conta.slice(0,contador);
        numero2 = conta.slice(contador+1,conta.length);
        operador = conta[contador];

        if(operador == '+'){
            calculo =  Number(numero1) + Number(numero2)
          }
        if(operador == '^'){
            calculo = Number(numero1);
            if(numero2 == '0'){
                calculo = 1;
            }
            for(let multiplicador = 1;multiplicador<numero2;multiplicador++ ){
               calculo = calculo * Number(numero1);
            }
          }
          if(operador == '√'){
            calculo = Math.sqrt(numero2)
          }
            
          if(operador == '-'){
           calculo = Number(numero1) - Number(numero2)
         }
         if(operador == '/'){
            if(numero2 == 0 ){
                 input.value = 'Error'
                return
            }
           calculo = Number(numero1) / Number(numero2)
           console.log('dividiu '+ calculo)
         }
         if(operador == '*'){
           calculo = Number(numero1) * Number(numero2)
         }
    }
   }
   

   input.value = `${calculo}`
   

}