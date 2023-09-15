

function print_global_val(varName){
	eobj( { u_message: "全局变量 "+varName+" 当前的值为 : <global_val:"+varName+">" })
	//eobj( { u_message: {global_val:varName}})
}

function update_stat(){
	eoc_type("ACTIVATION")
	//recurrence("1 s");
	//print_global_val(mag3);
	//print_global_val(mag1);
	//print_global_val(mag2);
}


//初始化现有血量
function CNPC_EOC_InitCurrHP(){
	eoc_type("ACTIVATION")
	if(u_currhp==0)
		u_currhp = u_hp();
}
//刷新现有血量
function CNPC_EOC_UpdateInitCurrHP(){
	eoc_type("ACTIVATION")
	eobj({ "u_cast_spell": { "id": "CNPC_SPELL_InitCurrHP" } })
}

//检测现有血量并触发get_hit
function CNPC_EOC_CheckCurrHP(){
	eoc_type("ACTIVATION")
	mag1 = u_currhp;
	mag2 = u_hp();
	if(and(u_currhp > u_hp(),has_target==0)){
		eobj({ "u_cast_spell": { "id": "CNPC_SPELL_SummonTarget" } })
		has_target=1;
	}
	u_currhp = u_hp();
}

//尝试攻击触发的eoc
function CNPC_EOC_HitEocs(){
	eoc_type("ACTIVATION")
	if(eobj({ "u_has_trait": "CNPC_MUT_CnpcFlag" })){
		//设置不在待机
		u_notIdleOrMove=4;
		//释放检测血量法术判断是否击中目标
		eobj({"u_cast_spell":{"id":"CNPC_SPELL_CheckCurrHP"}})
		has_target=0; //重置flag
		//施放测试法术
		eobj({
			"u_cast_spell":{"id":"CNPC_SPELL_TestConeSpell"},
			"targeted":true
		})
		//运行动态生成的事件eoc
		CNPC_EOC_CharCauseHit()
	}
}

//生成基础npc
function CNPC_EOC_SpawnBaseNpc(){
	eobj({
		"u_spawn_npc": "CNPC_NPC_BaseNpc",
		"real_count": 1,
		"min_radius": 1,
		"max_radius": 1,
		"spawn_message": "生成了一个基础NPC"
	})
}

//主循环函数 玩家
function CNPC_EOC_PlayerUpdate(){
	recurrence(1);
	CNPC_EOC_UpdateInitCurrHP();
	update_stat();
}

//主循环函数 全局
function CNPC_EOC_GlobalUpdate(){
	recurrence(1);
	global(true);
	run_for_npcs(true);
	if(eobj({ "u_has_trait": "CNPC_MUT_CnpcFlag" })){
		//运行动态生成的事件eoc
		CNPC_EOC_CharUpdate();

		//检测移动
		eobj({
			"set_string_var": { "u_val": "u_char_preloc" },
			"target_var": { "global_val": "char_preloc" }
		})
		eobj({
			"set_string_var": { "u_val": "u_char_preloc" },
			"target_var": { "global_val": "char_preloc" }
		})
		if(eobj({
			"compare_string": [
				{ "global_val": "char_preloc" },
				{ "mutator": "loc_relative_u", "target": "(0,1,0)" }
			]
		})){
			//设置在待机
			u_onMove=0;
		} else{
			//设置在移动
			u_onMove=1;
		}
		eobj({
			"set_string_var": { "mutator": "loc_relative_u", "target": "(0,1,0)" },
			"target_var": { "u_val": "u_char_preloc" }
		})

		if(u_notIdleOrMove<=0){
			u_notIdleOrMove=0;
			//触发移动事件
			if(u_onMove>=1){
				//运行动态生成的事件eoc
				CNPC_EOC_CharMove();
			}else{//触发待机
				//运行动态生成的事件eoc
				CNPC_EOC_CharIdle();
			}
		}
		u_notIdleOrMove=u_notIdleOrMove-1;
	}
}





//recurrence(1);
//global(false);
//run_for_npcs(false);




