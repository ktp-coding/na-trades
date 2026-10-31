// Wide letter-spacing breaks Thai text apart (vowel and tone marks float loose),
// so labels that contain Thai get normal spacing.
export const hasThai = (s: string) => /[฀-๿]/.test(s)
export const trackingFix = (s: string) => (hasThai(s) ? '!tracking-normal' : '')
