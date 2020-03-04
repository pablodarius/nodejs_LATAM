import { M4ApiNodejs } from "@automation/m4nodejs";
import { M4ApiNode } from "@automation/m4nodejs/dist/m4apiNode";

describe("Logon M4Nodejs Suite", ()=>{

    let m4Nodejs: M4ApiNode = null;

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 500000;

    beforeAll( async()=>{
        m4Nodejs = await M4ApiNodejs("http://drogo.meta4.com:9020", "USUTRANING_MAN_ESP", "RUN");
        //m4Nodejs = await M4ApiNodejs("http://rdserverw10.meta4.com:40060", "M4ADM", "M4ADM");
    })

    it("Should create an instance", ()=>{
        expect(m4Nodejs).toBeTruthy();
    })

    it("Should do logon", async()=>{
        const m4LogonResult = await m4Nodejs.logon();
        expect(m4LogonResult.getToken()).toBeTruthy();
    });

    it("Should load employee name", async()=>{
        const m4ObjAllPersonInfo = await m4Nodejs.createM4Object("PLCO_LOAD_ALL_PERSONAL_INFO");
        await m4Nodejs.executeM4ObjectMethod(m4ObjAllPersonInfo, "PLCO_PERSONAL_EMPLOYEE_INFORMT", "PLCO_LOAD_ALL_PERSONAL_INFO", ["","",""]);
        // const request = await m4Nodejs.executeM4ObjectMethod(m4ObjAllPersonInfo, "PLCO_PERSONAL_EMPLOYEE_INFORMIT", "PLCO_LOAD_ALL_PERSONAL_INFO", ["","",""]);

        const m4NodeEmpRecordHeader = m4ObjAllPersonInfo.getNode("PSCO_EMPLOYEE_RECORD_HEADER");
        //const m4NodeEmpRecordHeader = request.getNode("PSCO_EMPLOYEE_RECORD_HEADER");

        const m4PropEmpName = m4NodeEmpRecordHeader.getValue("PSCO_EMPLOYEE_NAME");

        expect(m4PropEmpName).toBeTruthy();
    });

});