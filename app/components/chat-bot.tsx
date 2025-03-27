import { useState, useRef, useEffect } from 'react'
import { SendIcon, RefreshCw, UserIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'

type Message = {
    id: string
    content: string
    role: 'user' | 'assistant'
    timestamp: Date
}

const defaultMessages: Message[] = [
    {
        id: '1',
        content: 'Hello! I\'m your KidneyScan AI assistant. How can I help you with kidney cancer detection and information today?',
        role: 'assistant',
        timestamp: new Date()
    }
]

// Sample responses for the chatbot
const getSampleResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase()
    
    if (lowerQuestion.includes('symptom') || lowerQuestion.includes('sign')) {
        return 'Common symptoms of kidney cancer may include blood in urine, pain in your side that doesn\'t go away, loss of appetite, unexplained weight loss, and fatigue. However, many people with kidney cancer don\'t have obvious symptoms, especially in early stages.'
    }
    
    if (lowerQuestion.includes('treatment') || lowerQuestion.includes('therapy')) {
        return 'Kidney cancer treatment options depend on the stage and type, but may include surgery, targeted therapy, immunotherapy, radiation therapy, or chemotherapy. Your healthcare provider will recommend the best approach based on your specific situation.'
    }
    
    if (lowerQuestion.includes('risk') || lowerQuestion.includes('cause')) {
        return 'Risk factors for kidney cancer include smoking, obesity, high blood pressure, family history of kidney cancer, certain genetic conditions, long-term dialysis, and workplace exposure to specific chemicals.'
    }
    
    if (lowerQuestion.includes('accuracy') || lowerQuestion.includes('reliable') || lowerQuestion.includes('detection')) {
        return 'Our KidneyScan AI detection technology has demonstrated over 95% accuracy in clinical studies for detecting kidney tumors. However, it\'s designed as a preliminary screening tool and should be followed up with consultation from healthcare professionals.'
    }
    
    if (lowerQuestion.includes('test') || lowerQuestion.includes('scan') || lowerQuestion.includes('screening')) {
        return 'Our kidney cancer screening uses AI to analyze images of your kidneys. You can upload images from CT scans, MRIs, or ultrasounds for analysis. The process is non-invasive and provides quick preliminary results.'
    }
    
    return 'That\'s a great question. To give you the most accurate information for your specific situation, I\'d recommend consulting with a healthcare professional. Would you like me to provide general information about kidney cancer detection or screening options?'
}

const ChatBot = () => {
    const [messages, setMessages] = useState<Message[]>(defaultMessages)
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    
    // Scroll to bottom whenever messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])
    
    const handleSendMessage = async (e?: React.FormEvent) => {
        if (e) e.preventDefault()
        
        if (!inputValue.trim()) return
        
        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            content: inputValue,
            role: 'user',
            timestamp: new Date()
        }
        
        setMessages(prev => [...prev, userMessage])
        setInputValue('')
        setIsLoading(true)
        
        // In a real app, you would connect to a chatbot API here
        // For now, we'll simulate a response after a delay
        setTimeout(() => {
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                content: getSampleResponse(userMessage.content),
                role: 'assistant',
                timestamp: new Date()
            }
            
            setMessages(prev => [...prev, botResponse])
            setIsLoading(false)
        }, 1000)
    }
    
    const handleReset = () => {
        setMessages(defaultMessages)
    }
    
    return (
        <section className="mx-auto mt-24 max-w-7xl px-5">
            <div className="mx-auto flex max-w-2xl flex-col gap-6 text-center">
                <div>
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary dark:bg-primary/25">
                        <span className="brightness-[1.7]">Virtual Assistant</span>
                    </span>
                    <h1 className="mt-4 scroll-m-20 font-inter text-4xl font-extrabold tracking-tight lg:text-5xl">
                        <span className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
                            KidneyScan AI Assistant
                        </span>
                    </h1>
                </div>
                <p className="text-lg text-muted-foreground">
                    Ask questions about kidney cancer, detection methods, or get help interpreting your results.
                </p>
                
                <div className="mx-auto mt-8 flex w-full max-w-2xl flex-col">
                    <div className="flex h-[500px] flex-col rounded-t-lg border border-b-0 border-primary/20 bg-background/50">
                        <div className="flex-1 overflow-y-auto p-4">
                            {messages.map(message => (
                                <div 
                                    key={message.id} 
                                    className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div 
                                        className={`max-w-[80%] rounded-lg p-3 ${
                                            message.role === 'user' 
                                                ? 'bg-primary text-white' 
                                                : 'bg-muted text-foreground'
                                        }`}
                                    >
                                        {message.role === 'assistant' && (
                                            <div className="mb-1 flex items-center">
                                                <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                                                    <span className="text-xs font-semibold text-primary">AI</span>
                                                </div>
                                                <span className="text-xs opacity-70">KidneyScan Assistant</span>
                                            </div>
                                        )}
                                        
                                        {message.role === 'user' && (
                                            <div className="mb-1 flex items-center justify-end">
                                                <span className="text-xs opacity-70">You</span>
                                                <div className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                                                    <UserIcon className="h-3 w-3" />
                                                </div>
                                            </div>
                                        )}
                                        
                                        <p className={`text-sm ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                                            {message.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            
                            {isLoading && (
                                <div className="mb-4 flex justify-start">
                                    <div className="max-w-[80%] rounded-lg bg-muted p-4 text-foreground">
                                        <div className="flex items-center">
                                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                            <p className="text-sm">KidneyScan Assistant is typing...</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                    
                    <form 
                        onSubmit={handleSendMessage}
                        className="flex rounded-b-lg border border-primary/20 bg-background/50 p-2"
                    >
                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type your question about kidney cancer..."
                            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        <Button 
                            type="submit" 
                            size="icon" 
                            disabled={isLoading || !inputValue.trim()}
                            className="ml-2 h-10 w-10 rounded-full"
                        >
                            <SendIcon className="h-4 w-4" />
                        </Button>
                    </form>
                    
                    <div className="mt-4 flex items-center justify-center">
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={handleReset}
                            className="text-xs text-muted-foreground"
                        >
                            Reset conversation
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ChatBot 