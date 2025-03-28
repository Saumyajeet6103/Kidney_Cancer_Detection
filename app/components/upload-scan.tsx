import { useState } from 'react'
import { CloudUploadIcon, ImageIcon, RefreshCw, XIcon } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '~/lib/utils'

const UploadScan = () => {
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [result, setResult] = useState<'positive' | 'negative' | null>(null)
    const [confidence, setConfidence] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null
        setFile(selectedFile)
        setResult(null)
        setConfidence(null)
        setError(null)
        
        if (selectedFile) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(selectedFile)
        } else {
            setPreview(null)
        }
    }

    const handleReset = () => {
        setFile(null)
        setPreview(null)
        setResult(null)
        setConfidence(null)
        setError(null)
    }

    const handleAnalyze = async () => {
        if (!file || !preview) return
        
        setIsAnalyzing(true)
        setError(null)
        
        try {
            // Extract base64 data from the preview URL (remove the data:image/xxx;base64, prefix)
            const base64Image = preview.split(',')[1]
            
            // Make API request to backend
            const response = await fetch(' https://832e-2405-201-2011-28da-9080-a5fc-672c-98f4.ngrok-free.app/predict', {
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
            
            const data = await response.json()
            
            if (data.error) {
                throw new Error(data.error)
            }
            
            // Assuming the API returns { result: "positive" or "negative", confidence: number }
            setResult(data.result)
            setConfidence(data.confidence)
        } catch (err) {
            console.error('Error during analysis:', err)
            setError(err instanceof Error ? err.message : 'An unexpected error occurred')
        } finally {
            setIsAnalyzing(false)
        }
    }

    return (
        <section className="mx-auto mt-48 max-w-7xl px-5">
            <div className="mx-auto flex max-w-2xl flex-col gap-6 text-center">
                <div>
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary dark:bg-primary/25">
                        <span className="brightness-[1.7]">Instant AI Analysis</span>
                    </span>
                    <h1 className="mt-4 scroll-m-20 font-inter text-4xl font-extrabold tracking-tight lg:text-5xl">
                        <span className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Upload Your{' '}
                        </span>
                        <span className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Kidney Scan
                        </span>
                    </h1>
                </div>
                <p className="text-lg text-muted-foreground">
                    Get an instant preliminary assessment of your kidney scan. 
                    Upload your image for AI-powered tumor detection.
                </p>
                
                <div className="mx-auto mt-8 w-full max-w-xl">
                    {!preview ? (
                        <div className="flex flex-col items-center justify-center">
                            <label 
                                htmlFor="scan-upload" 
                                className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary/30 bg-background/50 hover:bg-background/80"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <CloudUploadIcon className="mb-3 h-12 w-12 text-primary/70" />
                                    <p className="mb-2 text-sm text-muted-foreground">
                                        <span className="font-semibold text-foreground">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        MRI, CT, Ultrasound images (JPG, PNG, DICOM)
                                    </p>
                                </div>
                                <input 
                                    id="scan-upload" 
                                    type="file" 
                                    className="hidden" 
                                    accept="image/png, image/jpeg, application/dicom"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center space-y-6">
                            <div className="relative aspect-square max-h-80 w-full max-w-sm overflow-hidden rounded-lg border border-primary/20 bg-black/5">
                                <img 
                                    src={preview} 
                                    alt="Kidney scan preview" 
                                    className="h-full w-full object-contain"
                                />
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
                                            {result === 'positive' 
                                                ? 'Potential tumor detected' 
                                                : 'No tumor detected'}
                                        </h3>
                                        <p className="text-sm">
                                            {result === 'positive' 
                                                ? `Our AI has detected potential abnormalities with ${confidence}% confidence. Please consult with a healthcare professional for a thorough evaluation.` 
                                                : `Our AI analysis shows no signs of kidney tumor with ${confidence}% confidence. Regular screening is still recommended.`}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button 
                                            variant="outline" 
                                            onClick={handleReset}
                                            className="flex-1"
                                        >
                                            Upload a new scan
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

export default UploadScan 