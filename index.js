//const allowedIcons = ["ciel-voile", "nuit-legerement-voilee", "ensoleille", "eclaircies", "pluvieux"];
var lasuite = document.getElementById('lasuite');
fetch("https://www.prevision-meteo.ch/services/json/paris")
    .then(function (res) { return res.json(); })
    .then(function (data) { return upDateView(data); });
////////////////////////////////////
//  Helper functions
////////////////////////////////////
function upDateView(data) {
    var imgURL = getIconUrl(data.current_condition);
    document.getElementById("pic0").setAttribute("src", imgURL);
    document.getElementById("date0").innerHTML = (data.current_condition.date);
    document.getElementById("city0").innerHTML = (data.city_info.name);
    document.getElementById("condition0").innerHTML = data.current_condition.condition;
    document.getElementById("temp0").innerHTML = ("Température min :\r" + data.fcst_day_0.tmin + "°" + "<br/>Température max :\r" + data.fcst_day_0.tmax + "°");
    document.getElementById("wind0").innerHTML = ("Vitesse du vent : " + data.current_condition.wnd_spd + "\r km");
    updateHtml(data);
}
/**
 * Vérifie l'existence d'une chaine de caractères dans mon tableau allowedIcons
 * @param key: string    la chaine de caractères à chercher
 *
 * @returns boolean     Si oui ou non la valeur était dans le tableau
 */
function existeDansMonTableau(key) {
    for (var i = 0; i < allowedIcons.length; i++) {
        var currentArrayIcon = allowedIcons[i];
        if (currentArrayIcon == key) {
            return true;
        }
    }
    return false;
}
/**
 * Constitue l'URL d'une icône, à partir d'une condition_key
 *
 * @returns iconURL: string   L'URL de l'icone à afficher (locale ou distante)
*/
function getIconUrl(dayData) {
    // Si ma condition key existe dans mon tableau
    if (existeDansMonTableau(dayData.condition_key)) {
        // alors tu l'affiches
        var localImg = "img/" + dayData.condition_key + ".png";
        return localImg;
    }
    else {
        // tu affiches l'URL de l'APIx
        return dayData.icon;
    }
}
function updateHtml(data) {
    var html = "";
    for (var dayNum = 1; dayNum < 5; dayNum++) {
        var dayData = data["fcst_day_" + dayNum];
        html += createHtml(dayData, dayNum);
    }
    lasuite.innerHTML = html;
}
function createHtml(dayData, dayNum) {
    return " \n    <div class=\"forecast-item " + dayData.condition_key + "\">\n      <img id=\"pic" + dayNum + "\" src=\"" + getIconUrl(dayData) + "\">\n      <div id=\"date" + dayNum + "\">" + (dayData.day_long + "\r" + dayData.date) + "</div>\n      <div id=\"condition" + dayNum + "\">" + dayData.condition + "</div>\n    </div>\n    ";
}
