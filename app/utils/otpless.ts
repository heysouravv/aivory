let OTPlessSignin: any = null;

interface OTPlessSDK {
  [key: string]: (request: any) => Promise<any>;
}

export async function OTPlessSdk(): Promise<OTPlessSDK> {
  return new Promise((resolve) => {
    if (document.getElementById("otpless-sdk") && OTPlessSignin) {
      return resolve(OTPlessSignin);
    }

    const script = document.createElement("script");
    script.src = "https://otpless.com/v4/headless.js";
    script.id = "otpless-sdk";
    script.setAttribute("data-appid", process.env.NEXT_PUBLIC_OTPLESS_APP_ID || '');

    script.onload = function () {
      const OTPless = Reflect.get(window, "OTPless");
      OTPlessSignin = new OTPless(callback);
      resolve(OTPlessSignin);
    };
    document.head.appendChild(script);
  });
}

const callback = (eventCallback: any) => {
  console.log("OTPless event:", eventCallback);

  const ONETAP = () => {
    const { response } = eventCallback;
    console.log("ONETAP success:", response);
    localStorage.setItem("otplessUser", JSON.stringify(response));
    window.location.href = "/brand";
  };

  const OTP_AUTO_READ = () => {
    const { response: { otp } } = eventCallback;
    console.log("OTP auto-read:", otp);
    // Auto-fill OTP if you have an input field
    const otpInput = document.getElementById("otp-input") as HTMLInputElement;
    if (otpInput) otpInput.value = otp;
  };

  const FAILED = () => {
    const { response } = eventCallback;
    console.error("Authentication failed:", response);
  };

  const FALLBACK_TRIGGERED = () => {
    const { response } = eventCallback;
    console.log("Fallback triggered:", response);
  };

  const EVENTS_MAP = {
    ONETAP,
    OTP_AUTO_READ,
    FAILED,
    FALLBACK_TRIGGERED,
  };

  if ("responseType" in eventCallback) {
    EVENTS_MAP[eventCallback.responseType as keyof typeof EVENTS_MAP]?.();
  }
};

export async function hitOTPlessSdk(params: { requestType: string; request: any }) {
  const sdk = await OTPlessSdk();
  return await sdk[params.requestType](params.request);
}

export async function initiate(phoneNumber: string) {
  return hitOTPlessSdk({
    requestType: "initiate",
    request: {
      channel: "PHONE",
      phone: phoneNumber,
      countryCode: "+91",
      expiry: "60",
    },
  });
}

export async function oauth(channelType: string) {
  return hitOTPlessSdk({
    requestType: "initiate",
    request: {
      channel: "OAUTH",
      channelType,
    },
  });
}

export async function verify(phone: string, otp: string) {
  return hitOTPlessSdk({
    requestType: "verify",
    request: {
      channel: "PHONE",
      phone,
      otp,
      countryCode: "+91",
    },
  });
}

export function isUserVerified(): boolean {
  if (typeof window === 'undefined') return false;
  const otplessUser = localStorage.getItem("otplessUser");
  return otplessUser !== null;
} 