'use client'

import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

export function SocialIcons() {
  const socials = [
    { name: 'Facebook', Icon: Facebook },
    { name: 'Twitter', Icon: Twitter },
    { name: 'LinkedIn', Icon: Linkedin },
    { name: 'Instagram', Icon: Instagram },
  ]

  return (
    <div className="mt-6 flex gap-4">
      {socials.map(({ name, Icon }) => (
        <a
          key={name}
          href="#"
          onClick={(e) => e.preventDefault()}
          className="text-navy-400 hover:text-primary-600 dark:text-navy-600 dark:hover:text-primary-500 cursor-pointer"
          aria-label={name}
          title="Coming soon"
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  )
}


