# Automatically generated build file. Do not edit.
COMPONENT_INCLUDES += $(PROJECT_PATH)/mosapp/include
COMPONENT_LDFLAGS += -L$(BUILD_DIR_BASE)/mosapp /Users/anderson/Dropbox/anderson-cloud/apps/doorbell-c/deps/ota-shadow/lib/esp32/libota-shadow.a /Users/anderson/Dropbox/anderson-cloud/apps/doorbell-c/deps/dash/lib/esp32/libdash.a /Users/anderson/Dropbox/anderson-cloud/apps/doorbell-c/deps/ota-http-client/lib/esp32/libota-http-client.a /Users/anderson/Dropbox/anderson-cloud/apps/doorbell-c/deps/ota-http-server/lib/esp32/libota-http-server.a /Users/anderson/Dropbox/anderson-cloud/apps/doorbell-c/deps/rpc-service-ota/lib/esp32/librpc-service-ota.a -Wl,--whole-archive -lmosapp -Wl,--no-whole-archive
COMPONENT_LINKER_DEPS += 
COMPONENT_SUBMODULES += 
COMPONENT_LIBRARIES += mosapp
component-mosapp-build: 
