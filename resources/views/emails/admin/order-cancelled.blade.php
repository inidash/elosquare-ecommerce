<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width"/>
  <title>Order Cancellation Alert</title>
  <style>
    body { margin:0; padding:0; background:#f1f5f9; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; }
    .container { max-width:720px; margin:24px auto; }
    .card { background:#fff; border-radius:8px; box-shadow:0 2px 12px rgba(2,6,23,0.04); overflow:hidden; }
    .header { background:#dc2626; color:#fff; padding:14px 18px; }
    .header h3 { margin:0; font-size:16px; }
    .body { padding:18px; color:#0f172a; font-size:14px; }
    .grid { display:block; }
    .meta { margin-bottom:12px; color:#6b7280; }
    .table { width:100%; border-collapse:collapse; margin-top:8px; }
    .table th, .table td { padding:10px 8px; border-bottom:1px solid #eef2f7; text-align:left; font-size:13px; }
    .footer { padding:16px 18px; font-size:12px; color:#9ca3af; text-align:center; }
  </style>
</head>
<body>
    @includeif('emails.partials.header')
  <div class="container">
    <div class="card">
      <div class="header">
        <h3>Order Cancelled — #{{ $order->id }}</h3>
      </div>

      <div class="body">
        <p class="meta">User: <strong>{{ $order->user->name }} ({{ $order->user->email }})</strong></p>

        <table class="table" role="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Vendor</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            @foreach($order->orderItems as $i)
              <tr>
                <td>{{ $i->product->name }}</td>
                <td>{{ $i->product->vendor->name ?? '—' }}</td>
                <td>{{ $i->quantity }}</td>
                <td>₦{{ number_format($i->unit_price, 2) }}</td>
              </tr>
            @endforeach
          </tbody>
        </table>

        <p style="margin-top:12px;">Order Total: <strong>₦{{ number_format($order->total_price, 2) }}</strong></p>
        <p class="meta">Refund status: <strong>{{ $order->refund_status ?? 'pending' }}</strong></p>

        <p class="meta">Action required: Please review the refund (if applicable) and confirm the cancellation in the admin dashboard.</p>

        <p><a href="{{ url('/admin/orders/'.$order->id) }}" style="display:inline-block;padding:10px 14px;background:#111827;color:#fff;border-radius:6px;text-decoration:none;">Open Order</a></p>
      </div>

      @includeif('emails.partials.footer')
    </div>
  </div>
</body>
</html>
