"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import { Camera, Upload, MapPin, Check, X, RefreshCw, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { verifyLocation, type GeolocationResult } from "@/utils/geolocation"
import { cn } from "@/lib/utils"

type SelfieAttendanceProps = {
  teacherId: string
  onSuccess?: (data: { imageUrl: string; timestamp: string; location?: GeolocationResult }) => void
}

export function SelfieAttendance({ teacherId, onSuccess }: SelfieAttendanceProps) {
  const [open, setOpen] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [locationStatus, setLocationStatus] = useState<GeolocationResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Start camera when modal opens and camera mode is active
  useEffect(() => {
    if (open && cameraActive) {
      startCamera()
    }

    return () => {
      stopCamera()
    }
  }, [open, cameraActive])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      setError("Could not access camera. Please ensure you've granted camera permissions.")
      setCameraActive(false)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      const tracks = stream.getTracks()

      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
  }

  const captureSelfie = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Draw video frame to canvas
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Convert canvas to data URL
        const imageDataUrl = canvas.toDataURL("image/jpeg", 0.8)
        setCapturedImage(imageDataUrl)
        stopCamera()
        setCameraActive(false)

        // Check location after capturing
        checkLocation()
      }
    }
  }, [])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setUploadedImage(result)
      setCapturedImage(null)

      // Check location after uploading
      checkLocation()
    }
    reader.readAsDataURL(file)
  }

  const checkLocation = async () => {
    try {
      const result = await verifyLocation()
      setLocationStatus(result)
    } catch (err) {
      setLocationStatus({
        success: false,
        message: "Failed to verify location",
      })
    }
  }

  const resetForm = () => {
    setCapturedImage(null)
    setUploadedImage(null)
    setLocationStatus(null)
    setError(null)
    setSuccess(false)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      setError(null)

      // Validate we have an image
      if (!capturedImage && !uploadedImage) {
        setError("Please capture or upload a selfie")
        setIsSubmitting(false)
        return
      }

      // Validate location if required
      if (locationStatus && !locationStatus.success) {
        setError("Location verification failed. Please try again.")
        setIsSubmitting(false)
        return
      }

      // In a real app, you would upload the image to a server here
      // For this example, we'll simulate a successful upload
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const timestamp = new Date().toISOString()
      const imageUrl = capturedImage || uploadedImage || ""

      // Call the success callback with the data
      if (onSuccess) {
        onSuccess({
          imageUrl,
          timestamp,
          location: locationStatus || undefined,
        })
      }

      setSuccess(true)
      setIsSubmitting(false)

      // Close the dialog after a short delay
      setTimeout(() => {
        setOpen(false)
        resetForm()
      }, 2000)
    } catch (err) {
      setError("Failed to submit attendance. Please try again.")
      setIsSubmitting(false)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      stopCamera()
    }
    setOpen(newOpen)
    if (newOpen) {
      resetForm()
    }
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
      >
        <Camera className="h-4 w-4" />
        Record Attendance
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Teacher Self-Attendance</DialogTitle>
            <DialogDescription>Take a selfie or upload a photo to record your attendance for today.</DialogDescription>
          </DialogHeader>

          {!capturedImage && !uploadedImage ? (
            <div className="grid gap-4">
              {cameraActive ? (
                <div className="relative overflow-hidden rounded-lg border bg-muted">
                  <video ref={videoRef} autoPlay playsInline muted className="h-[300px] w-full object-cover" />
                  <canvas ref={canvasRef} className="hidden" />

                  <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <Button
                      onClick={captureSelfie}
                      size="sm"
                      className="rounded-full h-12 w-12 p-0 bg-white text-black hover:bg-gray-200"
                    >
                      <Camera className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-32 flex flex-col gap-2" onClick={() => setCameraActive(true)}>
                    <Camera className="h-8 w-8 mb-1" />
                    <span>Take Selfie</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-32 flex flex-col gap-2"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-8 w-8 mb-1" />
                    <span>Upload Photo</span>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg border">
                <img
                  src={capturedImage || uploadedImage || ""}
                  alt="Selfie"
                  className="h-[300px] w-full object-cover"
                />
              </div>

              <div className="flex justify-between">
                <Button variant="outline" size="sm" onClick={resetForm}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retake
                </Button>

                <Button
                  size="sm"
                  onClick={checkLocation}
                  disabled={!locationStatus?.success}
                  variant={locationStatus?.success ? "outline" : "default"}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  {locationStatus ? "Recheck Location" : "Verify Location"}
                </Button>
              </div>

              {locationStatus && (
                <Alert variant={locationStatus.success && locationStatus.withinBoundary ? "default" : "destructive"}>
                  <MapPin
                    className={cn(
                      "h-4 w-4 mr-2",
                      locationStatus.success && locationStatus.withinBoundary ? "text-green-500" : "text-red-500",
                    )}
                  />
                  <AlertTitle>
                    {locationStatus.success
                      ? locationStatus.withinBoundary
                        ? "Location Verified"
                        : "Outside School Premises"
                      : "Location Error"}
                  </AlertTitle>
                  <AlertDescription>{locationStatus.message}</AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <X className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <Check className="h-4 w-4 text-green-500" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Your attendance has been recorded successfully!</AlertDescription>
            </Alert>
          )}

          <DialogFooter>
            <Button
              onClick={handleSubmit}
              disabled={(!capturedImage && !uploadedImage) || isSubmitting || !locationStatus?.success}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Attendance"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

