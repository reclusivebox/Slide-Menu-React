declare module '*.module.scss' {
  const styles: {[sassClass: string]: string};
  export = styles;
}
