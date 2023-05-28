<?php

namespace App\Http\Controllers\Api;

use App\Models\Cart;
use App\Models\Product;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class CartController extends Controller
{
    public function cart()
    {
        $user = auth()->user();
        $carts = $user->carts;

        $totalPrice = $carts->sum('price');
        $wishlistItems = $user->carts()->where('is_wishlisted', true)->get();
        $wishlistItemCount = $wishlistItems->count();

        $totalItems = 0;
        foreach ($carts as $cart) {
            $totalItems += $cart->quantity;
        }

        $cartItems = [];
        foreach ($carts as $cart) {
            $product = Product::find($cart->product_id);

            if ($product) {
                $cartItems[] = [
                    'product_id' => $cart->product_id,
                    'quantity' => $cart->quantity,
                    'image' => $cart->image,
                    'normalPrice' => $product->price,
                    'subtotal' => $cart->price * $cart->quantity,
                    'is_wishlisted' => $cart->is_wishlisted,
                ];
            }
        }

        $response = [
            'carts' => $carts,
            'totalPrice' => $totalPrice,
            'totalItems' => $totalItems,
            'cartItems' => $cartItems,
            'wishlistItems' => $wishlistItems,
            'wishlistItemCount' => $wishlistItemCount,
        ];

        return response()->json($response);
    }

    public function addToCart(Request $request)
    {
        $productId = $request->input('product_id');
        $quantity = $request->input('quantity');
        $price = $request->input('price');

        $product = Product::findOrFail($productId);

        $carts = Cart::where('user_id', auth()->user()->id)->where('product_id', $productId)->first();

        if ($carts) {
            $carts->quantity += 1;
            $carts->price = $price;
            $carts->save();
        } else {
            $carts = new Cart();
            $carts->user_id = auth()->user()->id;
            $carts->product_id = $productId;
            $carts->quantity = $quantity;
            $carts->image = $product->image;
            $carts->price = $product->price;
            $carts->save();
        }

        $response = [
            'message' => 'Item added to cart successfully.'
        ];

        return Response::json($response, 200);
    }

    public function removeFromCart(Request $request)
    {
        $productId = $request->input('product_id');

        $product = Product::findOrFail($productId);

        $carts = Cart::where('user_id', auth()->user()->id)->where('product_id', $productId)->first();

        if ($carts) {
            if ($carts->quantity > 1) {
                $carts->quantity -= 1;
                $carts->save();
            } else {
                $carts->delete();
            }

            $response = [
                'message' => 'Item remove from cart successfully.'
            ];
        }  else {
            $response = [
                'message' => 'Item not found in cart.'
            ];
        }

        return Response::json($response, 200);
    }

    public function deleteFromCart(Request $request) 
    {
        $productId = $request->input('product_id');

        $cart = Cart::where('user_id', auth()->user()->id)->where('product_id', $productId)->first();

        if ($cart) {
            $cart->delete();

            $response = [
                'message' => 'Item deleted from cart successfully.'
            ];

            return Response::json($response, 200);
        } else {
            $response = [
                'message' => 'Item not found in the cart.'
            ];

            return Response::json($response, 404);
        }
    }

    public function updateCartItemCount(Request $request)
    {
        $productId = $request->input('product_id');
        $quantity = $request->input('quantity');

        $carts = Cart::where('user_id', auth()->user()->id)->where('product_id', $productId)->first();

        if ($carts) {
            if ($carts->quantity > 0) {
                $carts->quantity = $quantity;
                $carts->save();

                $response = [
                    'message' => 'Item updated successfully.'
                ];
            } else {
                $carts->delete();

                $response = [
                    'message' => 'Item remove from cart successfully.'
                ];
            }
        }  else {
            $response = [
                'message' => 'Item not found in cart.'
            ];
        }

        return Response::json($response, 200);
    }

    public function wishlistItem(Request $request)
    {

        $productId = $request->input('product_id');

        $product = Product::findOrFail($productId);

        $carts = Cart::where('user_id', auth()->user()->id)->where('product_id', $productId)->first();

        if ($carts) {
            if ($carts->is_wishlisted === false) {
                $carts->is_wishlisted = true;
                $carts->save();
            } else {
                $carts->is_wishlisted = false;

                $carts->delete();
            }
        }  else {
            $carts = new Cart();
            $carts->user_id = auth()->user()->id;
            $carts->product_id = $productId;
            $carts->quantity = 0;
            $carts->image = $product->image;
            $carts->price = $product->price;
            $carts->is_wishlisted = true;
            $carts->save();
        }

        $response = [
            'message' => 'Item added to wishlist.'
        ];

        return Response::json($response, 200);
    }
}
