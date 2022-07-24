import styled from '@emotion/styled'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { obtenerDiferenciaYear, calcularMarca, calcularPlan } from '../helper'

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`
const Label = styled.label`
    flex: 0 0 100px;
`
const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
`
const InputRadio = styled.input`
    margin: 0 1rem;
`
const Boton = styled.button`
    background-color: #00838F;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color .3s ease;
    margin-top: 2rem;

    &:hover {
        background-color: #26c6da;
        cursor: pointer;
    }
`
const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
`




export const Formulario = ({ guardarResumen, setCargando }) => {

    const [error, guardarError] = useState(false)
    const [datos, guardarDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    //extraer valores del state
    const { marca, year, plan } = datos

    //leer los datos del formulario y colocarlos en el state
    const obtenerInformacion = e => {
        guardarDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }

    //cuando el usuario presiona submit

    const cotizarSeguro = e => {
        e.preventDefault();
        if (marca.trim() === '' || year.trim() === '' || plan.trim() === '') {
            guardarError(true)
            return
        }

        guardarError(false)

        //precio base de 2000
        let resultado = 2000

        //obtener la diferencia de años
        const diferencia = obtenerDiferenciaYear(year)

        //por cada año restar 3%
        resultado -= ((diferencia * 3) * resultado) / 100

        //americano 15% incremento
        //asiatico 5% incremento
        //europeo 30% incremento
        resultado = calcularMarca(marca) * resultado

        //basico 20% incremento
        //completo 50% incremento
        resultado = parseFloat(calcularPlan(plan) * resultado).toFixed(2)

        setCargando(true);
        
        setTimeout(() => {
            setCargando(false);
            guardarResumen({
                cotizacion: Number(resultado),
                datos
            })
        }, 1992);
    }

    return (
        <form
            onSubmit={cotizarSeguro}
        >

            {error ? <Error>Todos los campos son obligatorios </Error> : null}

            <Campo>
                <Label>Marca</Label>
                <Select
                    name='marca'
                    value={marca}
                    onChange={obtenerInformacion}
                >
                    <option value=''>--Seleccione--</option>
                    <option value='americano'>Americano</option>
                    <option value='europeo'>Europeo</option>
                    <option value='asiatico'>Asiatico</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Año</Label>
                <Select
                    name='year'
                    value={year}
                    onChange={obtenerInformacion}
                >
                    <option value=''>--Seleccione--</option>
                    <option value='2022'>2022</option>
                    <option value='2021'>2021</option>
                    <option value='2020'>2020</option>
                    <option value='2019'>2019</option>
                    <option value='2018'>2018</option>
                    <option value='2017'>2017</option>
                    <option value='2016'>2016</option>
                    <option value='2015'>2015</option>
                    <option value='2014'>2014</option>
                    <option value='2013'>2013</option>
                    <option value='2012'>2012</option>
                    <option value='2011'>2011</option>
                    <option value='2010'>2010</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Plan</Label>
                <InputRadio
                    type='radio'
                    name='plan'
                    id='1'
                    value='basico'
                    checked={plan === 'basico'}
                    onChange={obtenerInformacion}
                /><label htmlFor='1'>Básico</label>
                <InputRadio
                    type='radio'
                    name='plan'
                    id='2'
                    value='completo'
                    checked={plan === 'completo'}
                    onChange={obtenerInformacion}
                /><label htmlFor='2'>Completo</label>
            </Campo>
            <Boton type='submit'>Cotizar</Boton>
        </form>
    )
}

Formulario.propTypes = {
    guardarResumen: PropTypes.func.isRequired,
    setCargando: PropTypes.func.isRequired
}