// declarar funciones.
function decimal2dms_input(){
    let dec = document.getElementById("dec").value;
    let d = dec.toString().split(".")[0];
    let m = (parseFloat("." + dec.toString().split(".")[1])*60).toString().split(".")[0];
    let s = parseFloat("." + (parseFloat("." + dec.toString().split(".")[1])*60).toString().split(".")[1])*60;
    let dms = d + m + s
    if(!isNaN(dms))
    {
        document.getElementById("answer0").innerHTML = dec + " ===> " +d + "&deg; " + m + "' " + s + "''";
    }

}

function dms2decimal_input(){
    let d = document.getElementById("g").value;
    let m = document.getElementById("m").value;
    let s = document.getElementById("s").value;
    
    let decimal = parseFloat(d) + parseFloat(m)/60 + parseFloat(s)/3600;
    if(!isNaN(decimal))
    {
        document.getElementById("answer").innerHTML = d + "&deg; " + m + "' " + s + "''" + " ===> " + decimal;
    }
}
