import React, { useState, useEffect } from "react";
import { Container } from "./style";
import { Slide } from "@mui/material";
import monitoring from '../../assets/icons/monitoring.svg'
import galochka from '../../assets/icons/galochka.svg'
import mezon from '../../assets/icons/mezon.svg'
import zavodIcon from '../../assets/icons/zavodIcon.svg'
const Axborot = () => {
  const [inView, setInView] = useState(false);

  // Set the inView state to true when the component mounts (initial render)
  useEffect(() => {
    setInView(true);
  }, []);

  return (
    <Container>
      <div className="wrap">
        {/* Use Slide component from Material-UI */}
        <Slide in={inView} direction="right" timeout={1000}>
          <div className="cardMonitoring">
            <img src={monitoring} alt="" width={'50px'} />
            <p>
              Toshkent shahar atmosfera havosi ifloslanish darajasining monitoringi
            </p>
          </div>
        </Slide>
        <Slide in={inView} direction="right" timeout={2000}>
          <div className="cardMonitoring">
            <img src={zavodIcon} alt="" width={'50px'} />
            <p>Shahar atmosferasi uchun zararli zavodlar </p>
          </div>
        </Slide>
      </div>
      <div className="wrap">
        <Slide in={inView} direction="right" timeout={3000}>
          <div className="cardMonitoring">
            <img src={galochka} alt="" width={'50px'} />
            <p>Atmosfera sifat nazorati</p>
          </div>
        </Slide>
        <Slide in={inView} direction="right" timeout={4000}>
          <div className="cardMonitoring">
            <img src={mezon} alt="" width={'50px'} />
            <p>Shahar atmosferasi uchun tavsiya qilinayotgan extiyot choralari</p>
          </div>
        </Slide>
      </div>
      <div>
        <p className="eco">{`Ekologik muammolar – Toshkent shahri sanoat chiqindilari, avtomobillarning chiqindi gazlari va turar-joy binolarini isitish tufayli havoning katta ifloslanishi bilan bog'liq muammolarga duch kelmoqda. Qazib olinadigan yoqilg'ilarning yonishi atmosferaga zarrachalar (PM), azot oksidi (NOx), oltingugurt dioksidi (SO2) va uchuvchi organik birikmalar (VOC) kabi ifloslantiruvchi moddalarni chiqaradi. 
Havoning yuqori darajada ifloslanishi nafas olish yo'llari kasalliklari, yurak-qon tomir muammolari va shahar aholisining boshqa sog'liq muammolariga olib keladi. Bolalar, qariyalar va sog'lig'i oldindan mavjud bo'lgan shaxslar kabi zaif aholi guruhlari ayniqsa xavf ostida.

Havo sifatining yomonligi atrof-muhitga ham ta'sir qiladi, jumladan o'simliklarning shikastlanishi, tuproqning degradatsiyasi va suv havzalarining kislotaliligi.
Toshkent shahrida suvning ifloslanishi, birinchi navbatda, oqava suvlarni tozalash infratuzilmasining yetarli darajada emasligi, sanoat chiqindilari va qishloq xoʻjaligi suvlari bilan bogʻliq jiddiy tashvish tugʻdirmoqda. Og'ir metallar, pestitsidlar va organik ifloslantiruvchi moddalar kabi ifloslantiruvchi moddalar er usti va er osti suv manbalarini ifloslantiradi.
Ifloslangan suv inson salomatligi uchun xavf tug'diradi, shu jumladan suv orqali yuqadigan kasalliklarning tarqalishi va zaharli moddalar ta'siridan uzoq muddatli sog'liqqa ta'sir qiladi. Bundan tashqari, ifloslangan suv havzalari suv ekotizimlarini buzadi va biologik xilma-xillikka tahdid soladi.
`}
</p>
      </div>
    </Container>
  );
};

export default Axborot;
