/*
 * File: index.ts
 * Author: Régis Lemaigre
 * Source: https://github.com/rlemaigre/vue3-promise-dialog/blob/main/lib/ts/lib.ts
 * License: MIT
 */

import type { DefineComponent } from 'vue'
import { shallowRef, type Component } from 'vue'

export interface DialogInstance {
  comp?: any
  dialog: Component
  wrapper: string
  props: any
  resolve: (data: any) => void
}

export const dialogRef = shallowRef<DialogInstance>()

/**
 * Closes the currently opened dialog, resolving the promise with the return value of the dialog, or with the given
 * data if any.
 */
export function closeDialog(data?: any) {
  if (dialogRef.value === undefined) return

  if (data === undefined) {
    data = dialogRef.value.comp.returnValue()
  }
  dialogRef.value.resolve(data)
  dialogRef.value = undefined
}

/**
 * Extracts the type of props from a component definition.
 */
type PropsType<C extends DefineComponent<any, any, any>> = InstanceType<C>['$props']

/**
 * Extracts the return type of the dialog from the setup function.
 */
type BindingReturnType<C extends DefineComponent<any, any, any>> = C extends DefineComponent<
  any,
  infer X,
  any
>
  ? X extends { returnValue: () => infer Y }
    ? Y
    : never
  : never

/**
 * Extracts the return type of the dialog from the methods.
 */
type MethodReturnType<C extends DefineComponent<any, any, any, any, any>> =
  C extends DefineComponent<any, any, any, any, infer X>
    ? X extends { returnValue: () => infer Y }
      ? Y
      : never
    : never

/**
 * Extracts the return type of the dialog either from the setup method or from the methods.
 */
type ReturnType<C extends DefineComponent<any, any, any, any, any>> =
  BindingReturnType<C> extends never ? MethodReturnType<C> : BindingReturnType<C>

/**
 * Opens a dialog.
 * @param dialog The dialog you want to open.
 * @param props The props to be passed to the dialog.
 * @param wrapper The dialog wrapper you want the dialog to open into.
 * @return A promise that resolves when the dialog is closed
 */
export function openDialog<C extends DefineComponent<any, any, any, any, any>>(
  dialog: Component,
  props?: PropsType<C>,
  wrapper: string = 'default'
): Promise<ReturnType<C>> {
  return new Promise((resolve) => {
    dialogRef.value = {
      dialog,
      props,
      wrapper,
      resolve
    }
  })
}
