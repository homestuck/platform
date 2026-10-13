import { ArrowUpIcon, ArrowUpRightIcon, MailIcon } from 'lucide-react'

import { Button } from '@homestuck/ui/components/button'
import { Spinner as UISpinner } from '@homestuck/ui/components/spinner'

import preview from '#sb/preview'

const meta = preview.meta({
  argTypes: {
    animate: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    extrude: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      if: { arg: 'variant', neq: 'link' },
      options: ['xs', 'sm', 'default', 'lg', 'icon-sm', 'icon', 'icon-lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
  },
  args: {},
  component: Button,
  parameters: {
    docs: {
      subtitle: 'Displays a button or a component that looks like a button.',
    },
    docsCustom: {
      usage: {
        component: `
          <Button
            animate={true | false}
            extrude={true | false}
            size="default | xs | sm | lg | icon-sm | icon | icon-lg"
            variant="default | outline | secondary | ghost | destructive | link"
          >Button</Button>
        `,
        import: `
          import { Button } from '@homestuck/ui/components/button'
           `,
      },
    },
  },
  render: (args) => <Button {...args} />,
  title: 'Button',
})

export const Default = meta.story({
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button {...args} variant="outline">
        Button
      </Button>
      <Button {...args} aria-label="Submit" size="icon" variant="outline">
        <ArrowUpIcon />
      </Button>
    </div>
  ),
})

/**
 * Use the `size` prop to change the size of the button.
 *
 * - Use the `xs` or `sm` sizes for a smaller button, or the `icon-sm` size for a smaller icon-only
 *   button, suitable for interfaces needing compact elements without sacrificing usability.
 * - Use the `lg` size for a larger button, or the `icon-lg` size for a larger icon-only button,
 *   offering better visibility and easier interaction for users.
 * - Use the `icon` size for a button with only an icon.
 */
export const Size = meta.story({
  args: {
    'aria-label': 'Submit',
    variant: 'secondary',
  },
  render: (args) => (
    <div className="flex flex-col items-start gap-8 sm:flex-row">
      <div className="flex items-start gap-2">
        <Button {...args} size="xs">
          Extra Small
        </Button>
        <Button {...args} size="icon-xs">
          <ArrowUpRightIcon />
        </Button>
      </div>
      <div className="flex items-start gap-2">
        <Button {...args} size="sm">
          Small
        </Button>
        <Button {...args} size="icon-sm">
          <ArrowUpRightIcon />
        </Button>
      </div>
      <div className="flex items-start gap-2">
        <Button {...args}>Default</Button>
        <Button {...args} size="icon">
          <ArrowUpRightIcon />
        </Button>
      </div>
      <div className="flex items-start gap-2">
        <Button {...args} size="lg">
          Large
        </Button>
        <Button {...args} size="icon-lg">
          <ArrowUpRightIcon />
        </Button>
      </div>
    </div>
  ),
})

/**
 * Add the `animate` and/or `extrude` prop to enable visual effects.
 *
 * - The `animate` prop enables a subtle motion effect on hover and on interaction.
 * - The `extrude` prop enables a three-dimensional popup effect.
 */
export const Effects = meta.story({
  argTypes: {
    animate: {
      control: false,
    },
    children: {
      control: false,
    },
    extrude: {
      control: false,
    },
  },
  args: {
    variant: 'secondary',
  },
  render: (args) => (
    <div className="flex flex-col items-start gap-4 sm:flex-row">
      <Button {...args} animate>
        Animate
      </Button>
      <Button {...args} extrude>
        Extrude
      </Button>
      <Button {...args} animate extrude>
        Animate + Extrude
      </Button>
    </div>
  ),
})

/**
 * Use the `outline` button to reduce emphasis on secondary actions, such as canceling or dismissing
 * a dialog.
 */
export const Outline = meta.story({
  args: {
    children: 'Outline',
    variant: 'outline',
  },
})

/**
 * Use the `secondary` button to call for less emphasized actions, styled to complement the primary
 * button while being less conspicuous.
 */
export const Secondary = meta.story({
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
})

/**
 * Use the `ghost` button for less intrusive actions, styled to be minimalistic and subtle.
 */
export const Ghost = meta.story({
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
})

/**
 * Use the `destructive` button to indicate errors, alerts, or the need for immediate attention.
 */
export const Destructive = meta.story({
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
})

/**
 * Use the `link` button to reduce emphasis on tertiary actions, such as hyperlink or navigation,
 * providing a text-only interactive element.
 */
export const Link = meta.story({
  args: {
    children: 'Link',
    variant: 'link',
  },
})

/* export const Icon = meta.story({
  args: {
    children: <MailIcon />,
    size: 'icon',
    variant: 'outline',
  },
}) */

/**
 * Add an icon element to a button to enhance visual communication and providing additional context
 * for the action. Remember to add the `data-icon="inline-start"` or `data-icon="inline-end"`
 * attribute to the icon for the correct spacing.
 */
export const WithIcon = meta.story({
  args: {
    ...Secondary.input.args,
  },
  render: (args) => (
    <Button {...args}>
      <MailIcon className="size-4" data-icon="inline-start" /> Login with Email Button
    </Button>
  ),
})

/**
 * Use the `rounded-full` class to make the button rounded.
 */
export const Rounded = meta.story({
  args: {
    className: 'rounded-full',
  },
  render: (args) => (
    <div className="flex gap-2">
      <Button {...args}>Get Started</Button>
      <Button className={args.className} size="icon" variant="outline">
        <ArrowUpIcon />
      </Button>
    </div>
  ),
})

/**
 * Render a `<Spinner />` component inside the button to show a loading state. Remember to add the
 * `data-icon="inline-start"` or `data-icon="inline-end"` attribute to the spinner for the correct
 * spacing.
 */
export const Spinner = meta.story({
  args: {
    disabled: true,
  },
  render: (args) => (
    <div className="flex gap-2">
      <Button variant="outline" {...args}>
        <UISpinner data-icon="inline-start" />
        Generating
      </Button>
      <Button variant="secondary" {...args}>
        Downloading
        <UISpinner data-icon="inline-start" />
      </Button>
    </div>
  ),
})
