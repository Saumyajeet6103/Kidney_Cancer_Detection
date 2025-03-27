import { type MetaFunction } from '@remix-run/node'
import AppNavbar from '~/components/app-navbar'
import ImageCapture from '~/components/image-capture'
import Footer from '~/components/footer'

export const meta: MetaFunction = () => {
    return [
        { title: 'KidneyScan AI - Image Analysis' },
        {
            name: 'description',
            content: 'Upload kidney scans or take photos for AI-powered tumor detection. Get fast and accurate preliminary results from our advanced detection technology.',
        },
    ]
}

export default function ScanPage() {
    return (
        <div className='dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsla(var(--primary)_/_30%),#ffffff00)]'>
            <AppNavbar />
            <main className="pb-24">
                <ImageCapture />
            </main>
            <Footer />
        </div>
    )
} 