import React from 'react'

function Button({
    children, 
    type = 'button',
    bgcolor = 'bg-blue-600',
    textcolor = 'text-white',
    classname = '',
    ...props
}) {
  return (
    <button type={type} className={`px-4 py-2 rounded-lg ${bgcolor} ${textcolor} ${classname}`} {...props}>
      {children}
    </button>
  )
}

export default Button
