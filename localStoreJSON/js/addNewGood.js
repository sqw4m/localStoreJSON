var ModuleAddNewGood = {};
ModuleAddNewGood.name = "MODULE AddNewGood";
ModuleAddNewGood.goods = new Array();

ModuleAddNewGood.Good = function (name, price, quant, photo) {
    this.name = name;
    this.price = price;
    this.quant = quant;
    this.photo = photo;

    ModuleAddNewGood.Good.prototype.toString = function () {
        return `<td>${this.name}</td>
                <td>${this.price}</td>
                <td>${this.quant}</td>
                <td class="text-center">
                    <img src='../imgs/task1/${this.photo}' width='128' height="128"/>
                </td>`;
    } // toString
} // Good

window.onload = function () {
    $("#btnAdd").click(addNewGoodOkHandler);
    $("#btnCancel").click(addNewGoodCancelHandler);

    loadGoods();
} // onload

function loadGoods() {
    if (window.localStorage.getItem("goods") === null) {
        window.localStorage.goods = JSON.stringify(ModuleAddNewGood.goods);
    } // if

    let goodsArr = JSON.parse(window.localStorage.goods);

    for (var i = 0; i < goodsArr.length; i++) {
        ModuleAddNewGood.goods[i] = new ModuleAddNewGood.Good(
            goodsArr[i].name, goodsArr[i].price,
            goodsArr[i].quant, goodsArr[i].photo);
    } // for i
} // loadGoods

function addNewGoodOkHandler() {
    let f = document.addNewGood;

    let name = f.name.value;
    let price = parseFloat(f.price.value);
    let quant = parseInt(f.quant.value)
    let photo = f.photo.value;

    if (name.length > 0 &&
        price >= 0.01 &&
        quant >= 1) {
        ModuleAddNewGood.goods[ModuleAddNewGood.goods.length] = new ModuleAddNewGood.Good(name, price, quant, photo);
        window.localStorage.goods = JSON.stringify(ModuleAddNewGood.goods);
    } // if

    document.location.href = "page1.html";
} // addNewGoodHandler

function addNewGoodCancelHandler() {
    let f = document.addNewGood;

    f.name.value = "";
    f.price.value = "";
    f.quant.value = "";
    f.photo.value = "venik.jpg";
} // addNewGoodCancelHandler