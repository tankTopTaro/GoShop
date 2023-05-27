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

        return response()->json($carts);
    }

    public function addToCart(Request $request)
    {
        /* $cart = new Cart();
        $cart->user_id = auth()->user()->id;
        $cart->product_id = $request->input('product_id');
        $cart->quantity = $request->input('quantity');
        $cart->save();

        $updatedCartItems = $cart->user->cartItems;

        $response = [
            'message' => 'Item added to cart successfully.',
            'cartItems' => $updatedCartItems,
        ]; */

        //return response()->json(['message' => 'Item added to cart successfully.'], 200);
        //return response()->json();

        $productId = $request->input('product_id');
        $quantity = $request->input('quantity');

        $product = Product::findOrFail($productId);

        $carts = Cart::where('user_id', auth()->user()->id)->where('product_id', $productId)->first();

        if ($carts) {
            $carts->quantity += 1;
            $carts->price = $quantity*$product->price;
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
            'message' => 'Item added to cart successfully.',
            'product_id' => $carts->product_id,
            'quantity' => $carts->quantity,
            'image' => $carts->image,
            'price' => $carts->price,
        ];

        return Response::json($response, 200);
    }

    public function removeFromCart(Request $request)
    {
        $cartId = $request->input('cart_id');
        Cart::destroy($cartId);

        return redirect()->back()->with('success', 'Item removed from cart successfully');
    }
}
