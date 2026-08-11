<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  body { font-family: 'Arial', sans-serif; background-color:#f9fafb; padding:30px; }
  .card { background-color:#fff; border-radius:8px; padding:25px; box-shadow:0 2px 6px rgba(0,0,0,0.05); }
  .title { font-size:20px; font-weight:700; color:#111827; margin-bottom:10px; }
  .text { color:#374151; line-height:1.6; font-size:14px; }
  .button { display:inline-block; background-color:#dc2626; color:#fff; text-decoration:none; padding:10px 18px; border-radius:6px; margin-top:15px; }
</style>
</head>
<body>
  @include('emails.partials.header')

  <div class="card">
    <h1 class="title">Low Stock Alert ⚠️</h1>
    <p class="text">
      Dear {{ $vendor->business_name }},<br><br>
      Your product <strong>{{ $product->name }}</strong> is running low on stock.
    </p>
    <p class="text">
      Remaining Quantity: <strong>{{ $product->quantity }}</strong><br>
      Total Sales: <strong>{{ $product->sales }}</strong>
    </p>

    <p class="text">Kindly rush to your dashboard and restock the product.</p>
  </div>

  @include('emails.partials.footer')
</body>
</html>
