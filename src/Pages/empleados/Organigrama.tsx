import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import { getEmpleadosData, fetchEmpleados } from '../../Features/empleadoSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Wrapper } from '../../Components/LayoutStyled';
import PropagateLoader from 'react-spinners/PropagateLoader';

const Organigrama = () => {
  const dispatch = useAppDispatch();
  const empleadosData = useAppSelector(getEmpleadosData);
  const [treeData, setTreeData] = useState<any>(null);

  const cumpleEn7Dias = (fechaNacimiento: string) => {
    const hoy = new Date();
    const cumpleanos = new Date(fechaNacimiento);
  
    // Calcula la fecha de cumpleaños para este año
    cumpleanos.setFullYear(hoy.getFullYear());
  
    // Calcula la diferencia en días
    const diffEnMilisegundos = cumpleanos.getTime() - hoy.getTime();
  
    // Verifica si la diferencia es menor o igual a 7 días
    return diffEnMilisegundos >= 0 && diffEnMilisegundos <= 7 * 24 * 60 * 60 * 1000; // 7 días en milisegundos
  };

  
  


  useEffect(() => {
    if (!empleadosData || empleadosData.length === 0) {
      dispatch(fetchEmpleados());
    } else {
      const buildTree = (empleado:any):  { name: string, attributes: any, children: any[] }=> {
        return {
          name: `${empleado.nombre} ${empleado.apellidos}`,
          attributes: {
            cumpleaños: empleado.fechaNacimiento
          },         
          
          children: empleadosData
            .filter((e) => e.responsable === empleado.upn)
            .map(buildTree),
        };
      };

      // Busca el nodo raíz (empleado sin responsable)
      const rootNode = empleadosData.find((empleado) => !empleado.responsable);

      if (rootNode) {
        // Construye la estructura jerárquica a partir del nodo raíz
        setTreeData(buildTree(rootNode));
      }
    }
  }, [dispatch, empleadosData]);
  
  
  interface RenderForeignObjectNodeProps{
    nodeDatum: any
    toggleNode: any
    foreignObjectProps: any
  }
  
  const renderForeignObjectNode = ({
    nodeDatum,
    toggleNode,
    foreignObjectProps
  }: RenderForeignObjectNodeProps) => (
    
    <g>
      <circle
        r="12"
        fill={cumpleEn7Dias(nodeDatum.attributes.cumpleaños) ? 'orange' : 'blue'}
        onClick={() => console.log('Haz clic en el nodo')}
      />
      <foreignObject {...foreignObjectProps}>
      <div style={{ border: "1px solid black", backgroundColor: "#dedede" }}>
        <h3 style={{ textAlign: "center" }}>{nodeDatum.name}</h3>
        {nodeDatum.children && (
          <button style={{ width: "100%" }} onClick={toggleNode}>
            {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
          </button>
        )}
      </div>
    </foreignObject>
    </g>
  )
  

  if (!treeData) {
    return (
      <Wrapper>
        <PropagateLoader color="#407957" size={15} />
      </Wrapper>
    );
  }
  const nodeSize = { x: 150, y: 200 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 20 };
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Tree 
        data={treeData} 
        orientation="vertical" 
        separation={{ siblings: 2, nonSiblings: 2 }}
        nodeSize={nodeSize}
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
        }
      />
    </div>
  );
};

export default Organigrama;
