import { Description, Primary, Stories, Subtitle, Title } from '@storybook/addon-docs/blocks'

export const Autodocs = () => (
  <>
    <Title />
    <Subtitle />
    <Description />
    <Primary />
    <Stories includePrimary={false} title={<></>} />
  </>
)
