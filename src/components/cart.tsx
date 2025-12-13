import { Heart, Star } from 'lucide-react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import useSWR from 'swr';
import axiosClient from '@/lib/axiosClient';

interface CardProps {
    id: number;
    thumbnail: string;
    title: string;
    price: number;
    rating: string;
    category: string;
    totalReviews: number;
}

export function Cart(props: CardProps) {
    const { data: cart, mutate } = useSWR('/api/carts/user', null, { revalidateOnMount: false });

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

    return (
        <div
            key={props.id}
            className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow group"
        >
            <div className="relative p-4">
                <div className="aspect-square bg-white rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                    <img
                        src={props.thumbnail}
                        alt={props.title}
                        className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <button className="absolute top-6 right-6 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                    <Heart className="h-4 w-4 text-gray-600" />
                </button>
            </div>

            <div className="px-4 pb-4 space-y-2">
                <p className="text-xs text-gray-500 uppercase tracking-wide">{props.category}</p>
                <h3 className="font-medium text-gray-900 line-clamp-2 min-h-[2.5rem]">{props.title}</h3>

                <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-gray-900 text-gray-900" />
                    <span className="text-sm font-medium text-gray-900">{props.rating}</span>
                    <span className="text-sm text-gray-500">({props.totalReviews})</span>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <p className="text-2xl font-bold text-gray-900">${props.price}</p>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                size="sm"
                                className="bg-gray-900 hover:bg-gray-800 text-white  hover:text-white"
                                variant="outline"
                            >
                                Add to cart
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Add this item to your cart?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    You can review or remove it anytime from your cart.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => storeCart(props.id)}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>
    );
}
