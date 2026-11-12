'use client'

import type { TextFieldClientProps } from 'payload'

import { useCallback, useEffect, useId, useRef, useState } from 'react'

import { useField, useTranslation } from '@payloadcms/ui'
import { Palette } from 'lucide-react'

type PresetGroup = 'themeColors' | 'commonColors' | 'neutralTones'

const colorPresets: Record<PresetGroup, string[]> = {
  commonColors: ['#ef4444', '#10b981', '#f59e0b', '#06b6d4', '#ec4899', '#6b7280'],
  neutralTones: ['#000000', '#1f2937', '#6b7280', '#d1d5db', '#f3f4f6', '#ffffff'],
  themeColors: ['#3b82f6', '#1e40af', '#b45309', '#78716c', '#8b5cf6', '#f97316'],
}

export const ColorField = ({ field, path }: TextFieldClientProps) => {
  const { t } = useTranslation()
  const { value, setValue } = useField<string>({ path })
  const [isPickerOpen, setIsPickerOpen] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const inputId = useId()
  const descriptionId = useId()
  const popoverId = useId()

  // @ts-expect-error -- Field Label translation not available at runtime
  const fieldLabel = t('fields:color:label', { variable: 'value' })
  const fieldDescription = ''

  const handleColorChange = useCallback(
    (color: string) => {
      setValue(color)
    },
    [setValue],
  )

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleColorChange(event.target.value)
    },
    [handleColorChange],
  )

  const togglePicker = useCallback(() => {
    setIsPickerOpen((previous) => !previous)
  }, [])

  useEffect(() => {
    if (!isPickerOpen) {
      return
    }

    function handlePointerOutside(event: PointerEvent) {
      const target = event.target as Node
      if (pickerRef.current?.contains(target) || toggleRef.current?.contains(target)) {
        return
      }
      setIsPickerOpen(false)
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsPickerOpen(false)
        toggleRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isPickerOpen])

  return (
    <div className="field-type color-picker-field" style={{ position: 'relative' }}>
      {fieldLabel && (
        <label
          htmlFor={inputId}
          className="field-label"
          style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>
          {fieldLabel}
          {field.required && (
            <span
              className="required"
              style={{ color: 'var(--theme-error-500)', marginLeft: '4px' }}>
              *
            </span>
          )}
        </label>
      )}

      {fieldDescription && (
        <div
          id={descriptionId}
          className="field-description"
          style={{
            color: 'var(--theme-elevation-600)',
            fontSize: '13px',
            lineHeight: 1.5,
            marginBottom: '8px',
          }}>
          {fieldDescription}
        </div>
      )}

      <div
        className="color-picker-input-group"
        style={{ alignItems: 'center', display: 'flex', gap: '8px' }}>
        <button
          ref={toggleRef}
          type="button"
          onClick={togglePicker}
          className="color-preview-button"
          aria-expanded={isPickerOpen}
          aria-controls={isPickerOpen ? popoverId : undefined}
          // aria-label={`${t.presetsTitle}${fieldLabel ? `: ${fieldLabel}` : ''}`}
          style={{
            alignItems: 'center',
            backgroundColor: value || 'var(--theme-elevation-0)',
            border: '2px solid var(--theme-elevation-200)',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            height: '40px',
            justifyContent: 'center',
            position: 'relative',
            width: '40px',
          }}
          // title={value ? `${t.currentColor}: ${value}` : t.presetsTitle}
        >
          {!value && <Palette size={18} color="var(--theme-elevation-500)" aria-hidden />}
        </button>

        <input
          id={inputId}
          type="text"
          value={value || ''}
          onChange={handleInputChange}
          // placeholder={placeholder}
          aria-describedby={fieldDescription ? descriptionId : undefined}
          spellCheck={false}
          style={{
            backgroundColor: 'var(--theme-input-bg, var(--theme-elevation-0))',
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: '6px',
            color: 'var(--theme-elevation-1000)',
            flex: 1,
            fontFamily: 'monospace',
            fontSize: '14px',
            minWidth: 0,
            padding: '8px 12px',
          }}
        />

        <input
          type="color"
          value={value?.startsWith('#') ? value : '#3b82f6'}
          onChange={handleInputChange}
          // title={t.customColor}
          // aria-label={t.customColor}
          style={{
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            height: '40px',
            width: '40px',
          }}
        />
      </div>

      {isPickerOpen && (
        <div
          ref={pickerRef}
          id={popoverId}
          role="dialog"
          // aria-label={t.presetsTitle}
          className="color-presets"
          style={{
            backgroundColor: 'var(--theme-elevation-0)',
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: '8px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            left: 0,
            marginTop: '4px',
            maxHeight: '300px',
            overflowY: 'auto',
            padding: '16px',
            position: 'absolute',
            right: 0,
            top: '100%',
            zIndex: 1000,
          }}>
          <div
            style={{
              alignItems: 'center',
              color: 'var(--theme-elevation-800)',
              display: 'flex',
              fontSize: '14px',
              fontWeight: 600,
              gap: '6px',
              marginBottom: '16px',
            }}>
            <Palette size={14} aria-hidden />
            {/* {t.presetsTitle} */}
          </div>

          {(Object.keys(colorPresets) as PresetGroup[]).map((group) => (
            <div
              key={group}
              role="group"
              // aria-label={t[group]}
              style={{ marginBottom: '16px' }}>
              {/* <div
                style={{
                  color: 'var(--theme-elevation-600)',
                  fontSize: '12px',
                  fontWeight: 600,
                  marginBottom: '8px',
                }}>
                {t[group]}
              </div> */}
              <div style={{ display: 'grid', gap: '6px', gridTemplateColumns: 'repeat(6, 1fr)' }}>
                {colorPresets[group].map((color) => {
                  const selected = value === color
                  return (
                    <button
                      key={color}
                      type="button"
                      onClick={() => {
                        handleColorChange(color)
                      }}
                      aria-pressed={selected}
                      // aria-label={`${t.selectColor} ${color}`}
                      title={color}
                      style={{
                        backgroundColor: color,
                        border: selected
                          ? '3px solid var(--theme-elevation-900)'
                          : '1px solid var(--theme-elevation-200)',
                        borderRadius: '6px',
                        boxShadow: selected
                          ? '0 0 0 2px var(--theme-elevation-0)'
                          : '0 1px 3px rgba(0, 0, 0, 0.1)',
                        cursor: 'pointer',
                        height: '36px',
                        width: '36px',
                      }}
                    />
                  )
                })}
              </div>
            </div>
          ))}

          <div
            style={{
              borderTop: '1px solid var(--theme-elevation-100)',
              marginTop: '16px',
              paddingTop: '16px',
            }}>
            {/* <div
              style={{
                color: 'var(--theme-elevation-600)',
                fontSize: '12px',
                fontWeight: 600,
                marginBottom: '8px',
              }}>
              {t.customColor}
            </div> */}
            <div style={{ alignItems: 'center', display: 'flex', gap: '8px' }}>
              <input
                type="color"
                value={value?.startsWith('#') ? value : '#3b82f6'}
                onChange={handleInputChange}
                // aria-label={t.customColor}
                style={{
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  height: '36px',
                  width: '36px',
                }}
              />
              {/* <div
                style={{ color: 'var(--theme-elevation-600)', fontSize: '12px', lineHeight: 1.4 }}>
                {t.formats}
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
