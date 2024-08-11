export default function Footer() {
  return (
    <footer className="md:h-[5vh] h-[8vh] sticky bottom-0 text-center z-10 backdrop-filter text-sm w-screen backdrop-blur dark:text-neutral-100 text-neutral-900 border-t border-gray-300 dark:border-neutral-800 dark:bg-neutral-800/30 p-2 bg-transparent flex items-center justify-center">
      © 2023-{new Date().getFullYear()} Technical High School of Campinas - Unicamp
    </footer>
  )
}
