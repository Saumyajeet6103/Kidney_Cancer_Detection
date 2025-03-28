import { type MetaFunction } from '@remix-run/node'
import AppNavbar from '~/components/app-navbar'
import ChatBot from '~/components/chat-bot'
import Footer from '~/components/footer'

export const meta: MetaFunction = () => {
    return [
        { title: 'KidneyScan AI - Virtual Assistant' },
        {
            name: 'description',
            content: 'Chat with our AI assistant about kidney cancer detection, symptoms, treatments, and more. Get reliable information and guidance.',
        },
    ]
}

export default function ChatPage() {
    return (
        <div className='dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsla(var(--primary)_/_30%),#ffffff00)]'>
            <AppNavbar />
            <main className="pb-28 lg:pb-24">
                <ChatBot />
            </main>
            <Footer />
        </div>
    )
} 