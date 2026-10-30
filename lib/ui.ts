const base =
  'inline-flex items-center justify-center gap-2 rounded-md px-5 h-11 text-sm font-semibold whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50'

export const btnSignal = `${base} bg-signal text-ink hover:bg-[#ff9a3d] hover:shadow-md`
export const btnBlue = `${base} bg-primary text-white hover:bg-[#083c82] hover:shadow-md`
export const btnOutline = `${base} border border-primary/35 bg-white text-primary hover:border-primary hover:bg-accent`

export const inputClass =
  'h-11 w-full rounded-md border border-input bg-white px-3 text-sm text-ink placeholder:text-[#6b7b94] transition-[border-color,box-shadow] duration-200 hover:border-primary/70 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/25 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/15 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60'
