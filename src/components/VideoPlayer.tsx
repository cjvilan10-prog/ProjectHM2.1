import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Film,
  Sparkles,
  Upload,
  Layers,
  ChevronRight,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { RESORT_VIDEO_SCENES, RESORT_INFO } from '../data/resortData';
import entranceSignImg from '../assets/images/resort_entrance_sign_1790868462493.jpg';

export const VideoPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [userFileName, setUserFileName] = useState<string | null>('Bikini Valley Resort Tour (Kling AI)');
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [playbackMode, setPlaybackMode] = useState<'video' | 'scenes'>('video');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(5);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-cycle through scenes in 'scenes' mode when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && playbackMode === 'scenes') {
      interval = setInterval(() => {
        setActiveSceneIndex((prev) => (prev + 1) % RESORT_VIDEO_SCENES.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackMode]);

  // Handle local video file upload from device
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setVideoSrc(objectUrl);
      setUserFileName(file.name);
      setPlaybackMode('video');
      setIsPlaying(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
      }, 100);
    }
  };

  const togglePlay = () => {
    if (playbackMode === 'video' && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    const container = document.getElementById('resort-video-container');
    if (!container) return;
    if (container.requestFullscreen) {
      container.requestFullscreen();
    }
  };

  const handleSeekScene = (index: number) => {
    setActiveSceneIndex(index);
    if (videoRef.current && duration > 0) {
      const sceneTime = (index / RESORT_VIDEO_SCENES.length) * duration;
      videoRef.current.currentTime = sceneTime;
    }
  };

  return (
    <div className="bg-stone-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-stone-800 space-y-0">
      {/* Top Header Bar */}
      <div className="px-6 py-4 bg-stone-950/90 border-b border-stone-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-800/80 border border-teal-600/40 flex items-center justify-center text-teal-300">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                Bikini Valley Resort Promotional Tour
              </h3>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-teal-900 text-teal-200 border border-teal-700">
                Official Video
              </span>
            </div>
            <p className="text-xs text-stone-400">
              Samara, Aringay, La Union · Coastal Tour & Atmosphere
            </p>
          </div>
        </div>

        {/* Action Controls & Mode Toggle */}
        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex items-center bg-stone-900 p-1 rounded-xl border border-stone-800 text-xs">
            <button
              onClick={() => {
                setPlaybackMode('video');
                if (videoRef.current && isPlaying) videoRef.current.play().catch(() => {});
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                playbackMode === 'video'
                  ? 'bg-teal-700 text-white shadow'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Video Player
            </button>
            <button
              onClick={() => {
                setPlaybackMode('scenes');
                if (videoRef.current) videoRef.current.pause();
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                playbackMode === 'scenes'
                  ? 'bg-teal-700 text-white shadow'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-teal-300" />
              <span>Scene Breakdown</span>
            </button>
          </div>

          {/* Upload / Replace Video File Button */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="video/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 active:bg-stone-600 text-stone-200 text-xs font-medium rounded-xl border border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Load your original MP4 video file from your computer"
          >
            <Upload className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Select MP4</span>
          </button>
        </div>
      </div>

      {/* Main Video Screen Container */}
      <div
        id="resort-video-container"
        className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center group"
      >
        {playbackMode === 'video' ? (
          <>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster={entranceSignImg}
              playsInline
              loop
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onTimeUpdate={() => {
                if (videoRef.current) {
                  setCurrentTime(videoRef.current.currentTime);
                  setDuration(videoRef.current.duration || 5);
                  // Update active scene based on progress
                  const progress = videoRef.current.currentTime / (videoRef.current.duration || 5);
                  const sceneIdx = Math.min(
                    Math.floor(progress * RESORT_VIDEO_SCENES.length),
                    RESORT_VIDEO_SCENES.length - 1
                  );
                  setActiveSceneIndex(sceneIdx);
                }
              }}
              src={
                videoSrc ||
                'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
              }
            />

            {/* Play/Pause Overlay Overlay when paused */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 bg-stone-950/50 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-opacity"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-teal-600/90 hover:bg-teal-500 text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-105 pl-1 ring-4 ring-teal-400/30">
                  <Play className="w-8 h-8 fill-white" />
                </div>
                <h4 className="mt-4 text-base font-serif font-bold text-white tracking-wide">
                  Play Resort Walkthrough
                </h4>
                <p className="text-xs text-teal-200 mt-1">
                  Bikini Valley Resort · Samara, Aringay, La Union
                </p>
                {userFileName && (
                  <span className="mt-2 text-[11px] text-stone-400 bg-stone-900/80 px-2.5 py-0.5 rounded-full border border-stone-700">
                    Source: {userFileName}
                  </span>
                )}
              </div>
            )}

            {/* In-Video Watermark & Scene Title Pill */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none flex items-center gap-2">
              <span className="bg-stone-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-serif font-semibold text-white border border-white/20">
                {RESORT_VIDEO_SCENES[activeSceneIndex].title}
              </span>
              <span className="bg-teal-900/80 text-teal-200 text-[10px] font-mono px-2 py-0.5 rounded-full">
                {RESORT_VIDEO_SCENES[activeSceneIndex].timestamp}
              </span>
            </div>

            {/* Video Controls Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {/* Progress Bar */}
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer">
                <div
                  className="bg-teal-500 h-full transition-all duration-150"
                  style={{ width: `${(currentTime / (duration || 5)) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 fill-white" />
                    ) : (
                      <Play className="w-4 h-4 fill-white" />
                    )}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  <span className="text-xs text-stone-300 font-mono">
                    {RESORT_VIDEO_SCENES[activeSceneIndex].timestamp} / 00:05
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-teal-400 font-medium hidden sm:inline">
                    {RESORT_VIDEO_SCENES[activeSceneIndex].tag}
                  </span>
                  <button
                    onClick={handleFullscreen}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    aria-label="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Scene Breakdown Interactive Canvas */
          <div className="relative w-full h-full">
            <img
              src={RESORT_VIDEO_SCENES[activeSceneIndex].image}
              alt={RESORT_VIDEO_SCENES[activeSceneIndex].title}
              className="w-full h-full object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent flex flex-col justify-end p-6 sm:p-8">
              <div className="flex items-center gap-2 text-teal-400 text-xs font-mono mb-2">
                <span>SCENE {activeSceneIndex + 1} OF 5</span>
                <span>·</span>
                <span>{RESORT_VIDEO_SCENES[activeSceneIndex].timestamp}</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-1">
                {RESORT_VIDEO_SCENES[activeSceneIndex].title}
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm max-w-xl">
                {RESORT_VIDEO_SCENES[activeSceneIndex].description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Video Chapter Carousel - The 5 Exact Scenes from User's Video */}
      <div className="p-4 sm:p-6 bg-stone-950 border-t border-stone-800">
        <div className="flex items-center justify-between mb-3 text-xs text-stone-400">
          <span className="font-semibold text-stone-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-teal-400" />
            <span>Tour Chapters & Key Sequences</span>
          </span>
          <span className="text-[11px] text-stone-500">
            Click any scene to preview
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {RESORT_VIDEO_SCENES.map((scene, idx) => {
            const isActive = activeSceneIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSeekScene(idx)}
                className={`text-left rounded-xl overflow-hidden border p-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-teal-950/80 border-teal-500 ring-2 ring-teal-500/40'
                    : 'bg-stone-900 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-2 bg-stone-800">
                  <img
                    src={scene.image}
                    alt={scene.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 bg-black/80 text-[10px] font-mono px-1 rounded text-white">
                    {scene.timestamp}
                  </span>
                  {isActive && (
                    <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  )}
                </div>
                <div className="text-[11px] font-serif font-bold text-white truncate">
                  {scene.title}
                </div>
                <div className="text-[10px] text-stone-400 truncate mt-0.5">
                  {scene.tag}
                </div>
              </button>
            );
          })}
        </div>

        {/* Video Note & Information */}
        <div className="mt-4 pt-3 border-t border-stone-900 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-stone-500 gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-teal-500 shrink-0" />
            <span>
              Configured with Bikini Valley Resort tour showcasing the entrance sign, pool oasis, Samara beach walk, welcome drinks, and sunset.
            </span>
          </div>
          <span className="text-stone-400 shrink-0">
            Location: Samara, Aringay, La Union
          </span>
        </div>
      </div>
    </div>
  );
};
