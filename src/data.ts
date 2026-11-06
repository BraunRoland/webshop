type ProductCard = {
    name: string,
    desc: string,
    img: string
} 

export const products: ProductCard[] =  [
    {name: "alma", desc: "finom alma", img: "/alma.jpg"},
    {name: "körte", desc: "finom körte", img: "/korte.jpg"},
    {name: "szilva", desc: "finom szilva", img: "/szilva.jpg"}
]

export type Product = {
    product: string,
    customerName: string,
    billingAddress: string,
    shippingAddress: string
}
    
