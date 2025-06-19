"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { User, Settings, LogOut } from "lucide-react"

interface UserDropdownProps {
  userName: string
  userEmail: string
  userRole: string
}

export function UserDropdown({ userName, userEmail, userRole }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleProfileClick = () => {
    router.push("/profile")
    setIsOpen(false)
  }

  const handleSettingsClick = () => {
    router.push("/settings")
    setIsOpen(false)
  }

  const handleLogoutClick = () => {
    // In a real app, you would handle logout logic here
    router.push("/login")
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="h-8 w-8 rounded-full flex items-center justify-center bg-[#EFEBE9] border border-[#A1887F]">
          <User className="h-5 w-5 text-[#5D4037]" />
        </div>
        <div>
          <p className="text-sm font-medium">{userName}</p>
          <p className="text-xs text-muted-foreground">{userRole}</p>
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white border border-[#A1887F] z-50">
          <div className="py-3 px-4 border-b border-[#A1887F]">
            <p className="text-sm font-semibold text-[#3E2723]">{userName}</p>
            <p className="text-xs text-[#8D6E63]">{userEmail}</p>
          </div>
          <div className="py-1">
            <button
              onClick={handleProfileClick}
              className="flex items-center w-full px-4 py-2 text-sm text-[#5D4037] hover:bg-[#EFEBE9]"
            >
              <User className="h-4 w-4 mr-2 text-green-500" />
              Profile
            </button>
            <button
              onClick={handleSettingsClick}
              className="flex items-center w-full px-4 py-2 text-sm text-[#5D4037] hover:bg-[#EFEBE9]"
            >
              <Settings className="h-4 w-4 mr-2 text-amber-500" />
              Settings
            </button>
            <button
              onClick={handleLogoutClick}
              className="flex items-center w-full px-4 py-2 text-sm text-[#5D4037] hover:bg-[#EFEBE9]"
            >
              <LogOut className="h-4 w-4 mr-2 text-red-500" />
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
