const routeSelect = document.querySelector('select')
const selectorsTimeBack = document.querySelector('.selector_wrp.timeback')
const section = document.querySelector('section.calculator')

const popup = document.querySelector('.popup__wrp');
const orderInfo = document.querySelector('.order__info')



let chooseTime;
let direction;

let arrival;
let validationTime;

$('.timepicker').timepicker({
    change: createBackDirection,
    timeFormat: 'HH:mm',
    interval: 15,
    minTime: '18:00',
    maxTime: '22:00',
    defaultTime: '11',
    startTime: '10:00',
    dynamic: false,
    dropdown: true,
    scrollbar: true
});


routeSelect.addEventListener('change', createBackDirection)

popup.addEventListener('click', function(e){
    if(e.target.classList.contains('popup__wrp') || e.target.classList.contains('popup__close')) {
        this.classList.remove('active')
    }
})

section.addEventListener('click', calculate)

// -----------------------------------------------------
// -----------------------ФУНКЦИИ-----------------------
// -----------------------------------------------------
function createBackDirection (e){
    if (e.target) {
        direction = this.value
        addGoBack()
        toggleActive()
    } else if(this[0].className == 'timepicker') {
        console.log(this[0].value.length)

        if(this[0].value.length == 5) {
            let time = this[0].value
            validationTime = time
        
            let oldDateObj = new Date(`December 17, 1995 ${time}:00`);
            let newDateObj = new Date(`December 17, 1995 ${time}:00`);
            let arrivalTime = new Date(`December 17, 1995 ${time}:00`);
            newDateObj.setTime(oldDateObj.getTime() + (60 * 60 * 1000));
            goBackTime = `${newDateObj}`.substring(16, 21)
            chooseTime = goBackTime
            addGoBack()
            toggleActive()

            arrivalTime.setTime(oldDateObj.getTime() + (50 * 60 * 1000));
            arrival = `${arrivalTime}`.substring(16, 21)
        } else {
            chooseTime = 2
            addGoBack()
            toggleActive()
        }
    }
}

function addGoBack(){
        if(chooseTime && direction) {
            const goBack = document.querySelector('.back_timepicker')
                if(goBack) {
                    goBack.remove()
                }
                const newGoBack = document.createElement("input")
                newGoBack.placeholder = 'Выберите время'
                newGoBack.classList = 'back_timepicker active'
                console.log(newGoBack.parentElement)
                selectorsTimeBack.insertAdjacentElement('beforeEnd', newGoBack)
            if(direction == 'из A в B и обратно в А' && chooseTime.length == 5) {
                $('.back_timepicker').timepicker({
                    timeFormat: 'HH:mm',
                    interval: 15,
                    minTime: chooseTime,
                    maxTime: '22:00',
                    defaultTime: chooseTime,
                    startTime: '10:00',
                    dynamic: false,
                    dropdown: true,
                    scrollbar: true
                });
                console.log(chooseTime)
                if(chooseTime > '22:00') {
                    newGoBack.placeholder = 'Билетов обратно нет'
                    newGoBack.classList.add('no-tickets')
                }
            } else {
                newGoBack.classList.remove('active')
            }
        }
}
function calculate(e){
    const target = e.target
    let direction = this.querySelector('select')
    let time = this.querySelector('.timepicker')
    let timeback = this.querySelector('.back_timepicker.active')
    let ticketsCount = this.querySelector('.tickets_count')
    if(target == this.querySelector('button')) {
        let ticketsPrice;
        if(direction.value == 'из A в B и обратно в А' && time.value && timeback && timeback.value && ticketsCount.value) {

            ticketsPrice = ticketsCount.value * 1200
            orderInfo.innerHTML = `количество выбраных билетов:${ticketsCount.value} по маршруту ${direction.value} стоимостью ${ticketsPrice}р. Это путешествие займет у вас 1 час и 40 минут. Теплоход отправляется в ${time.value}, а прибудет в ${arrival}. обратное отправление в ${timeback.value}`
            popup.classList.add('active')
            direction.value = 'из A в B и обратно в А';
            time.value = '';
            timeback.value = '';
            timeback.classList.remove('active')
            ticketsCount.value = '';
            toggleActive()


        } else if(time.value && time.value == validationTime &&ticketsCount.value) {

            ticketsPrice = ticketsCount.value * 700
            orderInfo.innerHTML = `количество выбраных билетов:${ticketsCount.value} по маршруту ${direction.value} стоимостью ${ticketsPrice}р. Это путешествие займет у вас 50 минут. Теплоход отправляется в ${time.value}, а прибудет в ${arrival}.`
            popup.classList.add('active')
            direction.value = 'из A в B';
            time.value = '';
            ticketsCount.value = '';
            toggleActive()

        } else {
            console.log('wrong')
        }
    }
}
function toggleActive() {
    const timeBackWrp = document.querySelector('.selector_wrp.timeback')
    if(timeBackWrp.querySelector('.back_timepicker').classList.contains('active')) {
        timeBackWrp.classList.add('active')
    } else {
        timeBackWrp.classList.remove('active')
    }
}