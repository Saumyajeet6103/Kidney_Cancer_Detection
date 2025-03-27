import React from 'react'
import {
    ActivityIcon,
    HeartPulseIcon,
    Building2Icon,
    HospitalIcon,
    ShieldPlusIcon,
    StethoscopeIcon,
    HeartIcon,
    Microscope,
    GraduationCapIcon,
} from 'lucide-react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '~/components/ui/tooltip'

const Cms = () => {
    const partners = [
        {
            component: <HospitalIcon height={42} width={42} className="text-primary/80" />,
            name: 'Memorial Health',
        },
        {
            component: <HeartPulseIcon height={42} width={42} className="text-primary/80" />,
            name: 'Kidney Care Centers',
        },
        {
            component: <StethoscopeIcon height={42} width={42} className="text-primary/80" />,
            name: 'MedTrust Alliance',
        },
        {
            component: <Building2Icon height={42} width={42} className="text-primary/80" />,
            name: 'University Medical Center',
        },
        {
            component: <HeartIcon height={42} width={42} className="text-primary/80" />,
            name: 'LifeSpan Health',
        },
        {
            component: <ShieldPlusIcon height={42} width={42} className="text-primary/80" />,
            name: 'Guardian Medical Group',
        },
        {
            component: <ActivityIcon height={42} width={42} className="text-primary/80" />,
            name: 'Vitality Healthcare',
        },
        {
            component: <GraduationCapIcon height={42} width={42} className="text-primary/80" />,
            name: 'Medical Research Institute',
        },
    ]

    return (
        <div className='mx-5'>
            <p className='mb-8 text-center text-sm font-medium text-muted-foreground'>
                TRUSTED BY LEADING HEALTHCARE PROVIDERS
            </p>
            <div className='mx-auto flex flex-wrap items-center justify-center gap-8 fill-foreground lg:gap-x-14'>
                {partners.map((item) => (
                    <React.Fragment key={item.name}>
                        <TooltipProvider delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger
                                    aria-label={item.name}
                                    className='cursor-default'
                                >
                                    {item.component}
                                </TooltipTrigger>
                                <TooltipContent side='bottom'>
                                    <p>{item.name}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default Cms
