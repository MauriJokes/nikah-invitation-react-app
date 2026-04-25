import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'Is there a dress code?',
    a: 'Yes! The Nikkah requires modest attire (abayas/kurtas). For the Walima, smart-formal or traditional wear in jewel tones is encouraged. Check the Dress Code card for details.',
  },
  {
    q: 'Are children welcome?',
    a: 'Children are warmly welcome at both events. We love families! A quiet room will be available for little ones.',
  },
  {
    q: 'Is there parking available?',
    a: 'Masjid Al-Noor has free street parking nearby. The Grand Magnolia offers complimentary valet parking for the Walima.',
  },
  {
    q: 'Will food be served?',
    a: 'Light refreshments after the Nikkah. A full sit-down dinner will be served at the Walima reception. All food is halal.',
  },
  {
    q: 'Can I take photos during the ceremony?',
    a: 'We request no cameras/phones during the Nikkah. Photography is welcome during the Walima — our hashtag is #AaravAndPriya2025.',
  },
  {
    q: 'What is the RSVP deadline?',
    a: 'Please RSVP by 1st June 2025 so we can plan seating and catering accordingly. Use the RSVP card to let us know!',
  },
]

export default function FAQCard() {
  return (
    <div className="py-6 px-2">
      <div className="text-center mb-8">
        <p
          className="text-xs tracking-widest uppercase mb-2"
          style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', letterSpacing: '0.2em' }}
        >
          Good to know
        </p>
        <h2
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: 500,
            color: '#2B2B2B',
          }}
        >
          FAQ
        </h2>
        <div className="mx-auto mt-3 w-12 h-0.5 rounded-full" style={{ background: '#AFCBFF' }} />
      </div>

      <Accordion.Root
        type="single"
        collapsible
        className="max-w-lg mx-auto flex flex-col gap-2"
      >
        {faqs.map((faq, i) => (
          <Accordion.Item
            key={i}
            value={`item-${i}`}
            className="rounded-xl overflow-hidden"
            style={{
              background: 'rgba(255, 248, 240, 0.8)',
              border: '1px solid rgba(175, 203, 255, 0.25)',
            }}
          >
            <Accordion.Header>
              <Accordion.Trigger
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left group"
                style={{ cursor: 'pointer' }}
              >
                <span
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    color: '#2B2B2B',
                  }}
                >
                  {faq.q}
                </span>
                <ChevronDown
                  size={16}
                  className="shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
                  style={{ color: '#AFCBFF' }}
                />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content
              className="overflow-hidden"
              style={{
                // Radix CSS animation variables
              }}
            >
              <div className="px-5 pb-4">
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.875rem',
                    color: '#6B7280',
                    lineHeight: 1.7,
                  }}
                >
                  {faq.a}
                </p>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  )
}
