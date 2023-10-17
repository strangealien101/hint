

window.addEventListener('load', function open(){   /* Запуск обучения при загрузке страницы */
/*------------------- Высплывающая подсказка у элемента -----------------------*/


/*------------------- Плашка со справкой справа -----------------------*/

/* Появление окна справки по работе с системой */

let buttonHelpWindow = document.getElementById('bookMark').onclick = function() {  /* При нажатии на закладку, у нас добавляется класс, при повторном нажатии класс удаляется */
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

/* Запуск обучения */
/* 
 let startBtn = document.getElementById('startHlp');
 let helpJoy  = document.getElementById('program');
 let help2  = document.getElementById('bookMark');



 function closedBtnHelp () {
  help2.style.display = "none";
  helpJoy.style.display = "none";
 }

 startBtn.addEventListener ('click', closedBtnHelp);

 /* 
 
 ! ЗАДАНИЕ
 ? При нажатии на кнопку обучения скрыть помощь:
     document.getElementById('program').classList.toggle('block-programs__play');
    document.getElementById('bookMark').classList.toggle('bookmarkExit'); 
    document.getElementById('bckgHelp').classList.toggle('modalBGTH');
  ? сбросить в глобальном объекте пользователя значение прохождения оьучения  
  user.trainingCompleted = false,
  ? запустить обучение 
  startTeacher(hint.countHelp); 
  ! ВСЕМ КЛАССАМ, ID, НАЗВАНИЯМ ОБЪЕКТА ДОБАВИтЬ в НАЗВАНИЕ ПРЕФИКС TH, УЖЕ ПРОСИЛ ОБ ЭТОМ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  */


}
)