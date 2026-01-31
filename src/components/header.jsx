import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <nav>
        <Link>
        <img src="/logo.png" className='h-16' alt="trimrr logo" />
        </Link>
    </nav>
  )
}

export default Header
