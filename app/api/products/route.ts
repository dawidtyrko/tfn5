// app/api/products/route.ts
import productsData from '../../../public/data/products.json';
import { NextResponse } from 'next/server';

let products = [...productsData];

// GET - Fetch all products
export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const id = searchParams.get('id');
    if(id){
        const product = products.find((product) => product.id === parseInt(id));
        if(product){
            return NextResponse.json(product);
        }else{
            return NextResponse.json({message: 'Product not found'},{status: 404});
        }
    }
    return NextResponse.json(products); //If no ID provided, return all
}

// POST - Add a new product
export async function POST(request: Request) {
    const newProduct = await request.json();
    // Ensure the new product has all necessary fields (you may also validate the fields here)
    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.amount) {
        return NextResponse.json({ message: 'Missing required product fields' }, { status: 400 });
    }

    // Assign a new ID based on the length of the array
    newProduct.id = products.length + 1;

    // Add the new product to the array
    products.push(newProduct);
    return NextResponse.json(newProduct);
}

// DELETE - Delete a product by ID
export async function DELETE(request: Request) {
    const { id } = await request.json();

    if (!id) {
        return NextResponse.json({ message: 'Missing product id' }, { status: 400 });
    }

    // Filter out the product with the provided ID
    const productIndex = products.findIndex(product => product.id === id);

    if (productIndex === -1) {
        return NextResponse.json({ message: `Product with id ${id} not found` }, { status: 404 });
    }

    // Remove the product from the array
    products.splice(productIndex, 1);
    console.log(`deleted product with id ${id}`);
    return NextResponse.json({ message: `Product with id ${id} deleted` });
}
