import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const TechnologiesSection = ({ experiences, technologies }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px -100px 0px" });
  const svgRef = useRef(null);
  const [hoveredTech, setHoveredTech] = useState(null);
  const simulationRef = useRef(null);
  const yearLabelsRef = useRef(null);
  const nodesRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    if (!isInView || !svgRef.current || !experiences || !technologies) return;

    // Limpiar el SVG anterior
    d3.select(svgRef.current).selectAll("*").remove();

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const centerX = width / 2;
    const centerY = height / 3;
    const radius = Math.min(width, height) * 0.2;

    // Crear el SVG
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);
      //.style("background-color", "var(--background-color)");

    // Crear el nodo central
    const centralNode = {
      id: "central",
      name: "Tecnologías",
      x: centerX,
      y: centerY,
      fixed: true
    };

    // Crear los nodos de tecnologías
    const nodes = [
      centralNode,
      ...technologies.map((tech, i) => ({
        id: tech.name,
        name: tech.name,
        years: tech.years,
        image: tech.image,
        aclaracion: tech.aclaracion,
        angle: (i / technologies.length) * 2 * Math.PI,
        x: centerX + radius * Math.cos((i / technologies.length) * 2 * Math.PI),
        y: centerY + radius * Math.sin((i / technologies.length) * 2 * Math.PI)
      }))
    ];

    // Crear enlaces desde el nodo central a cada tecnología
    const links = technologies.map(tech => ({
      source: "central",
      target: tech.name,
      value: 1
    }));

    // Crear la simulación de fuerza
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(d => d.id === "central" ? 0 : radius))
      .force("charge", d3.forceManyBody().strength(d => d.id === "central" ? 0 : -200))
      .force("collision", d3.forceCollide().radius(d => d.id === "central" ? 0 : 60 + (d.years * 5)))
      .force("x", d3.forceX(centerX).strength(d => d.id === "central" ? 1 : 0.1))
      .force("y", d3.forceY(centerY).strength(d => d.id === "central" ? 1 : 0.1));

    simulationRef.current = simulation;

    // Crear los enlaces
    linksRef.current = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "var(--border-color)")
      .attr("stroke-width", 1)
      .attr("opacity", 0.3);

    // Crear los nodos
    nodesRef.current = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
      .on("mouseenter", (event, d) => {
        if (d.id !== "central") {
          setHoveredTech(d);
        }
      })
      .on("mouseleave", () => {
        setHoveredTech(null);
      });

    // Añadir el círculo central
    nodesRef.current.filter(d => d.id === "central")
      .append("circle")
      .attr("r", 40)
      .attr("fill", "var(--accent-color)")
      .attr("opacity", 0.2);

    // Añadir el texto "Tecnologías" en el nodo central
    nodesRef.current.filter(d => d.id === "central")
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", "var(--accent-color)")
      .attr("font-size", "16px")
      .text("Tecnologías");

    // Añadir las imágenes de las tecnologías
    nodesRef.current.filter(d => d.id !== "central")
      .append("image")
      .attr("xlink:href", d => d.image)
      .attr("width", d => 78 + (d.years * 5))
      .attr("height", d => 78 + (d.years * 5))
      .attr("x", d => -(39 + (d.years * 2.5)))
      .attr("y", d => -(39 + (d.years * 2.5)))
      .attr("opacity", 0.9)
      .on("error", function() {
        console.error("Error al cargar la imagen:", d3.select(this).attr("xlink:href"));
        d3.select(this).attr("opacity", 0);
      });

    // Añadir el texto de años de experiencia y aclaración (inicialmente oculto)
    yearLabelsRef.current = nodesRef.current.filter(d => d.id !== "central")
      .append("text")
      .attr("dy", d => -50)
      .attr("text-anchor", "middle")
      .attr("fill", "var(--accent-color)")
      .attr("font-size", "14px")
      .attr("opacity", 0)
      .text(d => {
        let text = `${d.years} años`;
        if (d.aclaracion) {
          text += `\n${d.aclaracion}`;
        }
        return text;
      });

    // Actualizar la posición de los elementos en cada tick
    simulation.on("tick", () => {
      if (linksRef.current) {
        linksRef.current
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);
      }

      if (nodesRef.current) {
        nodesRef.current
          .attr("transform", d => `translate(${d.x},${d.y})`);
      }
    });

    // Funciones de drag optimizadas
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
      // Actualizar solo las posiciones sin recalcular todo el grafo
      if (linksRef.current) {
        linksRef.current
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);
      }
      if (nodesRef.current) {
        nodesRef.current
          .attr("transform", d => `translate(${d.x},${d.y})`);
      }
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };

  }, [isInView, experiences, technologies]);

  // Efecto separado para manejar el hover
  useEffect(() => {
    if (yearLabelsRef.current) {
      yearLabelsRef.current.attr("opacity", d => hoveredTech?.id === d.id ? 1 : 0);
    }
  }, [hoveredTech]);

  return (
    <motion.section
      ref={ref}
      className="section"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="technologies-container">
        <svg ref={svgRef} className="technologies-chart"></svg>
      </div>
    </motion.section>
  );
};

export default TechnologiesSection; 