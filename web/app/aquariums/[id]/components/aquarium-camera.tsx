/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client'

import { useCallback, useContext, useEffect, useState } from 'react'
import { PiSpinnerGapLight } from 'react-icons/pi'
import { MdOutlineFullscreen, MdOutlineFullscreenExit, MdPause, MdPlayArrow } from 'react-icons/md'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'

import { WebSocketContext } from '@/contexts/websocket-context'

type AquariumCameraProps = {
  aquariumId: string
}

export default function AquariumCamera({ aquariumId }: AquariumCameraProps) {
  const { streaming } = useContext(WebSocketContext)
  const [isStreamPaused, setIsStreamPaused] = useState(false)
  const [aquariumCameraFrame, setAquariumCameraFrame] = useState('')

  const fullScreenHandle = useFullScreenHandle()

  const onAquariumCameraFrame = useCallback(
    (frame: ArrayBuffer) => {
      if (!isStreamPaused || !aquariumCameraFrame)
        setAquariumCameraFrame(
          URL.createObjectURL(new Blob([new Uint8Array(frame)], { type: 'image/jpeg' }))
        )
    },
    [isStreamPaused, aquariumCameraFrame]
  )

  useEffect(() => {
    streaming.on(aquariumId, onAquariumCameraFrame)

    return () => {
      streaming.off(aquariumId, onAquariumCameraFrame)
    }
  }, [streaming, aquariumId, onAquariumCameraFrame])

  return (
    <div className="aspect-[5/4] w-full sm:w-1/2 rounded border border-gray-300 dark:border-neutral-800 flex items-center justify-center bg-neutral-300/20 text-neutral-500 dark:bg-neutral-800/30">
      {aquariumCameraFrame ? (
        <FullScreen handle={fullScreenHandle} className="w-full h-full">
          <div className="w-full h-full relative group">
            <img
              onClick={() => {
                if (!window.matchMedia('(pointer:coarse)').matches)
                  setIsStreamPaused((previous) => !previous)
              }}
              onDoubleClick={() => {
                if (fullScreenHandle.active) fullScreenHandle.exit()
                else fullScreenHandle.enter()
              }}
              className="w-full h-full rounded border border-gray-300 dark:border-neutral-800"
              src={aquariumCameraFrame}
            />
            {/* aquarium camera frame controls */}
            <div className="w-full px-2 py-1 flex-row sm:py-2 bg-gradient-to-t flex from-black/75 to-transparent absolute bottom-0 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all rounded-b duration-500 text-neutral-100 justify-between">
              {isStreamPaused ? (
                <div className="flex items-center gap-x-1">
                  <MdPlayArrow
                    className="text-2xl ml-1 cursor-pointer"
                    onClick={() => setIsStreamPaused(false)}
                  />
                  <div className="h-[10px] w-[10px] rounded-full bg-neutral-500" />
                </div>
              ) : (
                <div className="flex items-center gap-x-1">
                  <MdPause
                    className="text-2xl ml-1 cursor-pointer"
                    onClick={() => setIsStreamPaused(true)}
                  />
                  <div className="h-[10px] w-[10px] rounded-full bg-red-600 animate-pulse" />
                </div>
              )}
              <div>
                {fullScreenHandle.active ? (
                  <MdOutlineFullscreenExit
                    className="text-2xl mr-1 cursor-pointer"
                    onClick={fullScreenHandle.exit}
                  />
                ) : (
                  <MdOutlineFullscreen
                    className="text-2xl mr-1 cursor-pointer"
                    onClick={fullScreenHandle.enter}
                  />
                )}
              </div>
            </div>
          </div>
        </FullScreen>
      ) : (
        <video controls autoPlay muted playsInline loop className="w-full h-full">
          <source src={`/videos/recordings/${aquariumId}.mp4`} type="video/mp4" />
        </video>
      )}
    </div>
  )
}
