var ModuleTask3 = {};
ModuleTask3.name = "MODULE Task3";
ModuleTask3.films = new Array();

ModuleTask3.Film = function (name, director, genre, year) {
    this.name = name;
    this.director = director;
    this.genre = genre;
    this.year = year;

    ModuleTask3.Film.prototype.toString = function () {
        return `<td>${this.name}</td>
                <td>${this.director}</td>
                <td>${this.genre}</td>
                <td>${this.year}</td>`;
    } // toString
} // Film

var films = [
    new ModuleTask3.Film("Побег из Шоушенка", "Фрэнк Дарабонт", "драма", 1994),
    new ModuleTask3.Film("Зеленая миля", "Фрэнк Дарабонт", "фантастика", 1999),
    new ModuleTask3.Film("Форрест Гамп", "Роберт Земекис", "драма", 1994),
    new ModuleTask3.Film("Список Шиндлера", "Стивен Спилберг", "драма", 1993),
    new ModuleTask3.Film("1+1", "Оливье Накаш", "драма", 2011),
    new ModuleTask3.Film("Начало", "Кристофер Нолан", "фантастика", 2010),
    new ModuleTask3.Film("Леон", "Люк Бессон", "боевик", 1994),
    new ModuleTask3.Film("Король Лев", "Роджер Аллерс", "мультфильм", 1994),
    new ModuleTask3.Film("Бойцовский клуб", "Дэвид Финчер", "триллер", 1999),
    new ModuleTask3.Film("Иван Васильевич меняет профессию", "Леонид Гайдай", "фантастика", 1973)
];

function writeFilms(films) {
    let html = films.reduce((html, f) => html + `<tr>${f.toString()}</tr>`, '');

    $("#films").html(html);
} // writeFilms

function loadAndShowFilms() {
    if (window.localStorage.getItem("films") === null) {
        window.localStorage.films = JSON.stringify(films);
    } // if

    let filmsArr = JSON.parse(window.localStorage.films);
    for (var i = 0; i < filmsArr.length; i++) {
        ModuleTask3.films[i] = new ModuleTask3.Film(
            filmsArr[i].name, filmsArr[i].director,
            filmsArr[i].genre, filmsArr[i].year);
    } // for i

    writeFilms(ModuleTask3.films);
} // loadAndShowFilms

window.onload = function () {
    $("#btnDirector").click(filmsDirector);
    $("#btnGenre").click(filmsGenre);
    $("#btnYear").click(filmsYear);

    loadAndShowFilms();
} // onload

function filmsDirector() {
    filmsShowHandler();
    let f = document.task3_1;
    let director = f.director.value;

    $(`tr:has(td:contains(${director}))`).css("background-color", "#f1f7cd");

    setTimeout(filmsShowHandler, 15000);
    f.director.value = "";
} // filmsDirector

function filmsGenre() {
    filmsShowHandler();
    let f = document.task3_2;
    let genre = f.genre.value;

    $(`tr:has(td:contains(${genre}))`).css("background-color", "#f1f7cd");

    setTimeout(filmsShowHandler, 15000);
    f.genre.value = "";
} // filmsGenre

function filmsYear() {
    filmsShowHandler();
    let f = document.task3_3;
    let year = f.year.value;

    $(`tr:has(td:contains(${year}))`).css("background-color", "#f1f7cd");

    setTimeout(filmsShowHandler, 15000);
    f.year.value = "";
} // filmsYear

function filmsShowHandler() {
    loadAndShowFilms();
} // filmsShowHandler