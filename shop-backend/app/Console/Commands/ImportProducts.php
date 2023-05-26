<?php

namespace App\Console\Commands;

use App\Models\Product;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class ImportProducts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:import-products';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import products from FakeStoreAPI';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $response = Http::get('https://fakestoreapi.com/products');

        if ($response->ok()) {
            $products = $response->json();

            foreach ($products as $productData) {
                Product::create([
                    'title'=>$productData['title'],
                    'description'=>$productData['description'],
                    'price'=>$productData['price'],
                    'image'=>$productData['image'],
                ]);
            }
            
            $this->info('Products imported successfully!');
        } else {
            $this->error('Failed to import products!');
        }
    }
}
