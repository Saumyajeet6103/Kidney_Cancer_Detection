import { useState } from 'react'
import { CloudUploadIcon, RefreshCw, XIcon } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '~/lib/utils'

const ARView = () => {
    const [file, setFile] = useState<File | null>(null)
    const [fileName, setFileName] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null
        setFile(selectedFile)
        setFileName(selectedFile?.name || null)
        setError(null)
    }

    const handleReset = () => {
        setFile(null)
        setFileName(null)
        setError(null)
    }

    return (
        <div className="space-y-8">
            <div>
                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary dark:bg-primary/25">
                    <span className="brightness-[1.7]">3D Model Viewer</span>
                </span>
                <h1 className="mt-4 scroll-m-20 font-inter text-4xl font-extrabold tracking-tight lg:text-5xl">
                    <span className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
                        AR View
                    </span>
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Upload your STL files to view and interact with 3D kidney models in augmented reality.
                </p>
            </div>

            <div className="rounded-lg border border-primary/20 bg-background/50 p-6">
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="flex w-full max-w-md flex-col items-center justify-center gap-4">
                        <div className="flex w-full flex-col items-center justify-center gap-2">
                            <label
                                htmlFor="file-upload"
                                className={cn(
                                    "flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary/20 p-6 transition-colors hover:border-primary/40",
                                    file && "border-primary/40"
                                )}
                            >
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <CloudUploadIcon className="h-8 w-8 text-primary" />
                                    <div className="text-center">
                                        <p className="text-sm font-medium">
                                            {file ? fileName : "Click to upload STL file"}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {file ? "Click to change file" : "or drag and drop"}
                                        </p>
                                    </div>
                                </div>
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept=".stl"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>

                        {file && (
                            <div className="flex w-full gap-2">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={handleReset}
                                >
                                    <XIcon className="mr-2 h-4 w-4" />
                                    Reset
                                </Button>
                                <Button className="flex-1">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    View in AR
                                </Button>
                            </div>
                        )}
                    </div>

                    {error && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}

                    {/* Preview Section */}
                    <div className="mt-8 w-full rounded-lg border border-primary/20 bg-background/50 p-6">
                        <h2 className="text-xl font-semibold">Model Preview</h2>
                        <div className="mt-4 aspect-video w-full rounded-lg bg-muted/50">
                            {file ? (
                                <div className="flex h-full items-center justify-center">
                                    <p className="text-muted-foreground">
                                        Model preview will be displayed here
                                    </p>
                                </div>
                            ) : (
                                <div className="flex h-full items-center justify-center">
                                    <p className="text-muted-foreground">
                                        Upload an STL file to see the preview
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ARView 