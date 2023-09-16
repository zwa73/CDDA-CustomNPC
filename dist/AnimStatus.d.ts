import { AnimType } from "./AnimTool";
import { CharData, DataManager } from "./DataManager";
import { EOC } from "./CddaJsonFormat/EOC";
/**移除其他动作变异 */
export declare function removeOtherAnimEoc(baseData: CharData, animType: AnimType): EOC | null;
/**切换动作EOC */
export declare function changeAnimEoc(baseData: CharData, animType: AnimType): EOC[];
/**创建动画状态机 */
export declare function createAnimStatus(dm: DataManager, charName: string): void;