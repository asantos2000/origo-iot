#include "mgos.h"
#include "mgos_mqtt.h"

#include "esp_sleep.h"

static void deep_sleep_handler(void *arg) {
  //esp_sleep_enable_ext0_wakeup(pin, 1);		// 1== HIGH (Sensor Open)
  esp_deep_sleep(-1);
  LOG(LL_INFO, ("Enter in deep sleep Zzzzz..."));
  esp_deep_sleep_start();
  (void) arg;
}

static void net_cb(int ev, void *evd, void *arg) {
  switch (ev) {
    case MGOS_NET_EV_DISCONNECTED:
      LOG(LL_INFO, ("%s", "Net disconnected"));
      break;
    case MGOS_NET_EV_CONNECTING:
      LOG(LL_INFO, ("%s", "Net connecting..."));
      break;
    case MGOS_NET_EV_CONNECTED:
      LOG(LL_INFO, ("%s", "Net connected"));
      break;
    case MGOS_NET_EV_IP_ACQUIRED:
      LOG(LL_INFO, ("%s", "Net got IP address"));
      break;
  }

  (void) evd;
  (void) arg;
}

enum mgos_app_init_result mgos_app_init(void) {
  /* Deep sleep timer*/
  mgos_set_timer(1000, MGOS_TIMER_REPEAT, deep_sleep_handler, NULL);

  int pin = mgos_sys_config_get_pins_button();
  char topic[100], message[100];
  struct json_out out = JSON_OUT_BUF(message, sizeof(message));
  snprintf(topic, sizeof(topic), "/devices/%s/events",
           mgos_sys_config_get_device_id());
  json_printf(&out, "{total_ram: %lu, free_ram: %lu}",
              (unsigned long) mgos_get_heap_size(),
              (unsigned long) mgos_get_free_heap_size());
  bool res = mgos_mqtt_pub(topic, message, strlen(message), 1, false);
  LOG(LL_INFO, ("Pin: %d, published: %s", pin, res ? "yes" : "no"));

  /* Network connectivity events */
  mgos_event_add_group_handler(MGOS_EVENT_GRP_NET, net_cb, NULL);

  return MGOS_APP_INIT_SUCCESS;
}
