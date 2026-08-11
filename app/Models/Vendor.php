<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    //
    protected $fillable = [
        'user_id',
        'business_name', 
        'business_address', 
        'business_number', 
        'website',
        'state_of_business',
        'tax_identification_number',
        'business_registration_number',
        'business_description',
        'class_of_business',
        'vendor_address',
        'vendor_city',
        'vendor_state',
        'vendor_zip_code',
        'vendor_country',
        'vendor_phone',
        'vendor_status',
        'vendor_plan'
    ];

    // Relationships

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
    public function accountDetail()
    {
        return $this->hasOne(VendorAccountDetail::class);
    }
    public function payments()
    {
        return $this->hasMany(VendorPayment::class);
    }

    public function subscriptions()
    {
        return $this->hasMany(VendorSubscription::class);
    }

    public function orderItems()
    {
        return $this->hasManyThrough(
            OrderItem::class,   // Final model we want
            Product::class,     // Intermediate model
            'vendor_id',        // Foreign key on products table
            'product_id',       // Foreign key on order_items table
            'id',               // Local key on vendors table
            'id'                // Local key on products table
        );
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

}
