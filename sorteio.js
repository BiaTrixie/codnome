function geraCodnome(){
    
    const alfabeto = ["cenoura","abacate","repolho","tomate","pepino","ervilha"]
    let codnome = ''
    for(var i = 0; i < 1;i++){
        const caractere = Math.random() * alfabeto.length;

        codnome += alfabeto.at(caractere)
    }
    console.log(codnome);
}

geraCodnome();