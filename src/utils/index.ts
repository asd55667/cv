import { jsPDF } from "jspdf";
import { onCleanup, onMount } from "solid-js";

export function downloadPdf() {
  const doc = new jsPDF();
  // TODO:
}


export function useEventListener(target: Element | Window, event: string, listener: (evt: Event) => void) {
  onMount(() => {
    target.addEventListener(event, listener)
  })

  onCleanup(() => {
    target.removeEventListener(event, listener)
  })
}
