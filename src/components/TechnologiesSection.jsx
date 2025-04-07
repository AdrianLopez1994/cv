import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import * as d3 from 'd3';
import technologies from '../data/technologies.json';

const TechnologiesSection = () => {
  const svgRef = useRef(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
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
    if (!inView || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const margin = { top: 40, right: 30, bottom: 60, left: 60 };
    const isMobile = width < 768;

    // Ordenar tecnologías por años de experiencia
    const sortedData = [...technologies.technologies].sort((a, b) => b.years - a.years);

    // Crear escalas
    const xScale = isMobile
      ? d3.scaleLinear()
          .domain([0, d3.max(sortedData, d => d.years)])
          .range([margin.left, width - margin.right])
          .nice() // Asegura que la escala termine en números redondos
      : d3.scaleBand()
          .domain(sortedData.map(d => d.name))
          .range([margin.left, width - margin.right])
          .padding(0.3);

    const yScale = isMobile
      ? d3.scaleBand()
          .domain(sortedData.map(d => d.name))
          .range([margin.top, height - margin.bottom])
          .padding(0.3)
      : d3.scaleLinear()
          .domain([0, d3.max(sortedData, d => d.years) * 1.1])
          .range([height - margin.bottom, margin.top]);

    // Crear ejes
    const xAxis = isMobile
      ? d3.axisBottom(xScale)
          .ticks(Math.min(5, d3.max(sortedData, d => d.years) + 1)) // Limitar el número de marcas en móvil
      : d3.axisBottom(xScale);
    
    const yAxis = isMobile
      ? d3.axisLeft(yScale)
      : d3.axisLeft(yScale).ticks(5);

    // Añadir ejes
    svg.append("g")
      .attr("transform", `translate(0,${isMobile ? height - margin.bottom : height - margin.bottom})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)")
      .style("font-size", "12px");

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis)
      .style("font-size", "12px");

    // Añadir líneas de cuadrícula
    if (!isMobile) {
      svg.append("g")
        .attr("class", "grid")
        .call(d3.axisLeft(yScale)
          .ticks(5)
          .tickSize(-width)
          .tickFormat("")
        )
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.2);
    }

    // Añadir barras
    svg.selectAll("rect")
      .data(sortedData)
      .enter()
      .append("rect")
      .attr("x", d => isMobile ? margin.left : xScale(d.name))
      .attr("y", d => isMobile ? yScale(d.name) : yScale(d.years))
      .attr("width", d => isMobile ? xScale(d.years) - margin.left : xScale.bandwidth())
      .attr("height", d => isMobile ? yScale.bandwidth() : height - margin.bottom - yScale(d.years))
      .attr("fill", (d, i) => colorPalette[i % colorPalette.length])
      .attr("rx", 4)
      .style("opacity", 0.8)
      .on("mouseover", function(event, d) {
        d3.select(this)
          .style("opacity", 1)
          .transition()
          .duration(200)
          .attr("y", isMobile ? yScale(d.name) : yScale(d.years) - 5)
          .attr("height", isMobile ? yScale.bandwidth() + 5 : height - margin.bottom - yScale(d.years) + 5);
      })
      .on("mouseout", function(event, d) {
        d3.select(this)
          .style("opacity", 0.8)
          .transition()
          .duration(200)
          .attr("y", isMobile ? yScale(d.name) : yScale(d.years))
          .attr("height", isMobile ? yScale.bandwidth() : height - margin.bottom - yScale(d.years));
      });

    // Añadir tooltips
    svg.selectAll(".tooltip")
      .data(sortedData)
      .enter()
      .append("title")
      .text(d => `${d.name}: ${d.years} años de experiencia`);

  }, [inView]);

  return (
    <section id="technologies" className="technologies-section">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
        </motion.h2>
        <div ref={ref} className="technologies-container">
          <svg ref={svgRef} className="technologies-graph"></svg>
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection; 