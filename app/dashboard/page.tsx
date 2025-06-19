"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  CuboidIcon as Cube,
  Plus,
  Search,
  Grid3x3,
  Clock,
  Star,
  MoreHorizontal,
  LogOut,
  User,
  Heart,
  Trash2,
  Edit,
  Share2,
  Sofa,
  Settings,
  Home,
  Bed,
  BookOpen,
  Bath,
  Coffee,
  Armchair,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardFurnitureCatalog } from "@/components/dashboard-furniture-catalog"
import { AnimatedSection } from "@/components/animated-section"
import { DecorativeBackground } from "@/components/decorative-background"
import Image from "next/image"
import { CartIcon } from "@/components/cart-icon"

// Mock data for saved designs with contextually appropriate images
const savedDesigns = [
  {
    id: "1",
    name: "Modern Living Room",
    image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1973&auto=format&fit=crop",
    icon: Home,
    lastEdited: "2 hours ago",
    favorite: true,
  },
  {
    id: "2",
    name: "Minimalist Bedroom",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1780&auto=format&fit=crop",
    icon: Bed,
    lastEdited: "Yesterday",
    favorite: false,
  },
  {
    id: "3",
    name: "Cozy Office Space",
    image: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=1740&auto=format&fit=crop",
    icon: BookOpen,
    lastEdited: "3 days ago",
    favorite: true,
  },
  {
    id: "4",
    name: "Kitchen Renovation",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UsDM0xDupK3FRQi4Weh7ZmfPETS3tm.png",
    icon: Coffee,
    lastEdited: "1 week ago",
    favorite: false,
  },
  {
    id: "5",
    name: "Bathroom Design",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1770&auto=format&fit=crop",
    icon: Bath,
    lastEdited: "2 weeks ago",
    favorite: false,
  },
  {
    id: "6",
    name: "Guest Room Layout",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1771&auto=format&fit=crop",
    icon: Armchair,
    lastEdited: "1 month ago",
    favorite: true,
  },
]

// Mock data for templates with contextually appropriate images
const templates = [
  {
    id: "t1",
    name: "Modern Studio Apartment",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1770&auto=format&fit=crop",
    icon: Home,
    category: "Apartment",
  },
  {
    id: "t2",
    name: "Open Concept Living",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1770&auto=format&fit=crop",
    icon: Sofa,
    category: "Living Room",
  },
  {
    id: "t3",
    name: "Master Bedroom Suite",
    image: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?q=80&w=1771&auto=format&fit=crop",
    icon: Bed,
    category: "Bedroom",
  },
  {
    id: "t4",
    name: "Home Office Setup",
    image: "https://images.unsplash.com/photo-1593476550610-87baa860004a?q=80&w=1776&auto=format&fit=crop",
    icon: BookOpen,
    category: "Office",
  },
]

