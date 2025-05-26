import React from "react";
import { useTranslation } from "react-i18next";

function Pay({
  fname,
  lname,
  amount,
  email,
  tx_ref,
  propertyId,
  propertyType,
  listingtype,
}) {
  // const txRef="reference2"
  // const txRef1=txRef;

  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const fronturl =
    "https://68346d7a92edde0092850cfd--brokeringwebfrontend.netlify.app/";
  return (
    <div>
      <form method="POST" action="https://api.chapa.co/v1/hosted/pay">
        <input
          type="hidden"
          name="public_key"
          value="CHAPUBK_TEST-u0mP18OHf036053E2KyGzuPlmY72uBHS"
        />
        <input type="hidden" name="tx_ref" value={tx_ref} />

        <input type="hidden" name="amount" value={amount} />
        <input type="hidden" name="currency" value="ETB" />
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="first_name" value={fname} />
        <input type="hidden" name="last_name" value={lname} />
        <input type="hidden" name="title" value="Let us do this" />
        <input
          type="hidden"
          name="description"
          value="Paying with Confidence with cha"
        />
        <input
          type="hidden"
          name="logo"
          value="https://chapa.link/asset/images/chapa_swirl.svg"
        />
        <input type="hidden" name="callback_url" value={`/payfailed`} />
        <input
          type="hidden"
          name="return_url"
          value={`${fronturl}/paysuccess/${listingtype}/${propertyType}/${propertyId}/${tx_ref}`}
        />
        {/* <input type="hidden" name="return_url" value={`http://localhost:3000/paysuccess/${txRef1 || "notxref"}`} /> */}

        <input type="hidden" name="meta[title]" value="test" />
        <button type="submit" className="submit-btn">
          {t(`Pay Now`)}
        </button>
      </form>
    </div>
  );
}

export default Pay;
