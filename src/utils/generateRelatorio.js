import jspdf from 'jspdf';


export default function generatePDF(nome, email, telefone, queixas = [], procedimentos = [], tempoAtendimento='00:00:00', dataAtendimento='01/01/2020', idAtendimento=null, idPaciente=null, tempoProcedimentos='00:00:00'){

    let doc = new jspdf();

    let matriz = [
        // [Caracter de preenchimento, texto, alinhamento de texto = left];
        ['*', '', ''],
        [' ', 'Relatorio de atendimento', 'center'],
        ['*', '', ''],
        [' ', ` Gerado em: ${dataAtendimento}`, ''],
        [' ', ` Tempo de duração: ${tempoAtendimento}`, ''],
        [' ', ` Número de identificação do atendimento: ${idAtendimento}`, ''],
        ['*', '', ''],
        [' ', 'Dados do paciente', 'center'],
        ['*', '', ''],
        ['', ` Número de identificação do paciente: ${idPaciente}`, ''],
        [' ', ` Nome: ${nome}`, ''],
        [' ', ` Email: ${email}`, ''],
        [' ', ` Telefone: ${telefone}`, ''],
        ['*', '', ''],
        [' ', 'Queixas apresentadas', 'center'],
        ['*', '', '']
    ]

    let texto = insertLinesByArray(matriz);
    
    texto+=formatArrayValuesToText(queixas, 3, '*', true, 'description');
    texto+='\n';

    matriz = [
        ['*', '', ''],
        [' ', 'Procedimentos determinados ao paciente', 'center'],
        ['*', '', ''],
        [' ', ` Tempo total de procedimentos: ${tempoProcedimentos}`, ''],
        [' ', ' Procedimentos', '']
    ]

    texto+=insertLinesByArray(matriz);

    texto += formatArrayValuesToText(procedimentos);
    texto+='\n';

    doc.text(texto, 5, 10);
    doc.save(`relatorio-atendimento-${nome}.pdf`);

}

function formatArrayValuesToText(ArrayValues, columns=3, prefixoLinhas='* ', insertByField=false, field = ''){

    var texto = prefixoLinhas + ' ';
    var columnColage = 0;

    if (insertByField){
        ArrayValues.map(item => {
            if (columnColage < columns) {
                texto += item[field] + '\t';
            }else{
                texto += item[field] + '\n' + prefixoLinhas;
            }
            
        });
    }else{

        ArrayValues.map(item => {
            if (columnColage < columns) {
                texto += item + '\t';
            }else{
                texto += item + '\n' + prefixoLinhas;
            }
            
        });
    }

    return texto + '\n';

}

function insertLinesByArray(matriz, linha_prefix='*', linha_sufixo='\n', columnLength=90){

    let texto = '';
    let x = 0; 
    let beforeText = 0, afterText = 0;
    let textInsertLength = 0;
    let fillcharLength = 0;

    let tamMatriz = matriz.length;
    for (x;x<tamMatriz;x++){
        texto += linha_prefix;
        
        textInsertLength = matriz[x][1].length;
        fillcharLength = columnLength - textInsertLength;

        if (matriz[x][2] == 'center'){
            beforeText = Number.parseInt(fillcharLength/2)
            afterText = columnLength - beforeText - textInsertLength; 
    
            texto += matriz[x][0].repeat(beforeText);
            texto += matriz[x][1];
            texto += matriz[x][0].repeat(afterText);

        }else if(matriz[x][2] == 'right'){
            texto += matriz[x][0].repeat(columnLength - textInsertLength);
            texto += matriz[x][1];
        }else {
            texto += matriz[x][1];
            texto += matriz[x][0].repeat(columnLength - textInsertLength);
        }

        texto += linha_sufixo;
    }

    return texto;
}