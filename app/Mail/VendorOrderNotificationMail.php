<?php

namespace App\Mail;

use App\Models\Order;
use App\Models\Vendor;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;

class VendorOrderNotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $order;
    public $vendor;
    public $items;

    public function __construct(Vendor $vendor, Order $order, Collection $items)
    {
        $this->vendor = $vendor;
        $this->order = $order;
        $this->items = $items;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New Order for Your Product - ' . $this->order->product_name,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.orders.vendor-notification',
            with: [
                'vendor' => $this->vendor,
                'order' => $this->order,
                'items' => $this->items,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
