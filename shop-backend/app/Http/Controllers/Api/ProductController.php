<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use GuzzleHttp\Client;

class ProductController extends Controller
{
    /* public function fetchProducts() {
        $cacheKey = 'products';
        $cacheDuration = 60;

        if (Cache::has($cacheKey)) {
            $products = Cache::get($cacheKey);
        } else {
            $client = new Client();
            $response = $client->get('https://fakestoreapi.com/products');
            $products = json_decode($response->getBody(), true);

            Cache::put($cacheKey, $products, $cacheDuration);
        }
        

        return response()->json($products);
    } */

    public function products() 
    {
        $products = Product::all();

        return response()->json($products);
    }

    public function show($pid)
    {
        $product = Product::find($pid);

        return response()->json($product);
    }
}
