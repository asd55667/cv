import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas'
import { Canvg } from 'canvg';

import { onCleanup, onMount } from "solid-js";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function downloadPdf(download: string) {
  generateImage().then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const doc = new jsPDF();
    doc.addImage(imgData, 'PNG', 10, 10, 190, (canvas.height * 190) / canvas.width);
    doc.save(`${download}.pdf`);
  })
}

async function generateImage(): Promise<HTMLCanvasElement> {
  return new Promise((resolve) => {
    const node = document.getElementById('page')
    if (!node) return
    html2canvas(node, {
      onclone: (clonedDoc) => {
        const cv = clonedDoc.querySelector('#page')
        if (!cv?.parentNode) return
        // reset zoom
        (cv.parentNode as HTMLElement).style.zoom = '1'

        // repaint avatar
        const avatar = clonedDoc.querySelector('#avatar') as HTMLDivElement
        if (!avatar) return
        avatar?.removeChild(avatar?.children[0])
        const [w, h] = [avatar.clientWidth, avatar.clientHeight]
        avatar.appendChild(drawAvatar(w, h))

        svg2canvas(clonedDoc)
      }
    }).then(canvas => {
      resolve(canvas)
    })
  })
}

async function svg2canvas(doc: Document) {
  // svg collection
  const collection = document.querySelector('#__svg__icons__dom__')
  if (!collection) return
  const svgElements = doc.querySelectorAll('svg')

  svgElements.forEach((item, i) => {
    if (item.id === '__svg__icons__dom__') return
    const use = item.children[0] as unknown as SVGURIReference
    const id = use.href.baseVal
    let svg
    for (let j = 0; j < collection.children.length; j++) {
      const symbol = collection.children[j]
      if (id.includes(symbol.id)) {
        const s = symbol.outerHTML

        const n = '<symbol'.length
        svg = `<svg ${s.slice(n, -n)}svg>`
        break
      }
    }
    if (!svg) return
    const canvas = document.createElement('canvas');

    const { width, height } = item.getBoundingClientRect()
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'

    const ctx = canvas.getContext('2d', { willReadFrequently: true })

    const v = Canvg.fromString(ctx!, svg)
    v.start()

    window.onbeforeunload = () => {
      v.stop();
    };

    item.parentNode?.replaceChild(canvas, item)
  })
}

export function downloadImage(type: string, download: string) {
  generateImage().then(canvas => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL(`image/${type}`);
    link.download = download;
    link.click();
  })
}

function drawAvatar(w: number, h: number) {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  canvas.style.width = w + 'px'
  canvas.style.height = h + 'px'

  const ctx = canvas.getContext('2d')

  const isDark = document.documentElement.className === 'dark'
  ctx!.fillStyle = isDark ? '#CD6F7355' : 'rgb(251, 213, 192)'

  const n = 5
  const padding = 16
  const offset = 2 * padding
  const [ww, hh] = [(w - offset) / n, (h - offset) / n]
  const filled = [
    [0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ]

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (filled[i][j]) {
        ctx!.fillRect(padding + j * ww, padding + i * hh, ww, hh);
      }
    }
  }

  return canvas
}


export function useEventListener(target: Element | Window, event: string, listener: (evt: Event) => void) {
  onMount(() => {
    target.addEventListener(event, listener)
  })

  onCleanup(() => {
    target.removeEventListener(event, listener)
  })
}
