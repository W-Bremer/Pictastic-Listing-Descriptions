import { Search, Settings, Upload, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="border-b px-4 py-2 flex items-center justify-between bg-white">
      <div className="max-w-xl w-full">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input type="search" placeholder="Search your media" className="pl-8 bg-gray-50" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" className="gap-2">
          <Settings className="w-4 h-4" />
          Customize
        </Button>
        <Button variant="outline" className="gap-2">
          <Upload className="w-4 h-4" />
          Upload
        </Button>
        <Button variant="ghost" size="icon">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  )
}

