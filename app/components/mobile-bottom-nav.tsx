import { Link, useLocation } from '@remix-run/react'
import { HomeIcon, CameraIcon, MessageSquareIcon, InfoIcon, ViewIcon } from 'lucide-react'
import { cn } from '~/lib/utils'

const MobileBottomNav = () => {
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
            name: 'AR View', 
            path: '/ar-view',
            icon: <ViewIcon className="h-5 w-5" />
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
        <div className="fixed bottom-0 left-0 right-0 z-[100] bg-black/95 lg:hidden">
            <nav className="grid h-16 grid-cols-4">
                {navItems.map(item => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={cn(
                            "flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors",
                            isActive(item.path)
                                ? "text-red-500"
                                : "text-white/70 hover:text-white"
                        )}
                    >
                        <div className={cn(
                            "flex h-6 w-6 items-center justify-center",
                            isActive(item.path) && "text-red-500"
                        )}>
                            {item.icon}
                        </div>
                        <span className={cn(
                            "text-center text-[10px]",
                            item.path === '/scan' && "text-[9px]"
                        )}>
                            {item.name}
                        </span>
                    </Link>
                ))}
            </nav>
        </div>
    )
}

export default MobileBottomNav 