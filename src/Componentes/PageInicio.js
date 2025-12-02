import React, { Component } from 'react';
import CompPiePagina from './CompPiePagina';

class PageProducto extends Component {
    render() {
        return <div>
            <main role="main" className="container">
                <div className="row">
                    <h3 className="text-primary">Bienvenido a la Web</h3>
                </div>
            </main>
            <CompPiePagina />
        </div>
    }
}
export default PageProducto;