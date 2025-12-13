import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import useSWR from 'swr';
import { cn } from '@/lib/utils';
import axiosClient from '@/lib/axiosClient';
import { Cart } from '@/components/cart';

interface Product {
    id: number;
    thumbnail: string;
    title: string;
    price: number;
    rating: string;
    category: string;
    reviews: [];
}

export default function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('all');
    const { data: cart, mutate } = useSWR('/api/carts/user', null, { revalidateOnMount: false });

    useEffect(() => {
        fetchProducts();
    }, [category]);

    const storeCart = async (productId: number) => {
        const found = cart['cart_detail'].find((d: any) => d.produce_id === productId);
        if (!found) {
            mutate(() => axiosClient.post('/api/carts', { product_id: productId }).then((res) => res.data.data), {
                optimisticData: {
                    ...cart,
                    cart_detail: [...cart.cart_detail, { id: new Date().getTime(), produce_id: productId }],
                },
            });
        }
    };

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const url = category === 'all' ? 'https://dummyjson.com/products' : category;
            const response = await fetch(url);
            const data = await response.json();
            setProducts(data.products as Product[]);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        {
            slug: 'all',
            name: 'All Products',
            url: 'all',
        },
        {
            slug: 'beauty',
            name: 'Beauty',
            url: 'https://dummyjson.com/products/category/beauty',
        },
        {
            slug: 'fragrances',
            name: 'Fragrances',
            url: 'https://dummyjson.com/products/category/fragrances',
        },
        {
            slug: 'furniture',
            name: 'Furniture',
            url: 'https://dummyjson.com/products/category/furniture',
        },
        {
            slug: 'groceries',
            name: 'Groceries',
            url: 'https://dummyjson.com/products/category/groceries',
        },
        {
            slug: 'home-decoration',
            name: 'Home Decoration',
            url: 'https://dummyjson.com/products/category/home-decoration',
        },
        {
            slug: 'kitchen-accessories',
            name: 'Kitchen Accessories',
            url: 'https://dummyjson.com/products/category/kitchen-accessories',
        },
        {
            slug: 'laptops',
            name: 'Laptops',
            url: 'https://dummyjson.com/products/category/laptops',
        },
        {
            slug: 'mens-shirts',
            name: 'Mens Shirts',
            url: 'https://dummyjson.com/products/category/mens-shirts',
        },
        {
            slug: 'mens-shoes',
            name: 'Mens Shoes',
            url: 'https://dummyjson.com/products/category/mens-shoes',
        },
        {
            slug: 'mens-watches',
            name: 'Mens Watches',
            url: 'https://dummyjson.com/products/category/mens-watches',
        },
        {
            slug: 'mobile-accessories',
            name: 'Mobile Accessories',
            url: 'https://dummyjson.com/products/category/mobile-accessories',
        },
        {
            slug: 'motorcycle',
            name: 'Motorcycle',
            url: 'https://dummyjson.com/products/category/motorcycle',
        },
        {
            slug: 'skin-care',
            name: 'Skin Care',
            url: 'https://dummyjson.com/products/category/skin-care',
        },
        {
            slug: 'smartphones',
            name: 'Smartphones',
            url: 'https://dummyjson.com/products/category/smartphones',
        },
        {
            slug: 'sports-accessories',
            name: 'Sports Accessories',
            url: 'https://dummyjson.com/products/category/sports-accessories',
        },
        {
            slug: 'sunglasses',
            name: 'Sunglasses',
            url: 'https://dummyjson.com/products/category/sunglasses',
        },
        {
            slug: 'tablets',
            name: 'Tablets',
            url: 'https://dummyjson.com/products/category/tablets',
        },
        {
            slug: 'tops',
            name: 'Tops',
            url: 'https://dummyjson.com/products/category/tops',
        },
        {
            slug: 'vehicle',
            name: 'Vehicle',
            url: 'https://dummyjson.com/products/category/vehicle',
        },
        {
            slug: 'womens-bags',
            name: 'Womens Bags',
            url: 'https://dummyjson.com/products/category/womens-bags',
        },
        {
            slug: 'womens-dresses',
            name: 'Womens Dresses',
            url: 'https://dummyjson.com/products/category/womens-dresses',
        },
        {
            slug: 'womens-jewellery',
            name: 'Womens Jewellery',
            url: 'https://dummyjson.com/products/category/womens-jewellery',
        },
        {
            slug: 'womens-shoes',
            name: 'Womens Shoes',
            url: 'https://dummyjson.com/products/category/womens-shoes',
        },
        {
            slug: 'womens-watches',
            name: 'Womens Watches',
            url: 'https://dummyjson.com/products/category/womens-watches',
        },
    ];

    return (
        <>
            <div className="bg-white border-b">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Shop All Products</h1>
                    <p className="text-lg text-gray-600">Discover our curated collection</p>
                </div>
            </div>

            {/* Categories */}
            <div className="bg-white border-b sticky top-0 z-10">
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                        {categories.map((cat) => (
                            <Button
                                key={cat.slug}
                                variant={category === cat.slug ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setCategory(cat.url)}
                                className={cn(
                                    category === cat.url
                                        ? 'bg-gray-900 text-white hover:bg-gray-800 hover:text-white'
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                )}
                            >
                                {cat.name}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
                                <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
                                <div className="h-4 bg-gray-200 rounded mb-2" />
                                <div className="h-4 bg-gray-200 rounded w-2/3" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <Cart
                                totalReviews={product.reviews.length}
                                thumbnail={product.thumbnail}
                                id={product.id}
                                title={product.title}
                                price={product.price}
                                key={product.id}
                                rating={product.rating}
                                category={product.category}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
