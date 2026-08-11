<!-- <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Order Confirmation - {{ config('app.name') }}</title>
</head>
<body style="font-family: 'Inter', Arial, sans-serif; background-color: #f7f7f7; padding: 30px; color: #222;">
    @include('emails.partials.header')
    <div style="max-width: 700px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
        
        {{-- Header --}}
        <div style="background-color: #111827; color: #fff; padding: 20px 30px;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 600;">Order Confirmation</h1>
            <p style="margin: 5px 0 0;">Order #{{ $order->order_number }}</p>
        </div>

        {{-- Body --}}
        <div style="padding: 30px;">
            <p style="font-size: 16px;">Hi <strong>{{ $order->billing_first_name }}</strong>,</p>
            <p>Thank you for shopping with us! We’ve received your order and it’s now being processed.</p>

            <div style="margin-top: 20px; margin-bottom: 25px;">
                <h3 style="font-size: 18px; margin-bottom: 10px;">Order Summary</h3>

                <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse: collapse; border: 1px solid #eee;">
                    <thead>
                        <tr style="background-color: #f3f4f6;">
                            <th align="left" style="border-bottom: 1px solid #e5e7eb;">Product</th>
                            <th align="center" style="border-bottom: 1px solid #e5e7eb;">Qty</th>
                            <th align="right" style="border-bottom: 1px solid #e5e7eb;">Unit</th>
                            <th align="right" style="border-bottom: 1px solid #e5e7eb;">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($order->orderItems as $item)
                        <tr style="border-bottom: 1px solid #f0f0f0;">
                            <td style="display: flex; align-items: center; gap: 10px;">
                                @php
                                    $imageCid = $embeddedImages[$item->id] ?? null;
                                @endphp

                                @if ($imageCid)
                                    <img src="{{ $imageCid }}"
                                        width="60"
                                        height="60"
                                        alt="Product Image"
                                        style="border-radius: 6px; object-fit: cover;">
                                @else
                                    <img src="{{ asset('images/no-image.jpg') }}"
                                        width="60"
                                        height="60"
                                        alt="No Image"
                                        style="border-radius: 6px; object-fit: cover;">
                                @endif
  
                                <div>
                                    <div style="font-weight: 600;">{{ $item->product_name }}</div>

                                    {{-- Variation display --}}
                                    @if (is_array($item->variation_data))
                                        <small style="color: #666;">
                                            {{ collect($item->variation_data)->map(function ($val, $key) {
                                                if (is_array($val)) {
                                                    return collect($val)->map(function ($v, $k) {
                                                        return is_string($k) ? "$k: $v" : $v;
                                                    })->implode(', ');
                                                }
                                                return is_string($key) ? "$key: $val" : $val;
                                            })->implode(', ') }}
                                        </small>
                                    @elseif (!empty($item->variation_data))
                                        <small style="color: #666;">{{ $item->variation_data }}</small>
                                    @endif
                                </div>
                            </td>

                            <td align="center" style="font-weight: 500;">{{ $item->quantity }}</td>
                            <td align="right">₦{{ number_format($item->unit_price, 2) }}</td>
                            <td align="right" style="font-weight: 600;">₦{{ number_format($item->total_price, 2) }}</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>

                {{-- Totals --}}
                <table width="100%" cellpadding="6" cellspacing="0" style="margin-top: 15px;">
                    <tr>
                        <td align="right" style="color: #555;">Subtotal:</td>
                        <td align="right" style="width: 120px;">₦{{ number_format($order->subtotal, 2) }}</td>
                    </tr>
                    <tr>
                        <td align="right" style="color: #555;">Shipping:</td>
                        <td align="right">₦{{ number_format($order->shipping_amount, 2) }}</td>
                    </tr>
                    <tr>
                        <td align="right" style="color: #555;">Discount:</td>
                        <td align="right">₦{{ number_format($order->discount_amount, 2) }}</td>
                    </tr>
                    <tr>
                        <td align="right" style="font-weight: 700; font-size: 16px;">Grand Total:</td>
                        <td align="right" style="font-weight: 700; font-size: 16px;">₦{{ number_format($order->total_price, 2) }}</td>
                    </tr>
                </table>
            </div>

            {{-- Shipping Info --}}
            <div style="margin-top: 25px;">
                <h3 style="font-size: 18px; margin-bottom: 10px;">Shipping Address</h3>
                <p style="margin: 0; color: #444;">
                    {{ $order->shipping_first_name }} {{ $order->shipping_last_name }}<br>
                    {{ $order->shipping_address }}<br>
                    {{ $order->shipping_city }}, {{ $order->shipping_state }}<br>
                    {{ $order->shipping_country }}<br>
                    Phone: {{ $order->shipping_phone ?? $order->billing_phone }}
                </p>
            </div>

            <div style="margin-top: 25px; text-align: center;">
                <p>Need help? <a href="{{ config('app.url') }}/contact" style="color: #2563eb; text-decoration: none;">Contact our support team</a>.</p>
            </div>
        </div>
    </div>
    @include('emails.partials.footer')
