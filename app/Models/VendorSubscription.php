<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VendorSubscription extends Model
{
    //
    protected $fillable = [
        'vendor_id',
        'reference',
        'subscription_plan',
        'subscription_price',
        'subscription_duration',
        'subscription_status',
        'subscription_renewal_date',
        'subscription_start_date',
        'subscription_end_date',
    ];

    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }

}
