import { JArray, JToken } from '@zwa73/utils';
import { AnimType } from './AnimTool';
import { Eoc, MutationID, ItemGroupID, NpcClassID, NpcInstanceID, FlagID, AmmiunitionTypeID, AmmoID, ArmorID, GunID, StatusSimple } from './CddaJsonFormat';
/**角色事件列表 */
export declare const CharEvemtTypeList: readonly ["CharIdle", "CharMove", "CharCauseHit", "CharUpdate", "CharCauseMeleeHit", "CharCauseRangeHit"];
/**角色事件类型 */
export type CharEventType = typeof CharEvemtTypeList[number];
/**全局事件列表 */
export declare const GlobalEvemtTypeList: readonly ["PlayerUpdate", "CharIdle", "CharMove", "CharCauseHit", "CharUpdate", "CharCauseMeleeHit", "CharCauseRangeHit"];
/**全局事件 */
export type GlobalEventType = typeof GlobalEvemtTypeList[number];
/**角色设定 */
export type CharConfig = {
    status: Partial<Record<StatusSimple, number>>;
};
/**主资源表 */
export type DataTable = {
    /**输出的角色数据表 */
    charTable: Record<string, {
        /**角色基础数据 */
        baseData: CharData;
        /**输出数据 */
        outData: Record<string, JArray>;
        /**输出的角色Eoc事件 */
        charEventEocs: Record<CharEventType, Eoc>;
        /**角色设定 */
        charConfig: CharConfig;
    }>;
    /**输出的静态数据表 */
    staticTable: Record<string, JArray>;
    /**输出的Eoc事件 */
    eventEocs: Record<GlobalEventType, Eoc>;
};
/**build配置 */
export type BuildSetting = {
    /**游戏目录 */
    game_path: string;
    /**游戏贴图包目录名 */
    target_gfx: string;
};
/**游戏数据 */
export type GameData = {
    /**贴图包ID */
    gfx_name: string;
};
export declare class DataManager {
    /**资源目录 */
    dataPath: string;
    /**输出目录 */
    outPath: string;
    /**角色目录 */
    charPath: string;
    /**角色列表 */
    charList: string[];
    /**build设置 */
    buildSetting: BuildSetting;
    /**游戏数据 */
    gameData: GameData;
    /**主资源表 */
    private dataTable;
    /**
     * @param dataPath 输入数据路径
     * @param outPath  输出数据路径
     */
    private constructor();
    /**静态构造函数
     * @param dataPath 输入数据路径
     * @param outPath  输出数据路径
     */
    static create(dataPath?: string, outPath?: string): Promise<DataManager>;
    /**获取角色表 如无则初始化 */
    getCharData(charName: string): Promise<{
        /**角色基础数据 */
        baseData: Readonly<{
            /**角色名 */
            charName: string;
            /**基础变异ID */
            baseMutID: MutationID;
            /**职业ID */
            classID: NpcClassID;
            /**实例ID */
            instanceID: NpcInstanceID;
            /**动画数据 */
            animData: Record<"Idle" | "Move" | "Attack", Readonly<{
                /**动画类型 */
                animType: "Idle" | "Move" | "Attack";
                /**动画名 */
                animName: string;
                /**动画变异ID */
                mutID: MutationID;
                /**动画装备ID */
                armorID: `${string}_ARMOR_${string}`;
                /**动画装备物品组ID */
                itemGroupID: ItemGroupID;
            }>>;
            /**有效的动作 */
            vaildAnim: ("Idle" | "Move" | "Attack")[];
            /**基础装备ID */
            baseArmorID: `${string}_ARMOR_${string}`;
            /**基础武器ID */
            baseWeaponID: `${string}_GUN_${string}`;
            /**基础弹药ID */
            baseAmmoID: `${string}_AMMO_${string}`;
            /**基础弹药类型ID */
            baseAmmoTypeID: AmmiunitionTypeID;
            /**基础武器物品组ID */
            baseWeaponGroupID: ItemGroupID;
            /**基础武器Flag ID */
            baseWeaponFlagID: FlagID;
        }>;
        /**输出数据 */
        outData: Record<string, JArray>;
        /**输出的角色Eoc事件 */
        charEventEocs: Record<"CharIdle" | "CharMove" | "CharCauseHit" | "CharUpdate" | "CharCauseMeleeHit" | "CharCauseRangeHit", Eoc>;
        /**角色设定 */
        charConfig: CharConfig;
    }>;
    /**添加事件 */
    addEvent(etype: GlobalEventType, ...events: Eoc[]): void;
    /**添加角色事件 */
    addCharEvent(charName: string, etype: CharEventType, ...events: Eoc[]): void;
    /**获取 角色目录 */
    getCharPath(charName: string): string;
    /**获取 角色图片目录 */
    getCharImagePath(charName: string): string;
    /**获取 输出角色目录 */
    getOutCharPath(charName: string): string;
    /**输出数据到角色目录 */
    saveToCharFile(charName: string, filePath: string, obj: JToken): Promise<void>;
    /**输出数据到主目录 */
    saveToFile(filePath: string, obj: JToken): Promise<void>;
    /**输出数据 */
    saveAllData(): Promise<void>;
}
/**角色基础数据 */
export type CharData = Readonly<{
    /**角色名 */
    charName: string;
    /**基础变异ID */
    baseMutID: MutationID;
    /**职业ID */
    classID: NpcClassID;
    /**实例ID */
    instanceID: NpcInstanceID;
    /**动画数据 */
    animData: Record<AnimType, AnimData>;
    /**有效的动作 */
    vaildAnim: AnimType[];
    /**基础装备ID */
    baseArmorID: ArmorID;
    /**基础武器ID */
    baseWeaponID: GunID;
    /**基础弹药ID */
    baseAmmoID: AmmoID;
    /**基础弹药类型ID */
    baseAmmoTypeID: AmmiunitionTypeID;
    /**基础武器物品组ID */
    baseWeaponGroupID: ItemGroupID;
    /**基础武器Flag ID */
    baseWeaponFlagID: FlagID;
}>;
/**动画数据 */
export type AnimData = Readonly<{
    /**动画类型 */
    animType: AnimType;
    /**动画名 */
    animName: string;
    /**动画变异ID */
    mutID: MutationID;
    /**动画装备ID */
    armorID: ArmorID;
    /**动画装备物品组ID */
    itemGroupID: ItemGroupID;
}>;
