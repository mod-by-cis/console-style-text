# console-style-text

> a version that supports **multiple strings**, and experimentally supports the **padding**.
>
> - `🆕v0.2.0` -> `📦https://raw.githubusercontent.com/mod-by-cis/console-style-text/refs/tags/v0.2.0/mod.ts`
>


> a version supporting a **single string**
>
> - `v0.1.0` -> `📦https://raw.githubusercontent.com/mod-by-cis/console-style-text/refs/tags/v0.1.0/mod.ts`
>

## 📦HOW INSTALL

1. 🅰️ or add import in **`deno.json`**

   ```json
   {
     "imports": {  
       "@mod-by-cis/console-style-text": "https://raw.githubusercontent.com/mod-by-cis/console-style-text/refs/tags/v0.2.0/mod.ts"
     }
   }
   ```
2. 🅱️ or add import in **any `*.ts` files**

   ```ts
   import { 
     ConsoleStyleText as log 
   } from "https://raw.githubusercontent.com/mod-by-cis/console-style-text/refs/tags/v0.2.0/mod.ts";
   ```

## 🧠 HOW USED

```ts
log.t("Hello, World!").c({ r: 255, g: 0, b: 0 }, { r: 0, g: 255, b: 0 }).log;
```

or

```ts
console.log(`${ log.t("Hello, World!").c({ r: 255, g: 0, b: 0 }, { r: 0, g: 255, b: 0 })._ }`);
```

and more

```ts
console.log([
  log.t('-1-').c( 0x045cab,0xf45a32).s("b")._,
  log.t('-2-').c( 0xAB0495,0x32F4B3).s("b")._, 
  log.t('-3-').c( 0xABA004,0x22358A).s("b")._
].join(''));

log.t('_A_').c( 0x045cab,0xf45a32).s("b").t('_B_').c( 0xAB0495,0x32F4B3).s("b").t('_C_').c( 0xABA004,0x22358A).s("b").log


log
  .t('__--A--__',1).c( 0x045cab,0xf45a32).s("b")
  .t('__--BB--__',[2,0]).c( 0xAB0495,0x32F4B3).s("b")
  .t('__--CCC--__',[[8,2],0]).c( 0xABA004,0x22358A).s("b")
  .t('__--DDDD--__',[2,[1,4]]).c( 0xB6A2B3,0x92590E).s("b")
  .t('__--EEEEE--__').c( 0x11030F,0x38920E).s("b")
  .log

```
---
