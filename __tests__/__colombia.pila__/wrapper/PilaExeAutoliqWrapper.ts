import { M4Object } from "@automation/m4nodejs/dist/m4Interfaces/M4Object";
import { M4Node } from "@automation/m4nodejs/dist/m4Interfaces/M4Node";

class PilaExeAutoliqWrapper {
    private m4Autoliq: M4Object;
    private m4NodeScbEmpresa: M4Node;
    private m4NodeScbAutoLiq: M4Node;

    constructor(m4Autoliq: M4Object){
        this.m4Autoliq = m4Autoliq;
        this.m4NodeScbEmpresa = this.m4Autoliq.getNode('SCB_EMPRESA');
        this.m4NodeScbAutoLiq = this.m4Autoliq.getNode('SCB_H_HR_AUTOLIQ');
        //this.initialize();
    }

    get_M4Node_M4Object(){
        return this.m4Autoliq;
    }

    get_M4Node_ScbEmpresa(){
        return this.m4NodeScbEmpresa;
    }

    get_M4Node_ScbAutoLiq(){
        return this.m4NodeScbAutoLiq;
    }

    get_ScbAutoLiq_CAMPO05(){
        return this.m4NodeScbAutoLiq.getValue("SCB_CAMPO5");
    }

     /**
     * Setup M4Object to testing
     */
    private initialize(){        
        const m4NodeEmpresa = this.m4NodeScbEmpresa.getParentNode();
        m4NodeEmpresa.addRecord()
        
    }
}

export { PilaExeAutoliqWrapper }