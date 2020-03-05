import { M4TestUtils } from "@automation/m4nodejs";

async function example(){
    const m4TestUtils = new M4TestUtils();
    await m4TestUtils.createXmlMetadataFile("http://rdserverw10.meta4.com:40060", "M4ADM", "M4ADM","SCB_PY_LR_AUTOLIQUIDACION",".\\__tests__\\XMLMetadata");
}

example();