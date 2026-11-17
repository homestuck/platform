import type { TextField } from '@payloadcms/plugin-form-builder/types'

import React from 'react'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Field, FieldError, FieldLabel } from '@homestuck/ui/field'
import { Input } from '@homestuck/ui/input'

export const Text: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required }) => {
  return (
    <Field>
      <FieldLabel htmlFor={name}>
        {label}

        {required && (
          <span className="required">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </FieldLabel>
      <Input defaultValue={defaultValue} id={name} type="text" {...register(name, { required })} />
      {errors[name] && <FieldError errors={[errors]} />}
    </Field>
  )
}
