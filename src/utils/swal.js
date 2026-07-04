import Swal from "sweetalert2";

const baseConfig = {
  background: "#F6F1E7",
  color: "#20302A",
  cancelButtonColor: "rgba(32,48,42,0.35)",
  buttonsStyling: true,
};

export function confirmDelete({ title = "¿Borrar esto?", text = "Esta acción no se puede deshacer." } = {}) {
  return Swal.fire({
    ...baseConfig,
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, borrar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#a13b2e",
    reverseButtons: true,
  }).then((result) => result.isConfirmed);
}

export function notifyError(text, title = "Ups") {
  return Swal.fire({
    ...baseConfig,
    icon: "error",
    title,
    text,
    confirmButtonColor: "#B0813F",
  });
}
