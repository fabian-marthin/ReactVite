export const totalPrice = (productos, cantidades = {}) => {
    return productos.reduce((total, producto) => {
        const cantidad = cantidades?.[producto.id] || 1; // Usa 1 si no existe
        return total + producto.price * cantidad;
    }, 0);
};