<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'location' => $this->location,
            'transaction_status' => $this->transaction_status,
            
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),

            'user' => $this->whenLoaded('user', function () {
                return [
                    'id' => $this->user->id,
                    'name' => $this->user->name,
                    'email' => $this->user->email,
                    'points' =>$this->user->points,
                ];
            }),

            'product' => $this->whenLoaded('product', function () {
                return [
                    'id' => $this->product->id,
                    'name' => $this->product->name,
                    
                    'category' => $this->product->category ? $this->product->category->name : 'N/A',
                ];
            }),

            'vendor' => $this->whenLoaded('vendor', function () {
                return [
                    'id' => $this->vendor->id,
                    'business_name' => $this->vendor->business_name,
                    // 'email' => $this->vendor->email ?? 'N/A',
                    'points' =>$this->vendor->points,
                ];
            }),
        ];
    }
}
