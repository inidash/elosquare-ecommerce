<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>New Order Alert - {{ config('app.name') }}</title>
</head>
<body style="font-family: 'Inter', Arial, sans-serif; background-color: #f7f7f7; padding: 30px; color: #222;">
    @include('emails.partials.header')
    <div style="max-width: 700px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
        
        {{-- Header --}}
        <div style="background-color: #14532d; color: #fff; padding: 20px 30px;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 600;">New Order Received</h1>
            <p style="margin: 5px 0 0;">Order #{{ $order->order_number }}</p>
        </div>

        {{-- Body --}}
        <div style="padding: 30px;">
            <p style="font-size: 16px;">Hello <strong>{{ $vendor->business_name }}</strong>,</p>
            <p>Good news! You have a new order containing the following items from a customer:</p>

            <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse: collapse; border: 1px solid #eee; margin-top: 15px;">
                <thead>
                    <tr style="background-color: #f3f4f6;">
                        <th align="left">Product</th>
                        <th align="center">Qty</th>
                        <th align="right">Total</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($items as $item)
                        <tr style="border-bottom: 1px solid #f0f0f0;">
                            <td style="display: flex; align-items: center; gap: 10px;">
                                @if ($item->product_image)
                                    <!-- <img src="{{ asset('storage/'.$item->product_image) }}" width="50" height="50" style="border-radius: 5px; object-fit: cover;"> -->
                                    <img src="{{ $item->product_image }}" width="50" height="50" style="border-radius: 5px; object-fit: cover;">
                                @endif
                                <div>
                                    <div style="font-weight: 600;">{{ $item->product_name }}</div>
                                </div>
                            </td>
                            <td align="center">{{ $item->quantity }}</td>
                            <td align="right">₦{{ number_format($item->total_price, 2) }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>

            <p style="margin-top: 25px;">Please prepare the above items for dispatch or contact the store admin for pickup arrangements.</p>
            <p style="margin-top: 10px;">Thank you for being part of <strong>{{ config('app.name') }}</strong>!</p>
        </div>

        <div style="padding: 30px;">
            <h3 style="font-size: 18px; margin-bottom: 10px;">Order Details</h3>
            <p><strong>Customer Name:</strong> {{ $order->billing_first_name }} {{ $order->billing_last_name }}</p>
            <p><strong>Order Number:</strong> {{ $order->order_number }}</p>
            <p><strong>Order Date:</strong> {{ $order->created_at->format('F j, Y, g:i a') }}</p>
            <p><strong>Payment Method:</strong> {{ $order->payment_method }}</p>
            <p><strong>Payment Status:</strong> {{ $order->payment_status }}</p>
            <p><strong>Shipping Method:</strong> {{ $order->shipping_method }}</p>
            <p><strong>Billing Address:</strong> {{ $order->billing_address }}</p>
            <p><strong>Shipping Address:</strong> {{ $order->shipping_address }}</p>
            <p><strong>Order Status:</strong> {{ $order->status }}</p>
            <p><strong>Total Amount:</strong> ₦{{ number_format($order->total, 2) }}</p>
        </div>
    </div>
    @include('emails.partials.footer')
</body>
</html>