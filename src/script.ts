//clock
const days: NodeListOf<HTMLParagraphElement> | null = document.querySelectorAll('#days');
const month: HTMLSpanElement | null = document.querySelector('#month');
const digital: HTMLParagraphElement | null = document.querySelector('#digital');

const setter: HTMLButtonElement | null = document.querySelector('#alarmSet');
const inputTime: HTMLInputElement | null = document.querySelector('#time');

//cronometer
const startBtn: HTMLButtonElement | null = document.querySelector('#start');
const stopBtn: HTMLButtonElement | null = document.querySelector('#stop');
const restartBtn: HTMLButtonElement | null = document.querySelector('#restart');
const timer: HTMLParagraphElement | null = document.querySelector('#starting-time');

//timer
const timerSet: HTMLParagraphElement | null = document.querySelector('#timer');
const startTimer: HTMLButtonElement | null = document.querySelector('#start-timer');
const stopTimer: HTMLButtonElement | null = document.querySelector('#stop-timer');
const restartTimer: HTMLButtonElement | null = document.querySelector('#restart-timer');

const timerVal: NodeListOf<HTMLInputElement> | null = document.querySelectorAll('input[type="number"]');



const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];



if (digital) {
    const now = new Date();

    setInterval(() => {
        const now = new Date();
        digital.textContent = `${now.getHours() <= 9 ? '0' + now.getHours() : now.getHours()} : ${now.getMinutes() <= 9 ? '0' + now.getMinutes() : now.getMinutes()} : ${now.getSeconds() <= 9 ? '0' + now.getSeconds() : now.getSeconds()}`;
    }, 100);

    if (now.getHours() === 22 && now.getMinutes() === 22 && now.getSeconds() === 22 || now.getHours() === 11 && now.getMinutes() === 11 && now.getSeconds() === 11) {
        digital.style.color = '#00f';
    }

    digital.textContent = `${now.getHours()} : ${now.getMinutes() <= 9 ? '0' + now.getMinutes() : now.getMinutes()} : ${now.getSeconds() <= 9 ? '0' + now.getSeconds() : now.getSeconds()}`;
}


//day
if (days) {
    setInterval(() => {
        const today: number = new Date().getDay();
        const indexDay: number = (today === 0) ? today + 6 : today - 1;
        days[indexDay].style.color = '#fff';
    }, 1000);
    const today: number = new Date().getDay();
    const indexDay: number = (today === 0) ? today + 6 : today - 1;
    days[indexDay].style.color = '#fff';
}

//month
if (month) {
    setInterval(() => {
        const nowMonth: number = new Date().getMonth();
        month.textContent = `${months[nowMonth]}`
    }, 1000);
    const nowMonth: number = new Date().getMonth();
    month.textContent = `${months[nowMonth]}`
}

//alarm
if (setter && inputTime) {

    setter.addEventListener('click', () => {
        const dayInput = parseInt(inputTime.value.split(':')[0]);
        const minuteInput = parseInt(inputTime.value.split(':')[1]);
        let alerted = false;

        if (inputTime.value !== '' && !alerted) {
            setInterval(() => {
                if (dayInput === new Date().getHours() && minuteInput === new Date().getMinutes() && !alerted) {
                    document.body.innerHTML = '<audio autoplay loop volume="1" src="src/alarm/anime_wow.mp3"></audio>';
                    alerted = true;
                    setter.textContent = 'set alarm';
                }
            }, 1000);
            setter.textContent = 'alarm set!';
        }
    });
}


//cronometer
if (timer && startBtn && stopBtn && restartBtn) {

    stopBtn.disabled = true;
    restartBtn.disabled = true;

    let hrs: number = 0;
    let min: number = 0;
    let sec: number = 0;

    //start button
    startBtn.addEventListener('click', () => {
        let timerInterval = setInterval(setTimer, 1000);

        function setTimer() {
            sec++;

            if (sec === 60) {
                sec = 0;
                min++;

                if (min === 60) {
                    min = 0;
                    hrs++;

                    if (hrs === 99 && min === 59 && sec === 59) {
                        alert('time is over!');
                    }
                }
            }
            if (timer) {
                timer.textContent = `${hrs <= 9 ? '0' + hrs : hrs} : ${min <= 9 ? '0' + min : min} : ${sec <= 9 ? '0' + sec : sec}`;
            }
        }
        startBtn.disabled = true;

        stopBtn.disabled = false;
        restartBtn.disabled = false;

        stopBtn.textContent = 'stop';
        restartBtn.textContent = 'restart';


        //stop button
        stopBtn.addEventListener('click', function stop() {
            clearInterval(timerInterval);

            startBtn.disabled = false;

            stopBtn.removeEventListener('click', stop);

        });

        //restart button
        restartBtn.addEventListener('click', () => {
            clearInterval(timerInterval);

            startBtn.disabled = false;

            hrs = 0;
            min = 0;
            sec = 0;

            timer.textContent = `${hrs <= 9 ? '0' + hrs : hrs} : ${min <= 9 ? '0' + min : min} : ${sec <= 9 ? '0' + sec : sec}`;
        });
    });
};


