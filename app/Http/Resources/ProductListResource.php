<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class ProductListResource extends JsonResource
{
    /**
     * Transform the resource into an array. 
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'vendor_id'=>$this->vendor_id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description'=>Str::limit($this->description, 70),
            'price' => $this->getPriceForFirstOptions(),
            'selling_price' =>$this->selling_price,
            'quantity' => $this->quantity,
            'image' => $this->getFirstImageUrl('images', 'small'),
            'isDiscount' => false,
            'discount' => 0,
            
            'vendor'=> [
                'vendor_id'=>$this->vendor_id,
                'business_name'=>$this->vendor->business_name,
                'business_address'=>$this->vendor->business_address,
                'business_city'=>$this->vendor->business_state
            ]
        ];
    }
}
