'use client'

export const canUseDOM = 'document' in globalThis && 'createElement' in globalThis.document
