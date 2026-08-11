<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width"/>
  <title>Order Item Cancelled</title>
  <style>
    body { margin:0; padding:0; background:#f8fafc; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; }
    .container { max-width:680px; margin:24px auto; }
    .card { background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 1px 6px rgba(2,6,23,0.06); }
    .header { padding:16px 20px; background:#111827; color:#fff; }
    .header h2 { margin:0; font-size:16px; font-weight:600; }
    .body { padding:20px; color:#0f172a; font-size:14px; }
    .meta { margin-bottom:12px; color:#6b7280; font-size:13px; }
    .item { display:flex; gap:12px; align-items:center; border-top:1px solid #eef2f7; padding-top:12px; margin-top:12px; }
    .item img { width:64px; height:64px; object-fit:cover; border-radius:6px; background:#f3f4f6; }
    .item-details { flex:1; }
    .item-title { font-weight:600; margin-bottom:6px; }
    .small { font-size:13px; color:#6b7280; }
    .footer { padding:16px 20px; text-align:center; font-size:13px; color:#9ca3af; }
  </style>
</head>
<body>
     @includeif('emails.partials.header')
  <div class="container">
    <div class="card">
      <div class="header">
        <h2>Cancellation Notice — Order #{{ $item->order_id }}</h2>
      </div>

      <div class="body">
        <p class="meta">Hello <strong>{{ $item->product->vendor->name ?? 'Vendor' }}</strong>,</p>

        <p class="small">A customer has cancelled an order which included your product. Please review the details below and update your vendor dashboard if required.</p>

        <div class="item" role="article">
          @if(optional($item->product)->image)
            <img src="{{ $item->product->image }}" alt="{{ $item->product->name }}">
          @endif
          <div class="item-details">
            <div class="item-title">{{ $item->product->name }}</div>
            <div class="small">Quantity: {{ $item->quantity }} &nbsp; • &nbsp; Price: ₦{{ number_format($item->unit_price, 2) }}</div>
            <div style="margin-top:8px;" class="small">Order ID: <strong>#{{ $item->order_id }}</strong></div>
          </div>
        </div>

        <p style="margin-top:16px;" class="small">If you believe this cancellation is in error, please contact support immediately.</p>
      </div>

      @includeif('emails.partials.footer')
    </div>
  </div>
</body>
</html>
