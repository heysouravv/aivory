export function Blob({ className = "" }: { className?: string }) {
  return (
    <div className={`${className} opacity-50 blur-3xl`}>
      <svg viewBox="0 0 200 200" className="w-96 h-96 animate-blob" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="currentColor"
          d="M45.7,-58.9C59.9,-48.8,72.5,-34.9,77.5,-18.1C82.4,-1.3,79.7,18.4,70.8,34.3C61.9,50.2,46.8,62.4,29.5,69.1C12.1,75.9,-7.5,77.3,-25.5,71.6C-43.5,65.9,-59.9,53.1,-69.9,35.8C-79.9,18.4,-83.5,-3.5,-77.6,-21.7C-71.7,-39.9,-56.3,-54.3,-40.4,-63.8C-24.4,-73.3,-7.9,-77.9,5.9,-75.1C19.7,-72.3,31.5,-69,45.7,-58.9Z"
          transform="translate(100 100)"
        />
      </svg>
    </div>
  )
}

