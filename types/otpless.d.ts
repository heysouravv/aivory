interface Window {
  OTPless: any
  OTPlessSignin: any
  otpless: (response: {
    status: string
    token: string
    userId: string
    timestamp: string
    identities: Array<{
      identityType: string
      identityValue: string
      channel: string
      methods: string[]
      name?: string
      verified: boolean
      verifiedAt: string
      isCompanyEmail?: string
    }>
    idToken: string
    network: {
      ip: string
      timezone: string
      ipLocation: Record<string, any>
    }
    deviceInfo: Record<string, any>
    sessionInfo: Record<string, any>
    firebaseInfo: Record<string, any>
    error?: {
      message: string
    }
  }) => void
}

interface OTPlessCallback {
  responseType: "ONETAP" | "OTP_AUTO_READ" | "FAILED" | "FALLBACK_TRIGGERED"
  response: {
    token?: string
    userId?: string
    timestamp?: string
    identities?: Array<{
      identityType: string
      identityValue: string
      channel: string
      methods: string[]
      name?: string
      verified: boolean
      verifiedAt: string
    }>
    idToken?: string
    network?: {
      ip: string
      timezone: string
      ipLocation: any
    }
    deviceInfo?: any
    sessionInfo?: any
    firebaseInfo?: any
    message?: string
    otp?: string
  }
} 