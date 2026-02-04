import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { DropdownMenu,DropdownMenuGroup,DropdownMenuItem,DropdownMenuLabel,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuSeparator } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LinkIcon, LogOut } from 'lucide-react';

function Header() {
  const navigate = useNavigate()
  const user = false;
  return (
    <nav className='py-4 flex justify-between items-center '>
        <Link to="/">
        <img src="/logo.png" className='h-16' alt="trimrr logo" />
        </Link>

        <div>
          {! user ?
          <Button onClick={() => navigate("/auth")}>Login </Button>
          :(
            <DropdownMenu>
  <DropdownMenuTrigger asChild className = "w-10 rounded-full overflow-hidden">
            <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>MB</AvatarFallback>
</Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel>Meet Bhuva</DropdownMenuLabel>
    </DropdownMenuGroup>
    <DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <LinkIcon className='mr-2 h-4 w-4' />
        My Links</DropdownMenuItem>
      <DropdownMenuItem className = 'text-red-500'>
        <LogOut className='mr-2 h-4 w-4 hover:text-white '/>
        <span>Logout</span>
        </DropdownMenuItem>
        </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
          )
        }
        </div>
    </nav>
  )
}

export default Header
