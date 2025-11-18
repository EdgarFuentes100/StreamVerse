function ModelPago(
    idPago = 0,
    idCuenta = 0,
    monto = 0,
    fechaPago = '',
    periodoInicio = '',
    periodoFin = '',
    estado = '',
    metodoPago = '',
    referencia = ''
) {
    return {
        idPago,
        idCuenta,
        monto,
        fechaPago,
        periodoInicio,
        periodoFin,
        estado,
        metodoPago,
        referencia
    };
}

export { ModelPago };