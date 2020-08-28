import { M4ApiNodejs } from "@automation/m4nodejs";
import { M4ApiNode } from "@automation/m4nodejs/dist/m4apiNode";
import { PilaExeAutoliqWrapper } from "./wrapper/PilaExeAutoliqWrapper";
import * as fs from "fs";

describe("M4Nodejs suite P", ()=>{

    let m4Nodejs: M4ApiNode;
    let wrapper: PilaExeAutoliqWrapper;

    beforeAll( async()=>{
        m4Nodejs = await M4ApiNodejs("http://rdserverw10.meta4.com:40060", "M4ADM", "M4ADM");

        //m4Nodejs.__mock__initialize__();
        //m4Nodejs.__mock__setM4ObjectMetadata__("SCB_PY_LR_AUTOLIQUIDACION", fs.readFileSync("./__mocks__/metadata/SCB_PY_LR_AUTOLIQUIDACION.xml", 'utf8'));
    });

    /*beforeEach(async()=>{
        const m4ObjAutoLiq = await m4Nodejs.createM4Object("SCB_PY_LR_AUTOLIQUIDACION"); 
        wrapper = new PilaExeAutoliqWrapper(m4ObjAutoLiq);
    }); */

    it("TipoCotizante NOT 23 for Planilla-E", async()=>{
        const m4ObjAutoLiq = await m4Nodejs.createM4Object("SCB_PY_LR_AUTOLIQUIDACION"); 
        
        await m4Nodejs.executeM4ObjectMethod(m4ObjAutoLiq,"SCB_EMPRESA","PVT_PARAM_LAUNCH",["0001","","11","2019",
        "12","2019",1,"0","c:\\temp\\pila.txt","E",0,"","",1]).catch(function(error) {
            console.error(error);
        });

        const m4NodeAutoLiq = m4ObjAutoLiq.getNode("SCB_H_HR_AUTOLIQ")
        
        for (let _counter = 0; _counter < m4NodeAutoLiq.count(); _counter++) {
            m4NodeAutoLiq.moveTo(_counter);    
            console.log(m4NodeAutoLiq.getValue("SCB_CAMPO5"));        
            expect(m4NodeAutoLiq.getValue("SCB_CAMPO5")).not.toEqual("23");
        }                
    });

});