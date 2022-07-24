import React from 'react'
import styled from '@emotion/styled'
import { capitalizado } from '../helper'
import PropTypes from 'prop-types'
import { Header } from './Header'


const ContenedorResumen = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: #00838F;
    color: #fff;
    margin-top: 1rem;
`


export const Resumen = ({datos}) => {
    
    const {marca, plan, year} = datos

    return (
        <ContenedorResumen>
            <h2>Resumen de Cotización</h2>
            <ul>
                <li>Marca: {capitalizado(marca)}</li>
                <li>Plan: {capitalizado(plan)}</li>
                <li>Año del Auto: {year}</li>
            </ul>
        </ContenedorResumen>
    )
}

Resumen.propTypes = {
    datos: PropTypes.object.isRequired
}