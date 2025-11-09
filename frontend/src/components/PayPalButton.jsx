import { useEffect } from "react";

function PayPalButton({ amount, onSuccess }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=TU_CLIENT_ID&currency=USD`;
    script.addEventListener("load", () => {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: amount } }],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            console.log("Pago completado:", details);
            onSuccess(details); // Aquí notificas que el pago se realizó
          });
        },
        onCancel: () => {
          console.log("Pago cancelado");
        },
        onError: (err) => {
          console.error("Error en el pago:", err);
        },
      }).render("#paypal-button-container");
    });
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, []);

  return <div id="paypal-button-container"></div>;
}

export default PayPalButton;
