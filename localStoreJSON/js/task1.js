var ModuleTask1 = {};
ModuleTask1.name = "MODULE Task1";
ModuleTask1.goods = new Array();
ModuleTask1.checks = new Array();

ModuleTask1.Good = function (name, price, quant, photo) {
    this.name = name;
    this.price = price;
    this.quant = quant;
    this.photo = photo;

    ModuleTask1.Good.prototype.toString = function () {
        return `<td>${this.name}</td>
                <td>${this.price}</td>
                <td>${this.quant}</td>
                <td class="text-center">
                    <img src='../imgs/task1/${this.photo}' width='128' height="128"/>
                </td>`;
    } // toString
} // Good

ModuleTask1.Check = function (number, dateTime, customer, goodsArr) {
    this.number = number;
    this.dateTime = dateTime;
    this.customer = customer;
    this.goodsArr = goodsArr;
    this.goodsShow = function () {
        let str = "";
        for (var i = 0; i < goodsArr.length; i++) {
            if (goodsArr[i] !== undefined) {
                str += goodsArr[i].name + ': ' +
                    goodsArr[i].quant + 'шт. по ' +
                    goodsArr[i].price + 'руб.<br/>';
            }
        }
        return str
    }
    ModuleTask1.Check.prototype.toString = function () {
        return `<td>${this.number}</td>
                <td>${this.dateTime}</td>
                <td>${this.customer}</td>
                <td>${this.goodsShow()}</td>`;
    } // toString
} // Check

var goods = [
    new ModuleTask1.Good("Клей", 15.25, 3, "klei.jpg"),
    new ModuleTask1.Good("Паяльник", 75.50, 2, "payalnik.jpg"),
    new ModuleTask1.Good("Нитки", 22.30, 2, "nitki.jpg"),
    new ModuleTask1.Good("Рулетка", 44.78, 5, "ruletka.jpg"),
    new ModuleTask1.Good("Скотч", 19.80, 1, "skotch.jpg"),
    new ModuleTask1.Good("Изолента", 9.45, 4, "izolenta.jpg"),
    new ModuleTask1.Good("Вантуз", 53.35, 2, "vantuz.jpg"),
    new ModuleTask1.Good("Мышеловка", 6.10, 5, "mishelovka.jpg"),
    new ModuleTask1.Good("Перчатки", 15.61, 3, "perchatki.jpg")
];

var checks = [
    new ModuleTask1.Check(1, new Date(2020, 10, 8, 00, 19, 30), "Романов В.В.", [goods[0], goods[1], goods[3]]),
    new ModuleTask1.Check(2, new Date(2020, 10, 8, 00, 19, 40), "Лаврентьева И.Р.", [goods[6], goods[7], goods[2]]),
];

function writeGoods(goods) {
    let html = goods.reduce((html, p) => html + `<tr>${p.toString()}</tr>`, '');

    $("#goods").html(html);
} // writeGoods

function writeChecks(checks) {
    let html = checks.reduce((html, c) => html + `<tr>${c.toString()}</tr>`, '');

    $("#checks").html(html);
} // writeChecks

window.onload = function () {
    loadAndShowGoods();
    loadAndShowChecks();
} // onload

function loadAndShowGoods() {
    if (window.localStorage.getItem("goods") === null) {
        window.localStorage.goods = JSON.stringify(goods);
    } // if

    let goodsArr = JSON.parse(window.localStorage.goods);
    for (var i = 0; i < goodsArr.length; i++) {
        ModuleTask1.goods[i] = new ModuleTask1.Good(
                                    goodsArr[i].name, goodsArr[i].price,
                                    goodsArr[i].quant, goodsArr[i].photo);
    } // for i

    writeGoods(ModuleTask1.goods);
} // loadAndShowGoods

function loadAndShowChecks() {
    if (window.localStorage.getItem("checks") === null) {
        window.localStorage.checks = JSON.stringify(checks);
    } // if

    let checksArr = JSON.parse(window.localStorage.checks);
    for (var i = 0; i < checksArr.length; i++) {
        ModuleTask1.checks[i] = new ModuleTask1.Check(
                                    checksArr[i].number, checksArr[i].dateTime,
                                    checksArr[i].customer, checksArr[i].goodsArr);
    } // for i

    writeChecks(ModuleTask1.checks);
} // loadAndShowChecks