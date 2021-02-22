// convert to dms
function decimal2dms(dec){
    let d = dec.toString().split(".")[0];
    let m = (parseFloat("." + dec.toString().split(".")[1])*60).toString().split(".")[0];
    let s = parseFloat("." + (parseFloat("." + dec.toString().split(".")[1])*60).toString().split(".")[1])*60;
    let dms = d + "°" + m + "'" + s + "''";
    return dms

}
// convert to decimal
function dms2decimal(dms){
  let d = dms.toString().split("-")[0];
  let m = dms.toString().split("-")[1];
  let s = dms.toString().split("-")[2];;
  let dec = parseFloat(d) + parseFloat(m)/60 + parseFloat(s)/3600;
  return dec

}

// leer texto o csv
function parseCSV(file, delimiter, callback) {

  let reader = new FileReader();

  // Cuando ha cargado el archivo...
  reader.onload = function() {
  
    // separar
    let lines = this.result.split(',');
    let result = lines.map(function(line) {
        return line.split(delimiter);
    });
    callback(result);
  }
  
  // Leer el contenido como un string.
  reader.readAsText(file);
}

// array
function matrix(a, b) {
    const matrixArr = [];
    for (let i = 0; i < a.length; i++) {
      matrixArr.push([a[i], b[i]])
    }
    return matrixArr;
  }

// almacenar lista
let dec_csv = [];
let csv_dms = [];
let export_csv = [];

// iterar y botar los datos a listas
document.querySelector('input[type="file"]').addEventListener('change', function() {

    let files = this.files;
    for (let i = 0; i < files.length; i++) {
        parseCSV(files[i], ',', function(result) {
            let len = result.length;
            if (result[0][0].includes("-")){

              for (let a = 0; a < len; a++){
                let lista = result[a][0];
                let conv = dms2decimal(lista);
                dec_csv.push(lista);
                csv_dms.push(conv);
                export_csv.push([lista, conv])
                console.log(lista)
                console.log(conv)
            }


            }
            else{
              for (let a = 0; a < len; a++){
                let lista = parseFloat(result[a][0]);
                let conv = decimal2dms(lista);
                dec_csv.push(lista);
                csv_dms.push(conv);
                export_csv.push([lista, conv])
                console.log(lista)
                console.log(conv)
            }

            }
            
    });
}
});

// descargar archivo
function download_file() {
  // cabecera de para los datos.
  let csv = 'entrada,salida\n';
  
  //merge the data with CSV
  export_csv.forEach(function(row) {
          csv += row.join(',');
          csv += "\n";
  });

  
  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  hiddenElement.target = '_blank';
  
  //nombre del archivo
  hiddenElement.download = 'conversion.txt';
  hiddenElement.click();
}

