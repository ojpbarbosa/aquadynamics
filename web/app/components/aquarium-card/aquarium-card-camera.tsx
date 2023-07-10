import { FaVideoSlash } from 'react-icons/fa'

export default function AquariumCardCamera() {
  return (
    <div className="w-full flex items-center aspect-video justify-center bg-neutral-300/20 text-neutral-500 dark:text-neutral-500 dark:bg-neutral-800/30">
      <FaVideoSlash className="text-4xl" />
    </div>
  )
}
