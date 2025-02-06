import { Button } from "@/components/ui/button"
import { ImageIcon, FolderOpen, Layout, Wand2, Globe, Trash2, FileText, Info } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Sidebar() {
  return (
    <div className="w-60 border-r min-h-screen p-4 flex flex-col bg-white">
      <Image
        src="https://uc7ec8d7b47a1852ef9fb1de0868.previews.dropboxusercontent.com/p/thumb/ACji6gtCB_wSoCoU5hVnStGbYy0k8U9O5QSOCnMuoGGjZkjGRAtNJSMxajU8hD8GTYXaNwqhSk1puj653oi2KiMf9kCjuWLaoK7OhZJ-zDSba8pjuTUSAx5hFT2WIMDjNoPp9S4wCI6hMg5DCBXqTDB6ZlB1d9VLgwoqkT2dqnqKfI7YYCj49V6YlWNvRGhLpNRu_lEQbcr7N3xh8jwq269NeFb4AVU8EdD4YPBzcVfaMSSv44H4e45QmRKiXtkEyrcQAMHO1GGFNqLhHJI5pNVBtWL5FiQKi1c1sHBAngCpWjlcJIIS6BJCQ6gLFcWYxvlB7-ufm5EPVrKsd7rWhSCcG5lKb2PcrJdtBD-2T94ui1nwXar_Xgn9ODfo5XR4Kwc/p.png"
        alt="Pictastic"
        width={120}
        height={30}
        className="w-auto h-8 mb-6 object-contain"
      />
      <nav className="space-y-1 mb-6">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <ImageIcon className="w-4 h-4" />
          Media
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <FolderOpen className="w-4 h-4" />
          Albums
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Layout className="w-4 h-4" />
          Project Sites
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Wand2 className="w-4 h-4" />
          Virtual Staging AI
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Globe className="w-4 h-4" />
          Custom Domain
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Trash2 className="w-4 h-4" />
          Trash
        </Button>
        <Link href="/listing-generator" passHref>
          <Button variant="ghost" className="w-full justify-start gap-2 bg-gray-100 text-gray-900">
            <FileText className="w-4 h-4" />
            Listing Description
          </Button>
        </Link>
      </nav>

      <div className="mt-auto space-y-4">
        {/* Virtual Staging AI */}
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <h3 className="font-medium text-base">Virtual Staging Ai</h3>
          <p className="text-sm text-gray-600 mb-2">Add furniture to photos with AI</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">0 / 50</span>
            <Button variant="secondary" size="sm" className="bg-black text-white hover:bg-gray-800">
              Get more +
            </Button>
          </div>
        </div>

        {/* Project Sites */}
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-base">Project sites</h3>
            <Button variant="secondary" size="sm" className="bg-black text-white hover:bg-gray-800">
              Get more +
            </Button>
          </div>
          <span className="text-lg font-medium">0 / 4</span>
        </div>

        {/* Refer a Friend */}
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-start gap-2">
            <div className="rounded-full bg-gray-100 p-2">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-medium text-base">Refer a Friend</h3>
              <p className="text-sm text-gray-600">Unlock 1000+ Extra Photos for FREE!</p>
            </div>
          </div>
        </div>

        {/* Storage */}
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-base">Storage</h3>
            <Button variant="secondary" size="sm" className="bg-black text-white hover:bg-gray-800">
              Get more +
            </Button>
          </div>
          <div className="space-y-2">
            <div className="w-full bg-gray-100 rounded-full h-1">
              <div className="bg-[#20C997] h-1 rounded-full w-[0.01%]" />
            </div>
            <p className="text-xs text-gray-600">Used 25.07 MB (0.01%) of 3.5 GB</p>
          </div>
        </div>
      </div>
    </div>
  )
}

