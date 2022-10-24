'use strict'

const cards = document.querySelectorAll('.card'),
      timeBlocks = document.querySelectorAll('.time__block'),
      showMore = document.querySelectorAll('.more'),
      buyAlert = document.querySelector('.alert')


// ----------------------------------------------------------------------
// --------------------ПЕРЕМЕННЫЕ ДЛЯ AJAX ЗАПРОСА-----------------------
// ----------------------------------------------------------------------
let date = new Date().toLocaleString(); // дата
let adultTicketCount = 0;               // количество купленных взрослых билетов в этом заказе
let kinderTicketCount = 0;              // количество купленных детских билетов в этом заказе
let allTicketsPrice = 0;                // общая сумма заказа
let adultTickePrice;                    // цена взрослого билета на момент покупки
let kinderTickePrice;                   // цена детского билета на момент покупки
let eventId;                            // уникальный id события
let eventTime = '12:00';                // время на которое были куплены билеты (по дефолту значение стоит 12:00)
let barkode = 0;                        // уникальный штрих код заказа
let userId = 0;                         // уникальный id пользователя

let mathUserId = String(Math.random(1, 2))
userId = Number(mathUserId.substring(7, 10))


// ----------------------------------------------------------------------
// ---ФУНКЦИЯ ДЛЯ ПОДСТАВЛЕНИЯ ЭЛЕМЕНТА 'ещё', В БЛОК С ВЫБОРОМ ВРЕМЕНИ--
// ----------------------------------------------------------------------
function insertAfter(referenceNode, newNode) {
    referenceNode.parentElement.insertBefore(newNode, referenceNode.nextSibling);
  }

// ----------------------------------------------------------------------
// ---------------------ФУНКЦИЯ АЛЁРТА ОБ ОПЛАТЕ-------------------------
// ----------------------------------------------------------------------
function validation (i) {
    i.classList.toggle('buy_alert')
    setTimeout(()=> this, 1000)
}
function time (i) {
    if(i.classList.contains('buy_alert'))
    setTimeout(() => validation(i), 1000)
}
  
// ----------------------------------------------------------------------
// -------------------РЕАЛИЗАЦИЯ ФУНКЦИИ 'insertAfter'-------------------
// ----------------------------------------------------------------------
timeBlocks.forEach(t=>{
    let time = t.querySelectorAll('.time__block_item')
    const el = document.createElement("div");
    el.className = "time__block_item more";
    el.innerHTML = "ещё";
    if(time.length > 4) {
        t.parentElement.classList.add('active')
        let thirdBlock = t.children[2]
        insertAfter(thirdBlock, el);
    }
})


// ----------------------------------------------------------------------
// ------------------ВСЕ СОБЫТИЯ СДЕЛАНЫ ЧЕРЕЗ 'e.target'----------------
// ----------------------------------------------------------------------
cards.forEach(card=>{
    card.addEventListener('click', function(e){
        const timeBlocks = this.querySelectorAll('.time__block_item'),
              ageSelector = this.querySelectorAll('.age'),
              showMore = this.querySelector('.more'),
              buyBtn = this.querySelector('.offer_btn'),
              price = this.querySelector('.price__current'),
              cardEventId = this.querySelector('input[name="event_id"]'),
              pierPrice = this.querySelector('.price__pier'),
              target = e.target;

        let acrd = (showMore.parentElement).parentElement;
// ----------------------------------------------------------------------
// -------------------ВЗАИМОДЕЙСТВИЕ С ЭЛЕМЕНТОМ 'ещё'-------------------
// ----------------------------------------------------------------------
        if(target == showMore) {
            acrd.classList.toggle('toggleAcrd')
        } else {
            acrd.classList.remove('toggleAcrd')
        };

// ----------------------------------------------------------------------
// --------------------------ВЫБОР ВРЕМЕНИ РЕЙСА-------------------------
// ----------------------------------------------------------------------
        if(target.classList.contains('time__block_item') && !target.classList.contains('more')) {
            timeBlocks.forEach(timeBlock=>{
                timeBlock.classList.remove('active')
            })
            target.classList.add('active')
            buyBtn.innerHTML = `Купить <br> ${target.innerHTML}`
            eventTime = target.innerHTML
        };

// ----------------------------------------------------------------------
// --------------------------ВЫБОР ТИПА БИЛЕТА---------------------------
// ----------------------------------------------------------------------
        if(target.classList.contains('age')) {
            ageSelector.forEach(age=>{
                age.classList.remove('active')
            })
            target.classList.add('active')
            if(target.classList.contains('adult')) {
                price.innerHTML = `${price.getAttribute('adultPrice')} &#8381;`
                pierPrice.innerHTML = `${pierPrice.getAttribute('adultPrice')} &#8381; на причале`
            } else if(target.classList.contains('kinder')) {
                price.innerHTML = `${price.getAttribute('kinderPrice')} &#8381;`
                pierPrice.innerHTML = `${pierPrice.getAttribute('kinderPrice')} &#8381; на причале`
            }

        };

// ----------------------------------------------------------------------
// ------------КНОПКА ПОКУПКИ БИЛЕТА (ВЫПОЛНЯЕТСЯ AJAX ЗАПРОС)-----------
// ----------------------------------------------------------------------
        if(target.classList.contains('offer_btn')) {
            let selectedAge = this.querySelector('.age.active').getAttribute('age')
            if(selectedAge == 'adult') {
                adultTicketCount++;
                allTicketsPrice = allTicketsPrice + Number(price.getAttribute('adultPrice'))
            } else if (selectedAge == 'kinder') {
                kinderTicketCount++;
                allTicketsPrice = allTicketsPrice + Number(price.getAttribute('kinderPrice'))
            }

            adultTickePrice = Number(price.getAttribute('adultPrice'))
            kinderTickePrice = Number(price.getAttribute('kinderPrice'))
            eventId = Number(cardEventId.value)
            let mathBarkode = String(Math.random(1, 2))
            mathBarkode.substring(2, 8)
            barkode = Number(mathBarkode.substring(2, 10))
            $.ajax({
                method: "POST",
                url: "create.php",
                data: { eventIdVal: eventId, eventTimeVal: eventTime, adultTickePriceVal: adultTickePrice, adultTicketCountVal: adultTicketCount, kinderTickePriceVal: kinderTickePrice, kinderTicketCountVal: kinderTicketCount, barkodeVal: barkode, userIdVal: userId, allTicketsPriceVal: allTicketsPrice, dateVal: date}
            })
            .done(function(msg) {
                // alert( "Data Saved: " + msg );
                validation(buyAlert)
                time(buyAlert)
            });
        };
    })
})