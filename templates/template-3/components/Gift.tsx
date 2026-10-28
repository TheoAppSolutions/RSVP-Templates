import Image from "next/image";
import { GIFT } from "@/templates/template-3/lib/event";

export default function Gift() {
  return (
    <section className="gift-section section-pad" aria-labelledby="gift-title">
      <div className="section-wrap gift-layout">
        <div className="gift-copy"><span className="eyebrow">05 / With gratitude</span><h2 id="gift-title" className="display-heading">Your presence is <em>our present</em></h2><p>{GIFT.message}</p><span className="gift-signature">With all our love, <i>Raymund &amp; Vanessa</i></span></div>
        {GIFT.qr && <figure className="gift-qr"><div><Image src={GIFT.qr} alt="Gift QR code" width={600} height={600} sizes="240px" /></div><figcaption>{GIFT.qrLabel}</figcaption></figure>}
      </div>
    </section>
  );
}
