import axiosClient from '@/lib/axiosClient';
import { useState } from 'react';

export function useCart() {
    const [cart] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    async function storeCart(produceId: number) {
        try {
            const {
                data: { data: cart },
            } = await axiosClient.post('/api/carts', {
                produce_id: produceId,
            });
            return cart;
        } catch (error) {}
    }

    return { cart, storeCart };
}
