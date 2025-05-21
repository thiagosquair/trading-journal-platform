"use client"

export default function HeroVideo() {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-xl border border-slate-200 bg-white h-full flex items-center">
      <video autoPlay muted loop playsInline className="w-full h-auto">
        <source
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tradelinx%20logo-THDG1jpNQ7FC43ejEYR3bLQkf5ZGCb.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
