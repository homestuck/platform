import type { CollectionBeforeOperationHook } from 'payload'

export const generatePrefix: CollectionBeforeOperationHook<'assets'> = ({
  args,
  // oxlint-disable-next-line typescript/no-deprecated -- Hook not using 'read' value for `operation`
  operation,
  req,
}) => {
  if (operation === 'create' && args.data) {
    if (args.data.prefix) return args

    const referer = req.headers.get('referer') ?? ''

    args.data.prefix = referer.includes('/globals') ? 'assets' : undefined
  }
  return args
}
