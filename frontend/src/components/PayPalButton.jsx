import { useEffect } from "react";

function PayPalButton({ amount, onSuccess, onError, onCancel }) {
  useEffect(() => {
    const CLIENT_ID = "AURqz2S_Oy-E2Y4QBFstJzJ6BgukOjqiQJqdbXhZKIDqQoxyNM4_tiRH96n_NkjOnIhqGHvUUzz9ZBiq";

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}&currency=USD`;
    script.async = true;
    
    script.addEventListener("load", () => {
      if (window.paypal) {
        window.paypal.Buttons({
          style: {
            layout: 'vertical',
            color: 'blue',
            shape: 'rect',
            height: 45,
            label: 'pay',
            tagline: false
          },
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{ 
                amount: { 
                  value: amount.toString(),
                  currency_code: "USD"
                } 
              }],
            });
          },
          onApprove: async (data, actions) => {
            try {
              const details = await actions.order.capture();
              onSuccess(details);
            } catch (error) {
              onError(error);
            }
          },
          onCancel: onCancel,
          onError: onError,
        }).render("#paypal-button-container");
      }
    });

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [amount, onSuccess, onError, onCancel]);

  return (
    <div className="w-full min-h-[400px]">
      <div id="paypal-button-container" className="w-full h-full"></div>
    </div>
  );
}

export default PayPalButton;