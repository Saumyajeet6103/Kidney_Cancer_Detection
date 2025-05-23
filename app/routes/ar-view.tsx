import { type MetaFunction } from '@remix-run/node'
import AppNavbar from '~/components/app-navbar'
import Footer from '~/components/footer'
import ARView from '~/components/ar-view'

export const meta: MetaFunction = () => {
    return [
        { title: 'KidneyScan AI - AR View' },
        {
            name: 'description',
            content: 'View and interact with 3D kidney models in augmented reality. Upload your STL files for an immersive visualization experience.',
        },
    ]
}

export default function ARViewPage() {
    return (
        <div className='dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsla(var(--primary)_/_30%),#ffffff00)]'>
            <AppNavbar />
            <main className="mx-auto max-w-4xl px-5 pb-28 lg:pb-24 pt-16">
                <ARView />
            </main>
            <Footer />
        </div>
    )
} 