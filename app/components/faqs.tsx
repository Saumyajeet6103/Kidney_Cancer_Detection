import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '~/components/ui/accordion'
import ChatMessage from './icons/chat-message'
import DotPattern from './dot-pattern'
import { cn } from '~/lib/utils'
import { buttonVariants } from './ui/button'

const faqs = [
    {
        question:
            'How accurate is KidneyScan AI in detecting kidney cancer?',
        answer: 'KidneyScan AI has a detection accuracy rate of over 95% in clinical trials, making it one of the most reliable non-invasive screening tools available for kidney cancer detection.',
    },
    {
        question:
            'Is the KidneyScan AI screening procedure covered by insurance?',
        answer: "Most major health insurance providers cover KidneyScan AI screening, especially for patients with risk factors. We recommend checking with your specific insurance provider for coverage details.",
    },
    {
        question:
            'How long does the screening process take?',
        answer: "The entire screening process takes approximately 20-30 minutes, with results typically available within 24-48 hours through our secure patient portal or via your healthcare provider.",
    },
    {
        question:
            'Is the KidneyScan AI technology painful or invasive?',
        answer: 'No, KidneyScan AI technology is completely non-invasive and painless. It uses advanced imaging techniques that require no radiation, injections, or invasive procedures.',
    },
]

const FAQs = () => {
    return (
        <section className='relative mx-auto px-5 pb-8 pt-48'>
            <div className='mx-auto flex max-w-7xl flex-col gap-6 text-center'>
                <div>
                    <span className='rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary dark:bg-primary/25'>
                        <span className='brightness-[1.7]'>FAQs</span>
                    </span>
                    <h1 className='mt-4 scroll-m-20 font-inter text-4xl font-extrabold tracking-tight lg:text-5xl'>
                        <span className='bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent'>
                            Frequently{' '}
                        </span>
                        <span className='bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent'>
                            asked{' '}
                        </span>
                        <span className='bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent'>
                            questions
                        </span>
                    </h1>
                </div>
                <p className='text-lg text-muted-foreground'>
                    Have more questions about our kidney cancer detection technology?{' '}
                    <a
                        href='#name'
                        className={cn(
                            buttonVariants({ variant: 'link' }),
                            'px-0 text-lg text-foreground'
                        )}
                    >
                        Contact our medical team.
                    </a>
                </p>
                <div className='mt-20 flex items-center justify-between'>
                    <DotPattern
                        width={20}
                        height={20}
                        cx={1}
                        cy={1}
                        cr={1}
                        className={cn(
                            'fill-primary/40 [mask-image:linear-gradient(to_bottom,transparent,white,white,transparent,transparent)]'
                        )}
                    />
                    <Accordion
                        collapsible
                        type='single'
                        className='mx-auto w-full max-w-4xl grow basis-28 text-left'
                    >
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className='text-left text-xl hover:no-underline'>
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className='text-base text-muted-foreground'>
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    )
}

export default FAQs
