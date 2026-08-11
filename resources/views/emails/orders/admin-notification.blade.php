<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>New Order Received - {{ config('app.name') }}</title>
</head>
<body style="font-family: 'Inter', Arial, sans-serif; background-color: #f7f7f7; padding: 30px; color: #222;">
    @include('emails.partials.header')
    <div style="max-width: 700px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
        
        {{-- Header --}}
        <div style="background-color: #1e3a8a; color: #fff; padding: 20px 30px;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 600;">New Order Placed</h1>
            <p style="margin: 5px 0 0;">Order #{{ $order->order_number }}</p>
        </div>

        {{-- Body --}}
        <div style="padding: 30px;">
            <p><strong>Customer:</strong> {{ $order->billing_first_name }} {{ $order->billing_last_name }} ({{ $order->billing_email }})</p>
            <p><strong>Total:</strong> ₦{{ number_format($order->total_price, 2) }}</p>

            <h3 style="margin-top: 25px; margin-bottom: 10px;">Order Details</h3>

            <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse: collapse; border: 1px solid #eee;">
                <thead>
                    <tr style="background-color: #f3f4f6;">
                        <th align="left">Product</th>
                        <th align="center">Vendor</th>
                        <th align="center">Qty</th>
                        <th align="right">Total</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($order->orderItems as $item)
                        <tr style="border-bottom: 1px solid #f0f0f0;">
                            <td>{{ $item->product_name }}</td>
                            <td align="center">{{ $item->product->vendor->business_name ?? 'N/A' }}</td>
                            <td align="center">{{ $item->quantity }}</td>
                            <td align="right">₦{{ number_format($item->total_price, 2) }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>

            <p style="margin-top: 25px;">You can review this order in the admin dashboard.</p>
        </div>

        {{-- Footer --}}
        
    </div>
    @include('emails.partials.footer')
</body>
</html>