</body>
</html> -->



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Order Confirmation - {{ config('app.name') }}</title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 30px; color: #222;">

    {{-- Optional header include --}}
    @includeIf('emails.partials.header')

    <div style="max-width: 700px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">

        {{-- HEADER --}}
        <div style="background-color: #111827; color: #fff; padding: 20px 30px;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 600;">Order Confirmation</h1>
            <p style="margin: 5px 0 0;">Order #{{ $order->order_number }}</p>
        </div>


        {{-- BODY --}}
        <div style="padding: 30px;">
            <p style="font-size: 16px;">Hi <strong>{{ $order->billing_first_name }}</strong>,</p>
            <p>Thank you for shopping with us! We’ve received your order and it’s now being processed.</p>


            {{-- ORDER SUMMARY --}}
            <div style="margin-top: 20px; margin-bottom: 25px;">

                <h3 style="font-size: 18px; margin-bottom: 10px;">Order Summary</h3>

                <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse: collapse; border: 1px solid #eee;">
                    <thead>
                        <tr style="background-color: #f3f4f6;">
                            <th align="left" style="border-bottom: 1px solid #e5e7eb;">Product</th>
                            <th align="center" style="border-bottom: 1px solid #e5e7eb;">Qty</th>
                            <th align="right" style="border-bottom: 1px solid #e5e7eb;">Unit</th>
                            <th align="right" style="border-bottom: 1px solid #e5e7eb;">Total</th>
                        </tr>
                    </thead>

                    <tbody>
                    @foreach ($order->orderItems as $item)
                        <tr style="border-bottom: 1px solid #f0f0f0;">
                            <td style="display: flex; align-items: center; gap: 10px;">

                                {{-- PRODUCT IMAGE --}}
                                @php
                                    $imgSrc = $embeddedImages[$item->id] ?? asset('images/no-image.jpg');
                                @endphp

                                <img
                                    src="{{ $imgSrc }}"
                                    width="60"
                                    height="60"
                                    style="border-radius: 6px; object-fit: cover;"
                                    alt="Product Image"
                                >

                                <div>
                                    <div style="font-weight: 600;">{{ $item->product_name }}</div>

                                    {{-- VARIATION --}}
                                    @if (is_array($item->variation_data))
                                        <small style="color: #666;">
                                            {{ collect($item->variation_data)->map(function ($val, $key) {
                                                if (is_array($val)) {
                                                    return collect($val)->map(function ($innerVal, $innerKey) {
                                                        return is_string($innerKey) ? "$innerKey: $innerVal" : $innerVal;
                                                    })->implode(', ');
                                                }
                                                return is_string($key) ? "$key: $val" : $val;
                                            })->implode(', ') }}
                                        </small>
                                    @elseif (!empty($item->variation_data))
                                        <small style="color: #666;">{{ $item->variation_data }}</small>
                                    @endif
                                </div>
                            </td>

                            <td align="center" style="font-weight: 500;">{{ $item->quantity }}</td>
                            <td align="right">₦{{ number_format($item->unit_price, 2) }}</td>
                            <td align="right" style="font-weight: 600;">₦{{ number_format($item->total_price, 2) }}</td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>


                {{-- TOTALS --}}
                <table width="100%" cellpadding="6" cellspacing="0" style="margin-top: 15px;">
                    <tr>
                        <td align="right" style="color: #555;">Subtotal:</td>
                        <td align="right" style="width: 120px;">₦{{ number_format($order->subtotal, 2) }}</td>
                    </tr>
                    <tr>
                        <td align="right" style="color: #555;">Shipping:</td>
                        <td align="right">₦{{ number_format($order->shipping_amount, 2) }}</td>
                    </tr>
                    <tr>
                        <td align="right" style="color: #555;">Discount:</td>
                        <td align="right">₦{{ number_format($order->discount_amount, 2) }}</td>
                    </tr>
                    <tr>
                        <td align="right" style="font-weight: 700; font-size: 16px;">Grand Total:</td>
                        <td align="right" style="font-weight: 700; font-size: 16px;">₦{{ number_format($order->total_price, 2) }}</td>
                    </tr>
                </table>
            </div>


            {{-- SHIPPING INFO --}}
            <div style="margin-top: 25px;">
                <h3 style="font-size: 18px; margin-bottom: 10px;">Shipping Address</h3>
                <p style="margin: 0; color: #444;">
                    {{ $order->shipping_first_name }} {{ $order->shipping_last_name }}<br>
                    {{ $order->shipping_address }}<br>
                    {{ $order->shipping_city }}, {{ $order->shipping_state }}<br>
                    {{ $order->shipping_country }}<br>
                    Phone: {{ $order->shipping_phone ?? $order->billing_phone }}
                </p>
            </div>


            {{-- FOOTER --}}
            <div style="margin-top: 25px; text-align: center;">
                <p>
                    Need help?
                    <a href="{{ config('app.url') }}/contact" style="color: #2563eb; text-decoration: none;">
                        Contact our support team
                    </a>.
                </p>
            </div>

        </div>

    </div>

    {{-- Optional footer include --}}
    @includeIf('emails.partials.footer')

</body>
</html>
