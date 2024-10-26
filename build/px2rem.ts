import { Plugin } from "vite";

import type {
  ClassSelector,
  CssNode,
  Dimension,
  Raw,
  Selector,
} from "css-tree";
import MagicString from "magic-string";

const csstree = await import("css-tree");

export function px2remPlugin(): Plugin {
  return {
    name: "css:px2em",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith(".css")) return;
      return px2rem(code);
    },
  };
}

function px2rem(css: string, raw = "") {
  const s = new MagicString(css);
  const ast = csstree.parse(css, { positions: true });

  csstree.walk(ast, {
    leave(node: CssNode) {
      if (node.type === "Dimension") {
        if (node.unit === "px") {
          let { start, end } = node.loc!;
          let val: string | number = parseFloat(node.value) / 16;
          val = Number.isInteger(val) ? val : val.toFixed(2);
          val = val + "rem";
          s.overwrite(start.offset, end.offset, val);
        }
      }

      if (node.type === "Raw") {
        if (node.value !== raw) {
          const { start, end } = node.loc!;
          const css = px2rem(node.value, node.value);
          s.overwrite(start.offset, end.offset, css);
        }
      }
    },
  });

  return s.toString();
}
