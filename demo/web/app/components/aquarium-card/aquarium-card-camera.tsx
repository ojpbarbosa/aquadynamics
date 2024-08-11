'use client'

import { useCallback, useContext, useEffect, useState } from 'react'
import { FaVideoSlash } from 'react-icons/fa'

import { WebSocketContext } from '@/contexts/websocket-context'

type AquariumCardCameraProps = {
  aquariumId: string
}

export default function AquariumCardCamera({ aquariumId }: AquariumCardCameraProps) {
  const { streaming } = useContext(WebSocketContext)
  const [aquariumCameraFrame, setAquariumCameraFrame] = useState('')

  const onAquariumCameraFrame = useCallback((frame: ArrayBuffer) => {
    setAquariumCameraFrame(
      URL.createObjectURL(new Blob([new Uint8Array(frame)], { type: 'image/jpeg' }))
    )
  }, [])

  useEffect(() => {
    streaming.on(aquariumId, onAquariumCameraFrame)

    return () => {
      streaming.off(aquariumId, onAquariumCameraFrame)
    }
  }, [streaming, aquariumId, onAquariumCameraFrame])

  return (
    <div className="w-full flex items-center aspect-[5/4] justify-center bg-neutral-300/20 text-neutral-500 dark:bg-neutral-800/30">
      {aquariumCameraFrame ? (
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
        <img className="w-full h-full object-cover rounded-t" src={aquariumCameraFrame} />
      ) : (
        <video autoPlay muted playsInline loop className="w-full h-full">
          <source src={`/videos/recordings/${aquariumId}.mp4`} type="video/mp4" />
        </video>
      )}
    </div>
  )
}
