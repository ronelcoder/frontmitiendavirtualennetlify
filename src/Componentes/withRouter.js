import { useParams } from 'react-router-dom';
import React from 'react';

// Esta función 'withRouter' toma tu componente de clase (Componente) 
// y devuelve un nuevo componente funcional que le pasa los hooks de React Router 
// (como useParams) a través de las props.
export function withRouter(Component) {
  return function ComponenteEnvuelto(props) {
    const params = useParams();
    
    // Le pasamos las props originales y el 'params' a tu componente de clase
    return <Component {...props} params={params} />;
  };
}