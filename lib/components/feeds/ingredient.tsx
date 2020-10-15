import React,{useState} from "react";
import { Table,Modal,Button } from "@geist-ui/react";

// "부산물 (4D)" 1
// "소화물 (4D)" 2
// "가루(4D)" 3
// "곡물" 4
// "BHT" 5

// "BHA" 6 
// "에톡시퀸" 7
// "동물성기름" 8
// "소르빈산칼륨" 9
// "글리시리진" 10

// "비트펄프" 11
// "아질산 나트륨" 12
// "적색 40호" 13
// "청색 2호" 14 
// "적색 3호" 15

// "황색 5호" 16
// "청색 3호" 17 
// "적색 2호" 18
// "황색 104호" 19
// "황색 6호" 20

// "청색 1호" 21


const data = [
"부산물 (4D)","소화물 (4D)","가루(4D)","곡물","BHT",
"BHA","에톡시퀸","동물성기름","소르빈산칼륨","글리시리진",
"비트펄프","아질산 나트륨","적색 40호","청색 2호","적색 3호",
"황색 5호","청색 3호","적색 2호","황색 104호","황색 6호",
"청색 1호"
]

const Ingredient = ({index}:any) => {
  const [state, setState] = useState(false)
  const handler = () => setState(true)
  const closeHandler = () => {
    setState(false)
  }
  const isWarning = index.length<3?false:true;
  let list:Array<Object> =[];
  data.forEach((ing:String,idx:Number)=>{
    let exist = index.includes(idx)?true:false;
    list.push({ing,exist:exist?"O":"X"})
    })


  return (
    <div>
    <Button auto onClick={handler} type={isWarning?"error":"success"} ghost>유해 성분 :{index.length}개</Button>
    <Modal open={state} onClose={closeHandler}>
      <Modal.Content>
        <Table data={list}>
            <Table.Column prop="ing" label="성분" />
            <Table.Column prop="exist" label="여부" />
        </Table>
      </Modal.Content>
      <Modal.Action passive onClick={() => setState(false)}>EXIT</Modal.Action>
    </Modal>
  </div>
  );
};

export default Ingredient;
