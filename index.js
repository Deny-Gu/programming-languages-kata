let form = document.getElementById('form'),
    select = document.getElementById('languages-list'),
    list = document.getElementById('languages-content');

//Функция добавления карточки с языками программирования
function getLanguagesList (name, year, projects, logo, docs) {
    let addItem = document.createElement('li');
    addItem.classList.add('languages-item');
    
    let addImgItem = document.createElement('img');
    addImgItem.classList.add('logo');
    addImgItem.src = logo;
    addItem.appendChild(addImgItem);

    let addH1Item = document.createElement('h1');
    addH1Item.innerHTML = name;
    addItem.appendChild(addH1Item);

    let addYearItem = document.createElement('p');
    addYearItem.innerHTML = `Основан в ${year}`;
    addItem.appendChild(addYearItem);

    let addProjectsItem = document.createElement('p');
    addProjectsItem.innerHTML = `${projects} проектов на GitHub`;
    addItem.appendChild(addProjectsItem);

    let addDocsItem = document.createElement('a');
    addDocsItem.href = docs;
    addDocsItem.innerHTML = 'Документация';
    addItem.appendChild(addDocsItem);

    list.appendChild(addItem);
}

//Вешаем обработчик события на форму
form.addEventListener('submit', function (event) {
    event.preventDefault()
    list.innerHTML = '';
    
    //Делаем запрос
    fetch('https://frontend-test-api.alex93.now.sh/api/languages')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            arr = data.data;
            
            //Перебираем массив и проверяем на условия, через функцию getLanguagesList добавялем подходящие карточки
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr[i].groups.length; j++) {
                    if ((select.value == arr[i].groups[j]) && (arr[i].logo != undefined)) {
                        getLanguagesList(arr[i].name, arr[i].year, arr[i].projectsCount, arr[i].logo, arr[i].docs)
                    }
                }
            }
        });

  } 
);
