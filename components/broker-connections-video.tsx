"use client"

interface BrokerConnectionsVideoProps {
  className?: string
}

export default function BrokerConnectionsVideo({ className }: BrokerConnectionsVideoProps) {
  return (
    <div className={className}>
      <video autoPlay muted loop playsInline className="w-full h-auto rounded-lg">
        <source
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brokers%20integration-59gihu593E6u7W54j35Mi6JoDfCOvY.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
