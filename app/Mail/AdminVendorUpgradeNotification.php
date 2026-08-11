<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\Vendor;

class AdminVendorUpgradeNotification extends Mailable
{
    use Queueable, SerializesModels;

     public $vendor;
    public $plan;
    public $amount;

    public function __construct(Vendor $vendor, $plan, $amount)
    {
        $this->vendor = $vendor;
        $this->plan = $plan;
        $this->amount = $amount;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Vendor Plan Upgrade Notification',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.subscription.admin-vendor-upgrade',
            with: [
                'vendor' => $this->vendor,
                'plan' => $this->plan,
                'amount' => $this->amount,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
