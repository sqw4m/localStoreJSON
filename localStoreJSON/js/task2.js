var ModuleTask2 = {};
ModuleTask2.name = "MODULE Task2";
ModuleTask2.attractions = new Array();
ModuleTask2.park;

ModuleTask2.Attraction = function (name, timeStart, timeStop, price) {
    this.name = name;
    this.timeStart = timeStart;
    this.timeStop = timeStop;
    this.price = price;

    ModuleTask2.Attraction.prototype.toString = function () {
        return `<td>${this.name}</td>
                <td>с ${this.timeStart.toLocaleTimeString()} до ${this.timeStop.toLocaleTimeString()}</td>
                <td>${this.price}</td>`;
    } // toString
} // Attraction

ModuleTask2.Park = function (name, address, attractionsArr) {
    this.name = name;
    this.address = address;
    this.attractionsArr = attractionsArr;
    this.attractionsShow = function () {
        str = `<table class="table table-bordered width-610">
                    <tr class="table-secondary">
                        <td>
                            Название
                        </td>
                        <td>
                            Время работы
                        </td>
                        <td>
                            Цена
                        </td>
                    </tr>
                    <tbody>`;
        for (var i = 0; i < attractionsArr.length; i++) {
            str += `<tr><td>${attractionsArr[i].name}</td>
            <td>с ${attractionsArr[i].timeStart.toLocaleTimeString()} до ${attractionsArr[i].timeStop.toLocaleTimeString()}</td>
            <td>${attractionsArr[i].price}</td></tr>`
        }
        return str + `</tbody></table>`;
    }
    ModuleTask2.Park.prototype.toString = function () {
        return `<p>Название парка:&nbsp;<b>${this.name}</b></p>
                <p>Адрес:&nbsp;<b>${this.address}</b></p>`;
    } // toString
} // Park

var attractions = [
    new ModuleTask2.Attraction("Бой быков", new Date(0, 0, 0, 10, 00, 00), new Date(0, 0, 0, 23, 00, 00), 350),
    new ModuleTask2.Attraction("Колесо обозрения", new Date(0, 0, 0, 08, 00, 00), new Date(0, 0, 0, 20, 00, 00), 250),
    new ModuleTask2.Attraction("Комната смеха", new Date(0, 0, 0, 08, 00, 00), new Date(0, 0, 0, 23, 00, 00), 150),
    new ModuleTask2.Attraction("Гидродром", new Date(0, 0, 0, 08, 00, 00), new Date(0, 0, 0, 23, 00, 00), 250),
    new ModuleTask2.Attraction("Детский поезд", new Date(0, 0, 0, 08, 00, 00), new Date(0, 0, 0, 18, 00, 00), 150),
    new ModuleTask2.Attraction("Тир", new Date(0, 0, 0, 10, 00, 00), new Date(0, 0, 0, 23, 00, 00), 250),
    new ModuleTask2.Attraction("Автодром", new Date(0, 0, 0, 09, 00, 00), new Date(0, 0, 0, 22, 00, 00), 300),
    new ModuleTask2.Attraction("Карусель цепочная", new Date(0, 0, 0, 08, 00, 00), new Date(0, 0, 0, 23, 00, 00), 200)
];

var parkInit = new ModuleTask2.Park("Торп-Парк", "Staines Road, KT16 8PN Chertsey, Slough, United Kingdom", [attractions[0],
                attractions[1], attractions[2], attractions[3], attractions[4], attractions[5], attractions[6], attractions[7],]);

function writeAttractions(attractions) {
    let html = attractions.reduce((html, a) => html + `<tr>${a.toString()}</tr>`, '');

    $("#attractions").html(html);
} // writeAttractions

function writePark(park) {
    let htmlPark = park.toString();

    $("#park").html(htmlPark);

    let htmlAttractions = park.attractionsShow();

    $("#attractions").html(htmlAttractions);
} // writePark

function loadAndShowPark() {
    if (window.localStorage.getItem("park") === null) {
        window.localStorage.park = JSON.stringify(parkInit);
    } // if

    let park = JSON.parse(window.localStorage.park);
    for (var i = 0; i < park.attractionsArr.length; i++) {
        ModuleTask2.attractions[i] = new ModuleTask2.Attraction(park.attractionsArr[i].name,
                                                                new Date(park.attractionsArr[i].timeStart),
                                                                new Date(park.attractionsArr[i].timeStop),
                                                                park.attractionsArr[i].price)
    }
    ModuleTask2.park = new ModuleTask2.Park(park.name, park.address, ModuleTask2.attractions);

    writePark(ModuleTask2.park);
} // loadAndShowPark

window.onload = function () {
    $("#btnStartFirst").click(attractionsStartFirstHandler);
    $("#btnStopFirst").click(attractionsStopFirstHandler);
    $("#btnPriceRange").click(attractionsPriceRangeHandler);

    loadAndShowPark();
} // onload

function attractionsStartFirstHandler() {
    // время атракциона, который начинает работу первым
    let minStarTime = Math.min.apply(null, ModuleTask2.park.attractionsArr.map(a => a.timeStart));

    let html = ModuleTask2.park.attractionsArr.reduce((html, a) => html + `<tr class="${a.timeStart <= minStarTime ? 'mark-yes' : ''}">${a.toString()}</tr>`, '');
    let htmlAttractions = `<table class="table table-bordered width-610">
                    <tr class="table-secondary">
                        <td>
                            Название
                        </td>
                        <td>
                            Время работы
                        </td>
                        <td>
                            Цена
                        </td>
                    </tr>
                    <tbody>${html}</tbody></table>`;
    $("#attractions").html(htmlAttractions);

    setTimeout(parkShowHandler, 15000);
} // attractionsStartFirstHandler

function attractionsStopFirstHandler() {
    // время атракциона, который завершает работу последним
    let minStopTime = Math.max.apply(null, ModuleTask2.park.attractionsArr.map(a => a.timeStop));

    let html = ModuleTask2.park.attractionsArr.reduce((html, a) => html + `<tr class="${a.timeStop >= minStopTime ? 'mark-yes' : ''}">${a.toString()}</tr>`, '');
    let htmlAttractions = `<table class="table table-bordered width-610">
                    <tr class="table-secondary">
                        <td>
                            Название
                        </td>
                        <td>
                            Время работы
                        </td>
                        <td>
                            Цена
                        </td>
                    </tr>
                    <tbody>${html}</tbody></table>`;
    $("#attractions").html(htmlAttractions);

    setTimeout(parkShowHandler, 15000);
} // attractionsStopFirstHandler

function attractionsPriceRangeHandler() {
    let f = document.task2;
    let minPrice = f.minPrice.value;
    let maxPrice = f.maxPrice.value;

    let html = ModuleTask2.park.attractionsArr.reduce((html, a) => html + `<tr class="${a.price >= minPrice && a.price <= maxPrice ? 'mark-yes' : ''}">${a.toString()}</tr>`, '');
    let htmlAttractions = `<table class="table table-bordered width-610">
                    <tr class="table-secondary">
                        <td>
                            Название
                        </td>
                        <td>
                            Время работы
                        </td>
                        <td>
                            Цена
                        </td>
                    </tr>
                    <tbody>${html}</tbody></table>`;
    $("#attractions").html(htmlAttractions);

    setTimeout(parkShowHandler, 15000);
} // attractionsPriceRangeHandler

function parkShowHandler() {
    loadAndShowPark();
} // parkShowHandler