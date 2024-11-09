'use client'
import {notFound, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import React from "react";

export default function Product({product, onClose}){
    const router = useRouter();
    const [addedDate, setAddedDate] = useState('');

    useEffect(() => {
        const randomDate = generateRandomDate()
        setAddedDate(randomDate.toLocaleDateString())
    },[])
    function generateRandomDate() {
        const now = new Date();
        const pastDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()); // Zakres: ostatni rok
        const randomTime = pastDate.getTime() + Math.random() * (now.getTime() - pastDate.getTime());
        return new Date(randomTime);
    }

    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(44,42,42,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        },
        modal: {
            backgroundColor: '#988e8e',
            padding: '20px',
            borderRadius: '8px',
            width: '400px',
            maxWidth: '90%',
            position: 'relative',
        },
        closeButton: {
            position: 'absolute',
            top: '10px',
            right: '10px',
            cursor: 'pointer',
        },
        deleteButton: {
            position: 'absolute',
            top: '10px',
            left: '10px',
            color: '#5c0d0d',
        }
    };


        const handleDelete = async () => {
            try {
                const response = await fetch(`/api/products`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: product.id }),
                });
                if (response.ok) {
                    alert("Product deleted successfully.");
                    onClose()
                }else{
                    console.log("failed to delete", response);
                }
            } catch (error) {
                console.error("Error while trying to delete", error);
            }
        };


    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button style={styles.closeButton} onClick={onClose}>Zamknij</button>
                <button style={styles.deleteButton} onClick={handleDelete}>Usuń</button>
                <h2>{product.name}</h2>
                <p>Cena: ${product.price}</p>
                <p>Kategoria: {product.category}</p>
                <p>Ilość: {product.amount}</p>
                <p>Data dodania: {addedDate}</p>
            </div>
        </div>
    )
}