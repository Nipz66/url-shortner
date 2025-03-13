import { ShieldCheckIcon, LinkIcon, QrCodeIcon, CursorArrowRaysIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Instant URL Shortening',
    description:
      'Quickly shorten long URLs into compact, shareable links.',
    icon: LinkIcon,
  },
  {
    name: 'One-Click Copy',
    description:
      'Easily copy your shortened link with a single click',
    icon: CursorArrowRaysIcon,
  },
  {
    name: 'Secure & Reliable',
    description:
      'Ensures safe redirections without spam or malicious links.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Generate a QR Code',
    description:
      'Instantly get a QR code for your shortened link.',
    icon: QrCodeIcon,
  },
]

export default function Example() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
            A fast, easy, and free link shortener
          </p>
          <p className="mt-6 text-lg/8 text-gray-600">
            Say goodbye to long, complex links and create short, user-friendly URLs in seconds. Whether you're sharing links on social media, emails, or messages, our free URL shortener ensures your links are clean, concise, and easy to remember.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
