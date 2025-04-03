import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import * as d3 from 'd3';

const TechnologiesSection = ({ experiences, technologies }) => {
  const svgRef = useRef(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Paleta de colores profesional
  const colorPalette = [
    '#2C3E50', // Azul oscuro corporativo
    '#34495E', // Azul grisáceo
    '#3498DB', // Azul brillante
    '#2980B9', // Azul medio
    '#1ABC9C', // Verde azulado
    '#16A085', // Verde oscuro
    '#27AE60', // Verde
    '#2ECC71', // Verde claro
    '#F1C40F', // Amarillo
    '#F39C12', // Naranja
    '#E67E22', // Naranja oscuro
    '#D35400', // Naranja rojizo
    '#E74C3C', // Rojo
    '#C0392B', // Rojo oscuro
    '#9B59B6', // Púrpura
    '#8E44AD', // Púrpura oscuro
    '#95A5A6', // Gris
    '#7F8C8D', // Gris oscuro
    '#ECF0F1', // Gris claro
    '#BDC3C7'  // Gris medio
  ];

  useEffect(() => {
    if (!inView || !svgRef.current || !technologies || !experiences) return;

    // Limpiar el SVG
    d3.select(svgRef.current).selectAll("*").remove();

    // Ordenar tecnologías por años de experiencia
    const sortedTechs = [...technologies].sort((a, b) => b.years - a.years);

    // Configurar dimensiones
    const margin = { top: 40, right: 30, bottom: 60, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Crear el SVG
    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Escalas
    const x = d3.scaleBand()
      .range([0, width])
      .domain(sortedTechs.map(d => d.name))
      .padding(0.2);

    const y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(sortedTechs, d => d.years) * 1.1]);

    // Añadir ejes
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end")
      .style("font-size", "12px");

    svg.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .style("font-size", "12px");

    // Añadir líneas de cuadrícula
    svg.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(y)
        .ticks(5)
        .tickSize(-width)
        .tickFormat("")
      )
      .style("stroke-dasharray", "3,3")
      .style("opacity", 0.2);

    // Añadir barras
    svg.selectAll("rect")
      .data(sortedTechs)
      .enter()
      .append("rect")
      .attr("x", d => x(d.name))
      .attr("y", d => y(d.years))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.years))
      .attr("fill", (d, i) => colorPalette[i % colorPalette.length])
      .attr("rx", 4)
      .style("opacity", 0.8)
      .on("mouseover", function(event, d) {
        d3.select(this)
          .style("opacity", 1)
          .transition()
          .duration(200)
          .attr("y", y(d.years) - 5)
          .attr("height", height - y(d.years) + 5);
      })
      .on("mouseout", function(event, d) {
        d3.select(this)
          .style("opacity", 0.8)
          .transition()
          .duration(200)
          .attr("y", y(d.years))
          .attr("height", height - y(d.years));
      });

    // Añadir tooltips
    svg.selectAll(".tooltip")
      .data(sortedTechs)
      .enter()
      .append("title")
      .text(d => `${d.name}: ${d.years} años de experiencia`);

  }, [inView, technologies, experiences]);

  return (
    <section id="technologies" className="technologies-section">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >

        </motion.h2>
        <div ref={ref} className="technologies-container">
          <svg ref={svgRef}></svg>
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection; 