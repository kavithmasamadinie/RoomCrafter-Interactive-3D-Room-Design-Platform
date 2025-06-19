"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GlossyCloseButton } from "@/components/ui/glossy-close-button"

interface SaveDesignDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (name: string) => void
  defaultName?: string
}

export function SaveDesignDialog({ open, onOpenChange, onSave, defaultName = "" }: SaveDesignDialogProps) {
  const [designName, setDesignName] = useState(defaultName || "")

  const handleSave = () => {
    onSave(designName || "Untitled Design")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] glass-effect">
        <DialogHeader>
          <DialogTitle>Save Design</DialogTitle>
          <DialogDescription>Give your design a name so you can easily find it later.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={designName}
              onChange={(e) => setDesignName(e.target.value)}
              placeholder="My Amazing Room Design"
              className="col-span-3"
              autoFocus
            />
          </div>
        </div>
        <DialogFooter>
          <GlossyCloseButton onClick={() => onOpenChange(false)} variant="secondary">
            Cancel
          </GlossyCloseButton>
          <Button onClick={handleSave} className="bg-amber-800 hover:bg-amber-700 text-white">
            Save Design
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
