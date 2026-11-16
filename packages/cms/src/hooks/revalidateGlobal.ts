import type { GlobalAfterChangeHook } from 'payload'

import { generateLogMessage } from '#utils/generateLogMessage'

export const revalidateGlobal: GlobalAfterChangeHook = ({
  doc,
  global: { slug },
  req: { context, payload },
}) => {
  if (!context.disableRevalidate) {
    const tags = [`global_${slug}`]

    payload.logger.info(
      generateLogMessage({ docType: 'global', operation: 'REVALIDATE', slug, tags }),
    )
  }
  // oxlint-disable-next-line typescript/no-unsafe-return
  return doc
}
