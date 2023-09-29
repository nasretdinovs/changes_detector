// Создание контекста аудио
var audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Генерация мелодии
function playMelody() {
  var melody = [
  //{ frequency: 523.25, duration: 200 }, // C
  //{ frequency: 587.33, duration: 200 }, // D
  //{ frequency: 659.25, duration: 200 }, // E
  { frequency: 698.46, duration: 200 }, // F
  //{ frequency: 783.99, duration: 200 }, // G
  { frequency: 880.00, duration: 200 }, // A
  //{ frequency: 987.77, duration: 200 }, // B
  { frequency: 1046.50, duration: 200 }, // C
  ];
  
  var pauseDuration = 50; // Длительность паузы между нотами (в миллисекундах)
  var currentTime = audioContext.currentTime; // Текущее время аудио
  
  for (var i = 0; i < melody.length; i++) {
    var note = melody[i];
    
    var oscillator = audioContext.createOscillator();
    oscillator.type = 'triangle'; // Тип звукового сигнала
    oscillator.frequency.value = note.frequency; // Частота звука
    
    var gainNode = audioContext.createGain();
    gainNode.gain.value = 0.03; // Громкость звука
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start(currentTime);
    oscillator.stop(currentTime + note.duration / 1000);
    
    currentTime += (note.duration + pauseDuration) / 1000; // Обновление времени для следующей ноты
  }
}

window.setInterval(function() {
  var operatorElement = $('.dashboard-user-calls-grid__operator-bullet_color_blue');
  var queueElement = $('.dashboard-header__stat-box_color_blue .dashboard-header__title');
  var queueNumber = parseInt(queueElement.text());
  
  if (operatorElement.length > 0) {
    console.log('Оператор посинел!');
    playMelody();
    
    // Создание текстового уведомления
    if (Notification.permission === 'granted') {
      new Notification('Оператор посинел!');
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
          new Notification('Оператор посинел!');
        }
      });
    }
  }
  
  if (queueNumber > 1) {
    console.log('В очереди ' + queueNumber + ' звонков');
    playMelody();
    
    // Создание текстового уведомления
    if (Notification.permission === 'granted') {
      new Notification('В очереди звонков: ' + queueNumber);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
          new Notification('В очереди звонков: ' + queueNumber);
        }
      });
    }
  }
}, 30000);