// Featured design inspiration
const featuredDesigns = [
  {
    id: "f1",
    title: "Scandinavian Simplicity",
    description: "Clean lines and natural materials create a peaceful space",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1932&auto=format&fit=crop",
  },
  {
    id: "f2",
    title: "Mid-Century Modern",
    description: "Retro-inspired designs with contemporary functionality",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1970&auto=format&fit=crop",
  },
  {
    id: "f3",
    title: "Cozy Minimalism",
    description: "Warm textures and clean spaces for a balanced home",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1974&auto=format&fit=crop",
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState(savedDesigns.filter((design) => design.favorite))
  const [designs, setDesigns] = useState(savedDesigns)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [designToDelete, setDesignToDelete] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [imageError, setImageError] = useState<Record<string, boolean>>({})
  const [recentDesigns, setRecentDesigns] = useState<any[]>([])

  useEffect(() => {
    // Set a small timeout to ensure DOM is fully ready
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Add this useEffect to load saved designs when the component mounts
  useEffect(() => {
    // Load saved designs from localStorage
    const loadSavedDesigns = () => {
      const savedDesigns = JSON.parse(localStorage.getItem("savedDesigns") || "[]")

      // Map the saved designs to include required properties for display
      const formattedDesigns = savedDesigns.map((design: any) => ({
        id: design.id,
        name: design.name || "Untitled Design",
        image: design.thumbnail || getFallbackImage(design.name || ""),
        icon: getIconForDesign(design),
        lastEdited: getTimeAgo(design.lastEdited),
        favorite: design.favorite || false,
      }))

      setRecentDesigns(formattedDesigns)
    }

    loadSavedDesigns()
  }, [])

  // Add these helper functions after the useEffect
  const getIconForDesign = (design: any) => {
    // Determine icon based on design name or content
    if (design.name?.toLowerCase().includes("living")) return Home
    if (design.name?.toLowerCase().includes("bed")) return Bed
    if (design.name?.toLowerCase().includes("office")) return BookOpen
    if (design.name?.toLowerCase().includes("kitchen")) return Coffee
    if (design.name?.toLowerCase().includes("bath")) return Bath
    return Sofa // Default icon
  }

  const getTimeAgo = (timestamp: string) => {
    if (!timestamp) return "Just now"

    const now = new Date()
    const editTime = new Date(timestamp)
    const diffMs = now.getTime() - editTime.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`

    return editTime.toLocaleDateString()
  }

  const filteredDesigns = designs.filter((design) => design.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Update the handleToggleFavorite function to work with both mock designs and saved designs
  const handleToggleFavorite = (id: string) => {
    // Update the UI state for the designs
    const updatedDesigns = designs.map((design) =>
      design.id === id ? { ...design, favorite: !design.favorite } : design,
    )
    setDesigns(updatedDesigns)
    setFavorites(updatedDesigns.filter((design) => design.favorite))

    // Also update the recentDesigns if the ID matches
    const updatedRecentDesigns = recentDesigns.map((design) =>
      design.id === id ? { ...design, favorite: !design.favorite } : design,
    )
    setRecentDesigns(updatedRecentDesigns)

    // Update in localStorage
    const savedDesigns = JSON.parse(localStorage.getItem("savedDesigns") || "[]")
    const updatedSavedDesigns = savedDesigns.map((design: any) =>
      design.id === id ? { ...design, favorite: !design.favorite } : design,
    )
    localStorage.setItem("savedDesigns", JSON.stringify(updatedSavedDesigns))
  }

  // Update the handleDeleteDesign function to work with both mock designs and saved designs
  const handleDeleteDesign = (id: string) => {
    setDesignToDelete(id)
    setShowDeleteDialog(true)
  }

  // Update the confirmDelete function to handle localStorage deletion
  const confirmDelete = () => {
    if (designToDelete) {
      // Remove from UI state
      const updatedDesigns = designs.filter((design) => design.id !== designToDelete)
      setDesigns(updatedDesigns)
      setFavorites(updatedDesigns.filter((design) => design.favorite))

      // Remove from recentDesigns
      const updatedRecentDesigns = recentDesigns.filter((design) => design.id !== designToDelete)
      setRecentDesigns(updatedRecentDesigns)

      // Remove from localStorage
      const savedDesigns = JSON.parse(localStorage.getItem("savedDesigns") || "[]")
      const updatedSavedDesigns = savedDesigns.filter((design: any) => design.id !== designToDelete)
      localStorage.setItem("savedDesigns", JSON.stringify(updatedSavedDesigns))

      setShowDeleteDialog(false)
      setDesignToDelete(null)
    }
  }

  // Add a share function
  const handleShareDesign = (id: string, name: string) => {
    // Create a shareable URL
    const shareUrl = `${window.location.origin}/?designId=${id}&name=${encodeURIComponent(name)}`

    // Try to use the Web Share API if available
    if (navigator.share) {
      navigator
        .share({
          title: `RoomCrafter Design: ${name}`,
          text: "Check out my room design!",
          url: shareUrl,
        })
        .catch((err) => {
          console.error("Error sharing:", err)
          // Fallback to clipboard
          copyToClipboard(shareUrl)
        })
    } else {
      // Fallback to clipboard
      copyToClipboard(shareUrl)
    }
  }

  // Add a helper function to copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Link copied to clipboard!")
      })
      .catch((err) => {
        console.error("Could not copy text: ", err)
      })
  }

  const handleCreateNew = () => {
    router.push("/new-design")
  }

  const handleOpenDesign = (id: string, name?: string) => {
    if (name) {
      router.push(`/?designId=${id}&name=${encodeURIComponent(name)}`)
    } else {
      router.push(`/?designId=${id}`)
    }
  }

  const handleUseTemplate = (templateId: string) => {
    router.push(`/new-design?template=${templateId}`)
  }

  const handleImageError = (id: string) => {
    setImageError((prev) => ({ ...prev, [id]: true }))
  }

  // Fallback image if the main image fails to load
  const getFallbackImage = (type: string) => {
    if (type.includes("Living")) return "/placeholder.svg?height=300&width=400"
    if (type.includes("Bedroom")) return "/placeholder.svg?height=300&width=400"
    if (type.includes("Office")) return "/placeholder.svg?height=300&width=400"
    if (type.includes("Kitchen")) return "/placeholder.svg?height=300&width=400"
    if (type.includes("Bathroom")) return "/placeholder.svg?height=300&width=400"
    return "/placeholder.svg?height=300&width=400"
  }

  return (
    <div className="min-h-screen bg-gradient-warm">
      {isLoaded && <DecorativeBackground variant="dots" />}

      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/upscalemedia-transformed-removebg-preview-vqBzGArflcxKvkM4AobV4pUuRSe6wL.png"
                alt="RoomCrafter Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-highlight-gold rounded-full animate-pulse-subtle"></div>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-rich-walnut to-highlight-terracotta bg-clip-text text-transparent">
              RoomCrafter
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search designs..."
                className="w-64 pl-8 border-soft-taupe/30 focus:border-highlight-gold focus:ring-highlight-gold/30 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <CartIcon />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-highlight-gold/10">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gradient-rich text-white">
                      <User className="h-5 w-5" />
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 glass-effect" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Malki Amasha</p>
                    <p className="text-xs leading-none text-muted-foreground">malki.amasha@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/profile")} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4 text-highlight-teal" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/settings")} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4 text-highlight-gold" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/login")} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4 text-highlight-terracotta" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container px-4 py-6 md:px-6 md:py-8">
        <AnimatedSection animation="slide-up">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-rich-walnut to-highlight-terracotta bg-clip-text text-transparent">
                Welcome Back, Malki
              </h1>
              <p className="text-muted-foreground">Manage and create your furniture designs</p>
            </div>
            <AnimatedButton
              onClick={handleCreateNew}
              className="mt-4 md:mt-0 bg-amber-800 hover:bg-amber-700 text-white"
              animation="lift"
            >
              <Plus className="mr-2 h-4 w-4" /> Create New Design
            </AnimatedButton>
          </div>
        </AnimatedSection>

        <div className="md:hidden mb-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search designs..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Featured Design Inspiration */}
        <AnimatedSection animation="fade-in" delay={200}>
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-highlight-gold" />
                <span>Design Inspiration</span>
              </h2>
              <Button variant="link" className="text-highlight-terracotta">
                View all
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredDesigns.map((design, index) => (
                <AnimatedSection key={design.id} animation="slide-up" delay={100 * (index + 1)} className="h-full">
                  <Card className="overflow-hidden hover-lift card-elevated h-full">
                    <div className="relative h-48">
                      <Image
                        src={design.image || "/placeholder.svg"}
                        alt={design.title}
                        fill
                        className="object-cover"
                        unoptimized
                        onError={() => handleImageError(design.id)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="font-semibold text-lg">{design.title}</h3>
                        <p className="text-sm text-white/80">{design.description}</p>
                      </div>
                    </div>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6 bg-white/50 backdrop-blur-sm p-1 rounded-lg">
            <TabsTrigger value="all" className="flex items-center data-[state=active]:bg-white">
              <Grid3x3 className="mr-2 h-4 w-4" />
              All Designs
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center data-[state=active]:bg-white">
              <Star className="mr-2 h-4 w-4 text-highlight-gold" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center data-[state=active]:bg-white">
              <Clock className="mr-2 h-4 w-4" />
              Recent
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center data-[state=active]:bg-white">
              <Cube className="mr-2 h-4 w-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="furniture" className="flex items-center data-[state=active]:bg-white">
              <Sofa className="mr-2 h-4 w-4" />
              Furniture
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredDesigns.length === 0 ? (
              <AnimatedSection animation="fade-in">
                <div className="flex flex-col items-center justify-center py-12 bg-white/50 backdrop-blur-sm rounded-lg">
                  <div className="rounded-full bg-muted p-3">
                    <Cube className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">No designs found</h3>
                  <p className="mt-2 text-center text-muted-foreground">
                    {searchQuery ? "Try a different search term" : "Create your first design to get started"}
                  </p>
                  {!searchQuery && (
                    <AnimatedButton
                      onClick={handleCreateNew}
                      className="mt-4 bg-amber-800 hover:bg-amber-700 text-white"
                      animation="lift"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Create New Design
                    </AnimatedButton>
                  )}
                </div>
              </AnimatedSection>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredDesigns.map((design, index) => (
                  <AnimatedSection key={design.id} animation="slide-up" delay={50 * index}>
                    <Card className="overflow-hidden hover-lift card-elevated">
                      <div
                        className="relative aspect-video cursor-pointer"
                        onClick={() => handleOpenDesign(design.id, design.name)}
                      >
                        <Image
                          src={imageError[design.id] ? getFallbackImage(design.name) : design.image}
                          alt={design.name}
                          fill
                          className="object-cover"
                          unoptimized
                          onError={() => handleImageError(design.id)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        <div className="absolute bottom-2 left-2 text-white">
                          <design.icon className="h-6 w-6 drop-shadow-md" />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleToggleFavorite(design.id)
                          }}
                        >
                          <Heart
                            className={`h-4 w-4 ${design.favorite ? "fill-highlight-terracotta text-highlight-terracotta" : "text-muted-foreground"}`}
                          />
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold truncate">{design.name}</h3>
                            <p className="text-xs text-muted-foreground">{design.lastEdited}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="glass-effect">
                              <DropdownMenuItem
                                onClick={() => handleOpenDesign(design.id, design.name)}
                                className="cursor-pointer"
                              >
                                <Edit className="mr-2 h-4 w-4 text-highlight-teal" />
                                <span>Edit</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <Share2 className="mr-2 h-4 w-4 text-highlight-gold" />
                                <span>Share</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleToggleFavorite(design.id)}
                                className="cursor-pointer"
                              >
                                <Heart className="mr-2 h-4 w-4 text-highlight-terracotta" />
                                <span>{design.favorite ? "Remove from favorites" : "Add to favorites"}</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive cursor-pointer"
                                onClick={() => handleDeleteDesign(design.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favorites.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-12 bg-white/50 backdrop-blur-sm rounded-lg">
                  <div className="rounded-full bg-muted p-3">
                    <Star className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">No favorites yet</h3>
                  <p className="mt-2 text-center text-muted-foreground">
                    Mark designs as favorites to find them quickly
                  </p>
                </div>
              ) : (
                favorites.map((design, index) => (
                  <AnimatedSection key={design.id} animation="slide-up" delay={50 * index}>
                    <Card className="overflow-hidden hover-lift card-elevated">
                      <div
                        className="relative aspect-video cursor-pointer"
                        onClick={() => handleOpenDesign(design.id, design.name)}
                      >
                        <Image
                          src={imageError[design.id] ? getFallbackImage(design.name) : design.image}
                          alt={design.name}
                          fill
                          className="object-cover"
                          unoptimized
                          onError={() => handleImageError(design.id)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        <div className="absolute bottom-2 left-2 text-white">
                          <design.icon className="h-6 w-6 drop-shadow-md" />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleToggleFavorite(design.id)
                          }}
                        >
                          <Heart className="h-4 w-4 fill-highlight-terracotta text-highlight-terracotta" />
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold truncate">{design.name}</h3>
                            <p className="text-xs text-muted-foreground">{design.lastEdited}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="glass-effect">
                              <DropdownMenuItem
                                onClick={() => handleOpenDesign(design.id, design.name)}
                                className="cursor-pointer"
                              >
                                <Edit className="mr-2 h-4 w-4 text-highlight-teal" />
                                <span>Edit</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <Share2 className="mr-2 h-4 w-4 text-highlight-gold" />
                                <span>Share</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleToggleFavorite(design.id)}
                                className="cursor-pointer"
                              >
                                <Heart className="mr-2 h-4 w-4 text-highlight-terracotta" />
                                <span>Remove from favorites</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive cursor-pointer"
                                onClick={() => handleDeleteDesign(design.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="recent">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recentDesigns.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-12 bg-white/50 backdrop-blur-sm rounded-lg">
                  <div className="rounded-full bg-muted p-3">
                    <Clock className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">No recent designs</h3>
                  <p className="mt-2 text-center text-muted-foreground">Your recently saved designs will appear here</p>
                  <AnimatedButton
                    onClick={handleCreateNew}
                    className="mt-4 bg-amber-800 hover:bg-amber-700 text-white"
                    animation="lift"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Create New Design
                  </AnimatedButton>
                </div>
              ) : (
                recentDesigns.map((design, index) => (
                  <AnimatedSection key={design.id} animation="slide-up" delay={50 * index}>
                    <Card className="overflow-hidden hover-lift card-elevated">
                      <div
                        className="relative aspect-video cursor-pointer"
                        onClick={() => handleOpenDesign(design.id, design.name)}
                      >
                        <Image
                          src={imageError[design.id] ? getFallbackImage(design.name) : design.image}
                          alt={design.name}
                          fill
                          className="object-cover"
                          unoptimized
                          onError={() => handleImageError(design.id)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        <div className="absolute bottom-2 left-2 text-white">
                          <design.icon className="h-6 w-6 drop-shadow-md" />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleToggleFavorite(design.id)
                          }}
                        >
                          <Heart
                            className={`h-4 w-4 ${design.favorite ? "fill-highlight-terracotta text-highlight-terracotta" : "text-muted-foreground"}`}
                          />
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold truncate">{design.name}</h3>
                            <p className="text-xs text-muted-foreground">{design.lastEdited}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="glass-effect">
                              <DropdownMenuItem
                                onClick={() => handleOpenDesign(design.id, design.name)}
                                className="cursor-pointer"
                              >
                                <Edit className="mr-2 h-4 w-4 text-highlight-teal" />
                                <span>Edit</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleShareDesign(design.id, design.name)}
                                className="cursor-pointer"
                              >
                                <Share2 className="mr-2 h-4 w-4 text-highlight-gold" />
                                <span>Share</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleToggleFavorite(design.id)}
                                className="cursor-pointer"
                              >
                                <Heart className="mr-2 h-4 w-4 text-highlight-terracotta" />
                                <span>{design.favorite ? "Remove from favorites" : "Add to favorites"}</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive cursor-pointer"
                                onClick={() => handleDeleteDesign(design.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="templates">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {templates.map((template, index) => (
                <AnimatedSection key={template.id} animation="slide-up" delay={50 * index}>
                  <Card className="overflow-hidden hover-lift card-elevated">
                    <div
                      className="relative aspect-video cursor-pointer"
                      onClick={() => router.push("/new-design?template=" + template.id)}
                    >
                      <Image
                        src={imageError[template.id] ? getFallbackImage(template.name) : template.image}
                        alt={template.name}
                        fill
                        className="object-cover"
                        unoptimized
                        onError={() => handleImageError(template.id)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className="absolute bottom-2 left-2 text-white">
                        <template.icon className="h-6 w-6 drop-shadow-md" />
                      </div>
                      <div className="absolute top-2 left-2 bg-highlight-gold/90 text-charcoal-brown px-2 py-1 rounded-md text-xs font-medium">
                        {template.category}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold truncate">{template.name}</h3>
                      <p className="text-xs text-muted-foreground">Template</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <AnimatedButton
                        className="w-full bg-rich-walnut hover:bg-warm-chestnut text-white"
                        onClick={() => handleUseTemplate(template.id)}
                        animation="lift"
                      >
                        Use Template
                      </AnimatedButton>
                    </CardFooter>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="furniture" className="h-[calc(100vh-16rem)]">
            <DashboardFurnitureCatalog />
          </TabsContent>
        </Tabs>
      </main>

      {/* Delete confirmation dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="glass-effect">
          <DialogHeader>
            <DialogTitle>Delete Design</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this design? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
