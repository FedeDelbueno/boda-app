export const isVideo = (m) => (m?.mime_type || "").startsWith("video/");
export const isImage = (m) => (m?.mime_type || "").startsWith("image/");

// Chrome/Firefox/Android no muestran HEIC: para esas usamos la miniatura.
export const isHeic = (m) => /image\/hei[cf]/i.test(m?.mime_type || "") || /\.hei[cf]$/i.test(m?.original_filename || "");
const canShowHeic = typeof navigator !== "undefined" && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
export const canDisplayOriginal = (m) => !isHeic(m) || canShowHeic;

export const formatBytes = (bytes) => {
  if (!bytes) return "0 MB";
  const gb = bytes / 1024 ** 3;
  if (gb >= 1) return `${gb.toFixed(1)} GB`;
  const mb = bytes / 1024 ** 2;
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
};

export const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleString("es-AR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })
    : "";

export const ANON = "__anon__";
export const guestLabel = (name) => (!name || name === ANON ? "Sin nombre" : name);
