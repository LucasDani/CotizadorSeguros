export const obtenerDiferenciaYear = (year) => {
    return new Date().getFullYear() - year;
}

//calcula el incremento a pagar segun marca

export const calcularMarca = (marca) => {
    let incremento;

    switch (marca) {
        case 'europeo':
            incremento = 1.3
            break
        case 'americano':
            incremento = 1.15
            break
        case 'asiatico':
            incremento = 1.05
            break
        default:
            break;
    }
    return incremento
}

//calcula el incremento a pagar segun plan

export const calcularPlan = (plan) => {
    return ( plan === 'basico' ) ? 1.2 : 1.5
}

export const capitalizado = (texto) => {
    return texto.charAt(0).toUpperCase() + texto.slice(1)
}