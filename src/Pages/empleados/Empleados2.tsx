import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import { getEmpleadosData, fetchEmpleados } from '../../Features/empleadoSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Wrapper } from '../../Components/LayoutStyled';
import PropagateLoader from 'react-spinners/PropagateLoader';

const Empleados2 = () => {
  const dispatch = useAppDispatch();
  const empleadosData = useAppSelector(getEmpleadosData);
  const [treeData, setTreeData] = useState<any>(null);

  useEffect(() => {
    if (!empleadosData || empleadosData.length === 0) {
      dispatch(fetchEmpleados());
    } else {
      const buildTree = (empleado: any):  { name: string, children: any[] }=> {
        return {
          name: `${empleado.nombre} ${empleado.apellidos}`,
          
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

  if (!treeData) {
    return (
      <Wrapper>
        <PropagateLoader color="#407957" size={15} />
      </Wrapper>
    );
  }

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Tree data={treeData} orientation="vertical" />
    </div>
  );
};

export default Empleados2;
