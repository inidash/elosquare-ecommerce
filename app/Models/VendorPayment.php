<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VendorPayment extends Model
{
    //
     protected $fillable = [
        'vendor_id',
        'amount',
        'payment_method',
        'transaction_reference',
        'payment_date',
        'note',
        'proof',
    ];

    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }
}
