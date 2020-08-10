

export default function BuscaBinaria(lista, valorAlvo, saoObjetos=false, indiceObjeto=null){

    if(lista.length < 3){
        if(saoObjetos){
            return (valorAlvo == lista[0][indiceObjeto])?0:(valorAlvo == lista[1][indiceObjeto])?1:-1;
        }else{
            return (valorAlvo == lista[0])?0:(valorAlvo==lista[1])?1:-1;
        }
    }

    let indexComecoLista = 0;
    let indexFinalLista = lista.length - 1;
    let meio = Number.parseInt((indexComecoLista + indexFinalLista)/2);
    let indexAnterior = null; // Para evitar de cair em um loop infinito.
    let itemEncontrado = false;
    let item = null;

    if(saoObjetos){
        while (!itemEncontrado) {
            item = lista[meio][indiceObjeto];

            if(meio == indexAnterior)
                return -1;
            else if(item == valorAlvo){
                return meio;
            }else if(valorAlvo < meio){
                indexFinalLista = meio; 
            }else{
                indexComecoLista = meio;
            }
            indexAnterior = meio;
            meio = Number.parseInt((indexComecoLista + indexFinalLista) / 2);
        }
    }else{
        while (!itemEncontrado) {
            item = lista[meio];

            if(meio == indexAnterior)
                return -1;
            else if(item == valorAlvo){
                return meio;
            }else if(valorAlvo < meio){
                indexFinalLista = meio; 
            }else{
                indexComecoLista = meio;
            }
            indexAnterior = meio;
            meio = Number.parseInt((indexComecoLista + indexFinalLista) / 2);
        }
    }


}