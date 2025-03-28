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

    if (['symptom', 'sign', 'indicator', 'warning', 'early', 'detect']
        .some(keyword => lowerQuestion.includes(keyword))) {
        return 'Advanced kidney cancer symptoms can include blood in urine, persistent side or back pain, unexplained weight loss, chronic fatigue, intermittent fever, and in advanced stages, bone pain or breathing difficulties. Some patients may experience swelling in legs or develop symptoms related to cancer spreading to other organs.'
    }
    
    // Expanded Treatment Detection
    if (['treatment', 'cure', 'therapy', 'heal', 'manage', 'approach']
        .some(keyword => lowerQuestion.includes(keyword))) {
        return 'Kidney cancer treatment is highly personalized and may include surgical interventions like partial or radical nephrectomy, targeted molecular therapies, advanced immunotherapies, precision radiation techniques, and in some cases, participation in clinical trials. The specific approach depends on cancer stage, tumor characteristics, and individual patient factors.'
    }
    
    // Expanded Risk and Cause Detection
    if (['risk', 'cause', 'factor', 'likelihood', 'probability', 'develop']
        .some(keyword => lowerQuestion.includes(keyword))) {
        return 'Comprehensive kidney cancer risk factors include smoking, obesity, advanced age (over 40), male gender, hypertension, chronic kidney disease, family history, specific genetic mutations like von Hippel-Lindau syndrome, prolonged dialysis, and workplace exposure to chemicals such as trichloroethylene. Some genetic conditions significantly increase susceptibility.'
    }
    
    // Expanded Accuracy and Detection Detection
    if (['accuracy', 'reliable', 'detection', 'precise', 'screening', 'technology']
        .some(keyword => lowerQuestion.includes(keyword))) {
        return 'Our advanced KidneyScan AI detection technology utilizes deep learning neural networks trained on thousands of medical images, achieving over 96% accuracy in identifying potential kidney abnormalities. The system analyzes CT scans, MRIs, and ultrasounds, providing comprehensive preliminary screening while emphasizing the importance of professional medical consultation.'
    }
    
    // Expanded Screening and Test Detection
    if (['test', 'scan', 'screening', 'image', 'diagnostic', 'check']
        .some(keyword => lowerQuestion.includes(keyword))) {
        return 'Our kidney cancer screening process involves comprehensive AI-powered analysis of medical imaging. Recommended diagnostic techniques include contrast-enhanced CT scans, MRI with contrast, and high-resolution ultrasound. Patients can upload images for non-invasive, quick preliminary analysis that helps identify potential kidney abnormalities.'
    }
    
    // Expanded Psychological Support Detection
    if (['cope', 'support', 'mental', 'stress', 'emotional', 'help']
        .some(keyword => lowerQuestion.includes(keyword))) {
        return 'Emotional support is crucial during kidney cancer diagnosis. We recommend connecting with professional counselors, joining cancer support groups, practicing stress-reduction techniques like mindfulness, maintaining open communication with healthcare providers, and building a comprehensive support network to help navigate the psychological challenges.'
    }
    
    // Expanded Prevention Detection
    if (['prevent', 'lifestyle', 'reduce', 'avoid', 'health', 'diet']
        .some(keyword => lowerQuestion.includes(keyword))) {
        return 'Kidney cancer prevention strategies focus on modifiable lifestyle factors: maintaining a healthy body weight, engaging in regular physical activity, consuming a balanced diet rich in antioxidants, staying hydrated, avoiding tobacco and excessive alcohol, managing chronic conditions like hypertension, and participating in regular health screenings.'
    }
    
    // Expanded Genetic Detection
    if (['genetic', 'hereditary', 'inherit', 'family', 'gene', 'chromosome']
        .some(keyword => lowerQuestion.includes(keyword))) {
        return 'Genetic factors play a significant role in kidney cancer risk. Inherited conditions like von Hippel-Lindau syndrome, hereditary papillary renal cell carcinoma, and specific gene mutations in VHL, PBRM1, and BAP1 can increase susceptibility. Genetic counseling and comprehensive testing can help assess individual genetic risk profiles.'
    }

      // Basic Cancer Information
      if (lowerQuestion.includes('what is cancer')) {
        return 'Cancer is a disease where cells in a specific part of the body grow and divide uncontrollably. These abnormal cells can invade and destroy surrounding healthy tissue and potentially spread to other parts of the body through the bloodstream or lymphatic system. Cancer can develop in almost any part of the body and comes in many different types.'
    }
    
    // Kidney Basic Information
    if (lowerQuestion.includes('what is kidney')) {
        return 'The kidneys are two bean-shaped organs located on either side of the spine, just below the rib cage. They play a crucial role in filtering waste products, excess water, and other impurities from the blood. Each kidney is about the size of a fist and filters about 120-150 quarts of blood daily to produce 1-2 quarts of urine.'
    }
    
    // Kidney Function
    if (lowerQuestion.includes('kidney function') || lowerQuestion.includes('what do kidneys do')) {
        return 'Kidneys perform several vital functions in the body: filtering waste and excess water from blood, regulating blood pressure, producing hormones that help create red blood cells, maintaining bone health, and controlling the production of certain vitamins. They act like a sophisticated filtering system, keeping the body\'s chemical balance in check.'
    }
    
    // Basic Kidney Cancer Information
    if (lowerQuestion.includes('what is kidney cancer')) {
        return 'Kidney cancer is a type of cancer that originates in the kidneys. It occurs when kidney cells begin to grow out of control, forming a tumor. The most common type is renal cell carcinoma, which typically begins in the lining of tiny tubes in the kidney. Early detection is crucial, as kidney cancer can often be successfully treated when caught early.'
    }
    
    // Cancer Types
    if (lowerQuestion.includes('types of cancer')) {
        return 'There are over 100 different types of cancer, classified by the type of cell or organ where they start. Some of the most common types include lung cancer, breast cancer, prostate cancer, colorectal cancer, and skin cancer. Each type has unique characteristics, risk factors, and treatment approaches.'
    }
    
    // Human Body Basic Information
    if (lowerQuestion.includes('human body') || lowerQuestion.includes('how body works')) {
        return 'The human body is a complex system of interconnected organs and systems working together. It includes several key systems: circulatory, respiratory, digestive, nervous, muscular, skeletal, and immune systems. Each system has specific functions that contribute to overall health, growth, and survival.'
    }
    
    // Medical Detection Basic Information
    if (lowerQuestion.includes('how medical tests work')) {
        return 'Medical tests are designed to examine different aspects of health by analyzing blood, tissue, or imaging. These tests can detect diseases, monitor existing conditions, or assess overall health. Common types include blood tests, imaging scans (X-rays, CT scans, MRIs), biopsies, and genetic tests. Each test provides specific information about the body\'s condition.'
    }

      // Basic Medical Systems
      if (lowerQuestion.includes('circulatory system') || lowerQuestion.includes('blood system')) {
        return 'The circulatory system is a complex network of blood vessels, including arteries, veins, and capillaries, that circulates blood throughout the body. The heart acts as the central pump, moving oxygenated blood from the lungs to body tissues and returning deoxygenated blood back to the lungs. This system is crucial for delivering oxygen, nutrients, and removing waste products from cells.'
    }
    
    // Respiratory System
    if (lowerQuestion.includes('respiratory system') || lowerQuestion.includes('lungs')) {
        return 'The respiratory system is responsible for breathing and gas exchange. Lungs are the primary organs, bringing oxygen into the body and removing carbon dioxide. When you breathe in, air travels through the nose or mouth, down the trachea, into bronchial tubes, and finally into tiny air sacs called alveoli, where oxygen enters the bloodstream and carbon dioxide is expelled.'
    }
    
    // Digestive System
    if (lowerQuestion.includes('digestive system') || lowerQuestion.includes('how digestion works')) {
        return 'The digestive system breaks down food into nutrients that the body can absorb. It starts with the mouth, where mechanical and chemical digestion begins, continues through the esophagus to the stomach, where acids break down food, then to the small intestine for nutrient absorption, and finally the large intestine for water absorption and waste preparation.'
    }
    
    // Nervous System
    if (lowerQuestion.includes('nervous system') || lowerQuestion.includes('brain and nerves')) {
        return 'The nervous system is the body\'s communication network, consisting of the brain, spinal cord, and nerves. It controls both voluntary actions (like moving your arm) and involuntary functions (like breathing and heart rate). Neurons transmit electrical and chemical signals, allowing different parts of the body to communicate and respond to internal and external stimuli.'
    }
    
    // Immune System
    if (lowerQuestion.includes('immune system') || lowerQuestion.includes('how body fights disease')) {
        return 'The immune system is the body\'s defense mechanism against infections and diseases. It includes white blood cells, antibodies, and other components that identify and fight off harmful invaders like bacteria, viruses, and other pathogens. It has two main lines of defense: innate immunity (general protection) and adaptive immunity (specific targeted responses).'
    }
    
    // Hormonal System
    if (lowerQuestion.includes('hormones') || lowerQuestion.includes('endocrine system')) {
        return 'The endocrine system is a network of glands that produce hormones, chemical messengers that regulate various body functions. Key glands include the pituitary (often called the master gland), thyroid, pancreas, and adrenal glands. Hormones control metabolism, growth, development, reproduction, sleep, and mood, working as a complex communication system within the body.'
    }
    
    // Skeletal System
    if (lowerQuestion.includes('bones') || lowerQuestion.includes('skeletal system')) {
        return 'The skeletal system provides structure, protection, and support for the body. It consists of 206 bones in adults, connected by ligaments and moved by muscles. Beyond supporting movement, bones store minerals, produce blood cells in the bone marrow, and protect vital organs. The skeleton also serves as a framework for the entire body.'
    }
    
    // Basic Genetics
    if (lowerQuestion.includes('genetics') || lowerQuestion.includes('dna')) {
        return 'Genetics is the study of heredity and the variation of inherited characteristics. DNA (deoxyribonucleic acid) is the genetic blueprint found in every cell, containing instructions for developing and functioning organisms. Genes are segments of DNA that determine specific traits, and humans have approximately 20,000-25,000 genes that influence everything from eye color to disease susceptibility.'
    }
    
    // Mental Health Basics
    if (lowerQuestion.includes('mental health') || lowerQuestion.includes('psychological well-being')) {
        return 'Mental health encompasses emotional, psychological, and social well-being. It affects how we think, feel, and act, and helps determine how we handle stress, relate to others, and make choices. Good mental health is important at every stage of life, from childhood through adulthood. Factors like biological makeup, life experiences, and family history all contribute to mental health.'
    }
    
    // Nutrition Basics
    if (lowerQuestion.includes('nutrition') || lowerQuestion.includes('healthy eating')) {
        return 'Nutrition is about consuming the right balance of nutrients to maintain health and support bodily functions. A balanced diet includes proteins for cell repair, carbohydrates for energy, healthy fats, vitamins, minerals, and water. Different food groups provide various essential nutrients: fruits and vegetables for vitamins, whole grains for fiber, lean proteins for muscle maintenance, and dairy or alternatives for calcium.'
    }
    
    if (['hi', 'hello', 'hey', 'hola', 'greetings'].some(greeting => lowerQuestion.includes(greeting))) {
        const greetings = [
            'Hello! How can I help you today?',
            'Hi there! What health-related questions can I assist you with?',
            'Greetings! I\'m ready to provide health information and support.',
            'Welcome! I\'m here to help you with any medical or health inquiries.',
            'Hello! Your health is my priority. How can I support you today?'
        ]
        return greetings[Math.floor(Math.random() * greetings.length)]
    }
    
    // How are you
    if (lowerQuestion.includes('how are you') || lowerQuestion.includes('how\'s it going')) {
        const responses = [
            'I\'m functioning well and ready to provide health information!',
            'As an AI health assistant, I\'m always prepared to help you with your medical questions.',
            'I\'m doing great and eager to support your health-related inquiries!',
            'Ready and available to assist you with any health concerns you might have.',
            'Fully operational and committed to providing accurate health information!'
        ]
        return responses[Math.floor(Math.random() * responses.length)]
    }
    
    // Health-related small talk
    if (lowerQuestion.includes('how\'s the health') || lowerQuestion.includes('health today')) {
        const healthResponses = [
            'Health is a journey of continuous care and awareness. How can I help you maintain or improve your well-being today?',
            'Maintaining good health involves regular check-ups, balanced nutrition, and staying informed. What health topics would you like to discuss?',
            'Every day is an opportunity to make positive health choices. Is there a specific health concern I can help you with?',
            'Good health is about prevention, awareness, and proactive care. What health questions are on your mind today?',
            'Health is holistic – it encompasses physical, mental, and emotional well-being. How can I support your health goals?'
        ]
        return healthResponses[Math.floor(Math.random() * healthResponses.length)]
    }
    
    // Time of day greetings
    if (lowerQuestion.includes('good morning') || lowerQuestion.includes('morning')) {
        const morningResponses = [
            'Good morning! Starting the day with a focus on health is a great habit.',
            'Morning! A new day brings new opportunities for wellness and self-care.',
            'Good morning! How can I help you start your day on a healthy note?',
            'Wishing you a healthy and productive morning. What health goals can I help you with?',
            'Rise and shine! Let\'s discuss how to make today a great day for your health.'
        ]
        return morningResponses[Math.floor(Math.random() * morningResponses.length)]
    }
    
    if (lowerQuestion.includes('good night') || lowerQuestion.includes('night')) {
        const nightResponses = [
            'Good night! Remember, quality sleep is crucial for overall health and well-being.',
            'Sweet dreams! Restful sleep is an important component of maintaining good health.',
            'Wishing you a peaceful night. Proper sleep is essential for physical and mental recovery.',
            'Good night! Tomorrow is another opportunity to focus on your health and wellness.',
            'Rest well. Your body does important healing work while you sleep.'
        ]
        return nightResponses[Math.floor(Math.random() * nightResponses.length)]
    }
    
    // Farewell
    if (['bye', 'goodbye', 'see you', 'take care'].some(farewell => lowerQuestion.includes(farewell))) {
        const farewellResponses = [
            'Goodbye! Remember to prioritize your health and well-being.',
            'Take care! Feel free to return if you have any health questions.',
            'Bye for now! Stay healthy and informed.',
            'Wishing you good health. Don\'t hesitate to reach out if you need assistance.',
            'Goodbye! Your health journey continues even when we\'re not chatting.'
        ]
        return farewellResponses[Math.floor(Math.random() * farewellResponses.length)]
    }
    
    // Emotion check
    if (lowerQuestion.includes('feeling') || lowerQuestion.includes('mood')) {
        const emotionResponses = [
            'Emotions play a big role in overall health. Would you like to discuss how you\'re feeling?',
            'Mental health is just as important as physical health. I\'m here to listen and provide support.',
            'Your emotional well-being matters. Is there anything specific you\'d like to share?',
            'Feelings can impact health in many ways. How can I help you today?',
            'Emotional health is a crucial part of overall wellness. Would you like to explore some coping strategies?'
        ]
        return emotionResponses[Math.floor(Math.random() * emotionResponses.length)]
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