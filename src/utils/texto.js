export function normalizar(texto) {
  return texto
    .normalize('NFD') // separa la letra de su tilde: "ó" -> "o" + "´"
    .replace(/[\u0300-\u036f]/g, '') // borra las tildes sueltas
    .toLowerCase()
    .trim()
}