//timer
if (timerSet && timerVal && startTimer && stopTimer && restartTimer) {

    stopTimer.disabled = true;
    restartTimer.disabled = true;



    timerVal.forEach((input) => {
        input.addEventListener('input', () => {
            let val0 = timerVal[0].value;
            let val1 = timerVal[1].value;
            let val2 = timerVal[2].value;

            const hours = val0 === '-0' ? '00' : (val0 === '00' ? '00' : (val0.length > 2 ? '00' : (parseInt(val0) < 0 ? '00' : (val0 === '' ? '00' : (parseInt(val0) <= 9 ? '0' + val0 : (parseInt(val0) > 99 ? '00' : (val0.includes('-') ? '00' : val0)))))));

            const minutes = val1 === '-0' ? '00' : (val1 === '00' ? '00' : (val1.length > 2 ? '00' : (parseInt(val1) < 0 ? '00' : (val1 === '' ? '00' : (parseInt(val1) <= 9 ? '0' + val1 : (parseInt(val1) > 59 ? '00' : (val1.includes('-') ? '00' : val1)))))));

            const seconds = val2 === '-0' ? '00' : (val2 === '00' ? '00' : (val2.length > 2 ? '00' : (parseInt(val2) < 0 ? '00' : (val2 === '' ? '00' : (parseInt(val2) <= 9 ? '0' + val2 : (parseInt(val2) > 59 ? '00' : (val2.includes('-') ? '00' : val2)))))));

            timerSet.textContent = `${hours} : ${minutes} : ${seconds}`;
        });
    });


    //start timer
    startTimer.addEventListener('click', () => {

        timerVal.forEach((input) => {
            input.readOnly = true;
        });

        let timeoutInterval: number;

        let hour: number;
        let minute: number;
        let second: number;

        if (timerSet.textContent) {
            let [hh, mm, ss] = timerSet.textContent.split(' : ');

            hour = parseInt(hh);
            minute = parseInt(mm);
            second = parseInt(ss);
        }

        function setTimer() {
            second--;

            if (second < 0) {
                second = 59;
                minute--;

                if (minute < 0) {
                    minute = 59;
                    hour--;

                    if (hour < 0) {
                        hour = 99;
                        clearInterval(timeoutInterval);
                        document.body.innerHTML = '<audio autoplay loop volume="1" src="src/alarm/anime_wow.mp3"></audio>';
                    }
                }
            }
            if (timerSet) {
                timerSet.textContent = `${hour <= 9 ? '0' + hour : hour} : ${minute <= 9 ? '0' + minute : minute} : ${second <= 9 ? '0' + second : second}`;
            }
        }

        timeoutInterval = setInterval(setTimer, 1000);

        startTimer.disabled = true;
        stopTimer.disabled = false;
        restartTimer.disabled = false;

        stopTimer.textContent = 'stop';
        restartTimer.textContent = 'restart';

        timerVal.forEach((input) => {
            input.value = '';
        });


        //stop timer
        stopTimer.addEventListener('click', () => {

            timerVal.forEach((input) => {
                input.readOnly = false;
            });

            startTimer.disabled = false;

            clearInterval(timeoutInterval);
        });

        //restart timer
        restartTimer.addEventListener('click', () => {
            startTimer.disabled = false;

            hour = 0;
            minute = 0;
            second = 0;

            clearInterval(timeoutInterval);

            timerSet.textContent = `${hour <= 9 ? '0' + hour : hour} : ${minute <= 9 ? '0' + minute : minute} : ${second <= 9 ? '0' + second : second}`;
        });
    });
};