import { Aquarium } from '@/library/types'
import Link from 'next/link'
import { FaVideoSlash, FaLightbulb, FaRegLightbulb } from 'react-icons/fa'

type AquariumCardProps = {
  aquarium: Aquarium
}

export default function AquariumCard({ aquarium: { id, name, logs } }: AquariumCardProps) {
  return (
    <Link
      href={`/aquariums/${id}`}
      className="w-80 h-60 rounded dark:text-neutral-100/75 hover:dark:text-neutral-100 text-neutral-900 border justify-between border-gray-300 dark:border-neutral-800 bg-transparent hover:bg-neutral-100 dark:bg-transparent transition-all duration-200 hover:dark:bg-neutral-800/30 flex flex-col items-start"
    >
      <div className="w-full h-40 flex items-center justify-center bg-gray-200 text-neutral-500 dark:text-neutral-500 dark:bg-neutral-800/30 flex-col gap-y-2">
        <FaVideoSlash className="text-4xl" />
        <p className="font-semibold">Sem câmera</p>
      </div>
      <div className="border-t border-gray-300 dark:border-neutral-800 w-full flex flex-col justify-between p-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        {logs && (
          <div className="text-md font-normal flex items-center justify-end gap-x-2">
            <div
              className={
                'border rounded p-2 ' +
                (logs[0].lightning
                  ? 'text-yellow-400 border-yellow-400 dark:bg-yellow-300/20 bg-yellow-400/30'
                  : 'dark:text-neutral-500 dark:border-neutral-800 dark:bg-neutral-800/30 text-neutral-500 border-neutral-300 bg-neutral-300/20')
              }
            >
              {logs[0].lightning ? <FaLightbulb /> : <FaRegLightbulb />}
            </div>

            <span
              className={
                'border rounded px-2 py-1 ' +
                (logs[0].ph >= 6.5 && logs[0].ph <= 7.5
                  ? 'border-green-500 bg-green-400/20 dark:border-green-500/80 dark:bg-green-400/10'
                  : logs[0].ph < 6.5
                  ? 'border-sky-500 bg-sky-400/20 dark:border-sky-500/80 dark:bg-sky-400/10'
                  : logs[0].ph > 7.5 &&
                    'border-red-500 bg-red-400/20 dark:border-red-500/80 dark:bg-red-400/10')
              }
            >
              pH {logs[0].ph}
            </span>

            <span
              className={
                'border rounded px-2 py-1 ' +
                (logs[0].temperature >= 26 && logs[0].temperature <= 29
                  ? 'border-green-500 bg-green-400/20 dark:border-green-500/80 dark:bg-green-400/10'
                  : logs[0].temperature < 26
                  ? 'border-sky-500 bg-sky-400/20 dark:border-sky-500/80 dark:bg-sky-400/10'
                  : logs[0].temperature > 29 &&
                    'border-red-500 bg-red-400/20 dark:border-red-500/80 dark:bg-red-400/10')
              }
            >
              {logs[0].temperature} °C
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
