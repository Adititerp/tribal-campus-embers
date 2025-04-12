
import { useState, useRef } from "react";
import { Utensils, Dumbbell, Camera, Check, Flame, Upload, X } from "lucide-react";
import { Zone } from "@/types/game";
import useGameStore from "@/store/gameStore";
import FireAnimation from "./FireAnimation";
import { toast } from "sonner";
import PixelButton from "./PixelButton";

interface ZoneCardProps {
  zone: Zone;
  type: "feeding" | "training";
  realLocation: string;
}

const ZoneCard = ({ zone, type, realLocation }: ZoneCardProps) => {
  const { logVisit, hasVisitedToday, logVisitWithImage } = useGameStore();
  const [visited, setVisited] = useState(hasVisitedToday(zone));
  const [hovering, setHovering] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleVisit = () => {
    const result = logVisit(zone);
    if (result.success) {
      setVisited(true);
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };
  
  const handleLogVisit = () => {
    setShowImageModal(true);
  };

  const handleCaptureImage = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      
      video.onloadedmetadata = () => {
        video.play();
        
        // Create a canvas element to capture the image
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw the video frame to the canvas
        canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert the canvas to a data URL
        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.7);
        
        // Stop all video tracks
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        
        setCapturedImage(imageDataUrl);
      };
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Unable to access camera. Please check permissions.');
    }
  };

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image too large. Maximum size is 5MB.');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        // Resize and compress image
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Max dimensions
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 600;
          
          // Resize if needed
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          canvas.getContext('2d')?.drawImage(img, 0, 0, width, height);
          
          // Convert to JPEG with compression
          const compressedImage = canvas.toDataURL('image/jpeg', 0.7);
          setCapturedImage(compressedImage);
        };
        img.src = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmitImage = () => {
    if (capturedImage) {
      logVisitWithImage(zone, capturedImage);
      toast.success(`Visit to ${zone} documented with image!`);
      setShowImageModal(false);
      setCapturedImage(null);
    }
  };

  const cancelImageUpload = () => {
    setShowImageModal(false);
    setCapturedImage(null);
  };
  
  const getZoneColor = () => {
    if (type === "feeding") {
      return "from-green-50 to-emerald-100";
    }
    return "from-blue-50 to-sky-100";
  };

  const getIconColor = () => {
    if (type === "feeding") {
      return "bg-gradient-to-br from-green-400 to-emerald-600 text-white";
    }
    return "bg-gradient-to-br from-blue-400 to-sky-600 text-white";
  };
  
  return (
    <>
      <div 
        className={`group bg-gradient-to-br ${getZoneColor()} p-6 rounded-lg border-2 border-stone-dark transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${visited ? 'border-ember' : ''}`}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className={`w-16 h-16 rounded-full ${getIconColor()} flex items-center justify-center shadow-md transition-transform ${hovering ? 'scale-110' : ''}`}>
            {type === "feeding" ? 
              <Utensils size={28} className="text-white" /> : 
              <Dumbbell size={28} className="text-white" />
            }
          </div>
          
          <div className="text-center">
            <h3 className="font-pixel text-lg bg-gradient-to-r from-amber-700 via-ember to-red-700 bg-clip-text text-transparent">
              {zone}
            </h3>
            <p className="text-sm text-muted-foreground text-center mt-1 mb-2">
              {realLocation}
            </p>
          </div>
          
          {visited ? (
            <div className="flex flex-col items-center gap-2 bg-amber-100/50 px-4 py-2 rounded-full">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-green-500" />
                <span className="text-sm text-amber-800 font-pixel">Visited Today!</span>
              </div>
              <FireAnimation size="sm" />
            </div>
          ) : (
            <div className="space-y-2 w-full">
              <PixelButton 
                onClick={handleVisit}
                className="w-full group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Flame className="w-4 h-4" />
                  Visit Cave
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-ember opacity-0 group-hover:opacity-20 transition-opacity"></span>
              </PixelButton>
              
              <button 
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/70 hover:bg-white/90 border border-gray-200 rounded text-sm text-gray-700 transition-colors"
                onClick={handleLogVisit}
              >
                <Camera size={14} />
                Log Visit
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Image Upload Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-pixel text-lg text-amber-800">Document Your Visit</h3>
              <button 
                onClick={cancelImageUpload} 
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {capturedImage ? (
              <div className="space-y-4">
                <div className="border-2 border-amber-200 rounded-lg overflow-hidden">
                  <img 
                    src={capturedImage} 
                    alt="Captured" 
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={cancelImageUpload}
                    className="flex-1 bg-gray-100 py-2 rounded-md text-gray-700 font-medium hover:bg-gray-200 transition-colors"
                  >
                    Retake
                  </button>
                  <button 
                    onClick={handleSubmitImage}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-ember py-2 rounded-md text-white font-medium hover:from-amber-600 hover:to-red-600 transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleCaptureImage}
                  className="flex flex-col items-center justify-center gap-2 p-6 bg-amber-50 rounded-lg border-2 border-amber-100 hover:bg-amber-100 transition-colors"
                >
                  <Camera size={32} className="text-amber-700" />
                  <span className="font-medium text-amber-800">Take Photo</span>
                </button>
                
                <button
                  onClick={triggerFileInput}
                  className="flex flex-col items-center justify-center gap-2 p-6 bg-amber-50 rounded-lg border-2 border-amber-100 hover:bg-amber-100 transition-colors"
                >
                  <Upload size={32} className="text-amber-700" />
                  <span className="font-medium text-amber-800">Upload</span>
                </button>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleUploadImage}
                  accept="image/png, image/jpeg"
                  className="hidden"
                />
              </div>
            )}
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              Images are stored locally for your personal records.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ZoneCard;
