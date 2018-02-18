
mos.yaml

```yaml
config_schema:
  - ["dns_sd.enable", true]
  - ["dns_sd.host_name", "mOS_esp32_8016DC"]
  - ["dns_sd.txt", ""] 
  - ["dns_sd.ttl", 120]

build_vars:
  MGOS_ENABLE_DNS_SD: 1
```

linux shell
```bash
$ avahi-browse -alr

+ enp2s0 IPv4 mOS_esp32_1113D4                              Web Site             local
= enp2s0 IPv4 mOS_esp32_1113D4                              Web Site             local
   hostname = [mOS_esp32_1113D4.local]
   address = [192.168.15.17]
   port = [80]
   txt = ["arch=esp32" "fw_id=20180218-181303/???" "id=esp32_1113D4"]
+ wlx04a15148539c IPv4 mOS_esp32_1113D4                              Web Site             local
= wlx04a15148539c IPv4 mOS_esp32_1113D4                              Web Site             local
   hostname = [mOS_esp32_1113D4.local]
   address = [192.168.15.17]
   port = [80]
   txt = ["arch=esp32" "fw_id=20180218-181303/???" "id=esp32_1113D4"]
+ enp2s0 IPv4 mOS_esp32_8016DC                              Web Site             local
= enp2s0 IPv4 mOS_esp32_8016DC                              Web Site             local
   hostname = [mOS_esp32_8016DC.local]
   address = [192.168.15.42]
   port = [80]
   txt = ["arch=esp32" "fw_id=20180215-175945/???" "id=esp32_8016DC"]
+ wlx04a15148539c IPv4 mOS_esp32_8016DC                              Web Site             local
= wlx04a15148539c IPv4 mOS_esp32_8016DC                              Web Site             local
   hostname = [mOS_esp32_8016DC.local]
   address = [192.168.15.42]
   port = [80]
   txt = ["arch=esp32" "fw_id=20180215-175945/???" "id=esp32_8016DC"]
```

browser or curl
```bash
$ curl http://mos_esp32_1113d4.local/
<html>
<body>
  <h1>Welcome to the ultimate DOORBELL 🚪 + 🔔</h1>
</body>
```

Other clients
```bash
$ sudo apt install avahi-discover

$ avahi-discover
```
![avahi-discover](https://github.com/asantos2000/origo-iot/blob/master/docs/Screenshot%20from%202018-02-18%2016-15-46.png "avahi-discover")

