import { useForm } from '@formspree/react'
import { motion } from 'framer-motion'
import { cn } from '~/lib/utils'
import useTheme from '~/hooks/use-theme'
import Fire from './icons/fire'

const Hero = () => {
    const [state, handleSubmit] = useForm('mjvqrzpz')
    const [theme, setTheme] = useTheme()
    
    if (theme !== 'red') {
        setTheme('red')
    }

    return (
        <main className='mx-auto my-10 flex min-h-[calc(100vh-73px)] max-w-2xl flex-col justify-center gap-6 px-5 text-center lg:my-0'>
            <motion.h1
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={cn(
                    'scroll-m-20 font-inter text-4xl font-extrabold tracking-tight lg:text-5xl'
                )}
            >
                <span className='bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent'>
                    Early Detection
                </span>{' '}
                <span className='bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent'>
                    Saves{' '}
                </span>
                <span className='bg-gradient-to-b from-primary to-rose-600 bg-clip-text text-5xl font-extrabold text-transparent lg:text-8xl'>
                    Lives.
                </span>
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
                className='text-base text-muted-foreground lg:text-lg'
            >
                Welcome to <span className='text-primary'>KidneyScan AI</span>,
                our advanced technology provides fast, accurate, and non-invasive 
                kidney cancer screening.{' '}
                <span className='hidden lg:block'>
                    Get results you can trust with our AI-powered detection system.
                </span>
            </motion.p>
            <motion.form
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
                onSubmit={handleSubmit}
                className='mx-auto mt-8 flex w-full max-w-sm flex-col items-end space-y-2'
            >
                {!state.succeeded && (
                    <p className='w-full text-center text-sm text-muted-foreground'>
                        Join hundreds of medical facilities using our technology
                    </p>
                )}
                {state.succeeded && (
                    <p className='w-full text-center text-sm text-muted-foreground'>
                        Your health is our priority
                    </p>
                )}
                <p className='w-full text-center text-sm text-muted-foreground'></p>
            </motion.form>
            <motion.span
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.6 }}
                className='mx-auto'
            >
                <Fire
                    className='h-56'
                    linearFrom='text-primary/10'
                    linearTo='text-primary'
                />
            </motion.span>
        </main>
    )
}

export default Hero
