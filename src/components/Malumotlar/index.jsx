import React from "react";
import Card from "../Card";
import { Container } from "./style";

const Malumotlar = () => {
  const cardData = [
    {
      title: 'Toshkent shahri atmosfera havosi',
      url: 'https://www.whereandwhen.net/site/images/illustration/tachkent_575.jpg',
      text: 'Toshkentda yashil hudud kamaygan. Jumladan, daraxtlar va butalarning kesilishiga e’lon qilingan moratoriy davrida 49 mingga yaqin daraxtlar noqonuniy kesilgan.'
    },
    {
      title: 'Toshkent ichimlik suv sifati',
      url: 'https://hudud24.uz/media/uploads/2023/10/ichimlik-suvi.jpg',
      text: 'Toshkent suv taʼminoti” MChJ tassarufida 13 ta laboratoriyalar mavjud, shulardan, 5 tasi oqova suvlar boʼyicha kimyo bakteriologik laboratoriyasi qolgan 7 tasi ichimlik .'
    },
    {
      title: 'Toshkentda zavod va fabrikalar',
      url: 'https://ttz.uz/wp-content/uploads/2022/02/trubniy-zavod-2.png',
      text: 'Yellowpages.uz Sement zavodlar Toshkentda turkumiga oid so’rov ma’lumotlarni taqdim etadi. Bu yerda ularning telefonlari, manzillari, joylashuvi '
    },
    {
      title: 'Toshkent shahri avto transporti',
      url: 'https://vzglyad.uz/wp-content/uploads/2024/02/photo_2024-02-23_10-53-40.jpg',
      text: '2020-yilning 1-yanvar holatiga ko‘ra, O‘zbekistonda jismoniy shaxslarga tegishli bo‘lgan avtotransport vositalarining soni 2 580 133 tani tashkil etgan.'
    }
  ];

  return (
    <>
      <h1 style={{backgroundColor:'white' , color:'#1976d2' ,padding:'20px 30px'}}>Foydali malumotlar</h1>
      <Container>
        {
          cardData.map((value, index) => {
            return <Card key={index} value={value} />
          })
        }
      </Container>
    </>
  );
};

export default Malumotlar;
