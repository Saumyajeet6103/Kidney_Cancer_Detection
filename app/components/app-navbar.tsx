import { Link, useLocation } from '@remix-run/react'
import { 
    HomeIcon, 
    CameraIcon, 
    MessageSquareIcon, 
    InfoIcon
} from 'lucide-react'
import { cn } from '~/lib/utils'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '~/components/ui/select'
import useTheme, { changeTheme } from '~/hooks/use-theme'
import { type ThemeName } from '~/registry/themes'
import MobileBottomNav from './mobile-bottom-nav'

const AppNavbar = () => {
    const location = useLocation()
    const [theme, setTheme] = useTheme()
    
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
    
    // Function to get background color class based on theme
    const getThemeColorClass = (themeName: string) => {
        switch(themeName) {
            case 'red':
                return 'bg-red-600';
            case 'blue':
                return 'bg-blue-600';
            case 'green':
                return 'bg-green-600';
            case 'violet':
                return 'bg-violet-600';
            case 'zinc':
                return 'bg-zinc-600';
            case 'slate':
                return 'bg-slate-600';
            case 'stone':
                return 'bg-stone-600';
            case 'gray':
                return 'bg-gray-600';
            case 'neutral':
                return 'bg-neutral-600';
            case 'rose':
                return 'bg-rose-600';
            case 'orange':
                return 'bg-orange-600';
            case 'yellow':
                return 'bg-yellow-600';
        }
    }
    
    return (
        <>
            {/* Top header */}
            <div className="border-b border-primary/10 bg-background/80 backdrop-blur-md">
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
                        
                        <Select
                            onValueChange={(selectedTheme: ThemeName) => {
                                changeTheme(selectedTheme)
                                setTheme(selectedTheme)
                            }}
                            value={theme}
                        >
                            <SelectTrigger
                                className="w-[180px]"
                                aria-label="customize theme"
                            >
                                <div className="flex items-center gap-2">
                                    <span className={cn("h-4 w-4 rounded-full p-1", getThemeColorClass(theme))}></span>
                                    <SelectValue placeholder="Theme" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="zinc">
                                    <span className="flex items-center gap-2">
                                        <span className="h-4 w-4 rounded-full bg-zinc-600 p-1"></span>
                                        <span>Zinc</span>
                                    </span>
                                </SelectItem>
                                <SelectItem value="slate">
                                    <span className="flex items-center gap-2">
                                        <span className="h-4 w-4 rounded-full bg-slate-600 p-1"></span>
                                        <span>Slate</span>
                                    </span>
                                </SelectItem>
                                <SelectItem value="stone">
                                    <span className="flex items-center gap-2">
                                        <span className="h-4 w-4 rounded-full bg-stone-600 p-1"></span>
                                        <span>Stone</span>
                                    </span>
                                </SelectItem>
                                <SelectItem value="gray">
                                    <span className="flex items-center gap-2">
                                        <span className="h-4 w-4 rounded-full bg-gray-600 p-1"></span>
                                        <span>Gray</span>
                                    </span>
                                </SelectItem>
                                <SelectItem value="neutral">
                                    <span className="flex items-center gap-2">
                                        <span className="h-4 w-4 rounded-full bg-neutral-600 p-1"></span>
                                        <span>Neutral</span>
                                    </span>
                                </SelectItem>
                                <SelectItem value="red">
                                    <span className="flex items-center gap-2">
                                        <span className="h-4 w-4 rounded-full bg-red-600 p-1"></span>
                                        <span>Red</span>
                                    </span>
                                </SelectItem>
                                <SelectItem value="rose">
                                    <span className="flex items-center gap-2">
                                        <span className="h-4 w-4 rounded-full bg-rose-600 p-1"></span>
                                        <span>Rose</span>
                                    </span>
                                </SelectItem>
                                <SelectItem value="orange">
                                    <span className="flex items-center gap-2">
                                        <span className="h-4 w-4 rounded-full bg-orange-600 p-1"></span>
                                        <span>Orange</span>
                                    </span>
                                </SelectItem>
                                <SelectItem value="green">
                                    <span className="flex items-center gap-2">
                                        <span className="h-4 w-4 rounded-full bg-green-600 p-1"></span>
                                        <span>Green</span>
                                    </span>
                                </SelectItem>
                                <SelectItem value="blue">
                                    <span className="flex items-center gap-2">
                                        <span className="h-4 w-4 rounded-full bg-blue-600 p-1"></span>
                                        <span>Blue</span>
                                    </span>
                                </SelectItem>
                                <SelectItem value="yellow">
                                    <span className="flex items-center gap-2">
                                        <span className="h-4 w-4 rounded-full bg-yellow-600 p-1"></span>
                                        <span>Yellow</span>
                                    </span>
                                </SelectItem>
                                <SelectItem value="violet">
                                    <span className="flex items-center gap-2">
                                        <span className="h-4 w-4 rounded-full bg-violet-600 p-1"></span>
                                        <span>Violet</span>
                                    </span>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </nav>
                    
                    {/* Theme selector for small screens */}
                    <div className="flex items-center lg:hidden">
                        <Select
                            onValueChange={(selectedTheme: ThemeName) => {
                                changeTheme(selectedTheme)
                                setTheme(selectedTheme)
                            }}
                            value={theme}
                        >
                            <SelectTrigger
                                className="w-[130px]"
                                aria-label="customize theme"
                            >
                                <div className="flex items-center gap-2">
                                    <span className={cn("h-4 w-4 rounded-full p-1", getThemeColorClass(theme))}></span>
                                    <SelectValue placeholder="Theme" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="red">
                                    <span className="flex items-center gap-2">
                                        <span className="h-4 w-4 rounded-full bg-red-600 p-1"></span>
                                        <span>Red</span>
                                    </span>
                                </SelectItem>
                                <SelectItem value="blue">
                                    <span className="flex items-center gap-2">
                                        <span className="h-4 w-4 rounded-full bg-blue-600 p-1"></span>
                                        <span>Blue</span>
                                    </span>
                                </SelectItem>
                                <SelectItem value="green">
                                    <span className="flex items-center gap-2">
                                        <span className="h-4 w-4 rounded-full bg-green-600 p-1"></span>
                                        <span>Green</span>
                                    </span>
                                </SelectItem>
                                <SelectItem value="violet">
                                    <span className="flex items-center gap-2">
                                        <span className="h-4 w-4 rounded-full bg-violet-600 p-1"></span>
                                        <span>Violet</span>
                                    </span>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            
            {/* Mobile Bottom Navigation */}
            <MobileBottomNav />
        </>
    )
}

export default AppNavbar 