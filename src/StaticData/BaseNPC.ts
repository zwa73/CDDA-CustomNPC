import { NpcClass, NpcInstance, genNpcClassID, genNpcInstanceID } from "CddaJsonFormat";
import { saveStaticData } from "./StaticData";



const BaseNpcClass:NpcClass={
    type:'npc_class',
    id:genNpcClassID("BaseNpcClass"),
    name:"BaseNpcClass",
    job_description:"基础NPC职业",
    common:false,
    traits:[
        {"trait": ""}
    ]
}
const BaseNpcInstance:NpcInstance={
    type:"npc",
    id:genNpcInstanceID("BaseNpc"),
    class:genNpcClassID("BaseNpcClass"),
    attitude: 0,
    mission: 0,
    faction: "your_followers",
    chat: "TALK_DONE",
}
export const BaseNpc = [BaseNpcClass,BaseNpcInstance];

saveStaticData('BaseNpc',BaseNpc);