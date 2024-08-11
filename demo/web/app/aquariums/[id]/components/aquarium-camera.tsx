/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client'

import { BsCameraVideoOffFill } from 'react-icons/bs'

type AquariumCameraProps = {
  aquariumId: string
}

export default function AquariumCamera({ aquariumId }: AquariumCameraProps) {
  return (
    <div className="aspect-[5/4] w-full sm:w-1/2 rounded border border-gray-300 dark:border-neutral-800 flex items-center justify-center bg-neutral-300/20 text-neutral-500 dark:bg-neutral-800/30">
      {aquariumId === 'b1k9w3jg0e8zsojvixchy' ? (
        <video controls autoPlay muted playsInline loop className="w-full h-full">
          <source src={`/videos/recordings/${aquariumId}.mp4`} type="video/mp4" />
        </video>
      ) : (
        <BsCameraVideoOffFill className="text-3xl" />
      )}
    </div>
  )
}
