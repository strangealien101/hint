

window.addEventListener('load', function open(){   /* Запуск обучения при загрузке страницы */
/*------------------- Высплывающая подсказка у элемента -----------------------*/




 let user = {
  trainingCompleted: false,   /* Проходил ли пользователь обучение? */
 }


  /* Объект подсказки */

 let hint = {
 
  modalTextWindow: [
    {id: 'id0', title: '1Создание программы', fieldModal: 'Это поля, которые необходимо заполнить.'},
    {id: 'id1', title: '2Создание программы', fieldModal: 'В периоде действия указывается, когда программа будет доступна.'},
    {id: 'id2', title: '3Создание программы', fieldModal: 'Это поля, которыМожно дать доступ к программе сразу всем розничным и/или оптовым компаниям.е необходимо заполнить.'},
    {id: 'id3', title: 'Создание программы', fieldModal: 'Можно дать доступ к программе только определенным компаниям.'},
    {id: 'id4', title: 'Создание программы', fieldModal: 'После нажатия на кнопку «Добавить» программа появится в системе.'},
    {id: 'id5', title: 'Создание программы', fieldModal: 'После нажатия на кнопку «Добавить» программа появится в системе.'},
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
    exitBtnTH.addEventListener('click', exitTeacher.bind(exitBtnTH, a));
    function exitTeacher(a){



      /* Закрытие модального окна  */
      user.trainingCompleted = true;
      hint.visibilityPage();
      hint.returnElementState(hint.modalTextWindow[a]);
      hint.countHelp = 0;
    } 



     /* Обработка события кнопки "Далее" */
     nextBtnTH.addEventListener('click', nextTeacher.bind(nextBtnTH, a));
     function nextTeacher(a){
       hint.countHelp = hint.countHelp + 1; /* увеличиваем счетчик на 1 */
       hint.returnElementState(hint.modalTextWindow[a]);
       hint.visibilityPage();
       startTeacher(hint.countHelp);
     }


     /* Обработка события кнопки "Назад" */
    previousBtnTH.addEventListener('click', previousTeacher.bind(previousBtnTH, a));
    function previousTeacher(a){
      hint.countHelp = hint.countHelp - 1; /* уменьшаем счетчик на 1 */
      hint.returnElementState(hint.modalTextWindow[a]);
      hint.visibilityPage();
      startTeacher(hint.countHelp);
    }
    hint.hintСard = helpWindow; /* созданную карточку положили в метод объекта*/ 
  },


  returnElementState: function(a){ /* Удаляем подсвеченный элемент и возвращаем верстку в первоначальный вид*/ 

    let newhelpElement = document.querySelectorAll('[data-id="' + a.id + '"]');
    newhelpElement[1].style.opacity = '1';
    newhelpElement[1].style.position = '';
    document.querySelector('.modalContant').remove();  /* удаляем обертку и все, что в ней */
  },

  newhelpElement: function(a){
    return document.querySelector('[data-id="' + a.id + '"]'); /* Находим элемент у которого нужно вставить подсказку*/ 
  },

  preparingPlacesForHints: function(a){ /* Подготавливаем место для подсказки*/ 
    /* Находим место куда нужно вставить подсказку и подготоваливаем его */
    let newhelpElement = document.querySelector('[data-id="' + a.id + '"]'); /* Находим элемент у которого нужно вставить подсказку*/ 
    let newHelpString = '<div id="modalСontant" class="modalContant">'+ newhelpElement.outerHTML+'</div>'; /* оборачиваем элемент про который нужно вывести подсказку */
    newhelpElement.insertAdjacentHTML('beforebegin', newHelpString); /* вставляем элемент про который нужно вывести подсказку с оберткой перед элементом про который нужно вывести подсказку */
    newhelpElement.style.opacity = '0';
    newhelpElement.style.position = 'absolute';
  },
 
  choiceOfLocation: function(a, b){
    let hintElement = hint.newhelpElement(a); /* записываем элемент у которого выводим подсказку в переменную */
    let hintWindow = document.querySelector('#modalWindow');  /* записываем подсказку в переменную */
    let modalWidth = hintWindow.offsetWidth; /* измеряем длину подсказки в px */
    let modalHeight = hintWindow.offsetHeight; /* измеряем высоту подсказки в px */
    let hintArea = document.querySelector('#modalСontant'); /* записываем область подсказки в переменную */

    let coordNewhelpElementInPage = hint.newhelpElement(a).getBoundingClientRect();/* вычисляем расположение элемента про который нужно вывести подсказку  */
  
    let helpWindowInPageWidth = hintElement.offsetWidth; /* измеряем длину элемента про который нужно вывести подсказку в px */
    let helpWindowInPageHeight = hintElement.offsetHeight; /* измеряем высоту элемента про который нужно вывести подсказку в px */
    let pageWidth = document.documentElement.scrollWidth; /* находим ширину страницы */
    let pageHeight = document.documentElement.scrollHeight; /* находим высоту страницы */
    let coordNewhelpElementInPageLeft = coordNewhelpElementInPage.left + window.scrollX; /* расстояние от элемента до конца документа слева */
    let coordNewhelpElementInPageTop = coordNewhelpElementInPage.top + window.scrollY; /* расстояние от элемента до конца документа сверху*/
    let coordNewhelpElementInPageRight = pageWidth - (coordNewhelpElementInPage.right + window.scrollX); /* расстояние от элемента до конца документа справа*/
    let coordNewhelpElementInPageBottom = pageHeight - (coordNewhelpElementInPage.bottom + window.scrollY); /* расстояние от элемента до конца документа снизу*/
    

  /* Сбрасываем стиль*/
    hintWindow.style.top = "auto";
    hintWindow.style.bottom = "auto";
    hintWindow.style.left = "auto";
    hintWindow.style.right = "auto";

    let xPosition;
    if ( coordNewhelpElementInPageLeft > coordNewhelpElementInPageRight) {  
     xPosition = 'Лево'
    } else{
      xPosition = 'Право'
    }
    let yPosition;
    if ( coordNewhelpElementInPageBottom < modalHeight/2 ) {  
      yPosition = 'Верх'
     } else if(coordNewhelpElementInPageTop < modalHeight/2) {
      yPosition = 'Низ'
     } else {
      yPosition = 'Середина'
     }
    let overflow;
    if( coordNewhelpElementInPageLeft < modalWidth/2 ){  
      overflow = 'НЕТ места СЛЕВА'
     } else if(coordNewhelpElementInPageRight < modalWidth/2 ){
      overflow = 'НЕТ места СПРАВА'
     }else {
      overflow = 'Места хватает'
     }
     let overflowPageWidth;
     if(pageWidth > (helpWindowInPageWidth + 30 + modalWidth)){  
      overflowPageWidth = 'Помещается по ширине'
     } else {
      overflowPageWidth = 'НЕ Помещается по ширине'
     }



     if (xPosition == 'Право' && yPosition == 'Середина' && overflow == 'НЕТ места СЛЕВА' && overflowPageWidth == 'Помещается по ширине') { 
      hintWindow.style.left = helpWindowInPageWidth + 20 + "px";
      hintArea.style.justifyContent = "center"; 
      } else if (xPosition == 'Лево' && yPosition == 'Середина' && overflow == 'Места хватает' && overflowPageWidth == 'Помещается по ширине') { 
        hintWindow.style.right = helpWindowInPageWidth + 20 + "px";     
        } else if (xPosition == 'Лево' && yPosition == 'Середина' && overflow == 'НЕТ места СПРАВА' && overflowPageWidth == 'Помещается по ширине') { 
          hintWindow.style.right = helpWindowInPageWidth + 20 + "px";       
          } else if (xPosition == 'Право' && yPosition == 'Середина' && overflow == 'Места хватает' && overflowPageWidth == 'Помещается по ширине') { 
            hintWindow.style.left = helpWindowInPageWidth + 20 + "px";    
            } else if (xPosition == 'Право' && yPosition == 'Низ' && overflow == 'НЕТ места СЛЕВА' && overflowPageWidth == 'Помещается по ширине') { 
              hintWindow.style.top = helpWindowInPageHeight + 20 + "px";
              hintWindow.style.left = "20px";   
              } else if (xPosition == 'Лево' && yPosition == 'Низ' && overflow == 'НЕТ места СПРАВА' && overflowPageWidth == 'Помещается по ширине') { 
                hintWindow.style.top = helpWindowInPageHeight + 20 + "px";
                hintWindow.style.right = "20px";
                } else if (xPosition == 'Лево' && yPosition == 'Низ' && overflow == 'Места хватает' && overflowPageWidth == 'Помещается по ширине') { 
                  hintWindow.style.top = helpWindowInPageHeight + 20 + "px";
                  hintArea.style.justifyContent = "center"
                  } else if (xPosition == 'Право' && yPosition == 'Верх' && overflow == 'НЕТ места СЛЕВА' && overflowPageWidth == 'Помещается по ширине') { 
                    hintWindow.style.left = "20px";
                    hintWindow.style.bottom = helpWindowInPageHeight + 20 + "px";
                    } else if (xPosition == 'Лево' && yPosition == 'Верх' && overflow == 'Места хватает' && overflowPageWidth == 'Помещается по ширине') { 
                      hintWindow.style.bottom = helpWindowInPageWidth + 20 + "px";
                      hintArea.style.justifyContent = "center";
                      } else if (xPosition == 'Право' && yPosition == 'Верх' && overflow == 'Места хватает' && overflowPageWidth == 'Помещается по ширине') { 
                        hintWindow.style.bottom = helpWindowInPageHeight + 20 + "px";
                        hintArea.style.justifyContent = "center"
                        } else if (xPosition == 'Лево' && yPosition == 'Верх' && overflow == 'НЕТ места СПРАВА' && overflowPageWidth == 'Помещается по ширине') { 
                          hintWindow.style.right = "20px";
                          hintWindow.style.bottom = helpWindowInPageHeight + 20 + "px";
                          } else if(xPosition == 'Право' && yPosition == 'Низ' && overflow == 'Места хватает' && overflowPageWidth == 'Помещается по ширине') {
                            hintWindow.style.top = helpWindowInPageHeight + 20 + "px"; 
                          } else if(xPosition == 'Право' && yPosition == 'Низ' && overflow == 'НЕТ места СЛЕВА' && overflowPageWidth == 'НЕ Помещается по ширине'){
                            
                            hintArea.style.justifyContent = "center"; 
                          } else if(xPosition == 'Право' && yPosition == 'Середина' && overflow == 'НЕТ места СЛЕВА' && overflowPageWidth == 'НЕ Помещается по ширине'){
                            
                            hintArea.style.justifyContent = "center"; 
                          }
  },


  insertHint: function(a, b) { /* Вставляем подсказку */
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
    hint.choiceOfLocation(a, b);
    } else { /* если снизу больше, то добавляем подсказку */
    hint.hintСard.querySelector('#modalWindow').style.top = 0 + "px";
    modalContant.append(hint.hintСard);
    hint.choiceOfLocation(a, b);
    } 
    

 },
 resize: function(){

  if(hint.resizeTimeout == false){
    hint.resizeTimeout = true;
    setTimeout(function(){hint.resizeTimeout = false;}, 500);
    hint.choiceOfLocation(hint.modalTextWindow[hint.countHelp]);
  } 
 },

 resizeTimeout: false,
 startHint: true,
}


  


 function startTeacher(a){
  if (user.trainingCompleted == false) {   /* если обучение не пройдено, то запускаем все функции */
    /*hint.hidePage();  скрываем фон */
    hint.visibilityPage()
    hint.createHint(a); /* создаем подсказку */
    let modalTextWindowHint = hint.modalTextWindow[a];
    hint.preparingPlacesForHints(modalTextWindowHint); /* готовим место для подсказки */
    hint.insertHint(modalTextWindowHint, a); /* вставляем подсказку */
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

function openAid() {    /*  при клике на элемент вызываем функцию, где у нас появляется форма */
  formAid.style.display = 'block'
}

stringAid.addEventListener('click', openAid); 

let exitForm = document.getElementById('btnExit'); /* находим по id кнопку закрытия окна формы */

function exitAid() {      /* при клике на элемент вызываем функцию, где закрывается форма */
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





let hintInPage = this.document.querySelectorAll('[data-id]');
console.log(hintInPage.length);
if(hintInPage.length < 1){
  
  hint.startHint = false;
  
} else{
  startTeacher(hint.countHelp); 
  window.addEventListener('resize', hint.resize);
  console.log('НУЛЬ');
  hint.startHint = true;
}






/* 
! =================== КОНЕЦ ПОТОКА ВЫПОЛНЕНИЯ СКРИПТА =================== 
*/
}
)

/** 
 * ! Задание
 * ресайз подсказки ДА
 * id у подсказок ДА
 * метод заполнения массива
 * заменить удаление элемента на скрытие его через видимость или использовать наложение css ДА
 * Переполнение в плашке с подсказок ДА
 */

