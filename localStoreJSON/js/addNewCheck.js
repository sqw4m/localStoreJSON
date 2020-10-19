var ModuleAddNewCheck = {};
ModuleAddNewCheck.name = "MODULE AddNewCheck";
ModuleAddNewCheck.goods = new Array();
ModuleAddNewCheck.checks = new Array();

ModuleAddNewCheck.Good = function (name, price, quant, photo) {
    this.name = name;
    this.price = price;
    this.quant = quant;
    this.photo = photo;

    ModuleAddNewCheck.Good.prototype.toString = function () {
        return `<td>${this.name}</td>
                <td>${this.price}</td>
                <td>${this.quant}</td>
                <td class="text-center">
                    <img src='../imgs/task1/${this.photo}' width='128' height="128"/>
                </td>`;
    } // toString
} // Good

ModuleAddNewCheck.Check = function (number, dateTime, customer, goodsArr) {
    this.number = number;
    this.dateTime = dateTime;
    this.customer = customer;
    this.goodsArr = goodsArr;
    this.Summ = function () {
        return goodsArr.reduce(function (sum, elem) { return (sum + elem.price) });
    }
} // Check

window.onload = function () {
    $("#btnAdd").click(addNewCheckOkHandler);
    $("#btnCancel").click(addNewCheckCancelHandler);

    loadGoods();
    dropDownListGoodsLoad();
} // onload

function loadGoods() {
    if (window.localStorage.getItem("goods") === null) {
        window.localStorage.goods = JSON.stringify(ModuleAddNewCheck.goods);
    } // if

    let goodsArr = JSON.parse(window.localStorage.goods);

    for (var i = 0; i < goodsArr.length; i++) {
        ModuleAddNewCheck.goods[i] = new ModuleAddNewCheck.Good(
            goodsArr[i].name, goodsArr[i].price,
            goodsArr[i].quant, goodsArr[i].photo);
    } // for i
} // loadGoods

// загрузка товаров в выпадающий список
function dropDownListGoodsLoad() {
    goodsSelect = addNewCheck.goods;

    for (let i = 0; i < ModuleAddNewCheck.goods.length; i++) {
        let newOption = new Option(`${ModuleAddNewCheck.goods[i].name} - ${ModuleAddNewCheck.goods[i].quant} шт. `
                + `по ${ModuleAddNewCheck.goods[i].price}руб.`, ModuleAddNewCheck.goods[i].name);
        goodsSelect.options[goodsSelect.options.length] = newOption;
    } // for i
} // dropDownListGoodsLoad

function addNewCheckOkHandler() {
    let f = document.addNewCheck;

    let number = ModuleAddNewCheck.checks.length + 1;
    let dateTime = new Date().toDateString() + '-' + new Date().toLocaleTimeString();
    let customer = f.surnameNP.value;
    let goodsArr = selectGoods();

    if (customer.length > 0 && goodsArr.length > 0) {
        ModuleAddNewCheck.checks[ModuleAddNewCheck.checks.length] = new ModuleAddNewCheck.Check(number, dateTime, customer, goodsArr);
        
        let localStr = "";
        for (let i = 0; i < ModuleAddNewCheck.checks.length; i++) {
            localStr += ModuleAddNewCheck.checks[i].number + ','
                + ModuleAddNewCheck.checks[i].dateTime + ','
                + ModuleAddNewCheck.checks[i].customer + ','
                + ModuleAddNewCheck.checks[i].goodsArr.join(';') + '/';
        } // for i

        window.localStorage.checks = localStr;
    } // if

    f.surnameNP.value = "";
    f.goods.value = null;
} // addNewCheckOkHandler

function addNewCheckCancelHandler() {
    let f = document.addNewCheck;

    f.surnameNP.value = "";
    f.goods.value = null;
} // addNewCheckCancelHandler

function selectGoods() {
    let goods = $("#goods");
    let SelectElements = new Array;
    let n = 0;

    for (let i = 0; i < goods.options.length; i++) {
        if ($("#goods").options[i].selected == true) {
            SelectElements[n++] = $("#goods").options[i].text;
        }
    }

    return SelectElements;
} // selectGoods