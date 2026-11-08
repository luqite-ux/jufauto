'use client'

import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'
import type { Product, ProductFamily } from '@/lib/site-data'
import { btnOutline, btnSignal, inputClass } from '@/lib/ui'
import { cn } from '@/lib/utils'
import { InquiryCaptchaField } from '@/components/inquiry-captcha-field'
import type { Locale } from '@/lib/i18n'

type Errors = Partial<Record<'name' | 'email' | 'subject' | 'message' | 'captcha', string>>

function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
  className,
}: {
  id: string
  label: string
  optional?: boolean
  error?: string
  hint?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-medium text-ink">
        <span>{label}</span>
        {optional && <span className="text-xs font-normal text-muted-foreground">Optional</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-xs font-medium text-destructive">
          <AlertCircle className="size-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

export function RfqForm({ defaultProduct, products, families, className, locale = 'en' }: { defaultProduct?: string; products: Product[]; families: ProductFamily[]; className?: string; locale?: Locale }) {
  const zh = locale === 'zh-CN'
  const uid = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [refreshKey, setRefreshKey] = useState(0)
  const [submitError, setSubmitError] = useState('')

  const ids = {
    name: `${uid}-name`,
    email: `${uid}-email`,
    phone: `${uid}-phone`,
    company: `${uid}-company`,
    subject: `${uid}-subject`,
    message: `${uid}-message`,
    captcha: `${uid}-captcha`,
  }

  const describe = (key: keyof Errors, id: string, hasHint = false) =>
    errors[key] ? `${id}-error` : hasHint ? `${id}-hint` : undefined

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const value = (key: string) => String(data.get(key) ?? '').trim()
    const next: Errors = {}

    if (!value('name')) next.name = zh ? '请输入姓名。' : 'Enter your name.'
    if (!value('email')) next.email = zh ? '请输入邮箱地址。' : 'Enter your email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value('email'))) next.email = zh ? '请输入有效的邮箱地址。' : 'Enter a valid email address.'
    if (!value('subject')) next.subject = zh ? '请选择产品或需求类型。' : 'Choose a product or subject.'
    if (value('message').length < 10) next.message = zh ? '请至少用10个字符描述您的需求。' : 'Describe your requirement in at least 10 characters.'
    if (value('captchaAnswer').length !== 4) next.captcha = zh ? '请输入图片中的4位字符。' : 'Enter the 4 characters shown in the image.'

    setErrors(next)
    const firstKey = (Object.keys(next) as (keyof Errors)[])[0]
    if (firstKey) {
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(ids[firstKey])}`)?.focus()
      return
    }

    setStatus('submitting')
    setSubmitError('')
    try {
      const response = await fetch('/api/inquiries', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(Object.fromEntries(data.entries())) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Unable to send your request.')
      form.reset()
      setStatus('success')
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to send your request.')
      setRefreshKey((value) => value + 1)
      setStatus('idle')
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className={cn('rounded-lg border border-success/30 bg-[#f1faf5] p-6 sm:p-8', className)}
      >
        <CheckCircle2 className="size-8 text-success" strokeWidth={1.5} aria-hidden="true" />
        <h3 className="mt-4 text-xl font-semibold text-ink">{zh ? '需求已提交' : 'Request received'}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/80">
          {zh ? '感谢您的提交。九峰工程团队已收到这条需求。' : 'Thank you. Your request has been recorded for the JUFTECH engineering team.'}
        </p>
        <button
          type="button"
          className={cn(btnOutline, 'mt-6')}
          onClick={() => {
            setStatus('idle')
            setErrors({})
            setRefreshKey((value) => value + 1)
          }}
        >
          {zh ? '继续提交' : 'Send another request'}
        </button>
      </div>
    )
  }

  const submitting = status === 'submitting'

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-busy={submitting}
      className={cn('rounded-lg border border-border bg-white p-5 shadow-[0_18px_40px_-28px_rgba(10,74,158,0.5)] sm:p-7', className)}
    >
      <fieldset disabled={submitting} className="space-y-5">
        <legend className="sr-only">{zh ? '提交询价需求' : 'Request for quotation'}</legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={ids.name} label={zh ? '姓名' : 'Full name'} error={errors.name}>
            <input
              id={ids.name}
              name="name"
              type="text"
              autoComplete="name"
              placeholder={zh ? '请输入姓名' : 'Your name'}
              aria-invalid={!!errors.name}
              aria-describedby={describe('name', ids.name)}
              className={inputClass}
            />
          </Field>
          <Field id={ids.email} label={zh ? '邮箱' : 'Email'} error={errors.email}>
            <input
              id={ids.email}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="name@company.com"
              aria-invalid={!!errors.email}
              aria-describedby={describe('email', ids.email)}
              className={inputClass}
            />
          </Field>
          <Field id={ids.phone} label={zh ? '电话' : 'Phone'} optional>
            <input
              id={ids.phone}
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+00 000 0000 0000"
              className={inputClass}
            />
          </Field>
          <Field id={ids.company} label={zh ? '公司' : 'Company'} optional>
            <input
              id={ids.company}
              name="company"
              type="text"
              autoComplete="organization"
              placeholder={zh ? '公司名称' : 'Company name'}
              className={inputClass}
            />
          </Field>
        </div>

        <Field id={ids.subject} label="Subject / product" error={errors.subject}>
          <select
            id={ids.subject}
            name="subject"
            defaultValue={defaultProduct ?? ''}
            aria-invalid={!!errors.subject}
            aria-describedby={describe('subject', ids.subject)}
            className={cn(inputClass, 'appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%230b1f3a%27 stroke-width=%271.75%27%3E%3Cpath d=%27m6 9 6 6 6-6%27/%3E%3C/svg%3E")] bg-[length:16px] bg-[right_0.75rem_center] bg-no-repeat pr-10')}
          >
            <option value="" disabled>
              Select a product or subject
            </option>
            <option value="general">General inquiry</option>
            {families.map((family) => {
              const items = products.filter((p) => p.familySlug === family.slug)
              return (
                <optgroup key={family.slug} label={family.name}>
                  {items.length === 0 && <option value={family.slug}>{family.name}</option>}
                  {items.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.name}
                    </option>
                  ))}
                </optgroup>
              )
            })}
          </select>
        </Field>

        <Field id={ids.message} label={zh ? '需求说明' : 'Message'} error={errors.message} hint={zh ? '可填写工件、工艺步骤、现有图纸或样品及应用场景。' : 'Part, process steps, drawings or samples available, and your application.'}>
          <textarea
            id={ids.message}
            name="message"
            rows={5}
            placeholder={zh ? '请描述您的需求' : 'Describe your requirement'}
            aria-invalid={!!errors.message}
            aria-describedby={describe('message', ids.message, true)}
            className={cn(inputClass, 'h-auto min-h-32 resize-y py-2.5 leading-relaxed')}
          />
        </Field>

        <div className="rounded-md border border-border bg-stage p-4">
          <InquiryCaptchaField refreshKey={refreshKey} className="[&_label]:text-ink" locale={locale} />
          {errors.captcha && <p className="mt-2 text-xs font-medium text-destructive">{errors.captcha}</p>}
        </div>

        {submitError && <p role="alert" className="rounded-md border border-destructive/30 bg-red-50 p-3 text-sm text-destructive">{submitError}</p>}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button type="submit" disabled={submitting} className={cn(btnSignal, 'w-full sm:w-auto sm:min-w-44')}>
            {submitting ? (
              <>
                <Spinner className="size-4" />
                Sending
              </>
            ) : (
              'Send RFQ'
            )}
          </button>
          <p className="text-xs leading-relaxed text-muted-foreground sm:max-w-xs">
            Your details are used only to respond to this request.
          </p>
        </div>
      </fieldset>
    </form>
  )
}
