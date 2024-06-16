import React from 'react'
import { Input } from '@/components/ui/input'
import { Search } from "lucide-react"

export default function SearchInput() {
  return (
    <div className="relative w-full">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search products..."
        className="pl-8 w-full"
      />
    </div>
  )
}
