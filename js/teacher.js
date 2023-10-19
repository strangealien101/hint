

window.addEventListener('load', function open(){   /* Запуск обучения при загрузке страницы */
/*------------------- Высплывающая подсказка у элемента -----------------------*/




 let user = {
  trainingCompleted: false,   /* Проходил ли пользователь обучение? */
 }


  /* Объект подсказки */

 let hint = {
 
  modalTextWindow: [
    {title: 'Создание программы', fieldModal: 'Это поля, которые необходимо заполнить.'},
    {title: 'Создание программы', fieldModal: 'В периоде действия указывается, когда программа будет доступна.'},
    {title: 'Создание программы', fieldModal: 'Это поля, которыМожно дать доступ к программе сразу всем розничным и/или оптовым компаниям.е необходимо заполнить.'},
    {title: 'Создание программы', fieldModal: 'Можно дать доступ к программе только определенным компаниям.'},
    {title: 'Создание программы', fieldModal: 'После нажатия на кнопку «Добавить» программа появится в системе.'},
    {title: 'Создание программы', fieldModal: 'После нажатия на кнопку «Добавить» программа появится в системе.'},
  ],
  countHelp: 0,  /* Счетчик порядка подсказок, соответсвует data-id="1" */
  styleWndw: document.getElementById('bckgModalTH'), /* Находим фон */
  visibilityPage: function(){
      hint.styleWndw.classList.toggle('modalBGTH');
  },

  hintСard: 0, /* Сохраняем подсказку*/
  helpData: document.querySelectorAll('[data-id]'),
  createHint: function(a) {/* Формируем подсказку*/

    let template = document.querySelector('#templateHelpWindow') /* находим шаблон подсказки */ 
    let helpWindow = template.content.cloneNode(true); /* копируем шаблон */ 
    
    let modalHeaderText = helpWindow.querySelector('.modal-header__text'); /* находим заголовок подсказки */ 
    let modalText = helpWindow.querySelector('.modal-text');  /* находим текст-описание подсказки */ 
    modalHeaderText.textContent = hint.modalTextWindow[a].title; /* вставляем текст-заголовок подсказки */ 
    modalText.textContent = hint.modalTextWindow[a].fieldModal; /* вставляем текст-описание подсказки */ 
    

    let exitBtnTH = helpWindow.getElementById('exitTH'); /* нашли кнопку "Закрыть" */
    let nextBtnTH = helpWindow.getElementById('nextTH'); /* нашли кнопку "Далее" */
    let previousBtnTH = helpWindow.getElementById('previousTH'); /* нашли кнопку "Назад" */


    if(hint.countHelp > 0) {    /* Если длина счётчика подсказок больше 0, то появляется кнопка "Назад" */           
      previousBtnTH.style.display = 'block';
    }
  
    if(hint.countHelp == (hint.modalTextWindow.length-1) || hint.countHelp == (hint.helpData.length - 1)) { /* Если длина массива с текстом подсказки равна длинне счётчика или длина счётчика равна длине найденных ID, то убираем кнопку "Далее" */ 
      nextBtnTH.style.display = 'none';
    }



    /* Обработка события кнопки "Закрыть" - Закрытие модального окна подсказки и выход из обучения */
    exitBtnTH.addEventListener('click', exitTeacher);
    function exitTeacher(){
      /* Закрытие модального окна  */
      user.trainingCompleted = true;
      hint.visibilityPage();
      hint.returnElementState(a);
  
      hint.countHelp = 0;
    } 

 

     /* Обработка события кнопки "Далее" */
     nextBtnTH.addEventListener('click', nextTeacher);
     function nextTeacher(){
       hint.countHelp = hint.countHelp + 1; /* увеличиваем счетчик на 1 */
       hint.returnElementState(a);
       hint.visibilityPage();
       startTeacher(hint.countHelp);
     }
     /* Обработка события кнопки "Назад" */
    previousBtnTH.addEventListener('click', previousTeacher);
    function previousTeacher(){
      hint.countHelp = hint.countHelp - 1; /* уменьшаем счетчик на 1 */
      hint.returnElementState(a);
      hint.visibilityPage();
      startTeacher(hint.countHelp);
    }
    
    hint.hintСard = helpWindow; /* созданную карточку положили в метод объекта*/ 
    

  },
  returnElementState: function(a){ /* Удаляем подсвеченный элемент и возвращаем верстку в первоначальный вид*/ 
    document.querySelector('.modalContant').after(hint.newhelpElement(a));  /*вставляем копию кнопки которую обернули после обернутой кнопки */
    document.querySelector('.modalContant').remove();  /* удаляем обертку и все, что в ней */
  },
  newhelpElement: function(a){
    return document.querySelector('[data-id="' + a + '"]'); /* Находим элемент у которого нужно вставить подсказку*/ 
  },

  preparingPlacesForHints: function(a){ /* Подготавливаем место для подсказки*/ 
    /* Находим место куда нужно вставить подсказку и подготоваливаем его */
    let newhelpElement = document.querySelector('[data-id="' + a + '"]'); /* Находим элемент у которого нужно вставить подсказку*/ 
    let newHelpString = '<div id="modalСontant" class="modalContant">'+ newhelpElement.outerHTML+'</div>'; /* оборачиваем элемент про который нужно вывести подсказку */
    newhelpElement.insertAdjacentHTML('beforebegin', newHelpString); /* вставляем элемент про который нужно вывести подсказку с оберткой после элемента про который нужно вывести подсказку */
    newhelpElement.remove(); /* удаляем элемент про который нужно вывести подсказку без обертки */
  },
 
  choiceOfLocation: function(a){
    let hintWindow = document.querySelector('#modalWindow');  /* записываем подсказку в переменную */
    let hintArea = document.querySelector('#modalСontant'); /* записываем область подсказки в переменную */
    let hintElement = hint.newhelpElement(a); /* записываем элемент у которого выводим подсказку в переменную */
    let coordNewhelpElementInPage = hint.newhelpElement(a).getBoundingClientRect();/* вычисляем расположение элемента про который нужно вывести подсказку  */
    let modalWidth = hintElement.offsetWidth; /* измеряем длину подсказки в px */
    let modalHeight = hintElement.offsetHeight; /* измеряем высоту подсказки в px */
    let helpWindowInPageWidth = hintElement.offsetWidth; /* измеряем длину элемента про который нужно вывести подсказку в px */
    let helpWindowInPageHeight = hintElement.offsetHeight; /* измеряем высоту элемента про который нужно вывести подсказку в px */
    let pageWidth = document.documentElement.scrollWidth; /* находим ширину страницы */
    let pageHeight = document.documentElement.scrollHeight; /* находим высоту страницы */
    let coordNewhelpElementInPageLeft = coordNewhelpElementInPage.left + window.scrollX; /* расстояние от элемента до конца документа слева */
    let coordNewhelpElementInPageTop = coordNewhelpElementInPage.top + window.scrollY; /* расстояние от элемента до конца документа сверху*/
    let coordNewhelpElementInPageRight = pageWidth - (coordNewhelpElementInPage.right + window.scrollX); /* расстояние от элемента до конца документа справа*/
    let coordNewhelpElementInPageBottom = pageHeight - (coordNewhelpElementInPage.bottom + window.scrollY); /* расстояние от элемента до конца документа снизу*/
    console.log(' 000 ' + helpWindowInPageWidth);

    if (coordNewhelpElementInPageLeft < modalWidth/2 && coordNewhelpElementInPageTop < modalHeight/2) { 
      
      hintWindow.style.left = helpWindowInPageWidth + 20 + "px";
      hintWindow.style.top = "20px";
      hintWindow.style.bottom = "auto";

   
      } else if (coordNewhelpElementInPageRight < modalWidth/2 && coordNewhelpElementInPageTop < modalHeight/2) {
        hintWindow.style.right = helpWindowInPageWidth + 20 + "px";
        hintWindow.style.top = "20px";
        hintWindow.style.bottom = "auto";
      }

      else if (coordNewhelpElementInPageTop < modalHeight/2 && coordNewhelpElementInPageLeft > modalWidth/2 && coordNewhelpElementInPageRight > modalWidth/2) {
        hintWindow.style.top = helpWindowInPageHeight + 20 + "px";
        hintWindow.style.bottom = "auto";
        hintArea.style.justifyContent = "center"
      }

      else if (coordNewhelpElementInPageLeft > modalWidth && coordNewhelpElementInPageRight > modalWidth && coordNewhelpElementInPageBottom > modalHeight && coordNewhelpElementInPageTop > modalHeight) {
        hintWindow.style.bottom = "auto";
        hintWindow.style.top = "auto";
        hintWindow.style.left = helpWindowInPageWidth + 20 + "px";
        hintWindow.style.bottom = "auto";
        hintArea.style.justifyContent = "center";  

      } else if (coordNewhelpElementInPageTop > modalHeight && coordNewhelpElementInPageBottom > modalHeight && coordNewhelpElementInPageLeft > modalWidth && coordNewhelpElementInPageRight < modalWidth/2) {
        hintWindow.style.bottom = "auto";
        hintWindow.style.top = "auto";
        hintWindow.style.right = helpWindowInPageWidth + 20 + "px";
        hintWindow.style.bottom = "auto";
        hintArea.style.justifyContent = "center";

      } else if (coordNewhelpElementInPageBottom < modalHeight/2 && coordNewhelpElementInPageTop > modalHeight && coordNewhelpElementInPageLeft > modalWidth && coordNewhelpElementInPageRight < modalWidth/2) {
        hintWindow.style.bottom = "20px";
        hintWindow.style.top = "auto";
        hintWindow.style.right = helpWindowInPageWidth + 20 + "px";

      } else if (coordNewhelpElementInPageBottom < modalHeight/2 && coordNewhelpElementInPageLeft < modalWidth/2 && coordNewhelpElementInPageRight > modalWidth && coordNewhelpElementInPageTop > modalHeight) {
        hintWindow.style.top = "auto";
        hintWindow.style.right = "auto";
        hintWindow.style.bottom = "20px";
        hintWindow.style.left = helpWindowInPageWidth + 20 + "px";

      } else if (coordNewhelpElementInPageBottom < modalHeight/2 && coordNewhelpElementInPageLeft > modalWidth && coordNewhelpElementInPageRight > modalWidth && coordNewhelpElementInPageTop > modalHeight) {
        hintWindow.style.top = "auto";
        hintWindow.style.right = "auto";
        hintWindow.style.bottom = helpWindowInPageWidth + 20 + "px";
        hintArea.style.justifyContent = "center";

      } else if  (coordNewhelpElementInPageBottom > modalHeight && coordNewhelpElementInPageTop > modalHeight && coordNewhelpElementInPageLeft < modalWidth/2 && coordNewhelpElementInPageRight > modalWidth) {
        hintWindow.style.top = "auto";
        hintWindow.style.right = "auto";
        hintWindow.style.bottom = "auto";
        hintWindow.style.left = helpWindowInPageWidth + 20 + "px";
        hintArea.style.justifyContent = "center";
      }
    


  },
  insertHint: function(a) { /* Вставляем подсказку */
    /* Вставляем подсказку */
    let modalContant = document.querySelector('.modalContant'); /* находим div обертку элемента, куда нужно вставить подсказку */
    let coordNewhelpElementInPage = hint.newhelpElement(a).getBoundingClientRect();/* вычисляем расположение элемента про который нужно вывести подсказку  */
    let pageWidth = document.documentElement.scrollWidth; /* находим ширину страницы */
    let pageHeight = document.documentElement.scrollHeight; /* находим высоту страницы */

    let coordNewhelpElementInPageTop = coordNewhelpElementInPage.top + window.scrollY; /* растояние от элемента до конца документа сверху*/
    let coordNewhelpElementInPageBottom = pageHeight - (coordNewhelpElementInPage.bottom + window.scrollY); /* растояние от элемента до конца документа снизу*/
   
    /* Вставляем прозрачную подсказку для определения размера, вверх или низ, туда, где больше места */
    if (coordNewhelpElementInPageTop > coordNewhelpElementInPageBottom) { /* если сверху больше, то добавляем подсказку */
    hint.hintСard.querySelector('#modalWindow').style.bottom = 0 + "px";
    modalContant.append(hint.hintСard); 
    /*choiceOfLocation1(a)*/
    hint.choiceOfLocation(a);

    } else { /* если снизу больше, то добавляем подсказку */
    hint.hintСard.querySelector('#modalWindow').style.top = 0 + "px";
    modalContant.append(hint.hintСard);
    /*choiceOfLocation1(a);*/
    hint.choiceOfLocation(a);
    } 
    
    function choiceOfLocation1(a){  /*Определяем с какой стороны вставить подсказку */
    let hint = document.querySelector('#modalWindow');  /* записываем подсказку в переменную */
    let hintArea = document.querySelector('#modalСontant'); /* записываем область подсказки в переменную */
    let hintElement = document.querySelector('[data-id="' + a + '"]'); /* записываем элемент у которого выводим подсказку в переменную */
 
    let modalWidth = hintElement.offsetWidth; /* измеряем длину подсказки в px */
    let modalHeight = hintElement.offsetHeight; /* измеряем высоту подсказки в px */
    let helpWindowInPageWidth = hintElement.offsetWidth; /* измеряем длину элемента про который нужно вывести подсказку в px */
    let helpWindowInPageHeight = hintElement.offsetHeight; /* измеряем высоту элемента про который нужно вывести подсказку в px */

    let coordNewhelpElementInPageLeft = coordNewhelpElementInPage.left + window.scrollX; /* расстояние от элемента до конца документа слева */
    let coordNewhelpElementInPageTop = coordNewhelpElementInPage.top + window.scrollY; /* расстояние от элемента до конца документа сверху*/
    let coordNewhelpElementInPageRight = pageWidth - (coordNewhelpElementInPage.right + window.scrollX); /* расстояние от элемента до конца документа справа*/
    let coordNewhelpElementInPageBottom = pageHeight - (coordNewhelpElementInPage.bottom + window.scrollY); /* расстояние от элемента до конца документа снизу*/

    if (coordNewhelpElementInPageLeft < modalWidth/2 && coordNewhelpElementInPageTop < modalHeight/2) { 
      
      hint.style.left = helpWindowInPageWidth + 20 + "px";
      hint.style.top = "20px";
      hint.style.bottom = "auto";

   
      } else if (coordNewhelpElementInPageRight < modalWidth/2 && coordNewhelpElementInPageTop < modalHeight/2) {
        hint.style.right = helpWindowInPageWidth + 20 + "px";
        hint.style.top = "20px";
        hint.style.bottom = "auto";
      }

      else if (coordNewhelpElementInPageTop < modalHeight/2 && coordNewhelpElementInPageLeft > modalWidth/2 && coordNewhelpElementInPageRight > modalWidth/2) {
        hint.style.top = helpWindowInPageHeight + 20 + "px";
        hint.style.bottom = "auto";
        hintArea.style.justifyContent = "center"
      }

      else if (coordNewhelpElementInPageLeft > modalWidth && coordNewhelpElementInPageRight > modalWidth && coordNewhelpElementInPageBottom > modalHeight && coordNewhelpElementInPageTop > modalHeight) {
        hint.style.bottom = "auto";
        hint.style.top = "auto";
        hint.style.left = helpWindowInPageWidth + 20 + "px";
        hint.style.bottom = "auto";
        hintArea.style.justifyContent = "center";  

      } else if (coordNewhelpElementInPageTop > modalHeight && coordNewhelpElementInPageBottom > modalHeight && coordNewhelpElementInPageLeft > modalWidth && coordNewhelpElementInPageRight < modalWidth/2) {
        hint.style.bottom = "auto";
        hint.style.top = "auto";
        hint.style.right = helpWindowInPageWidth + 20 + "px";
        hint.style.bottom = "auto";
        hintArea.style.justifyContent = "center";

      } else if (coordNewhelpElementInPageBottom < modalHeight/2 && coordNewhelpElementInPageTop > modalHeight && coordNewhelpElementInPageLeft > modalWidth && coordNewhelpElementInPageRight < modalWidth/2) {
        hint.style.bottom = "20px";
        hint.style.top = "auto";
        hint.style.right = helpWindowInPageWidth + 20 + "px";

      } else if (coordNewhelpElementInPageBottom < modalHeight/2 && coordNewhelpElementInPageLeft < modalWidth/2 && coordNewhelpElementInPageRight > modalWidth && coordNewhelpElementInPageTop > modalHeight) {
        hint.style.top = "auto";
        hint.style.right = "auto";
        hint.style.bottom = "20px";
        hint.style.left = helpWindowInPageWidth + 20 + "px";

      } else if (coordNewhelpElementInPageBottom < modalHeight/2 && coordNewhelpElementInPageLeft > modalWidth && coordNewhelpElementInPageRight > modalWidth && coordNewhelpElementInPageTop > modalHeight) {
        hint.style.top = "auto";
        hint.style.right = "auto";
        hint.style.bottom = helpWindowInPageWidth + 20 + "px";
        hintArea.style.justifyContent = "center";

      } else if  (coordNewhelpElementInPageBottom > modalHeight && coordNewhelpElementInPageTop > modalHeight && coordNewhelpElementInPageLeft < modalWidth/2 && coordNewhelpElementInPageRight > modalWidth) {
        hint.style.top = "auto";
        hint.style.right = "auto";
        hint.style.bottom = "auto";
        hint.style.left = helpWindowInPageWidth + 20 + "px";
        hintArea.style.justifyContent = "center";
      }
  }
 },
 resize: function(){
  if(hint.resizeTimeout == false){
    console.log('Ресайз ' + hint.countHelp);
    hint.resizeTimeout = true;
    setTimeout(function(){hint.resizeTimeout = false;}, 500);

    hint.choiceOfLocation(hint.countHelp);

  } else{
    console.log('НЕ Ресайз');
  }
  
 },
 resizeTimeout: false,
}


  


 function startTeacher(a){
  if (user.trainingCompleted == false) {   /* если обучение не пройдено, то запускаем все функции */
    /*hint.hidePage();  скрываем фон */
    hint.visibilityPage()
    hint.createHint(a); /* создаем подсказку */
    hint.preparingPlacesForHints(a); /* готовим место для подсказки */
    hint.insertHint(a); /* вставляем подсказку */
  } 
  
}


/*
? Плашка сбоку 
*/
/* Появление окна справки по работе с системой */

document.getElementById('bookMark').addEventListener('click', closeWindowHelp);

function closeWindowHelp() {  /* При нажатии на закладку, у нас добавляется класс, при повторном нажатии класс удаляется */
  document.getElementById('program').classList.toggle('block-programs__play');
  document.getElementById('bookMark').classList.toggle('bookmarkExit'); 
  document.getElementById('bckgHelp').classList.toggle('modalBGTH');
}
/* Окно для заполнения формы для связи */

let stringAid = document.getElementById('aid'); /* находим по id элемент "Написать в поддержку" */
let formAid = document.getElementById('connection')  /* находим по id контейнер с формой для заполнения */

function openAid() {                    /* при клике на элемент вызываем функцию, где у нас появляется форма */
  formAid.style.display = 'block'
}

stringAid.addEventListener('click', openAid); 

let exitForm = document.getElementById('btnExit'); /* находим по id кнопку закрытия окна формы */

function exitAid() {                    /* при клике на элемент вызываем функцию, где закрывается форма */
  formAid.style.display = "none";
}

exitForm.addEventListener('click', exitAid);

document.getElementById('startHlp').onclick = function() {
 
  closeWindowHelp();
  user.trainingCompleted = false;
  startTeacher(hint.countHelp); 
}


/* 
! =================== НАЧАЛО ПОТОКА ВЫПОЛНЕНИЯ СКРИПТА =================== 
*/
startTeacher(hint.countHelp); 
this.window.addEventListener('resize', hint.resize);
/* 
! =================== КОНЕЦ ПОТОКА ВЫПОЛНЕНИЯ СКРИПТА =================== 
*/
}
)

/** 
 * ! Задание
 * ресайз подсказки
 * id у подсказок
 * метод заполнения массива
 * метод тру\фолс
 * заменить удаление элемента на скрытие его через видимость или использовать наложение css
 * Переполнение в плашке с подсказок
 */

