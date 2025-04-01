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

  useEffect(() => {
    if (!isInView || !svgRef.current || !experiences || !technologies) return;

    // Limpiar el SVG anterior
    d3.select(svgRef.current).selectAll("*").remove();

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };

    // Crear el SVG
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Crear los nodos (tecnologías)
    const nodes = technologies.map(tech => ({
      id: tech.name,
      years: tech.years,
      icon: tech.icon,
      aclaracion: tech.aclaracion
    }));

    // Crear enlaces entre tecnologías que aparecen juntas en las mismas experiencias
    const links = [];
    experiences.forEach(exp => {
      exp.technologies.forEach((tech1, i) => {
        exp.technologies.slice(i + 1).forEach(tech2 => {
          // Verificar que ambas tecnologías existan en el array de nodos
          const sourceNode = nodes.find(n => n.id === tech1.name);
          const targetNode = nodes.find(n => n.id === tech2.name);
          
          if (sourceNode && targetNode) {
            links.push({
              source: sourceNode.id,
              target: targetNode.id,
              value: 1
            });
          }
        });
      });
    });

    // Crear la simulación de fuerza
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 4))
      .force("collision", d3.forceCollide().radius(d => 60 + (d.years * 5)))
      .force("y", d3.forceY(height / 3).strength(0.1));

    simulationRef.current = simulation;

    // Crear los enlaces
    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "var(--border-color)")
      .attr("stroke-width", 1)
      .attr("opacity", 0.3);

    // Crear los nodos
    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
      .on("mouseenter", (event, d) => {
        setHoveredTech(d);
      })
      .on("mouseleave", () => {
        setHoveredTech(null);
      });

    // Añadir las imágenes de las tecnologías
    node.append("image")
      .attr("xlink:href", d => d.icon)
      .attr("width", d => 78 + (d.years * 5))
      .attr("height", d => 78 + (d.years * 5))
      .attr("x", d => -(39 + (d.years * 2.5)))
      .attr("y", d => -(39 + (d.years * 2.5)))
      .attr("opacity", 0.9);

    // Añadir el texto de años de experiencia y aclaración (inicialmente oculto)
    yearLabelsRef.current = node.append("text")
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
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node
        .attr("transform", d => `translate(${d.x},${d.y})`);
    });

    // Funciones de drag
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
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

        <svg ref={svgRef} className="technologies-chart"></svg>

    </motion.section>
  );
};

export default TechnologiesSection; 