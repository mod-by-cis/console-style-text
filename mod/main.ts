import type { Rgb } from "jsr:@std/fmt@1.0.6/colors";
import { bgRgb24, bgRgb8, bold, dim, hidden, inverse, italic, reset, rgb24, rgb8, strikethrough, stripAnsiCode, underline } from "jsr:@std/fmt@1.0.6/colors";

type PaddingOrMarginINPUT = number | [number, number] | [number, [number, number]] | [[number, number], number] | [[number, number], [number, number]];
type PaddingOrMarginPARSE = { xL: number; xR: number; yT: number; yB: number };
export class ConsoleStyleText {
  static #segments: string[] = [];
  static #text: string = "";

  static #flush(): void {
    this.#segments.push(this.#text);
    this.#text = "";
  }

  // Pomocnicza metoda do przetwarzania koloru
  static #processColor(color: Rgb | number, isBackground: boolean): void {
    if (typeof color === "number") {
      if (color >= 0x000000 && color <= 0xffffff) {
        // Wyodrębnienie wartości R, G, B z liczby szesnastkowej
        const r = (color >> 16) & 0xff; // Pierwsze 8 bitów (czerwony)
        const g = (color >> 8) & 0xff; // Środkowe 8 bitów (zielony)
        const b = color & 0xff; // Ostatnie 8 bitów (niebieski)
        this.#text = isBackground
          ? bgRgb24(this.#text, { r, g, b })
          : rgb24(this.#text, { r, g, b });
      } else {
        // Jeśli to liczba dziesiętna
        this.#text = isBackground
          ? bgRgb8(this.#text, color)
          : rgb8(this.#text, color);
      }
    } else if ("r" in color && "g" in color && "b" in color) {
      // Jeśli jest obiektem Rgb
      this.#text = isBackground
        ? bgRgb24(this.#text, color)
        : rgb24(this.#text, color);
    }
  }

  // Pomocnicza metoda do aplikowania stylów w sposób uniwersalny
  static #applyStyle(
    styles: string | string[],
    styleMap: Record<string, (text: string) => string>,
  ): void {
    const applyStyles = Array.isArray(styles) ? styles : [styles];
    applyStyles.forEach((style) => {
      if (style in styleMap) this.#text = styleMap[style](this.#text);
    });
  }

  static #parsePaddingOrMargin(
    input: PaddingOrMarginINPUT
  ): PaddingOrMarginPARSE {
    const sanitize = (val: unknown): number => {
      return typeof val === "number" && val >= 0 ? Math.ceil(val) : 0;
    };
  
    let xL = 0, xR = 0, yT = 0, yB = 0;
  
    if (typeof input === "number") {
      xL = xR = yT = yB = sanitize(input);
    } else if (Array.isArray(input)) {
      const [horiz, vert] = input;
  
      if (Array.isArray(horiz) && Array.isArray(vert)) {
        // [[xL, xR], [yT, yB]]
        xL = sanitize(horiz[0]);
        xR = sanitize(horiz[1]);
        yT = sanitize(vert[0]);
        yB = sanitize(vert[1]);
      } else if (Array.isArray(horiz)) {
        // [[xL, xR], yTyB]
        xL = sanitize(horiz[0]);
        xR = sanitize(horiz[1]);
        yT = yB = sanitize(vert);
      } else if (Array.isArray(vert)) {
        // [xLxR, [yT, yB]]
        xL = xR = sanitize(horiz);
        yT = sanitize(vert[0]);
        yB = sanitize(vert[1]);
      } else {
        // [xLxR, yTyB]
        xL = xR = sanitize(horiz);
        yT = yB = sanitize(vert);
      }
    }
  
    return { xL, xR, yT, yB };
  }

  // Metoda inicjująca tekst
  static t(text: string = "", padding:PaddingOrMarginINPUT = 0): typeof ConsoleStyleText {
    function ROW<T>(val: T, times: number): T[] {
      const count = Math.max(0, Math.floor(times));
      return Array(count).fill(val);
    }
    if (this.#text) this.#flush();
    const sl = this.#segments.length;
    const sf = sl == 0;
    const nl = sf ? '':'\n';
    const p = this.#parsePaddingOrMargin(padding);
    const textROW = [' '.repeat(p.xL), text, ' '.repeat(p.xR)].join('');
    const sizeROW = text.length + p.xL + p.xR;
    const nullROW = ' '.repeat(sizeROW);
    if(p.yT>0 && !sf){
      this.#segments[sl-1] += nl;
    }
    const textBOX = [
      ...ROW(nullROW,p.yT),
      textROW,
      ...ROW(nullROW,p.yB)
    ].join('\n');
    this.#text = textBOX;
    return this; // Zwraca klasę, umożliwiając chaining
  }

  // Metoda zmieniająca jednocześnie kolor tekstu (foreground) i tła (background)
  static c(
    color_foreground: Rgb | number | "-",
    color_background: Rgb | number | "-",
  ): typeof ConsoleStyleText {
    if (color_foreground !== "-") this.#processColor(color_foreground, false);
    if (color_background !== "-") this.#processColor(color_background, true);
    return this;
  }

  // Metoda dla stylów tekstu (bold, italic, underline)
  static s(styles: "-" | "b" | "i" | "u" | ("b" | "i" | "u")[]): typeof ConsoleStyleText {
    if (styles !== "-") {
      this.#applyStyle(styles, { b: bold, i: italic, u: underline });
    }
    return this;
  }

  // Metoda dla stylów widzialności tekstu (strikethrough, hidden, dim)
  static v(styles: "-" | "X" | "H" | "N"): typeof ConsoleStyleText {
    if (styles !== "-") {
      this.#applyStyle(styles, { X: strikethrough, H: hidden, N: dim });
    }
    return this;
  }
  // Uniwersalna metoda dla revers or reset
  static r(revers: 1 | 0 | -1): typeof ConsoleStyleText {
    switch (revers) {
      case 1:
        this.#text = inverse(this.#text);
        break;
      case 0:
        this.#text = stripAnsiCode(this.#text);
        break;
      case -1:
        this.#text = reset(this.#text);
        break;
      default:
        this.#text = inverse(this.#text);
        break;
    }
    return this; // Pozwala na chaining
  } 
  

  // Metoda końcowa - zwracająca tekst
  static get _(): string {
    if (this.#text) this.#flush();
    const output = this.#segments.join("");
    this.#segments = [];
    return output;
  }

  static get log(): string {
    const output = this._;
    console.log(output);
    // Reset po wypisaniu
    this.#segments = [];
    return output;
  }
}
