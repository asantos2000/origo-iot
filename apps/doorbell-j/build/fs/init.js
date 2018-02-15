load('api_config.js');
load('api_events.js');
load('api_gpio.js');
load('api_mqtt.js');
load('api_net.js');
load('api_sys.js');
load('api_timer.js');

let led = Cfg.get('pins.led');
let button = Cfg.get('pins.button');
let bell = 13;
//let topic = '/devices/' + Cfg.get('device.id') + '/events';
let eventTopic = Cfg.get('topic.event');
let configTopic = Cfg.get('topic.config');

print('LED GPIO:', led, 'button GPIO:', button);

let getInfo = function() {
  return JSON.stringify({
    total_ram: Sys.total_ram(),
    free_ram: Sys.free_ram()
  });
};

// Blink built-in LED
GPIO.set_mode(led, GPIO.MODE_OUTPUT);
// Timer.set(1000 /* 1 sec */, Timer.REPEAT, function() {
//   let value = GPIO.toggle(led);
//   print(value ? 'Tick' : 'Tock', 'uptime:', Sys.uptime(), getInfo());
// }, null);

// Publish to MQTT topic on a button press. Button is wired to GPIO pin 0
GPIO.set_button_handler(button, GPIO.PULL_UP, GPIO.INT_EDGE_NEG, 200, function() {
  let message = getInfo();
  let ok = MQTT.pub(eventTopic, message, 1);
  print('pub:', ok, eventTopic, '->', message);
}, null);

MQTT.sub(eventTopic, function(conn, eventTopic, msg) {
  print('sub:', eventTopic, 'message:', msg);
  GPIO.set_mode(bell,GPIO.MODE_OUTPUT);
  GPIO.write(bell,1);
  Sys.usleep(1000000);
  GPIO.write(bell,0);

  for (i = 0; i < 5; i++) {
    let value = GPIO.toggle(led);
    print(value ? 'Ding' : 'Dong', 'uptime:', Sys.uptime(), getInfo());
    Sys.usleep(1000000);
  }

}, null);

// Monitor network connectivity.
Event.addGroupHandler(Net.EVENT_GRP, function(ev, evdata, arg) {
  let evs = '???';
  if (ev === Net.STATUS_DISCONNECTED) {
    evs = 'DISCONNECTED';
  } else if (ev === Net.STATUS_CONNECTING) {
    evs = 'CONNECTING';
  } else if (ev === Net.STATUS_CONNECTED) {
    evs = 'CONNECTED';
  } else if (ev === Net.STATUS_GOT_IP) {
    evs = 'GOT_IP';
  }
  print('== Net event:', ev, evs);
}, null);