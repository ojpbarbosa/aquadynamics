'use client'

import { useCallback, useContext, useEffect, useState } from 'react'
import { PiSpinnerGapLight } from 'react-icons/pi'

import { WebSocketContext } from '@/contexts/websocket-context'

type AquariumCameraProps = {
  aquariumId: string
}

export default function AquariumCamera({ aquariumId }: AquariumCameraProps) {
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
    <div className="aspect-[5/4] w-full sm:w-1/2 rounded border border-gray-300 dark:border-neutral-800 flex items-center justify-center bg-neutral-300/20 text-neutral-500 dark:bg-neutral-800/30">
      {aquariumCameraFrame ? (
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
        <img
          className="w-full h-full object-cover rounded border border-gray-300 dark:border-neutral-800"
          src={aquariumCameraFrame}
        />
      ) : (
        <PiSpinnerGapLight className="text-4xl animate-spin" />
      )}
    </div>
  )
}
