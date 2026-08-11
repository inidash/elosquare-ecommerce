<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width"/>
  <title>Order Cancelled</title>
  <style>
    /* Basic reset */
    body { margin:0; padding:0; background:#f4f6f8; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; }
    .container { width:100%; max-width:680px; margin:24px auto; }
    .card { background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(18,38,63,0.06); }
    .header { padding:20px 24px; background:linear-gradient(90deg,#0ea5a0,#2563eb); color:#fff; }
    .header h1 { margin:0; font-size:20px; font-weight:600; }
    .body { padding:24px; color:#0f172a; font-size:14px; line-height:1.45; }
    .muted { color:#6b7280; font-size:13px; }
    .order-table { width:100%; border-collapse:collapse; margin-top:16px; }
    .order-table th, .order-table td { padding:10px 8px; text-align:left; border-bottom:1px solid #eef2f7; font-size:13px; }
    .order-total { text-align:right; padding-top:12px; font-weight:700; }
    .cta { display:inline-block; margin-top:18px; padding:10px 16px; background:#2563eb; color:#fff; text-decoration:none; border-radius:6px; }
    .footer { padding:16px 24px; text-align:center; font-size:12px; color:#9ca3af; }
    .small { font-size:12px; color:#9ca3af; }
    @media (max-width:480px) {
      .header h1 { font-size:18px; }
      .body { padding:16px; }
    }
  </style>
</head>
<body>
     @includeif('emails.partials.header')
  <div class="container">
    <div class="card">
      <div class="header">
        <h1>Order Cancelled — #{{ $order->id }}</h1>
      </div>

      <div class="body">
        <p>Hi <strong>{{ $order->user->name ?? 'Customer' }}</strong>,</p>

        <p class="muted">We’ve received your cancellation request for order <strong>#{{ $order->id }}</strong>. The order has been <strong>cancelled</strong>.</p>

        <table class="order-table" role="presentation">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            @foreach($order->orderItems as $item)
              <tr>
                <td>{{ $item->product->name }}</td>
                <td>{{ $item->quantity }}</td>
                <td>{{ number_format($item->unit_price, 2) }}</td>
              </tr>
            @endforeach
          </tbody>
        </table>

        <p class="order-total">Order Total: ₦{{ number_format($order->total_price, 2) }}</p>

        <p class="muted">Refund status: <strong>{{ $order->refund_status ?? 'pending' }}</strong></p>

        <a href="{{ url('/orders/'.$order->id) }}" class="cta">View Order</a>

        <hr style="margin:20px 0; border:none; border-top:1px solid #eef2f7;">

        <p class="small">If you have questions, reply to this email or contact our support at <a href="mailto:infoelosquare@gmail.com">infoelosquare@gmail.com</a>.</p>
      </div>

      @includeif('emails.partials.footer')
    </div>
  </div>
</body>
</html>
