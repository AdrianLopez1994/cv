export const calculateYearsOfExperience = (experiences, technologies) => {
  const techExperience = new Map();

  // Inicializar el mapa con todas las tecnologías
  technologies.forEach(tech => {
    techExperience.set(tech.name, 0);
  });

  experiences.forEach(experience => {
    // Calcular la duración de la experiencia en años
    const startDate = new Date(experience.startDate);
    const endDate = experience.endDate === 'nowadays' ? new Date() : new Date(experience.endDate);
    const years = (endDate - startDate) / (1000 * 60 * 60 * 24 * 365.25); // Años con decimales

    // Sumar los años a cada tecnología usada en esta experiencia
    experience.technologies.forEach(tech => {
      const currentYears = techExperience.get(tech.name) || 0;
      techExperience.set(tech.name, currentYears + years);
    });
  });

  // Actualizar el array de tecnologías con los años calculados
  return technologies.map(tech => ({
    ...tech,
    years: Number(techExperience.get(tech.name).toFixed(1))
  }));
}; 