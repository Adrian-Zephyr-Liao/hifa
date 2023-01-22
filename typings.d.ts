// @workDir/typings.d.ts
/* declare module '*.vue' { // NOTE: 非ts-loader
    // const value: WebpackContent;
    import Vue from 'vue';

    export default Vue;
} */
declare module '*.vue' { // NOTE: ts-loader
  import { defineComponent } from 'vue';

  const component: ReturnType<typeof defineComponent>;
  export default component;
}
