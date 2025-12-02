import React, { Component } from 'react';

import CompFormAgregarCliente from './CompFormAgregarCliente';
import CompPiePagina from './CompPiePagina';

class PagePedidoCliente extends Component {
    render() {
        return <div>

            <main role="main" className="container">
                <div className="row">
                    <div className="col-8">
                        <CompFormAgregarCliente />
                    </div>                    
                </div>
            </main>
            <CompPiePagina />
        </div>
    }
}
export default PagePedidoCliente;