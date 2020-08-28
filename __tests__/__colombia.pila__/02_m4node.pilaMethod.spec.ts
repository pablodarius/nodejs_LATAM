import { M4ApiNodejs } from "@automation/m4nodejs";
import { M4ApiNode } from "@automation/m4nodejs/dist/m4apiNode";
import { request } from "http";
import { M4Request } from "@automation/m4nodejs/dist/m4Interfaces/M4Request";
import { doesNotMatch } from "assert";

describe("METHOD Logon M4Nodejs Suite", ()=>{

    let m4Nodejs: M4ApiNode = null;

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

    beforeAll( async()=>{
        m4Nodejs = await M4ApiNodejs("http://rdserverw10.meta4.com:40060", "M4ADM", "M4ADM");
    })

    it("METHOD Should create an instance", ()=>{
        expect(m4Nodejs).toBeTruthy();
    })

    it("METHOD Should do logon", async()=>{
        const m4LogonResult = await m4Nodejs.logon();
        expect(m4LogonResult.getToken()).toBeTruthy();
    });

    it("METHOD TipoCotizante NOT 23 for Planilla-E", async(done)=>{
        const m4ObjAutoLiq = await m4Nodejs.createM4Object("SCB_PY_LR_AUTOLIQUIDACION");
        const m4NodeEmp = m4ObjAutoLiq.getNode("SCB_EMPRESA");
       /* const m4NodeAutoLiqNums = m4ObjAutoLiq.getNode("SCB_H_HR_AUTOLIQ_NUMS");
        const m4NodeSalidaTXT = m4ObjAutoLiq.getNode("SCB_SALIDA_TXT");
        const m4NodeSalidaLOG = m4ObjAutoLiq.getNode("SCB_SALIDA_LOG");*/
        
        m4NodeEmp.setValue("SCB_P_LEG_ENT", "0001")
        m4NodeEmp.setValue("SCB_P_SUCURSAL", "")
        m4NodeEmp.setValue("SCB_P_MES", 11)
        m4NodeEmp.setValue("SCB_P_ANIO", 2019)        
        m4NodeEmp.setValue("SCB_P_INFORME", 1)        
        m4NodeEmp.setValue("SCB_P_PATH", "c:\\temp\\pila.txt")
        m4NodeEmp.setValue("SCB_P_TIPO_PLANILLA", "E")   
        let date: Date = new Date("1800-01-01");  
        m4NodeEmp.setValue("SCB_P_FECHA_EFECTIVA", date)
        m4NodeEmp.setValue("SCB_P_FECHA_PLANILLA", date)    
        m4NodeEmp.setValue("SCB_P_NUM_PLANILLA", "1")    
        m4NodeEmp.setValue("SCB_P_PATH_ZIP", "") 
        m4NodeEmp.setValue("SCB_P_PLANIFICADO", 0)
        m4NodeEmp.setValue("SCB_P_TIPO_PATH", 0)
          
        /*               
        m4NodeEmp.setValue("SCB_P_PAGO_PILA", 0)
        m4NodeEmp.setValue("SCB_P_MES_SERVICIO", 12)
        m4NodeEmp.setValue("SCB_P_ANIO_SERVICIO", 2019)        
        let date: Date = new Date("1800-01-01");  
        m4NodeEmp.setValue("SCB_P_FECHA_EFECTIVA", date)
        m4NodeEmp.setValue("SCB_P_FECHA_PLANILLA", date)
        m4NodeEmp.setValue("SCB_P_TOTAL_IBC_PARAF", 0)
        m4NodeEmp.setValue("SCB_VALOR_TOTAL", 0)
        m4NodeEmp.setValue("SCB_P_EXISTE_ZIP", 0)
        m4NodeEmp.setValue("SCB_P_DT_START", date)
        m4NodeEmp.setValue("SCB_P_DT_END", date)
        m4NodeEmp.setValue("SCB_P_BOXNAME", "")
        m4NodeEmp.setValue("SCB_P_BOXLIST", "")
        m4NodeEmp.setValue("SCB_P_APORT_EXONERADO", "")
        m4NodeEmp.setValue("SCB_NUM_EMP", 0)
        m4NodeEmp.addRecord()
        m4NodeAutoLiqNums.addRecord()
        m4NodeSalidaTXT.addRecord()
        m4NodeSalidaLOG.addRecord()
        */

        m4Nodejs.executeM4ObjectMethod(m4ObjAutoLiq,"SCB_EMPRESA",
        "PVT_PLANILLA_INTEGRADA",[]).then((requestSuccess : M4Request)=>{
            console.log("Error Pila "+requestSuccess.getErrorCode());
            expect(true).toBeTruthy();
            done();
        }).catch((requestError : M4Request)=>{
            const _errorCode = requestError.getErrorCode();
            const _errorException = requestError.getErrorException();
            const _errorMsg = requestError.getErrorMessage();
            expect(false).toBeTruthy();
            done.fail();
        });

        const m4NodeAutoLiq = m4ObjAutoLiq.getNode("SCB_H_HR_AUTOLIQ");
        
        for (let _counter = 0; _counter < m4NodeAutoLiq.count(); _counter++) {
            m4NodeAutoLiq.moveTo(_counter);            
            expect(m4NodeAutoLiq.getValue("SCB_CAMPO5")).not.toEqual("23");
        }                
    });

});