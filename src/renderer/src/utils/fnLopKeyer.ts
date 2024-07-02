export function fnLopKeyer(index: number, value: string): string {
  // @ts-expect-error The replaceAll method do exist (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll)
  return `${ String(value).toLowerCase().replaceAll(' ', '_') }__${ index }`;
}
