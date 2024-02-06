export const useTimer = () => {
  function formatSecondsToTime(seconds) {
    const horas = Math.floor(seconds / 3600);
    const minutos = Math.floor((seconds % 3600) / 60);
    const segundos = seconds % 60;

    const formattedTime = `${horas.toString().padStart(2, "0")}:${minutos
      .toString()
      .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
    return formattedTime;
  }

  return { formatSecondsToTime };
};
