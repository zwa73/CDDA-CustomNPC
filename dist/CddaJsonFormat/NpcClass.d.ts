import { NpcNumObj } from "./Eoc";
import { CddaID } from "./GenericDefine";
import { ItemGroupID } from "./ItemGroup";
import { MutationID } from "./Mutation";
import { SkillID } from "./Skill";
/**NpcClass ID格式
 */
export type NpcClassID = CddaID<"NPCCLS">;
export type NpcClass = {
    type: "npc_class";
    id: NpcClassID;
    name: string;
    job_description: string;
    /**false意味着这个NPC职业不会随机生成。
     * 如果未指定, 则默认为 。true
     */
    common?: boolean;
    /**false意味着该NPC的磨损或持有的物品将被严格排除在其店主名单之外;
     * 否则, 他们会很乐意出售裤子之类的东西。
     * 如果未指定, 则默认为 。true
     */
    sells_belongings?: boolean;
    /**初始力量 */
    bonus_str?: NpcNumObj;
    /**初始敏捷 */
    bonus_dex?: NpcNumObj;
    /**初始智力 */
    bonus_int?: NpcNumObj;
    /**初始感知 */
    bonus_per?: NpcNumObj;
    /**初始技能 */
    skills?: NPCClassBaseSkill[];
    /**npc穿戴的物品组 */
    worn_override?: ItemGroupID;
    /**npc携带的物品组 */
    carry_override?: ItemGroupID;
    /**npc拿起的物品组 */
    weapon_override?: ItemGroupID;
    /**仅当计划的 NPC 是店主, 拥有每三个游戏日更换一次的循环物品库存时, 才需要。
     * 所有物品覆盖都将确保此类的任何 NPC 都会生成特定物品。
     */
    shopkeeper_item_group?: ShopItemGroup;
    /**用于定义此店主的物料消耗费率。默认设置是在补货前消耗所有商品 */
    shopkeeper_consumption_rates?: "basic_shop_rates";
    /**使用与派系价格规则相同的格式定义个人价格规则 (请参阅 FACTIONS.md)。这些优先于派系规则 */
    shopkeeper_price_rules?: ShopPriceRules;
    /**可选为此店主定义黑名单 */
    shopkeeper_blacklist?: string;
    /**默认值为 6 天 */
    restock_interval?: `${string} days`;
    /**基础变异 */
    traits?: Traits;
};
type ShopItemGroup = [
    {
        "group": "example_shopkeeper_itemgroup1";
    },
    {
        "group": "example_shopkeeper_itemgroup2";
        "trust": 10;
    },
    {
        "group": "example_shopkeeper_itemgroup3";
        "trust": 20;
        "rigid": true;
    },
    {
        "group": "example_shopkeeper_itemgroup3";
        "trust": 40;
        "strict": true;
    },
    {
        "group": "example_shopkeeper_itemgroup4";
        "condition": {
            "u_has_var": "VIP";
            "type": "general";
            "context": "examples";
            "value": "yes";
        };
    }
];
type ShopPriceRules = [
    {
        "item": "scrap";
        "price": 10000;
    }
];
type Traits = ({
    "group": string;
} | {
    "trait": MutationID;
})[];
/**npc职业的基础技能 */
export type NPCClassBaseSkill = {
    /**目标技能 ALL为全部 */
    skill: "ALL" | SkillID;
    /**技能等级 */
    level: NpcNumObj;
};
export {};
/** NpcNumObj样例
"mul": [
        { "one_in": 3 },
        { "sum": [ { "dice": [ 2, 2 ] },
        { "constant": -2 },
        { "one_in": 4 } ] }
    ]
 */ 
