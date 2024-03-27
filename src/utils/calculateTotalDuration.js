export const calculateTotalDuration = (course) => {
  let totalDuration = 0;

  course?.courseContent?.forEach((section) => {
    section?.subSection?.forEach((subSection) => {
      const duration = Number(subSection?.timeDuration);
      if (!isNaN(duration)) {
        totalDuration += duration;
      }
    });
  });

  const hours = Math.floor(totalDuration / 3600);
  const minutes = Math.floor((totalDuration % 3600) / 60);
  const seconds = Math.floor(totalDuration % 60);

  return `${hours}hr ${minutes}min ${seconds}sec`;
};
