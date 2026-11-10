export type ShareOutcome = "shared" | "copied" | "failed" | "cancelled";

interface ShareOptions {
  title: string;
  text: string;
  url: string;
}

async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Algunos navegadores exigen permisos o un contexto seguro: probamos el
      // método clásico antes de darnos por vencidos.
    }
  }

  if (typeof document === "undefined") return false;

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(textarea);
    return copied;
  } catch {
    return false;
  }
}

/**
 * Comparte con la hoja nativa cuando está disponible y, si no, copia el
 * enlace. Distingue la cancelación del usuario de un fallo real para poder
 * avisar en la interfaz solo cuando hace falta.
 */
export async function shareOrCopy({ title, text, url }: ShareOptions): Promise<ShareOutcome> {
  if (typeof navigator === "undefined") return "failed";

  if (typeof navigator.share === "function") {
    try {
      await navigator.share({ title, text, url });
      return "shared";
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return "cancelled";
      }
      // La hoja nativa falló por otro motivo: intentamos copiar el enlace.
    }
  }

  return (await copyToClipboard(url)) ? "copied" : "failed";
}
