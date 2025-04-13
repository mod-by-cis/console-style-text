# console-style-text

- `🆕v0.1.0` -> `📦https://raw.githubusercontent.com/mod-by-cis/console-style-text/refs/tags/v0.1.0/mod.ts`

## 📦HOW INSTALL

1. 🅰️ or add import in **`deno.json`**

   ```json
   {
     "imports": {  
       "@mod-by-cis/console-style-text": "https://raw.githubusercontent.com/mod-by-cis/console-style-text/refs/tags/v0.1.0/mod.ts"
     }
   }
   ```

2. 🅱️ or add import in **any `*.ts` files**

   ```ts
   import { 
     ConsoleStyleText as log 
   } from "https://raw.githubusercontent.com/mod-by-cis/console-style-text/refs/tags/v0.1.0/mod.ts";
   ```

## 🧠 HOW USED

```ts
log.t("Hello, World!").c({ r: 255, g: 0, b: 0 }, { r: 0, g: 255, b: 0 }).log;
```

or

```ts
console.log(`${ log.t("Hello, World!").c({ r: 255, g: 0, b: 0 }, { r: 0, g: 255, b: 0 })._ }`);
```
---
