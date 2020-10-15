import React from "react";
import { Table } from "@geist-ui/react";

const weightConverter = (kg:any,price:any) =>{
  //100g 당 가격
  return  Math.round(price/(kg*10))
}

const Price = ({data}:any) => {

  data.forEach((element:any,idx:any) => {
    data[idx].day = weightConverter(element.kg,element.price);
  });

  return (
    <Table data={data}>
      <Table.Column prop="kg" label="무게(kg)" />
      <Table.Column prop="price" label="가격(원)" />
      <Table.Column prop="day" label="100g 당 가격(원)" />
    </Table>
  );

};

export default Price;
