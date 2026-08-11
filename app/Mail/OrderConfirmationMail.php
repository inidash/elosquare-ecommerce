<?php

// namespace App\Mail;
// use App\Models\Order;
// use Illuminate\Bus\Queueable;
// use Illuminate\Contracts\Queue\ShouldQueue;
// use Illuminate\Mail\Mailable;
// use Illuminate\Mail\Mailables\Content;
// use Illuminate\Mail\Mailables\Envelope;
// use Illuminate\Queue\SerializesModels;

// class OrderConfirmationMail extends Mailable
// {
//     use Queueable, SerializesModels;

//      public $order;

//     /**
//      * Create a new message instance.
//      */
//     public function __construct(Order $order)
//     {
//         $this->order = $order;
//     }

//     /**
//      * Get the message envelope.
//      */
//     public function envelope(): Envelope
//     {
//         return new Envelope(
//             subject: 'Your Order Confirmation - #' . $this->order->order_number,
//         );
//     }

//     /**
//      * Get the message content definition.
//      */
//     public function content(): Content
//     {
//         return new Content(
//             view: 'emails.orders.confirmation',
//             with: [
//                 'order' => $this->order,
//             ],
//         );
//     }

//     /**
//      * Get the attachments for the message.
//      */
//     public function attachments(): array
//     {
//         return [];
//     }
// }


// namespace App\Mail;

// use App\Models\Order;
// use Illuminate\Bus\Queueable;
// use Illuminate\Contracts\Queue\ShouldQueue;
// use Illuminate\Mail\Mailable;
// use Illuminate\Mail\Mailables\Content;
// use Illuminate\Mail\Mailables\Envelope;
// use Illuminate\Queue\SerializesModels;

// class OrderConfirmationMail extends Mailable
// {
//     use Queueable, SerializesModels;

//     public $order;

//     /**
//      * Create a new message instance.
//      */
//     public function __construct(Order $order)
//     {
//         $this->order = $order;

//         // Process images for email
//         $this->processOrderImages();
//     }

//     /**
//      * Embed or set correct image URLs for order items
//      */
//     protected function processOrderImages()
//     {
//         foreach ($this->order->orderItems as $item) {
//             if (!empty($item->product_image)) {
//                 if (app()->environment(['local', 'testing'])) {
//                     // Local environment or Mailtrap: embed image
//                     $path = storage_path('app/public/' . ltrim($item->product_image, '/'));
//                     if (file_exists($path)) {
//                         $item->product_image = $this->embed($path);
//                     } else {
//                         // fallback
//                         $item->product_image = $this->embed(public_path('images/no-image.jpg'));
//                     }
//                 } else {
//                     // Production: use public URL
//                     $item->product_image = asset('storage/' . ltrim($item->product_image, '/'));
//                 }
//             } else {
//                 // fallback
//                 $item->product_image = app()->environment(['local', 'testing'])
//                     ? $this->embed(public_path('images/no-image.jpg'))
//                     : asset('images/no-image.jpg');
//             }
//         }
//     }

//     /**
//      * Get the message envelope.
//      */
//     public function envelope(): Envelope
//     {
//         return new Envelope(
//             subject: 'Your Order Confirmation - #' . $this->order->order_number,
//         );
//     }

//     /**
//      * Get the message content definition.
//      */
//     public function content(): Content
//     {
//         return new Content(
//             view: 'emails.orders.confirmation',
//             with: [
//                 'order' => $this->order,
//             ],
//         );
//     }

//     /**
//      * Get the attachments for the message.
//      */
//     public function attachments(): array
//     {
//         return [];
//     }
// }


// namespace App\Mail;

// use App\Models\Order;
// use Illuminate\Bus\Queueable;
// use Illuminate\Mail\Mailable;
// use Illuminate\Queue\SerializesModels;
// use Illuminate\Mail\Mailables\Content;
// use Illuminate\Mail\Mailables\Envelope;

// class OrderConfirmationMail extends Mailable
// {
//     use Queueable, SerializesModels;

//     public $order;
//     public $embeddedImages = [];

//     public function __construct(Order $order)
//     {
//         $this->order = $order;

