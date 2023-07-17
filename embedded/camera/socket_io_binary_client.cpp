#include <WebSocketsClient.h>

#include "socket_io_binary_client.h"

// send text frame followed by binary frame
bool SocketIoBinaryClient::send_binary(uint8_t *payload, size_t length, char *binary_lead_frame, bool header_to_payload)
{
  bool frame = false;
  if (length == 0)
  {
    length = strlen((const char *)payload);
  }
  frame = sendFrame(&_client, WSop_text, (uint8_t *)binary_lead_frame,
                    strlen((const char *)binary_lead_frame), true, header_to_payload);

  if (frame)
  {
    frame = sendFrame(&_client, WSop_binary, payload, length, true, header_to_payload);
  }
  return frame;
}
