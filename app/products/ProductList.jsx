'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {useRouter} from "next/navigation";
import Product from "@/app/products/[id]/Product";
import {notFound} from "next/navigation";

export default function ProductList({}) {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [amountFilter, setAmountFilter] = useState('');
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(1000);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const router = useRouter();

        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Błąd podczas pobierania produktów:", error);
                notFound()
            }
        };
        useEffect(() => {
            fetchProducts();
        },[])


    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setIsModalVisible(true);
    };
    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedProduct(null);
        fetchProducts()
    }

    const categories = ['all',...new Set(products.map((product) => product.category))]

    const filteredProducts = products.filter((product) => {
        const matchesName = product.name.toLowerCase().includes(filter.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || product.category.toLowerCase() === categoryFilter.toLowerCase();
        const matchesAmount = amountFilter ? product.amount >= parseInt(amountFilter) : true;
        const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
        return matchesName && matchesCategory && matchesAmount && matchesPrice;
    });

    return (
        <div style={{textAlign:"center"}}>
            <h1>Product List</h1>

            <div style={{padding:'5px'}}>
                <input
                    style={{color:'black', backgroundColor:'#ffffff'}}
                    type="text"
                    placeholder="Filter by name..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>

            <div style={{padding:'5px'}}>
                <select style={{width: '200px', color:'black'}}
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >

                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div style={{padding:'5px'}}>
                <input
                    style={{color:'black'}}
                    min="0"
                    type="number"
                    placeholder="Filter by amount (min)..."
                    value={amountFilter}
                    onChange={(e) => setAmountFilter(e.target.value)}
                />
            </div>

            <div>
                <label>Price Range: ${minPrice} - ${maxPrice}</label>
                <br/>
                <input
                    type="range"
                    min="0"
                    max="1000"
                    value={minPrice}
                    onChange={(e) => setMinPrice(parseInt(e.target.value))}
                />
                <input
                    type="range"
                    min="0"
                    max="1000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                />
            </div>

            {filteredProducts.length > 0 ? (
                <ul className="product-unordered-list">
                    {filteredProducts.map((product) => (
                        <li key={product.id} className="product-list-element">
                            <p onClick={() => handleProductClick(product)}>{product.name}</p>
                            <p>Price: ${product.price}</p>
                            <p>Category: {product.category}</p>
                            <p>Amount: {product.amount}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No products found.</p>
            )}
            {selectedProduct && (
                <Product product={selectedProduct} onClose={handleCloseModal} />
            )}
        </div>
    );
}
