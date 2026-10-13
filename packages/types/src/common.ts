/* oxlint-disable no-redeclare - Disabling rule to allow redeclaration of inferred types */

/**
 * Converts a string into camel case.
 *
 * @example
 *   // string -> CamelCase
 *   type Result = CamelCase<'Foo Bar'> // 'fooBar'
 *
 *   // KebabCase -> CamelCase
 *   type Result = CamelCase<'foo-bar'> // 'fooBar'
 *
 *   // PascalCase -> CamelCase
 *   type Result = KebabCase<'FooBar'> // 'fooBar'
 *
 *   // SnakeCase -> CamelCase
 *   type Result = CamelCase<'foo_bar'> // 'fooBar'
 */
export type CamelCase<S extends string> =
  S extends `${infer P1}${'-' | '_' | ' '}${infer P2}${infer P3}`
    ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
    : Lowercase<S>

/**
 * Recursively makes every property and nested sub-property inside an object optional.
 *
 * @example
 *   type User = { id: number; profile: { name: string } }
 *   type DeepPartialUser = DeepPartial<User> // { id?: number; profile?: { name?: string } }
 */
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

/**
 * Excludes null as an assignable type from every property of an object.
 *
 * @example
 *   type User = { name: string | null; active: boolean | null }
 *   type RequiredUser = ExcludeNull<User> // { name: string; active: boolean }
 */
export type ExcludeNull<T> = { [P in keyof T]: Exclude<T[P], null> }

/**
 * Converts a string into kebab case.
 *
 * @example
 *   // string -> KebabCase
 *   type Result = KebabCase<'Foo Bar'> // 'foo-bar'
 *
 *   // CamelCase -> KebabCase
 *   type Result = KebabCase<'fooBar'> // 'foo-bar'
 *
 *   // PascalCase -> KebabCase
 *   type Result = KebabCase<'FooBar'> // 'foo-bar'
 *
 *   // SnakeCase -> KebabCase
 *   type Result = KebabCase<'foo_bar'> // 'foo-bar'
 */
export type KebabCase<S extends string> = S extends `${infer C}${infer T}`
  ? `
    ${C extends ' ' | '_' ? '-' : Uncapitalize<C>}
    ${T extends Uncapitalize<T>
      ? ''
      : `${C}${T}` extends `${Capitalize<C>}${Capitalize<T>}`
        ? ''
        : '-'}${KebabCase<T>}`
  : ''

/**
 * Allows an autocomplete field to accept any string while preserving known literal values.
 *
 * @example
 *   type Status = LooseAutocomplete<'idle' | 'loading'> // 'idle' | 'loading' | string
 */
export type LooseAutocomplete<T extends string> = (string & {}) | T

/**
 * Converts a string into pascal case.
 *
 * @example
 *   // string -> PascalCase
 *   type Result = PascalCase<'Foo Bar'> // 'FooBar'
 *
 *   // CamelCase -> PascalCase
 *   type Result = PascalCase<'fooBar'> // 'FooBar'
 *
 *   // KebabCase -> PascalCase
 *   type Result = PascalCase<'foo-bar'> // 'FooBar'
 *
 *   // SnakeCase -> PascalCase
 *   type Result = PascalCase<'foo_bar'> // 'FooBar'
 */
export type PascalCase<S extends string> = S extends
  | `${infer P1} ${infer P2}`
  | `${infer P1}-${infer P2}`
  | `${infer P1}_${infer P2}`
  ? `${Capitalize<P1>}${PascalCase<P2>}`
  : Capitalize<S>

/**
 * Flattens nested object types into a more readable, non-merged structure.
 *
 * @example
 *   type Person = { name: string }
 *   type Login = { username: string; password: string }
 *   type User = Prettify<Person & Login> // { name: string; username: string; password: string }
 */
export type Prettify<T> = {
  [K in keyof T]: T[K] extends object ? Prettify<T[K]> : T[K]
} & {}
