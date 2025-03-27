import { CheckIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Switch } from './ui/switch'
import { Label } from './ui/label'
import { useState } from 'react'
import { cn } from '~/lib/utils'
import { Badge } from './ui/badge'

const Pricing = () => {
    const [checked, setChecked] = useState(false)

    return (
        <section className='mx-auto mb-8 mt-48 px-5 dark:bg-[radial-gradient(ellipse_40%_50%_at_50%_-20%,hsla(var(--primary)_/_30%),#ffffff00)]'>
            <div className='mx-auto mb-16 h-[1px] w-full max-w-2xl bg-gradient-to-r from-transparent via-primary to-transparent'></div>
            <div className='mx-auto flex max-w-7xl flex-col gap-6 text-center'>
                <div>
                    <span className='rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary dark:bg-primary/25'>
                        <span className='brightness-[1.7]'>
                            Service Options
                        </span>
                    </span>
                    <h1 className='mt-4 scroll-m-20 font-inter text-4xl font-extrabold tracking-tight lg:text-5xl'>
                        <span className='bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent'>
                            Healthcare{' '}
                        </span>
                        <span className='bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent'>
                            Solutions{' '}
                        </span>
                        <span className='bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent'>
                            Plans
                        </span>
                    </h1>
                </div>
                <p className='text-lg text-muted-foreground'>
                    Choose the right screening and monitoring solution for your healthcare needs
                </p>
                <div className='mt-20 flex items-center justify-center space-x-2'>
                    <Label
                        htmlFor='price-toggle'
                        className={cn(checked && 'text-muted-foreground')}
                    >
                        One-time
                    </Label>
                    <Switch
                        id='price-toggle'
                        defaultChecked={false}
                        checked={checked}
                        onCheckedChange={() => setChecked(!checked)}
                        className='data-[state=unchecked]:bg-primary'
                        aria-label='toggle pricing'
                    />
                    <Label
                        htmlFor='price-toggle'
                        className={cn(!checked && 'text-muted-foreground')}
                    >
                        Annual Plan
                    </Label>
                </div>
                <div className='mt-10 flex flex-col items-center gap-6 lg:flex-row lg:items-stretch lg:justify-around lg:px-6'>
                    <div className='gradient-border relative w-full max-w-sm flex-grow basis-0 rounded-md bg-gradient-to-bl from-primary/10 via-transparent to-transparent p-8 text-left before:bg-gradient-to-bl before:from-primary/30 before:to-primary/5 lg:max-w-none'>
                        <div className='flex flex-col gap-3 text-left'>
                            <p>Basic Screening</p>
                            <div className='flex items-start gap-2'>
                                <span className='text-2xl text-muted-foreground'>
                                    $
                                </span>
                                <span className='bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-5xl font-medium text-transparent'>
                                    199
                                </span>
                            </div>
                            <p className='text-muted-foreground'>
                                Essential screening for individuals
                            </p>
                        </div>
                        <ul className='mt-8 flex flex-col gap-4'>
                            <li className='flex gap-2'>
                                <CheckIcon className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                                <span>Single kidney screening test</span>
                            </li>
                            <li className='flex gap-2'>
                                <CheckIcon className='5 mt-0.5 shrink-0 text-primary' />
                                <span>AI-powered analysis</span>
                            </li>
                            <li className='flex gap-2'>
                                <CheckIcon className='5 mt-0.5 shrink-0 text-primary' />
                                <span>Detailed medical report</span>
                            </li>
                            <li className='flex gap-2'>
                                <CheckIcon className='5 mt-0.5 shrink-0 text-primary' />
                                <span>Patient portal access</span>
                            </li>
                            <li className='flex gap-2'>
                                <CheckIcon className='5 mt-0.5 shrink-0 text-primary' />
                                <span>Digital results delivery</span>
                            </li>
                            <li className='flex gap-2'>
                                <CheckIcon className='5 mt-0.5 shrink-0 text-primary' />
                                <span>Email support</span>
                            </li>
                        </ul>
                        <Button className='mt-8 w-full' variant={'outline'}>
                            Schedule Screening
                        </Button>
                    </div>
                    <div className='gradient-border relative w-full max-w-sm flex-grow basis-0 rounded-md bg-gradient-to-b from-primary/10 via-transparent to-transparent p-8 before:bg-gradient-to-b before:from-primary before:to-primary/10 lg:max-w-none'>
                        <div className='flex flex-col gap-3 text-left'>
                            <p>Continuous Monitoring</p>
                            <div className='flex items-start gap-2'>
                                <span className='text-2xl text-muted-foreground'>
                                    $
                                </span>
                                <span className='flex items-center gap-2 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-5xl font-medium text-transparent'>
                                    {checked ? '599' : '249'}
                                    {checked && (
                                        <Badge variant={'outline'}>
                                            SAVE 40%
                                        </Badge>
                                    )}
                                </span>
                            </div>
                            <p className='text-muted-foreground'>
                                Regular monitoring for at-risk patients
                            </p>
                        </div>
                        <ul className='mt-8 flex flex-col gap-4 text-left'>
                            <li className='flex gap-2'>
                                <CheckIcon className='5 mt-0.5 shrink-0 text-primary' />
                                <span>{checked ? "4 screenings per year" : "Single comprehensive screening"}</span>
                            </li>
                            <li className='flex gap-2'>
                                <CheckIcon className='5 mt-0.5 shrink-0 text-primary' />
                                <span>Enhanced AI detection</span>
                            </li>
                            <li className='flex gap-2'>
                                <CheckIcon className='5 mt-0.5 shrink-0 text-primary' />
                                <span>Comparative analysis</span>
                            </li>
                            <li className='flex gap-2'>
                                <CheckIcon className='5 mt-0.5 shrink-0 text-primary' />
                                <span>Physician consultation</span>
                            </li>
                            <li className='flex gap-2'>
                                <CheckIcon className='5 mt-0.5 shrink-0 text-primary' />
                                <span>Priority scheduling</span>
                            </li>
                            <li className='flex gap-2'>
                                <CheckIcon className='5 mt-0.5 shrink-0 text-primary' />
                                <span>Full medical report integration</span>
                            </li>
                        </ul>
                        <Button className='mt-8 w-full'>Enroll Now</Button>
                    </div>
                    <div className='gradient-border relative max-w-sm flex-grow basis-0 rounded-md bg-gradient-to-br from-primary/10 via-transparent to-transparent p-8 before:bg-gradient-to-br before:from-primary/30 before:to-primary/5 lg:max-w-none'>
                        <div className='flex flex-col gap-3 text-left'>
                            <p>Healthcare Provider</p>
                            <div className='flex items-start gap-2'>
                                <span className='text-2xl text-muted-foreground'>
                                    
                                </span>
                                <span className='flex items-center gap-2 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-5xl font-medium text-transparent'>
                                    Custom
                                </span>
                            </div>
                            <p className='text-muted-foreground'>
                                Enterprise solutions for medical facilities
                            </p>
                        </div>
                        <ul className='mt-8 flex flex-col gap-4 text-left'>
                            <li className='flex gap-2'>
                                <CheckIcon className='5 mt-0.5 shrink-0 text-primary' />
                                <span>Unlimited patient screenings</span>
                            </li>
                            <li className='flex gap-2'>
                                <CheckIcon className='5 mt-0.5 shrink-0 text-primary' />
                                <span>Full EMR/EHR integration</span>
                            </li>
                            <li className='flex gap-2'>
                                <CheckIcon className='5 mt-0.5 shrink-0 text-primary' />
                                <span>Customized reporting</span>
                            </li>
                            <li className='flex gap-2'>
                                <CheckIcon className='5 mt-0.5 shrink-0 text-primary' />
                                <span>Dedicated medical liaison</span>
                            </li>
                            <li className='flex gap-2'>
                                <CheckIcon className='5 mt-0.5 shrink-0 text-primary' />
                                <span>24/7 technical support</span>
                            </li>
                            <li className='flex gap-2'>
                                <CheckIcon className='5 mt-0.5 shrink-0 text-primary' />
                                <span>Staff training & certification</span>
                            </li>
                        </ul>
                        <Button className='mt-8 w-full' variant={'outline'}>
                            Request Information
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Pricing
