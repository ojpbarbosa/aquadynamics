import { LuCopyright } from 'react-icons/lu'

export function Footer() {
  return (
    <footer className="h-[5vh] sticky bottom-0 z-10 backdrop-filter text-sm w-screen backdrop-blur dark:text-neutral-100 text-neutral-900 border-t border-gray-300 dark:border-neutral-800 dark:bg-neutral-800/30 p-2 bg-transparent flex items-center justify-center">
      <LuCopyright className="mr-1" />
      2023 Colégio Técnico de Campinas
    </footer>
  )
}
