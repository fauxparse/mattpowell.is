import { useState } from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

type ContactFormProps = {
  className?: string
  subject?: string
}

const ContactForm = ({
  className,
  subject = 'Enquiry from mattpowell.is',
}: ContactFormProps) => {
  const [_result, setResult] = useState<Record<string, unknown> | null>(null)
  const [sending, setSending] = useState(false)

  const onSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    formData.append('access_key', '7f045619-85be-4658-9270-cbf6794616fe')

    setSending(true)
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()
    setSending(false)
    setResult(data)
  }

  // TODO: Add success/error messages

  return (
    <form onSubmit={onSubmit} className={cn('panel mb-20', className)}>
      <fieldset disabled={sending} className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold m-0 px-4 pt-2 text-accent-500 uppercase not-prose">
          Get in touch
        </h3>
        <div className="panel before:bg-background p-0 grid">
          <input
            id="name"
            aria-label="Your name"
            type="text"
            name="name"
            autoComplete="name"
            required
            className="bg-transparent py-2 px-4 border-0 shadow-none outline-none"
            placeholder="Your name"
          />
        </div>
        <input type="hidden" name="subject" value={subject} />
        <div className="panel before:bg-background p-0 grid">
          <input
            type="email"
            name="email"
            aria-label="Your email address"
            placeholder="Your email address"
            autoComplete="email"
            className="bg-transparent py-2 px-4 border-0 shadow-none outline-none"
            required
          />
        </div>
        <div className="panel before:bg-background p-0 grid">
          <textarea
            name="message"
            placeholder="Your message"
            aria-label="Your message"
            required
            rows={6}
            className="bg-transparent py-2 px-4 border-0 shadow-none outline-none"
          ></textarea>
        </div>
        <div className="flex md:justify-end">
          <Button type="submit" size="xl">
            {sending ? 'Sending...' : 'Send'}
          </Button>
        </div>
      </fieldset>
    </form>
  )
}
export default ContactForm
