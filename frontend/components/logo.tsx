import type { FC } from "react"
import { Shield, CheckCircle } from "lucide-react"

interface LogoProps {
  className?: string
}

export const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <Shield className="h-10 w-10 text-emerald-600 dark:text-emerald-500" />
        <CheckCircle className="h-5 w-5 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">CertSecure</span>
    </div>
  )
}
