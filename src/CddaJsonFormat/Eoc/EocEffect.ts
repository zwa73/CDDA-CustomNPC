import { JArray, JObject, JToken } from "@zwa73/utils";
import { FakeSpell } from "../Enchantment";
import { AnyItemID } from "../Item";
import { MutationID } from "../Mutattion";
import { NpcInstanceID } from "../NpcInstance";
import { SoundEffectID, SoundEffectVariantID } from "../SoundEffect";
import { Eoc, EocID, InlineEoc, TalkerVar } from "./Eoc";
import { GenericObj, GenericObjOperateList, LocObj, NumObj, StrObj } from "./VariableObject";










/**Eoc效果 */
export type EocEffect = EocEffectList[number];
/**Eoc效果表 */
export type EocEffectList = [
    {math:[string,"="|"+="|"-="|"*="|"/=",string]}  ,//
    {u_lose_trait:MutationID}                       ,//失去某个变异
    RunEoc                                          ,//运行Eoc
    RunEocWith                                      ,//
    {u_add_trait:MutationID}                        ,//获得某个变异
    {u_consume_item: AnyItemID,count: number }      ,//使用/扣除 count 个物品
    "drop_weapon"                                   ,//丢下手持物品 仅限npc
    SpawnNpc                                        ,//生成npc
    {u_spawn_item:AnyItemID}                        ,//生成物品
    "follow_only"                                   ,//让npc跟随玩家
    "leave"                                         ,//让npc停止跟随玩家并离开追随者阵营
    SoundEffect                                     ,//播放声音
    CastSpell                                       ,//施法
    Teleport                                        ,//传送
    LocalVar                                        ,//获取坐标
];
/**运行Eoc */
type RunEoc = {run_eocs:ParamsEoc};

/**运行Eoc 并提供参数 */
type RunEocWith = {
    run_eoc_with:ParamsEoc;
    /**提供的上下文参数表 变量名:值 */
    variables? : Record<string,string>;
    /**将loc所在位置的单位作为beta talker */
    beta_loc? : LocObj;
};

/**生成Npc */
type SpawnNpc = TalkerVar<{
    /**Npc实例ID */
    spawn_npc: NpcInstanceID,
    /**真实数量 */
    real_count?: number,
    /**最小半径 */
    min_radius?: number,
    /**最大半径 */
    max_radius?: number,
},"spawn_npc">;
/**播放声音 */
type SoundEffect = {
    /**音效ID */
    id          :  StrObj|SoundEffectID;
    /**变体ID */
    sound_effect?: StrObj|SoundEffectVariantID;
    /**如果为true则视为在玩家地下 ? */
    outdoor_event?: boolean;
    /**音量 */
    volume:NumObj;
}
/**施法 */
type CastSpell = TalkerVar<{
    /**施法 */
    cast_spell:FakeSpell;
    /**默认为 false；如果为 true，则允许您瞄准施放的法术，
     * 否则将其施放于随机位置，就像RANDOM_TARGET使用了法术标志一样
     * RANDOM_TARGET法术需要此项目为true才能正常索敌
     */
    targeted?:boolean;
    /**成功施法后运行的eoc */
    true_eocs?:ParamsEoc;
    /**施法失败后运行的eoc */
    false_eocs?:ParamsEoc;
},"cast_spell">;

/**传送 */
type Teleport = TalkerVar<{
    teleport: LocObj;
    /**成功传送产生的消息 */
    success_message?: StrObj;
    /**传送失败产生的消息 */
    fail_message?: StrObj;
    /**强制传送 尽可能传送到目标位置 传送不会失败 */
    force?: boolean;
},"teleport">;

/**搜索并获取坐标 存入location_variable*/
type LocalVar = TalkerVar<{
    location_variable:LocObj;
    /**在发起者周围 的最小半径 默认 0 */
    min_radius?:NumObj;
    /**在发起者周围 的最大半径 默认 0 */
    max_radius?:NumObj;
    /**如果为 true，则仅选择室外值 默认为 false */
    outdoor_only?:boolean;
    /**如果使用，搜索将不是从u_或npc_位置执行，
     * 而是从 执行mission_target。
     * 它使用allocate_mission_target语法
     * */
    target_params?: MissionTarget;
    /**将结果的x值增加 */
    x_adjust?:NumObj;
    /**将结果的y值增加 */
    y_adjust?:NumObj;
    /**将结果的z值增加 */
    z_adjust?:NumObj;
    /**如果为 true，则不将其累加到z级别，
     * 而是用绝对值覆盖它:"z_adjust": 3将"z_override": true的值z转为3
     * 默认为 false
     */
    z_override?:boolean;
    /**搜索的目标地形 空字符串为任意 */
    terrain?:StrObj;
    /**搜索的目标家具 空字符串为任意 */
    furniture?:StrObj;
    /**搜索的目标陷阱 空字符串为任意 */
    trap?:StrObj;
    /**搜索的目标怪物 空字符串为任意 */
    monster?:StrObj;
    /**搜索的目标区域 空字符串为任意 */
    zone?:StrObj;
    /**搜索的目标NPC 空字符串为任意 */
    npc?:StrObj;
    /**在搜索目标周围的最小半径 */
    target_min_radius?:NumObj;
    /**在搜索目标周围的最大半径 */
    target_max_radius?:NumObj;
},"location_variable">;



/**参数Eoc */
export type ParamsEoc = (EocID|StrObj|InlineEoc)|(EocID|StrObj|InlineEoc)[];



/**分配任务目标 assign_mission_target
 * MISSIONS_JSON.md
 */
export type MissionTarget = null;