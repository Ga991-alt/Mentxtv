// "use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const startPayment = () => {
    const options = {
      key: "rzp_live_RFNWV0xDii2I1x", // 🔑 Replace with your Razorpay Test Key ID
      amount: 100, // Amount in paise (₹500 = 50000)
      currency: "INR",
      name: "MentxTv",
      description: "Session Payment",
      handler: function (response: any) {
        alert("Payment Successful!");
        console.log("Payment Response:", response);
        console.log("Payment ID:", response.razorpay_payment_id);
        console.log("Order ID:", response.razorpay_order_id);
        console.log("Signature:", response.razorpay_signature);
      },
      prefill: {
        name: "Charan Raj",
        email: "charan@example.com",
        contact: "8088631581",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
      <p className="mb-4">Pay securely with Razorpay</p>
      <Button onClick={startPayment}>Pay ₹1</Button>
    </div>
  );
}
