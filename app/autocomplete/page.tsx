"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function AutoComplete() {
    const [query, setQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [ showResults, setShowResults ] = useState(false);

    useEffect(() => {
        if (query === "") {
            setProducts([]);
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
                setProducts(response.data.products);
                console.log(response.data.products);
            } catch (err) {
                console.error("Error Occurred:", err);
            } finally {
                setIsLoading(false);
            }
        };

        const delayDebounceFn = setTimeout(fetchData, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">🔎 Auto Complete Search</h1>
            <div className="relative w-full max-w-md">
                <input
                    className="w-full p-3 text-lg text-gray-800 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search products..."
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    onFocus={() => setShowResults(true)}
                    onBlur={() => setTimeout(() => setShowResults(false), 200)}
                />
                {
                    isLoading && <span className="absolute right-4 top-4 text-gray-500 animate-spin">⏳</span>
                }
            </div>
            <div className="w-full max-w-md mt-4">
                {
                    query === "" ? (
                        <div className="p-4 bg-blue-100 text-blue-600 text-center rounded-lg shadow-md">
                            🔍 Start typing to search products
                        </div>
                    ) : isLoading ? (
                        <div className="p-4 bg-blue-100 text-blue-600 text-center rounded-lg shadow-md">
                            ⏳ Loading products...
                        </div>
                    ) : products.length === 0 ? (
                        <div className="p-4 bg-red-100 text-red-600 text-center rounded-lg shadow-md">
                            ❌ No products found
                        </div>
                    ) : (
                        <></>
                    )
                }

                <div className="overflow-y-auto max-h-96">
                    {
                        showResults && products.length > 0 && (
                            <div className="mt-2 space-y-1">
                                {
                                    products.map((product: any, index: number) => (
                                        <div
                                            key={index}
                                            onClick={() => setQuery(product.title)}
                                            className="p-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition duration-200"
                                        >
                                            <h1 className="text-lg font-medium text-gray-800">{product.title}</h1>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div >
    );
}
