import { useState, useRef } from 'react'
import { CameraIcon, UploadIcon, XIcon, RefreshCw } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '~/lib/utils'

const ImageCapture = () => {
    const [captureMode, setCaptureMode] = useState<'options' | 'camera' | 'upload' | 'preview'>('options')
    const [imageData, setImageData] = useState<string | null>(null)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [result, setResult] = useState<'positive' | 'negative' | null>(null)
    const [confidence, setConfidence] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [diagnosisText, setDiagnosisText] = useState<string | null>(null)
    
    const videoRef = useRef<HTMLVideoElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    
    // Start camera stream
    const startCamera = async () => {
        setCaptureMode('camera')
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment' }
            })
            
            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }
        } catch (err) {
            setError('Unable to access camera. Please check permissions.')
            setCaptureMode('options')
        }
    }
    
    // Capture image from camera
    const captureImage = () => {
        if (!videoRef.current) return
        
        const canvas = document.createElement('canvas')
        canvas.width = videoRef.current.videoWidth
        canvas.height = videoRef.current.videoHeight
        
        const ctx = canvas.getContext('2d')
        if (ctx) {
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
            const dataUrl = canvas.toDataURL('image/jpeg')
            setImageData(dataUrl)
            setCaptureMode('preview')
            
            // Stop the camera stream
            const stream = videoRef.current.srcObject as MediaStream
            if (stream) {
                stream.getTracks().forEach(track => track.stop())
            }
        }
    }
    
    // Handle file upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        
        const reader = new FileReader()
        reader.onloadend = () => {
            // Make sure to update state only after the file is read
            const result = reader.result as string
            setImageData(result)
            // Ensure we change to preview mode after the image data is set
            setCaptureMode('preview')
        }
        reader.readAsDataURL(file)
    }
    
    // Trigger file input click
    const triggerFileUpload = () => {
        // Just opening the file dialog, don't change mode yet
        if (fileInputRef.current) {
            fileInputRef.current.value = '' // Clear any previous selection
            fileInputRef.current.click()
        }
    }
    
    // Reset the component
    const handleReset = () => {
        setImageData(null)
        setResult(null)
        setConfidence(null)
        setError(null)
        setDiagnosisText(null)
        setCaptureMode('options')
        
        // If we have an active camera stream, stop it
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream
            if (stream) {
                stream.getTracks().forEach(track => track.stop())
            }
        }
    }
    
    // Analyze the image
    const handleAnalyze = async () => {
        if (!imageData) return
        
        setIsAnalyzing(true)
        setError(null)
        
        try {
            // Extract base64 data from the image data URL
            const base64Image = imageData.split(',')[1]
           
            // Make API request to backend
            const response = await fetch('https://0b33-2402-a00-152-6e28-6441-9c6d-923b-32f.ngrok-free.app//predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: base64Image
                })
            })
            
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`)
            }
            
            // Parse the response from the backend
            const data = await response.json()
            
            if (data.error) {
                throw new Error(data.error)
            }
            
            // Handle the specific response format from your backend
            if (Array.isArray(data) && data.length > 0 && data[0].image) {
                // Format: [{image: "Tumor"}]
                const diagnosis = data[0].image
                setDiagnosisText(diagnosis)
                
                // Set result based on diagnosis
                if (diagnosis === "Tumor") {
                    setResult('positive')
                    setConfidence(95) // Placeholder confidence
                } else if (diagnosis === "Normal") {
                    setResult('negative')
                    setConfidence(95) // Placeholder confidence
                } else {
                    // Handle other potential responses
                    setResult('positive') // Default to positive for unknown responses
                    setConfidence(85)
                    setDiagnosisText(`Detected: ${diagnosis}`)
                }
            } else if (data.image) {
                // Alternative format: {image: "Tumor"}
                const diagnosis = data.image
                setDiagnosisText(diagnosis)
                
                // Set result based on diagnosis
                if (diagnosis === "Tumor") {
                    setResult('positive')
                    setConfidence(95) // Placeholder confidence
                } else if (diagnosis === "Normal") {
                    setResult('negative')
                    setConfidence(95) // Placeholder confidence
                } else {
                    // Handle other potential responses
                    setResult('positive') // Default to positive for unknown responses
                    setConfidence(85)
                    setDiagnosisText(`Detected: ${diagnosis}`)
                }
            } else {
                throw new Error("Unexpected response format from server")
            }
        } catch (err) {
            console.error('Error during analysis:', err)
            setError(err instanceof Error ? err.message : 'An unexpected error occurred')
        } finally {
            setIsAnalyzing(false)
        }
    }
    
    return (
        <section className="mx-auto mt-24 max-w-7xl px-5">
            <div className="mx-auto flex max-w-2xl flex-col gap-6 text-center">
                <div>
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary dark:bg-primary/25">
                        <span className="brightness-[1.7]">Kidney Scan Analysis</span>
                    </span>
                    <h1 className="mt-4 scroll-m-20 font-inter text-4xl font-extrabold tracking-tight lg:text-5xl">
                        <span className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Capture or Upload
                        </span>
                    </h1>
                </div>
                <p className="text-lg text-muted-foreground">
                    Take a photo of your kidney scan or upload an existing image for AI-powered tumor detection.
                </p>
                
                <div className="mx-auto mt-8 w-full max-w-xl">
                    {captureMode === 'options' && (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Button 
                                onClick={startCamera}
                                size="lg" 
                                className="flex h-32 flex-col gap-2 p-0"
                            >
                                <CameraIcon className="h-8 w-8" />
                                <span>Take a Photo</span>
                            </Button>
                            
                            <Button 
                                onClick={triggerFileUpload}
                                size="lg" 
                                variant="outline" 
                                className="flex h-32 flex-col gap-2 p-0"
                            >
                                <UploadIcon className="h-8 w-8" />
                                <span>Upload an Image</span>
                                <input 
                                    type="file" 
                                    ref={fileInputRef}
                                    className="hidden" 
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </Button>
                        </div>
                    )}
                    
                    {captureMode === 'camera' && (
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-primary/20 bg-black">
                                <video 
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="flex w-full justify-between">
                                <Button variant="outline" onClick={handleReset}>
                                    Cancel
                                </Button>
                                <Button onClick={captureImage}>
                                    Capture Image
                                </Button>
                            </div>
                        </div>
                    )}
                    
                    {captureMode === 'preview' && (
                        <div className="flex flex-col items-center justify-center space-y-6">
                            <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-lg border border-primary/20 bg-black/5">
                                {imageData && (
                                    <img 
                                        src={imageData} 
                                        alt="Kidney scan preview" 
                                        className="h-full w-full object-contain"
                                    />
                                )}
                                <button 
                                    onClick={handleReset}
                                    className="absolute top-2 right-2 rounded-full bg-background/80 p-1 text-muted-foreground hover:bg-background hover:text-foreground"
                                    aria-label="Remove image"
                                >
                                    <XIcon className="h-5 w-5" />
                                </button>
                            </div>
                            
                            {error && (
                                <div className="w-full max-w-sm rounded-lg border border-red-200 bg-red-50 p-4 text-left text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-400">
                                    <h3 className="mb-1 font-semibold">Analysis Error</h3>
                                    <p className="text-sm">{error}</p>
                                </div>
                            )}
                            
                            {!result && !error ? (
                                <Button 
                                    onClick={handleAnalyze} 
                                    disabled={isAnalyzing} 
                                    className="w-full max-w-sm"
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                            Analyzing scan...
                                        </>
                                    ) : (
                                        'Analyze for tumor detection'
                                    )}
                                </Button>
                            ) : null}
                            
                            {result && (
                                <div className="w-full max-w-sm space-y-4">
                                    <div className={cn(
                                        "rounded-lg border p-4",
                                        result === 'positive' 
                                            ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-400" 
                                            : "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/50 dark:text-green-400"
                                    )}>
                                        <h3 className="mb-2 font-semibold">
                                            {diagnosisText && (
                                                <span className="font-bold">{diagnosisText}</span>
                                            )}
                                            {!diagnosisText && (
                                                result === 'positive' 
                                                    ? 'Potential tumor detected' 
                                                    : 'No tumor detected'
                                            )}
                                        </h3>
                                        <p className="text-sm">
                                            {result === 'positive' 
                                                ? `Our AI has detected potential abnormalities. e professional for a thorough evaluation.` 
                                                : `Our AI analysis shows no signs of kidney tumor. Regular screening is still recommended.`}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button 
                                            variant="outline" 
                                            onClick={handleReset}
                                            className="flex-1"
                                        >
                                            New Scan
                                        </Button>
                                        <Button className="flex-1">
                                            Schedule consultation
                                        </Button>
                                    </div>
                                </div>
                            )}
                            
                            <p className="text-xs text-muted-foreground">
                                <strong>Note:</strong> This is a preliminary assessment and should not replace professional medical diagnosis.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default ImageCapture 