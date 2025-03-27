import React from 'react'
import {
    ActivityIcon,
    BrainCircuitIcon,
    ClipboardCheckIcon,
    HeartPulseIcon,
    ShieldCheckIcon,
    TimerIcon,
} from 'lucide-react'
import { type FeatureCardProps } from '~/types/feature-card'
import FeatureCard from './feature-card'

const featuresData: FeatureCardProps[] = [
    {
        title: 'AI-Powered Analysis',
        description:
            'Our advanced AI algorithms analyze medical imaging with high accuracy.',
        icon: <BrainCircuitIcon size={28} className='text-red-500' />,
        backgroundColor: 'from-red-500/20 to-red-500/5',
    },
    {
        title: 'Early Detection',
        description: 'Identify kidney abnormalities before symptoms appear.',
        icon: <TimerIcon size={28} className='text-red-500' />,
        backgroundColor: 'from-red-500/20 to-red-500/5',
    },
    {
        title: 'Non-Invasive Screening',
        description: 'Comfortable, radiation-free scanning technology.',
        icon: <HeartPulseIcon size={28} className='text-red-500' />,
        backgroundColor: 'from-red-500/20 to-red-500/5',
    },
    {
        title: 'Detailed Reports',
        description:
            'Comprehensive results with medical-grade accuracy and clarity.',
        icon: <ClipboardCheckIcon className='text-red-500' />,
        backgroundColor: 'from-red-500/20 to-red-500/5',
    },
    {
        title: 'Health Monitoring',
        description:
            'Track changes over time with regular screenings and comparisons.',
        icon: <ActivityIcon className='text-red-500' />,
        backgroundColor: 'from-red-500/20 to-red-500/5',
    },
    {
        title: 'Data Security',
        description: 'HIPAA-compliant platform with encrypted patient data.',
        icon: <ShieldCheckIcon size={28} className='text-red-500' />,
        backgroundColor: 'from-red-500/20 to-red-500/5',
    },
]

const Features = () => {
    return (
        <section className='mx-auto mt-48 max-w-7xl px-5'>
            <div className='mx-auto flex max-w-2xl flex-col gap-6 text-center'>
                <div>
                    <span className='rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary dark:bg-primary/25'>
                        <span className='brightness-[1.7]'>
                            Life-Saving Technology
                        </span>
                    </span>
                    <h1 className='mt-4 scroll-m-20 font-inter text-4xl font-extrabold tracking-tight lg:text-5xl'>
                        <span className='bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent'>
                            Advanced{' '}
                        </span>
                        <span className='bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent'>
                            Kidney{' '}
                        </span>
                        <span className='bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent'>
                            Cancer{' '}
                        </span>
                        <span className='bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent'>
                            Detection{' '}
                        </span>
                        <span className='bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent'>
                            Technology
                        </span>
                    </h1>
                </div>
                <p className='text-lg text-muted-foreground'>
                    <span className='hidden lg:block'>
                        Our innovative AI-powered screening technology helps detect kidney cancer 
                        in its earliest stages, when treatment is most effective and survival rates are highest.
                    </span>
                    <span className='block lg:hidden'>
                        Early detection of kidney cancer when treatment is most effective 
                        and survival rates are highest.
                    </span>
                </p>
            </div>
            <div>
                <ul className='mt-20 grid place-content-center gap-20 md:grid-cols-2 lg:grid-cols-3'>
                    {featuresData.map((feature, i) => (
                        <li key={i}>
                            <FeatureCard
                                title={feature.title}
                                description={feature.description}
                                backgroundColor={feature.backgroundColor}
                                icon={feature.icon}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Features
