"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"

interface HeaderUserInfoProps {
  userName?: string
  userRole?: string
  avatarSrc?: string
}

export function HeaderUserInfo({ userName = "Malki Amasha", userRole = "Designer", avatarSrc }: HeaderUserInfoProps) {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8 border border-[#A1887F]">
        <AvatarImage src={avatarSrc || "/placeholder.svg"} alt={userName} />
        <AvatarFallback className="bg-[#EFEBE9]">
          <User className="h-4 w-4 text-[#5D4037]" />
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium leading-none text-[#3E2723]">{userName}</p>
        <p className="text-xs text-[#8D6E63]">{userRole}</p>
      </div>
    </div>
  )
}
