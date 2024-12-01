/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'vue-router'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/[...all]': RouteRecordInfo<'/[...all]', '/:all(.*)', { all: ParamValue<true> }, { all: ParamValue<false> }>,
    '/explore': RouteRecordInfo<'/explore', '/explore', Record<never, never>, Record<never, never>>,
    '/hi/[name]': RouteRecordInfo<'/hi/[name]', '/hi/:name', { name: ParamValue<true> }, { name: ParamValue<false> }>,
    '/personal': RouteRecordInfo<'/personal', '/personal', Record<never, never>, Record<never, never>>,
    '/words': RouteRecordInfo<'/words', '/words', Record<never, never>, Record<never, never>>,
  }
}
