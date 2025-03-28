import { type MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import AppNavbar from '~/components/app-navbar'
import Banner from '~/components/banner'
import Cms from '~/components/cms'
import Contact from '~/components/contact'
import FAQs from '~/components/faqs'
import Features from '~/components/features'
import Footer from '~/components/footer'
import Hero from '~/components/hero'
import Pricing from '~/components/pricing'
import UploadScan from '~/components/upload-scan'
import { Button } from '~/components/ui/button'
import { CameraIcon, MessageSquareIcon } from 'lucide-react'

export const meta: MetaFunction = () => {
    return [
        { title: 'KidneyScan AI' },
        {
            name: 'description',
            content:
                'Advanced kidney cancer detection technology powered by AI. Early detection saves lives. Fast, accurate, and non-invasive screening for kidney cancer. Trust KidneyScan AI for reliable results.',
        },
        {
            name: 'keywords',
            content:
                'Kidney cancer detection, Early cancer screening, Kidney tumor detection, AI medical diagnostics, Non-invasive cancer screening, Renal cell carcinoma, Kidney health, Medical imaging AI, Early detection saves lives, Cancer prevention, Kidney disease screening, Healthcare AI, Medical diagnostics, Cancer detection technology, Precision medicine, Medical innovation',
        },
        {
            name: 'robots',
            content: 'index, follow',
        },
        {
            name: 'author',
            content: 'KidneyScan AI Team',
        },
        {
            tagName: 'link',
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: '/apple-touch-icon.png',
        },
        {
            tagName: 'link',
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: '/favicon-32x32.png',
        },
        {
            tagName: 'link',
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: '/favicon-16x16.png',
        },
        {
            tagName: 'link',
            rel: 'manifest',
            href: '/site.webmanifest',
        },
        {
            tagName: 'link',
            rel: 'mask-icon',
            href: '/safari-pinned-tab.svg',
            color: '#e11d48',
        },
        {
            name: 'msapplication-TileColor',
            content: '#e11d48',
        },
        {
            name: 'theme-color',
            content: '#ffffff',
        },
        {
            property: 'og:title',
            content:
                'KidneyScan AI - Advanced Kidney Cancer Detection Technology',
        },
        {
            property: 'og:description',
            content:
                'Early detection saves lives. Our AI-powered technology provides fast, accurate, and non-invasive screening for kidney cancer with reliable results.',
        },
        {
            property: 'og:image',
            name: 'og:image',
            content: 'https://kidneyscanai.com/kidneyscan-og-image.png',
        },
        {
            property: 'og:url',
            content: 'https://kidneyscanai.com/',
        },
        {
            property: 'og:type',
            content: 'website',
        },
        {
            name: 'twitter:card',
            content: 'summary_large_image',
        },
        {
            name: 'twitter:title',
            content:
                'KidneyScan AI - Advanced Kidney Cancer Detection Technology',
        },
        {
            name: 'twitter:description',
            content:
                'Early detection saves lives. Our AI-powered technology provides fast, accurate, and non-invasive screening for kidney cancer with reliable results.',
        },
        {
            name: 'twitter:image',
            content: 'https://kidneyscanai.com/kidneyscan-og-image.png',
        },
        {
            name: 'twitter:url',
            content: 'https://kidneyscanai.com/',
        },
        {
            name: 'twitter:domain',
            content: 'kidneyscanai.com',
        },
    ]
}

export default function Index() {
    return (
        <div className='pb-28 lg:pb-24 dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsla(var(--primary)_/_30%),#ffffff00)]'>
            <AppNavbar />
            <Hero />
            <div className="mx-auto mt-16 flex max-w-xl flex-col gap-4 px-5 sm:flex-row">
                <Button asChild className="flex items-center gap-2" size="lg">
                    <Link to="/scan">
                        <CameraIcon className="h-5 w-5" />
                        Analyze Kidney Scan
                    </Link>
                </Button>
                <Button asChild variant="outline" className="flex items-center gap-2" size="lg">
                    <Link to="/chat">
                        <MessageSquareIcon className="h-5 w-5" />
                        Chat with Assistant
                    </Link>
                </Button>
            </div>
            <Cms />
            <Features />
            <Pricing />
            <Banner />
            <FAQs />
            <Contact />
            <Footer />
        </div>
    )
}
