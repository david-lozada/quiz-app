import React from "react"
import clsx from "clsx"

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "outline" | "default"
  size?: "icon" | "default"
}

export function Button({
  children,
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variantClass =
    variant === "outline"
      ? "border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-800"
      : "bg-sky-600 text-white hover:bg-sky-700"

  const sizeClass = size === "icon" ? "p-2 w-8 h-8" : "px-3 py-2"

  return (
    <button className={clsx(base, variantClass, sizeClass, className)} {...props}>
      {children}
    </button>
  )
}

export default Button
