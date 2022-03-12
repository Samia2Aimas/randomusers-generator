declare module '*.css' {
  interface IClassNames {
    [className: string]: string
  }

  const classNames: IClassNames
  export = classNames;
}

declare module 'react-hyperscript-helpers'
declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.svg' {
  const value: any;
  export default value;
}

declare module '*.json' {
  const value: any;
  export default value;
}