import { type MetaFunction } from '@remix-run/node'
import AppNavbar from '~/components/app-navbar'
import Footer from '~/components/footer'

export const meta: MetaFunction = () => {
    return [
        { title: 'About KidneyScan AI' },
        {
            name: 'description',
            content: 'Learn about KidneyScan AI, our mission to revolutionize kidney cancer detection through advanced AI technology, and the team behind our innovation.',
        },
    ]
}

export default function AboutPage() {
    return (
        <div className='dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsla(var(--primary)_/_30%),#ffffff00)]'>
            <AppNavbar />
            <main className="mx-auto max-w-4xl px-5 pb-24 pt-16">
                <div className="space-y-16">
                    <section>
                        <h1 className="font-inter text-4xl font-extrabold tracking-tight lg:text-5xl">
                            <span className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
                                About KidneyScan
                                <span className="text-primary">AI</span>
                            </span>
                        </h1>
                        <p className="mt-6 text-lg text-muted-foreground">
                            KidneyScan AI is at the forefront of medical technology, dedicated to early detection of kidney cancer through advanced artificial intelligence. Our mission is to save lives by making early detection accessible, accurate, and affordable for everyone.
                        </p>
                    </section>
                
                    <section>
                        <h2 className="font-inter text-2xl font-bold tracking-tight lg:text-3xl">
                            Our Mission
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            We believe that early detection is the key to improving kidney cancer survival rates. By leveraging cutting-edge AI and machine learning, we've developed a technology that can detect potential kidney tumors with over 95% accuracy, even at early stages when traditional screening methods might miss them.
                        </p>
                    </section>
                
                    <section>
                        <h2 className="font-inter text-2xl font-bold tracking-tight lg:text-3xl">
                            Our Technology
                        </h2>
                        <div className="mt-4 space-y-4">
                            <p className="text-lg text-muted-foreground">
                                KidneyScan AI uses deep learning neural networks trained on thousands of medical images to identify patterns associated with kidney tumors. Our system can analyze various types of kidney scans, including:
                            </p>
                            <ul className="ml-6 list-disc space-y-2 text-lg text-muted-foreground">
                                <li>CT scans</li>
                                <li>MRI images</li>
                                <li>Ultrasound images</li>
                                <li>Other medical imaging formats</li>
                            </ul>
                            <p className="text-lg text-muted-foreground">
                                The AI has been trained to identify subtle indicators that might escape the human eye, especially in early-stage tumors where visual cues can be minimal.
                            </p>
                        </div>
                    </section>
                
                    <section>
                        <h2 className="font-inter text-2xl font-bold tracking-tight lg:text-3xl">
                            Privacy & Security
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            We understand the sensitive nature of medical data. All images uploaded to KidneyScan AI are processed with strict adherence to healthcare privacy standards. We use state-of-the-art encryption and security protocols to ensure your medical information remains confidential and protected.
                        </p>
                    </section>
                
                    <section>
                        <h2 className="font-inter text-2xl font-bold tracking-tight lg:text-3xl">
                            Our Team
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            KidneyScan AI was developed by a multidisciplinary team of medical professionals, AI researchers, and software engineers committed to transforming healthcare through technology. Our advisory board includes leading nephrologists, oncologists, and radiologists who guide our development to ensure clinical relevance and accuracy.
                        </p>
                    </section>
                
                    <section>
                        <h2 className="font-inter text-2xl font-bold tracking-tight lg:text-3xl">
                            Important Disclaimer
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            While KidneyScan AI provides highly accurate preliminary assessments, it is designed as a supportive tool for healthcare professionals, not a replacement for proper medical evaluation. Always consult with qualified healthcare providers for diagnosis and treatment decisions.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    )
} 