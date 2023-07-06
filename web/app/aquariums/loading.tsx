import { PiSpinnerGapLight } from 'react-icons/pi'

export default function Loading() {
  return (
    <div className="flex w-screen h-[95vh] overflow-hidden items-center justify-center">
      <PiSpinnerGapLight className="animate-spin text-4xl" />
    </div>
  )
}
