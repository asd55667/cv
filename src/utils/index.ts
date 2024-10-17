import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas'

import { onCleanup, onMount } from "solid-js";

export function downloadPdf() {
  const doc = new jsPDF();
  // TODO:
}

export function downloadImage(type: string, download: string) {
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
    }
  }).then(canvas => {
    // document.body.appendChild(canvas)

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

  ctx!.fillStyle = document.documentElement.className === 'dark' ? '#CD6F7355' : 'rgb(251, 213, 192)'

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
