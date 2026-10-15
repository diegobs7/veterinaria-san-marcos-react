export const validarFormularioRegistro = ({ nombre, correo, contra, repetirContra }) => {
  const patronCorreo = /^[^\s@]+@(duocuc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

  const valorNombre = nombre.trim();
  const valorCorreo = correo.trim();
  const valorContra = contra.trim();
  const valorRepetir = repetirContra.trim();

  const errores = {
    errorNombre: valorNombre === "" || valorNombre.length < 3,
    errorCorreo: valorCorreo === "" || valorCorreo.length > 100 || !patronCorreo.test(valorCorreo),
    errorContra: valorContra === "" || valorContra.length < 4 || valorContra.length > 10,
    errorRepetirContra: valorRepetir === "" || valorRepetir !== valorContra,
  };

  
  const esValido = !Object.values(errores).some(Boolean);

  return { esValido, errores };
};