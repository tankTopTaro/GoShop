<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

class ProductController extends Controller
{
    public function fetchProducts() {
        $client = new Client();
        $response = $client->get('https://fakestoreapi.com/products');

        $products = json_decode($response->getBody(), true);

        return $products;
    }
}
