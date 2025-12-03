import React, {Component} from 'react';
import { Link } from 'react-router-dom';
class CompPiePagina extends Component{
    render(){
        return <nav className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">Mi Tienda Virtual</Link>
                <p className="text-secondary">&copy;2023</p>
            </div>
        </nav>
    }
}
export default CompPiePagina;