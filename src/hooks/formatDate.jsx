const formatDate = () => {
  const formatDate = (fecha) => {
    const date = new Date(fecha);
    const dia = (date.getDate() + 1).toString().padStart(2, "0");
    const mes = (date.getMonth() + 1).toString().padStart(2, "0");
    const anio = date.getFullYear();

    return `${dia}/${mes}/${anio}`;
  };

  return formatDate;
};

export default formatDate;
