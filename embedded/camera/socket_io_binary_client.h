#include <SocketIOclient.h>

class SocketIoBinaryClient : public SocketIOclient
{
public:
  bool send_binary(uint8_t *payload, size_t length, char *binary_lead_frame, bool header_to_payload = false);
};
