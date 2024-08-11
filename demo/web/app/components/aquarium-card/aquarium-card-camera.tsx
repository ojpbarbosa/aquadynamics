'use client'

import { useCallback, useContext, useEffect, useState } from 'react'
import { BsCameraVideoOffFill } from 'react-icons/bs'

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
      {aquariumId === 'b1k9w3jg0e8zsojvixchy' ? (
        <video autoPlay muted playsInline loop className="w-full h-full">
          <source src={`/videos/recordings/${aquariumId}.mp4`} type="video/mp4" />
        </video>
      ) : (
        <BsCameraVideoOffFill className="text-2xl" />
      )}
    </div>
  )
}
