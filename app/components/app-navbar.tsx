import { useState } from 'react'
import { Link, useLocation } from '@remix-run/react'
import { 
    HomeIcon, 
    CameraIcon, 
    MessageSquareIcon, 
    MenuIcon,
    XIcon,
    InfoIcon
} from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '~/lib/utils'

const AppNavbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const location = useLocation()
    
    const isActive = (path: string) => location.pathname === path
    
    const navItems = [
        { 
            name: 'Home', 
            path: '/',
            icon: <HomeIcon className="h-5 w-5" />
        },
        { 
            name: 'Image Analysis', 
            path: '/scan',
            icon: <CameraIcon className="h-5 w-5" />
        },
        { 
            name: 'Assistant', 
            path: '/chat',
            icon: <MessageSquareIcon className="h-5 w-5" />
        },
        { 
            name: 'About', 
            path: '/about',
            icon: <InfoIcon className="h-5 w-5" />
        }
    ]
    
    return (
        <header className="sticky top-0 z-50 border-b border-primary/10 bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                <div className="flex items-center">
                    <Link 
                        to="/" 
                        className="flex items-center gap-2"
                    >
                        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                            <span className="absolute h-3 w-3 animate-ping rounded-full bg-primary opacity-75"></span>
                            <span className="text-sm font-bold">KS</span>
                        </span>
                        <span className="font-inter text-xl font-bold">
                            KidneyScan<span className="text-primary">AI</span>
                        </span>
                    </Link>
                </div>
                
                {/* Desktop navigation */}
                <nav className="hidden items-center gap-6 lg:flex">
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-1.5 text-sm font-medium transition-colors",
                                isActive(item.path)
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    ))}
                </nav>
                
                {/* Mobile menu button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? (
                        <XIcon className="h-5 w-5" />
                    ) : (
                        <MenuIcon className="h-5 w-5" />
                    )}
                </Button>
            </div>
            
            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="border-b border-primary/10 bg-background/95 py-4 lg:hidden">
                    <nav className="flex flex-col space-y-4 px-4">
                        {navItems.map(item => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
                                    isActive(item.path)
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                                )}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.icon}
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
            
            {/* Bottom mobile navigation */}
            <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-primary/10 bg-background/80 backdrop-blur-md lg:hidden">
                <nav className="grid h-16 grid-cols-4">
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors",
                                isActive(item.path)
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    )
}

export default AppNavbar 