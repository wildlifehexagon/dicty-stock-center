// @flow
import simpleStorage from "simplestorage.js"

export const submitEmail = (
  values: Object,
  dispatch: Function,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    // save in local storage
    simpleStorage.set("contact", values)
    resolve()
  })
}
