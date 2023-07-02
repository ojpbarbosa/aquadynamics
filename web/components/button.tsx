type ButtonProps = {
  type?: 'submit' | 'reset' | 'button'
  onClick?: () => void
  className?: string
  children?: React.ReactNode
}

export default function Button({ type, children, className }: ButtonProps) {
  return (
    <button
      type={type}
      className={'cursor-pointer font-semibold w-auto rounded-md p-2 z-10 ' + className}
    >
      {children}
    </button>
  )
}