//         // Prepare embedded images
//         foreach ($order->orderItems as $item) {
//             $imagePath = public_path('storage/' . ltrim($item->product_image ?? '', '/'));
//             if ($item->product_image && file_exists($imagePath)) {
//                 $this->embeddedImages[$item->id] = $this->embed($imagePath);
//             } else {
//                 $fallbackPath = public_path('images/no-image.jpg');
//                 if (file_exists($fallbackPath)) {
//                     $this->embeddedImages[$item->id] = $this->embed($fallbackPath);
//                 }
//             }
//         }
//     }

//     public function envelope(): Envelope
//     {
//         return new Envelope(
//             subject: 'Your Order Confirmation - #' . $this->order->order_number,
//         );
//     }

//     public function content(): Content
//     {
//         return new Content(
//             view: 'emails.orders.confirmation',
//             with: [
//                 'order' => $this->order,
//                 'embeddedImages' => $this->embeddedImages
//             ],
//         );
//     }

//     public function attachments(): array
//     {
//         return [];
//     }
// }



namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use App\Models\Order;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Support\Facades\Storage;

class OrderConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $order;
    public $embeddedImages = []; // accessible in Blade as $embeddedImages

    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    public function build()
    {
        // Prepare default URLs for production (we will override in withSymfonyMessage for local/testing)
        foreach ($this->order->orderItems as $item) {
            if (!empty($item->product_image)) {
                $this->embeddedImages[$item->id] = asset('storage/' . ltrim($item->product_image, '/'));
            } else {
                $this->embeddedImages[$item->id] = asset('images/no-image.jpg');
            }
        }

        // We attach/inline real files into the Symfony message when available (local/testing),
        // because Mailtrap and many dev environments cannot access http://127.0.0.1 URLs.
        return $this->subject('Your Order Confirmation - #' . $this->order->order_number)
                    ->view('emails.orders.confirmation')
                    ->with(['order' => $this->order, 'embeddedImages' => $this->embeddedImages])
                    ->withSymfonyMessage(function ($message) {
                        // Only try to embed files for local/testing env (Mailtrap)
                        if (!app()->environment(['local', 'testing'])) {
                            return;
                        }

                        // $message here is the Symfony\Component\Mime\Email instance
                        foreach ($this->order->orderItems as $item) {
                            $dbPath = $item->product_image;

                            // try storage/app/public/<path>
                            if ($dbPath) {
                                $candidate = storage_path('app/public/' . ltrim($dbPath, '/'));

                                if (file_exists($candidate)) {
                                    // embedFromPath returns a CID string (like 'cid:...') or unique id to reference in HTML
                                    // second arg is the name/content-id (we use a unique name), third is optional mime type
                                    $name = 'product-' . $item->id . '-' . uniqid();
                                    try {
                                        // embedFromPath is provided by Symfony Email object
                                        $cid = $message->embedFromPath($candidate, $name);
                                        // store the returned CID string for use in Blade <img src="{{ $embeddedImages[$item->id] }}">
                                        $this->embeddedImages[$item->id] = $cid;
                                    } catch (\Throwable $ex) {
                                        // fallback to the existing public URL if embed fails
                                        $this->embeddedImages[$item->id] = asset('storage/' . ltrim($dbPath, '/'));
                                    }

                                    continue;
                                }
                            }

                            // fallback: embed the no-image placeholder if it exists
                            $fallback = public_path('images/no-image.jpg');
                            if (file_exists($fallback)) {
                                try {
                                    $name = 'no-image-' . $item->id . '-' . uniqid();
                                    $cid = $message->embedFromPath($fallback, $name);
                                    $this->embeddedImages[$item->id] = $cid;
                                } catch (\Throwable $ex) {
                                    $this->embeddedImages[$item->id] = asset('images/no-image.jpg');
                                }
                            } else {
                                // last resort: public URL to placeholder
                                $this->embeddedImages[$item->id] = asset('images/no-image.jpg');
                            }
                        }

                        // Important: make sure the view has access to the newly created CIDs
                        // We update the view data now:
                        $this->with(['embeddedImages' => $this->embeddedImages]);
                    });
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your Order Confirmation - #' . $this->order->order_number,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.orders.confirmation',
            with: [
                'order' => $this->order,
                'embeddedImages' => $this->embeddedImages,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
