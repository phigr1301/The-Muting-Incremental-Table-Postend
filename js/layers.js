addLayer("1layer", {// Add a * small* to generate a slightly different layer
    name: "sideLayer1",
    position: -1,
    row: 1,
    symbol() {return (options.ch || modInfo.languageMod==false) ? '↓ 主禁言 ↓' : '↓ layer 0 ↓'},
    symbolEN() {return (options.ch || modInfo.languageMod==false) ? '↓ 主禁言 ↓' : '↓ layer 0 ↓'},
    nodeStyle: {"font-size": "15px", "text-center": "center", "height": "30px"},
    startData() { return {
        unlocked: true,
        small: true,
        points: new Decimal(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
    }},
    small: true,
    color: "#fefefe",
    type: "none",
    tooltip(){return false},
    layerShown(){return layerDisplayTotal(['m'])},// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.
	tabFormat: [
        ["display-text", function() { return getPointsDisplay() }]
    ],
})
addLayer("2layer", {// Add a * small* to generate a slightly different layer
    name: "sideLayer1",
    position: -1,
    row: 2,
    symbol() {return (options.ch || modInfo.languageMod==false) ? '↓ 禁言宇宙 ↓' : '↓ layer 1 ↓'},
    symbolEN() {return (options.ch || modInfo.languageMod==false) ? '↓ 禁言宇宙 ↓' : '↓ layer 1 ↓'},
    nodeStyle: {"font-size": "15px", "text-center": "center", "height": "30px"},
    startData() { return {
        unlocked: true,
        small: true,
        points: new Decimal(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
    }},
    small: true,
    color: "#fefefe",
    type: "none",
    tooltip(){return false},
    layerShown(){return layerDisplayTotal(['s'])},// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.
	tabFormat: [
        ["display-text", function() { return getPointsDisplay() }]
    ],
})
addLayer("m", {
    name: "mute",
    symbol: "禁言",
    symbolEN: "Mute", 
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        muteP: zero,
        sendT: zero,
        mutingT: zero,
        angryTimes: zero,
    }},
    color: "#FFFFFF",
    type: "none",
    resource: "信息",
    row: 1,
    layerShown(){return true},
    gainMult(){
        mult = one
        if(hasUpgrade("m",24)) mult = mult.mul(upgradeEffect("m",24))
        if(hasUpgrade("m",12)) mult = mult.mul(upgradeEffect("m",12))
        if(hasUpgrade("m",32)) mult = mult.mul(upgradeEffect("m",32))
        if(hasUpgrade("m",34)) mult = mult.mul(upgradeEffect("m",34))
        if(hasUpgrade("m",35)) mult = mult.mul(upgradeEffect("m",35))
        if(hasUpgrade("c",32)) mult = mult.mul(3)
        if(inChallenge("b",11)) mult = mult.div(1e8)
        if(hasUpgrade("b",41)) mult = mult.mul(100)
        mult = mult.mul(this.gainMultR())
        return mult
    },
    gainMultR(){
        mult = one
        if(hasUpgrade("s",11)) mult = mult.mul(upgradeEffect("s",11))
        if(hasUpgrade("s",31)) mult = mult.mul(upgradeEffect("s",31))
        if(hasUpgrade("s",92)) mult = mult.mul(upgradeEffect("s",92))
        if(hasUpgrade("b",15)) mult = mult.mul(upgradeEffect("b",15))
        if(layers.b.LEffectP().gte(0.006)) mult = mult.mul(layers.b.LEffect(1)) 
        if(inChallenge("s",11)) mult = mult.div(25000)    
        if(inChallenge("s",12)) mult = mult.div(30)   
        return mult
    },
    hotkeys: [
        {key: "p", description: "P: 暂停游戏", onPress(){
            if(player.devSpeed==1) player.devSpeed = -1
            else player.devSpeed = 1
        }},
    ],
    doReset(resettingLayer){
        if (layers[resettingLayer].row > layers[this.layer].row) {
            let kept = ["autoBuyU","autoSend"]
            layerDataReset(this.layer, kept)
        }
    },
    upgrades: {
        11: {
            title: "开启禁言之旅",
            description: "解锁刷屏",
            cost: new Decimal(0),
            unlocked(){return true},
            currencyDisplayName:"禁言点",
            currencyInternalName:"points",
            style() { return {'border-radius': "0px"}},
        },
        12: {
            title: "加速禁言",
            description: "基于禁言点倍增消息获取",
            effect(){
                let eff = player.points.root(2).max(1)
                eff = powsoftcap(eff,n(1000),five)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(10),
            unlocked(){return hasUpgrade("m",25)||player.s.unlocked},
            currencyDisplayName:"禁言点",
            currencyInternalName:"points",
            style() { return {'border-radius': "0px"}},
        },
        13: {
            title: "降压药",
            description: "无效升级'增压药'的效果,管理的怒火/4",
            effect(){
                let eff = four
                return eff
            },
            effectDisplay(){return "/"+format(this.effect())},
            cost: new Decimal(30),
            unlocked(){return hasUpgrade("m",25)||player.s.unlocked},
            currencyDisplayName:"禁言点",
            currencyInternalName:"points",
            style() { return {'border-radius': "0px"}},
        },
        14: {
            title: "消消气吧~",
            description: "管理消气速度x5",
            effect(){
                let eff = five
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(200),
            unlocked(){return hasUpgrade("m",25)||player.s.unlocked},
            currencyDisplayName:"禁言点",
            currencyInternalName:"points",
            style() { return {'border-radius': "0px"}},
        },
        15: {
            title: "求求你啦~",
            description: "在发消息按钮旁边解锁求情",
            cost: new Decimal(500),
            unlocked(){return hasUpgrade("m",31)||player.s.unlocked},
            currencyDisplayName:"禁言点",
            currencyInternalName:"points",
            style() { return {'border-radius': "0px"}},
        },
        21: {
            title: "练习打字",
            description: "发信息冷却时间-1s",
            effect(){
                let eff = one
                return eff
            },
            effectDisplay(){return "-"+format(this.effect(),0)+"s"},
            cost: new Decimal(3),
            unlocked(){return hasUpgrade("m",11)||player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        22: {
            title: "反复练习",
            description: "发信息冷却时间基于信息降低(上限3.9s)",
            effect(){
                let eff = player.m.points.root(3).sub(1).max(0)
                if(hasUpgrade("m",23)) eff = eff.add(upgradeEffect("m",23))
                eff = eff.min(n(3.9).add(hasUpgrade("s",23)?upgradeEffect("s",23):0))
                return eff
            },
            effectDisplay(){return "-"+format(this.effect())+"s"},
            cost: new Decimal(6),
            unlocked(){return hasUpgrade("m",11)||player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        23: {
            title: "加强练习",
            description: "升级'反复练习'效果+0.5",
            effect(){
                let eff = one.div(2)
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            cost: new Decimal(20),
            unlocked(){return hasUpgrade("m",11)||player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        24: {
            title: "信息加倍",
            description: "双倍信息获取,以及...某人的怒火(tips:倍增信息获取也会倍增管理的怒火!)",
            effect(){
                let eff = two
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(40),
            unlocked(){return hasUpgrade("m",11)||player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        25: {
            title: "增压药",
            description: "管理的怒火再x2",
            effect(){
                let eff = two
                if(hasUpgrade("m",13)) return one
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(80),
            unlocked(){return hasUpgrade("m",11)||player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        31: {
            title: "强化禁言",
            description: "禁言点获取x2",
            effect(){
                let eff = two
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(1000),
            unlocked(){return hasUpgrade("m",25)||player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        32: {
            title: "信息自增",
            description: "信息获取基于信息倍增",
            effect(){
                let eff = player.m.points.root(5).max(1)
                eff = powsoftcap(eff,n("e10"),ten)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(2000),
            unlocked(){return hasUpgrade("m",25)||player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        }, 
        33: {
            title: "高效降压药",
            description: "管理的怒火/10",
            effect(){
                let eff = ten
                return eff
            },
            effectDisplay(){return "/"+format(this.effect())},
            cost: new Decimal(3000),
            unlocked(){return hasUpgrade("m",25)||player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        34: {
            title: "禁言后的怒火",
            description: "基于被禁言次数倍增信息获取",
            effect(){
                let eff = player.m.angryTimes.root(2).max(1)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(5000),
            unlocked(){return hasUpgrade("m",25)||player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        35: {
            title: "禁言后的无奈",
            description: "基于被禁言次数降低管理的怒气和倍增信息获取",
            effect(){
                let eff = player.m.angryTimes.root(2).max(1)
                return eff
            },
            effectDisplay(){return "/"+format(this.effect())+",x"+format(this.effect())},
            cost: new Decimal(15000),
            unlocked(){return hasUpgrade("m",25)||player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        41: {
            title: "超强化禁言",
            description: "基于信息倍增禁言点获取",
            effect(){
                let power = two
                if(hasUpgrade("s",42)) power = power.add(upgradeEffect("s",42))
                if(hasUpgrade("c",43)) power = power.add(upgradeEffect("c",43))
                let eff = player.m.points.max(10).log(10).pow(power)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(50000),
            unlocked(){return hasUpgrade("m",35)||player.s.unlocked},
            style() { return {'border-radius': "0px",height: "120px", width: "600px"}},
        },
    },
    clickables:{
        11:{
            title() {return "发一次消息<h5>在群里发一次信息<h6>+"+format(layers.m.gainMult())+"信息/次"},
            canClick(){
                let a = hasUpgrade("s",15)&&!inChallenge("s",12)
                a = a||player.m.mutingT.lte(0)
                return a&&player.m.sendT.eq(0)},
            onClick() {          
                player.m.points = player.m.points.add(layers.m.gainMult())
                player.m.muteP = player.m.muteP.add(layers.m.angryMult())
                player.m.sendT = layers.m.sendSpeed()
            },
            onHold(){
                if(!hasUpgrade("m",100)) return
                player.m.points = player.m.points.add(layers.m.gainMult())
                player.m.muteP = player.m.muteP.add(layers.m.gainMult())
            },
            style() { return { 'background-color': this.canClick()?"#88FFFF":"#bf8f8f", filter: "brightness(100%)",'border-radius': "0px",height: "150px", width: "200px"}},
        },
        12:{
            title() {return "向管理求情<h5>向管理求情...前提是你没把管理惹急<h6>当然,这也需要打字<br>(求情有多种效果,请自己尝试!)"},
            canClick(){return player.m.sendT.eq(0)},
            onClick() {          
                player.m.sendT = layers.m.sendSpeed()
                if(player.m.muteP.gt(0)) player.m.muteP = player.m.muteP.div(layers.m.angryMax().div(2)).pow(2).mul(layers.m.angryMax().div(2)).min(layers.m.angryMax())
                if(player.m.mutingT.gt(layers.m.muteTmaX().div(2))) player.m.mutingT = player.m.mutingT.add(2).min(layers.m.muteTmaX())
                else player.m.mutingT = player.m.mutingT.sub(2).max(0)
            },
            style() { return { 'background-color': this.canClick()?"#FFFFFF":"#bf8f8f", filter: "brightness(100%)",'border-radius': "0px",height: "150px", width: "200px"}},
            unlocked(){return hasUpgrade("m",15)},
        },
        13:{
            title() {return "<h5>游戏卡死了?点击这个按钮清空一些负面的升级"},
            canClick(){return true},
            onClick() {          
                const U = [13,14,33]
                for (id in U){
                    if(hasUpgrade("m",U[id])){player.m.upgrades.splice(player.m.upgrades.indexOf(U[id]),1)}
                }
            },
            style() { return { 'background-color': "#FFFFFF", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "120px"}},
            unlocked(){return true},
        },
    },
    bars:{
        sendL:{
            direction: RIGHT,
            width: 600,
            height: 40,
            req(){
                let req = player.m.sendT.div(layers.m.sendSpeed())
                return req
            },
            fillStyle: {'background-color' : "#FF0000"},
            progress() { return this.req() },
            display(){return "你的打字速度有限,发送信息需要冷却("+format(player.m.sendT,2)+"s/"+format(layers.m.sendSpeed(),1)+"s)"},
        },
        muteP:{
            direction: RIGHT,
            width: 600,
            height: 40,
            req(){
                let req = player.m.muteP.div(layers.m.angryMax())
                return req
            },
            fillStyle: {'background-color' : "#FF8800"},
            progress() { return this.req() },
            display(){return "群管理想要禁言的怒火("+format(this.req().mul(100))+"%)"},
        },
        muteT:{
            direction: RIGHT,
            width: 600,
            height: 40,
            req(){
                if(layers.m.muteTmaX().eq(0)) return zero
                let req = player.m.mutingT.div(layers.m.muteTmaX())
                return req
            },
            fillStyle: {'background-color' : "#888888"},
            progress() { return this.req() },
            display(){return "禁言时间("+format(player.m.mutingT,2)+"s/"+format(layers.m.muteTmaX(),1)+"s)"},
        },
    },
    sendSpeed(){
        let v = five
        if(hasUpgrade("m",21)) v = v.sub(upgradeEffect("m",21))
        if(hasUpgrade("m",22)) v = v.sub(upgradeEffect("m",22))
        if(hasUpgrade("b",11)) v = v.div(upgradeEffect("b",11))
        if(hasUpgrade("c",32)) v = v.div(2)
        if(hasUpgrade("c",33)) v = v.div(5)
        if(player.m.mutingT.gt(0)) v = v.mul(10)
        if(inChallenge("b",11)) v = v.mul(3)
        return v
    },
    muteTmaX(){
        let max = n(60)
        if(hasUpgrade("s",14)) max = max.div(upgradeEffect("s",14))
        if(hasUpgrade("c",32)) max = max.div(2)
        if(hasUpgrade("c",33)) max = max.div(5)
        if(hasUpgrade("b",21)&&!inChallenge("s",11)) max = zero
        return max
    },
    angryMult(){
        let mult = one
        mult = mult.mul(layers.m.gainMult())
        if(hasUpgrade("m",25)) mult = mult.mul(upgradeEffect("m",25))
        if(hasUpgrade("m",13)) mult = mult.div(upgradeEffect("m",13))     
        if(hasUpgrade("m",33)) mult = mult.div(upgradeEffect("m",33))     
        if(hasUpgrade("m",35)) mult = mult.div(upgradeEffect("m",35))
        if(inChallenge("m",11)) mult = mult.div(1000)   
        mult = mult.div(this.gainMultR())
        if(player.m.mutingT.gt(0)&&hasUpgrade("s",15)) mult = mult.pow(0.5)
        return mult
    },
    angryDownMult(){
        let mult = one
        if(hasUpgrade("m",14)) mult = mult.mul(upgradeEffect("m",14))
        return mult
    },
    angryMax(){
        let max = n(100)
        if(hasUpgrade("s",13)) max = max.mul(upgradeEffect("s",13))
        return max
    },
    getMutingTimes(){
        let get = one
        if(hasUpgrade("s",32)) get = get.mul(upgradeEffect("s",32))
        if(hasUpgrade("b",33)) get = get.mul(upgradeEffect("b",33))
        return get
    },
    update(diff){
        player.m.mutingT = player.m.mutingT.sub(diff).max(0)
        player.m.muteP = player.m.muteP.sub(n(diff).mul(layers.m.angryDownMult())).max(0)
        player.m.sendT = player.m.sendT.sub(diff).max(0).min(layers.m.sendSpeed())
        if(player.m.muteP.gte(layers.m.angryMax())){
            player.m.muteP = zero;player.m.mutingT = player.m.mutingT.add(layers.m.muteTmaX()).min(layers.m.muteTmaX());player.m.angryTimes = player.m.angryTimes.add(this.getMutingTimes())
        }
        if(hasUpgrade("s",34)) player.m.points = player.m.points.add(this.gainMult().mul(upgradeEffect("s",34)).mul(diff))
        if(hasUpgrade("s",41)) player.m.angryTimes = player.m.angryTimes.add(upgradeEffect("s",41).mul(diff))
    },
    microtabs:{
        mute1:{
            "升级":{
                buttonStyle: {
                    "border-color": "white","background-color": "#0f0f0f"
                },
                content:[
                    "blank","upgrades",["display-text", function() {return "到达 10000 禁言点 解锁 "+quickColor("禁言石","#444444")}],
                ],
            },
            "刷屏":{
                buttonStyle: {
                    "border-color": "white","background-color": "#0f0f0f"
                },
                content:[
                    "blank",["row",[["clickable",11],["clickable",12]]],"blank",["bar","sendL"],["bar","muteP"],["bar","muteT"],["display-text", function() {return "你被禁言了 "+format(player.m.angryTimes,0) + " 次<br>被禁言期间,打字速度/10!"}],"blank",["clickable",13]
                ],
                unlocked(){return hasUpgrade("m",11)||player.s.unlocked},
            },
        },
    },
    tabFormat: [
       ["display-text", function() { return getPointsDisplay() }],"main-display",["microtabs","mute1"]
    ],
})
addLayer("s", {
    name: "stone",
    symbol: "禁言石",
    position: 0,
    startData() { return {
        unlocked: false,
		points: zero,
        bestTime: n(86400),
        u13a: true,
        rPoints: zero,
        reRB: false,
        onFill: false,
        fillStone: zero,
        outTime: zero,
        outEffBase: zero,
    }},
    color: "#444444",
    requires: new Decimal(10000),
    resource: "禁言石",
    baseResource: "禁言点",
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.5,
    gainMult() {
        mult = one
        if(hasUpgrade("s",61)) mult = mult.mul(upgradeEffect("s",61))
        if(hasUpgrade("s",71)) mult = mult.mul(upgradeEffect("s",71))
        if(hasUpgrade("s",63)) mult = mult.mul(upgradeEffect("s",63))
        if(hasUpgrade("s",73)) mult = mult.mul(upgradeEffect("s",73))
        if(hasUpgrade("s",93)) mult = mult.mul(upgradeEffect("s",93))
        if(hasUpgrade("b",13)) mult = mult.mul(upgradeEffect("b",13))
        if(hasUpgrade("b",15)) mult = mult.mul(upgradeEffect("b",15))
        if(hasUpgrade("b",22)) mult = mult.mul(upgradeEffect("b",22))
        if(hasUpgrade("c",12)) mult = mult.mul(upgradeEffect("c",12))
        if(player.s.outTime.gt(0)) mult = mult.mul(layers.s.outEffect(2))            
        if(layers.b.LEffectP().gte(0.01)) mult = mult.mul(layers.b.LEffect(2)) 
        if(getBuyableAmount("s",14).gte(1)) mult = mult.mul(buyableEffect("s",14))
        return mult
    },
    gainExp() {
        exp = one
        if(inChallenge("s",14)) exp = exp.mul(0.8)
        if(inChallenge("b",11)) exp = exp.mul(tmp.b.challenges[11].inCeff)
        return exp
    },
    resetsNothing(){return hasUpgrade("c",34)},
    passiveGeneration() { 
        let a = zero
        if(hasUpgrade("b",24)) a = a.max(upgradeEffect("b",24))
        return a
    },
    row: 2,
    doReset(resettingLayer){
        player.s.bestTime=player.s.bestTime.min(player.s.resetTime)
        if (layers[resettingLayer].row > layers[this.layer].row) {
            let kept = []
            if(resettingLayer=="b"){
                if(hasChallenge("s",13)||hasUpgrade("c",41)) kept.push("challenges")
            }
            if(resettingLayer=="c"){
                if(hasUpgrade("c",41)) kept.push("challenges")
            }
            layerDataReset(this.layer, kept)
            player.s.bestTime=n(86400)
        }
        if(player.s.reRB) {quickUpgBuyorSell("s",[61,62,63,71,72,73]);player.s.rPoints=layers.s.rPointMax();player.s.reRB=false}
    },
    hotkeys: [
        {key: "s", description: "S: 进行固化重置(禁言石)", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades:{
        11: {
            title: "信息强化",
            description: "仅对信息获取倍增x5",
            effect(){
                let eff = five
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(1),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        12: {
            title: "禁言强化",
            description: "禁言点获取x5",
            effect(){
                let eff = five
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(1),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        13: {
            title: "滑动变阻器.jpg",
            description: "管理的怒火上限x10,可开关",
            effect(){
                let eff = ten
                if(player.s.u13a) return eff  
                return one
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(2),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        14: {
            title: "禁言盾牌",
            description: "禁言时间上限/10",
            effect(){
                let eff = ten
                return eff
            },
            effectDisplay(){return "/"+format(this.effect())},
            cost: new Decimal(2),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        15: {
            title: "下载破解版",
            description: "禁言期间也可以发送消息,且禁言期间管理的怒火获取^0.5",
            effect(){
                let eff = one.div(2)
                return eff
            },
            effectDisplay(){return "^"+format(this.effect())},
            cost: new Decimal(4),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        21: {
            title: "外部禁言",
            description: "不在禁言期间自动获取10%/s的禁言点",
            effect(){
                let eff = one.div(10)
                if(hasUpgrade("s",24)) eff = eff.mul(upgradeEffect("s",24))
                if(inChallenge("s",11)) eff = zero
                return eff
            },
            effectDisplay(){return "+"+format(this.effect().mul(100),0)+"%/s"},
            cost(){return new Decimal(hasUpgrade("b",21)?0:3)},
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        22: {
            title: "禁言再强化",
            description: "禁言期间禁言点获取再x10",
            effect(){
                let eff = ten
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(4),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        23: {
            title: "石化练习",
            description: "升级'反复练习'效果上限+0.09",
            effect(){
                let eff = n(0.09)
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            cost: new Decimal(3),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        24: {
            title: "外部禁言?",
            description: "升级'外部禁言'效果x100",
            effect(){
                let eff = n(100)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost(){return new Decimal(hasUpgrade("b",21)?0:6)},
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        25: {
            title: "固化速度增益",
            description: "基于最快固化速度倍增禁言点获取(起始于60s,上限60x)",
            effect(){
                if(hasUpgrade("c",34)) return n(60)
                let eff = n(61).sub(player.s.bestTime)
                eff = eff.min(60).max(1)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(18),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        31: {
            title: "信息也强化",
            description: "禁言石层每有一个升级,仅对信息获取x1.5",
            effect(){
                let eff = n(1.5).pow(n(player.s.upgrades.length))
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(200),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        32: {
            title: "禁言激发",
            description: "基于总禁言石倍增禁言次数获取",
            effect(){
                let eff = player.s.total.max(2).log(2)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(200),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        33: {
            title: "重复禁言倍增",
            description: "基于禁言次数倍增禁言点获取",
            effect(){
                let eff = player.m.angryTimes.root(4).max(1).min(1e20)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(200),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px",}},
        },
        34: {
            title: "自助信息",
            description: "每秒自动获取300%点击获取的信息",
            effect(){
                let eff = three
                if(inChallenge("s",11)) eff = zero
                return eff
            },
            effectDisplay(){return "+"+format(this.effect().mul(100),0)+"%/s"},
            cost: new Decimal(300),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px",}},
        },
        35: {
            title: "新区域",
            description: "解锁禁言石领域,基于禁言点倍增禁言点获取",
            effect(){
                let eff = player.points.max(10).log(10)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(500),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px",}},
        },
        41: {
            title: "领域升级11",
            description: "你可以以50次/s的速度获得禁言次数",
            effect(){
                let eff = n(50)
                if(hasUpgrade("s",51)) eff = eff.mul(upgradeEffect("s",32))
                if(inChallenge("s",11)) eff = zero
                return eff
            },
            effectDisplay(){return "+"+format(this.effect(),0)+"/s"},
            cost: new Decimal(750),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px",}},
        },
        42: {
            title: "领域升级12",
            description: "升级'超强化禁言'的指数基于信息而增加(初始为2)",
            effect(){
                let eff = player.m.points.max(10).log(10).root(5).sub(1)
                eff = powsoftcap(eff,n(10),two)
                if(hasUpgrade("s",52)) eff = eff.add(upgradeEffect("s",52))
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            cost: new Decimal(2000),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px",}},
        },
        43: {
            title: "领域升级13",
            description: "自动购买禁言升级(在禁言页面里开关)",
            cost: new Decimal(3000),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px",}},
        },
        51: {
            title: "领域升级21",
            description: "升级'领域升级11'同样受到升级'禁言激发'的效果",
            cost: new Decimal(10000),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px",}},
        },
        52: {
            title: "领域升级22",
            description: "升级'领域升级12'的效果基于禁言石再次增加",
            effect(){
                let eff = player.s.points.max(10).log(10).root(5).sub(1)
                eff = powsoftcap(eff,n(15),two)
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            cost: new Decimal(20000),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px",}},
        },
        53: {
            title: "领域升级23",
            description: "自动'发一次消息'(在禁言页面里开关)",
            cost: new Decimal(30000),
            unlocked(){return player.s.unlocked},
            style() { return {'border-radius': "0px",}},
        },
        61: {
            title: "领域升级31",
            description: "基于信息倍增禁言石获取",
            cost(){return n(hasUpgrade("s",71)?3:1)},
            effect(){
                let eff = player.m.points.max(10).log(10).root(2.5)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            unlocked(){return hasChallenge("s",11)||hasUpgrade("b",22)},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"领域石",
            currencyInternalName:"rPoints",
            currencyLayer:"s",   
        },
        62: {
            title: "领域升级32",
            description: "基于禁言点的数量级正比例倍增自身获取(上限225x)",
            effect(){
                let eff = player.points.max(10).log(10).min(255).max(1)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost(){return n(hasUpgrade("s",72)?5:2)},
            unlocked(){return hasChallenge("s",11)||hasUpgrade("b",22)},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"领域石",
            currencyInternalName:"rPoints",
            currencyLayer:"s",   
        },
        63: {
            title: "领域升级33",
            description: "基于总领域石倍增禁言石获取",
            effect(){
                let eff = layers.s.rPointMax().mul(10).max(1)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(10),
            unlocked(){return hasChallenge("s",11)||hasUpgrade("b",22)},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"领域石",
            currencyInternalName:"rPoints",
            currencyLayer:"s",   
        },
        71: {
            title: "领域升级41",
            description: "基于禁言次数倍增禁言石获取",
            cost(){return n(hasUpgrade("s",61)?3:1)},
            effect(){
                let eff = player.m.angryTimes.max(4).log(4).sub(4).max(1).min(225)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            unlocked(){return hasChallenge("s",11)||hasUpgrade("b",22)},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"领域石",
            currencyInternalName:"rPoints",
            currencyLayer:"s",   
        },
        72: {
            title: "领域升级42",
            description: "基于禁言点的数量级反比例倍增自身获取(下限1x)",
            effect(){
                let eff = n(225).div(player.points.max(10).log(10)).max(1)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost(){return n(hasUpgrade("s",62)?5:2)},
            unlocked(){return hasChallenge("s",11)||hasUpgrade("b",22)},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"领域石",
            currencyInternalName:"rPoints",
            currencyLayer:"s",   
        },
        73: {
            title: "领域升级43",
            description: "基于剩余领域石倍增禁言石获取",
            effect(){
                let eff = player.s.rPoints.pow(4).max(1)
                eff = powsoftcap(eff,n(1e3),2)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(10),
            unlocked(){return hasChallenge("s",11)||hasUpgrade("b",22)},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"领域石",
            currencyInternalName:"rPoints",
            currencyLayer:"s",   
        },    
        81: {
            title: "领域升级51",
            description: "解锁一个释放新效果",
            cost: new Decimal(1e21),
            unlocked(){return hasChallenge("s",12)||hasUpgrade("b",22)},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"凝聚中的禁言石",
            currencyInternalName:"fillStone",
            currencyLayer:"s",   
        },
        82: {
            title: "领域升级52",
            description: "解锁一个释放新效果",
            cost: new Decimal(1e33),
            unlocked(){return hasChallenge("s",12)||hasUpgrade("b",22)},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"凝聚中的禁言石",
            currencyInternalName:"fillStone",
            currencyLayer:"s",  
        },
        83: {
            title: "领域升级53",
            description: "解锁一个释放新效果",
            cost: new Decimal(1e45),
            unlocked(){return hasChallenge("s",12)||hasUpgrade("b",22)},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"凝聚中的禁言石",
            currencyInternalName:"fillStone",
            currencyLayer:"s",
        },
        91: {
            title: "领域升级71",
            description: "释放效果基础计算对数时的底数/1.33",
            cost: new Decimal(1e65),
            effect(){
                let eff = four.div(3)
                return eff
            },
            effectDisplay(){return "/"+format(this.effect())},
            unlocked(){return player.b.R4Opened},
            style() { return {'border-radius': "0px",}},
        },
        92: {
            title: "领域升级72",
            description: "基于禁言石倍增仅对信息获取",
            cost: new Decimal(1e75),
            effect(){
                let eff = player.s.points.root(10)
                eff = powsoftcap(eff,n(1e75),ten)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            unlocked(){return player.b.R4Opened},
            style() { return {'border-radius': "0px",}},
        },
        93: {
            title: "领域升级73",
            description: "基于禁言砖倍增禁言石获取",
            cost: new Decimal(1e85),
            effect(){
                let eff = player.b.points.max(2).log(2)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            unlocked(){return player.b.R4Opened},
            style() { return {'border-radius': "0px",}},
        },
        101: {
            title: "领域升级81",
            description: "基于释放效果倍增禁言点获取",
            cost: new Decimal(1e100),
            effect(){
                let eff = n(1.2).pow(player.s.outEffBase)
                eff = logsoftcap(eff,n(1e40),two)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            unlocked(){return player.b.R4Opened},
            style() { return {'border-radius': "0px",}},
        },
        102: {
            title: "领域升级82",
            description: "禁言点倍增器的购买上限+10",
            cost: new Decimal(1e130),
            effect(){
                let eff = ten
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            unlocked(){return player.b.R4Opened},
            style() { return {'border-radius': "0px",}},
        },
        103: {
            title: "领域升级83",
            description: "基于禁言石以极低的效率倍增禁言砖获取",
            cost: new Decimal(1e160),
            effect(){
                let eff = player.s.points.max(10).log(10).root(3)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            unlocked(){return player.b.R4Opened},
            style() { return {'border-radius': "0px",}},
        },
    },
    buyables:{
        11:{
            title: "禁言点倍增器",
            cost(x) {
                let a = ten.pow(x.add(3))
                return a
            },
            display() { 
                let base = format(this.base())
                if(this.base().eq(4)) base = "四"
                if(this.base().eq(5)) base = "五"
                return base + "倍禁言点获取<br>价格: " + format(this.cost()) + "禁言石<br>效果: "+format(this.effect())+"x<br>购买量上限: "+format(this.purchaseLimit())},
            canAfford() { return player.s.points.gte(this.cost())},
            buy() {
                if(layers.b.LEffectP().gte(0.5)||hasUpgrade("c",22)){
                    setBuyableAmount(this.layer,this.id,player.s.points.max(1).log(10).sub(2).floor().min(this.purchaseLimit()))
                    return
                }
                player.s.points = player.s.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x){
                let eff = this.base().pow(x.add(this.other()))
                return eff
            },
            base(){
                let base = four
                if(hasUpgrade("b",14)) base = base.add(upgradeEffect("b",14))
                if(hasUpgrade("b",15)) base = base.add(upgradeEffect2("b",15))
                if(hasUpgrade("b",32)) base = base.mul(upgradeEffect("b",32))
                return base
            },
            purchaseLimit(){
                let max = n(100)
                if(hasUpgrade("s",102)) max = max.add(upgradeEffect("s",102))
                if(hasUpgrade("b",37)) max = max.add(upgradeEffect("b",37))
                if(hasUpgrade("c",13)) max = max.add(upgradeEffect("c",13))
                if(layers.b.LEffectP().gte(0.1)) max = max.add(layers.b.LEffect(5))
                return max
            },
            other(){
                let addt = zero
                if(layers.b.LEffectP().gt(0.0525)) addt = addt.add(player.s.buyables[14].mul(layers.b.LEffect(4)))
                return addt
            },
            unlocked(){return true},
            style() { return {filter: "brightness(100%)",'border-radius': "0px",height: "240px", width: "240px"}},
            tooltip(){
                let oth = ""
                if(this.other().gt(0)) oth = "+" + format(this.other())
                let a = "购买量: <h2 style='color:#444444;text-shadow:0px 0px 10px;'>"+ format(getBuyableAmount(this.layer,this.id),0) + "</h2>" +oth
                return a},
        },
        12:{
            title: "领域构筑器",
            cost(x) {
                let a = two.pow(x).mul(1e5)
                return a
            },
            display() { return "将禁言石转化为领域石<br>价格: " + format(this.cost()) + "禁言石<br>效果: +"+format(this.effect(),0)+"<br>上限: "+format(this.purchaseLimit(),0)},
            canAfford() { return player.s.points.gte(this.cost())},
            buy() {
                if(layers.b.LEffectP().gte(0.5)||hasUpgrade("c",22)){
                    let a = getBuyableAmount("s",12)
                    setBuyableAmount(this.layer,this.id,player.s.points.div(5e4).max(1).log(2).floor().min(this.purchaseLimit()))
                    player.s.rPoints = player.s.rPoints.add(getBuyableAmount("s",12).sub(a))
                    return
                }
                player.s.points = player.s.points.sub(this.cost())
                player.s.rPoints = player.s.rPoints.add(1)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x){
                let eff = x
                return eff
            },
            purchaseLimit(){
                let max = n(175)
                return max
            },
            unlocked(){return hasChallenge("s",11)||hasUpgrade("b",22)},
            style() { return {filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "240px"}},
            tooltip(){
                let a = "购买量: <h2 style='color:#444444;text-shadow:0px 0px 10px;'>"+ format(getBuyableAmount(this.layer,this.id),0) + "</h2>"
                return a},
        },
        14:{
            title: "禁言石倍增器",
            cost(x) {
                let a = ten.pow(x.add(hasUpgrade("b",43)?0:72))
                return a
            },
            display() { 
                let base = format(this.base())
                if(this.base().eq(2)) base = "双"
                if(this.base().eq(3)) base = "三"
                return base + "倍禁言石获取<br>价格: " + format(this.cost()) + "禁言石<br>效果: "+format(this.effect())+"x<br>购买量上限: "+format(this.purchaseLimit())},
            canAfford() { return player.s.points.gte(this.cost())},
            buy() {
                if(layers.b.LEffectP().gte(0.5)||hasUpgrade("c",22)){
                    setBuyableAmount(this.layer,this.id,player.s.points.max(1).log(10).add(1).floor().min(this.purchaseLimit()))
                    return
                }
                player.s.points = player.s.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x){
                let eff = this.base().pow(x)
                return eff
            },
            base(){
                let base = two
                if(layers.b.LEffectP().gte(0.75)) base = base.add(layers.b.LEffect(8))
                return base
            },
            purchaseLimit(){
                let max = n(100)
                if(hasUpgrade("c",14)) max = max.add(upgradeEffect("c",14))
                return max
            },
            unlocked(){return player.b.R4Opened},
            style() { return {filter: "brightness(100%)",'border-radius': "0px",height: "240px", width: "240px"}},
            tooltip(){
                let a = "购买量: <h2 style='color:#444444;text-shadow:0px 0px 10px;'>"+ format(getBuyableAmount(this.layer,this.id),0) + "</h2>"
                return a},
        },
    },
    challenges:{
        11: {
            name: "禁言石领域I",
            challengeDescription: "<h5>进入禁言石的第一领域,效果:<h6>仅对信息/25000,禁言点^0.25,管理怒火/1000,升级'外部禁言','自助信息','领域升级11'失效",
            canComplete() {return player.points.gte(1e4)},
            goalDescription: "10000禁言点",
            rewardDescription(){return "解锁第二层禁言石领域"},
            onEnter() {
                player.m.points = zero
            },
            style() {return {filter: "brightness(100%)",'border-radius': "0px",height: "232px", width: "232px"}},
            unlocked(){return true},
        },
        12: {
            name: "禁言石领域II",
            challengeDescription: "<h5>进入禁言石的第二领域,效果:<h6>仅对信息获取/20,升级'下载破解版'失效,禁言石领域I同时生效<h6>",
            canComplete() {return player.m.points.gte(1e9)},
            goalDescription: "1e9信息",
            rewardDescription(){return "解锁第三层禁言石领域"},
            onEnter() {
                player.m.points = zero
            },
            countsAs:[11],
            style() {return {filter: "brightness(100%)",'border-radius': "0px",height: "232px", width: "232px"}},
            unlocked(){return hasChallenge("s",11)||hasUpgrade("b",22)},
        },
        13: {
            name: "禁言石领域III",
            challengeDescription: "<h5>进入禁言石的第三领域,效果:<h6>清空已有的禁言石和释放时长,禁言石领域I,II同时生效",
            canComplete() {return player.s.points.gte(2e23)},
            goalDescription: "2e23禁言石",
            rewardDescription(){return player.b.unlocked?"凝聚重置不再重置领域挑战,凝聚器中的禁言石获取x1e10":"???"},
            onEnter() {
                player.m.points = player.s.points = player.s.outTime = zero
            },
            countsAs:[11,12],
            style() {return {filter: "brightness(100%)",'border-radius': "0px",height: "232px", width: "232px"}},
            unlocked(){return hasChallenge("s",12)||hasUpgrade("b",22)},
        },
        14: {
            name: "禁言石领域IV",
            challengeDescription: "<h5>进入禁言石的第四领域,效果:<h6>清空大部分已解锁的禁言石领域资源,禁言石获取^0.8,禁言石领域I,II,III同时生效",
            canComplete() {return player.s.points.gte(1e21)},
            goalDescription: "1e21禁言石",
            rewardDescription(){return hasUpgrade("b",37)?"解锁卢克特,注视之管理,同时解锁自动砌墙":"???"},
            onEnter() {
                player.s.fillStone = player.s.rPoints = player.m.points = player.s.points = player.s.outTime = player.s.buyables[11] = player.s.buyables[12] = player.s.buyables[14] = zero;player.s.upgrades=[];
            },
            countsAs:[11,12,13],
            style() {return {filter: "brightness(100%)",'border-radius': "0px",height: "232px", width: "232px"}},
            unlocked(){return player.b.R4Opened},
        },
    },
    clickables:{
        11:{
            title() {return player.s.u13a?"关闭u13效果":"开启u13效果"},
            canClick(){return true},
            onClick() {          
                player.s.u13a = !player.s.u13a
            },
            style() { return { 'background-color': this.canClick()?"#88FFFF":"#bf8f8f", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "120px"}},
            unlocked(){return hasUpgrade("s",13)},
        },
        21:{
            title() {
                if(hasUpgrade("c",34)) return "领域回收器"
                let a = player.s.reRB?"开":"关"
                return "领域回收器-"+a},
            display(){
                let a = "在下次固化重置回收已花费的领域石"
                if(hasUpgrade("c",34)) a = "回收已花费的领域石"
                return a + "<br><h3>剩余领域石: "+format(player.s.rPoints,0)+"<br>总领域石: "+format(layers.s.rPointMax(),0)},
            canClick(){return true},
            onClick() {          
                if(hasUpgrade("c",34)) {
                    quickUpgBuyorSell("s",[61,62,63,71,72,73])
                    player.s.rPoints=layers.s.rPointMax()
                    return
                }
                player.s.reRB=!player.s.reRB
            },
            style() { return { 'background-color': this.canClick()?"#88FFFF":"#bf8f8f", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "240px"}},
            unlocked(){return hasChallenge("s",11)||hasUpgrade("b",22)},
        },
        31:{
            title() {return "释放凝聚器中的禁言石"},
            display(){
                let text = "将凝聚器中压缩的禁言石释放,获得短时提升效果<br>释放后,效果持续时间 ="+formatTime(player.s.fillStone.max(10).log(10).floor())+"<br>效果基础 "+format(player.s.outEffBase)+" ➜ "+format(this.effectB())+"<br>剩余时间: "+formatTime(player.s.outTime)+"<br>效果:1.倍增禁言点获取 x"+format(layers.s.outEffect(1))
                if(hasUpgrade("s",81)) text += "<br>2.倍增禁言石获取 x" + format(layers.s.outEffect(2))
                if(hasUpgrade("s",82)) text += "<br>3.增加释放效果1的指数 +" + format(layers.s.outEffect(3))
                if(hasUpgrade("s",83)) text += "<br>4.倍增禁言砖获取 x" + format(layers.s.outEffect(4))
                return text},
            canClick(){return true},
            onClick() {          
                player.s.outTime = player.s.fillStone.max(10).log(10).floor()
                player.s.outEffBase = this.effectB()
                player.s.fillStone = zero
            },
            effectB(){
                let base = player.s.fillStone.max(this.EFloor().pow(16)).log(this.EFloor()).sub(16)
                //base=base.max(player.s.outEffBase)
                return base
            },
            EFloor(){
                let floor = ten
                if(hasUpgrade("b",31)) floor = floor.div(upgradeEffect("b",31))
                if(hasUpgrade("s",91)) floor = floor.div(upgradeEffect("s",91))
                return floor
            },
            style() { return { 'background-color': "#DDDDDD", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "240px"}},
            unlocked(){return hasChallenge("s",12)||hasUpgrade("b",22)},
        },
        32:{
            title() {
                let a = player.s.onFill?"开":"关"
                return "填充禁言石到凝聚器-"+a},
            display(){return "每秒填充2%当前的禁言石到凝聚器<br><h3>填充进度: "+format(tmp.s.bars["u9x"].req.mul(100))+"%<br>当前: -"+format(player.s.onFill?player.s.points.div(50):zero)+"禁言石/s"},
            canClick(){return true},
            onClick() {          
                player.s.onFill=!player.s.onFill
            },
            style() { return { 'background-color': player.s.onFill?"#777777":"#FFFFFF", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "240px"}},
            unlocked(){return hasChallenge("s",12)||hasUpgrade("b",22)},
        },
    },
    bars:{
        u9x:{
            direction: RIGHT,
            width: 356,
            height: 116,
            req(){
                let max = n(66)
                let req = player.s.fillStone.max(1e16).log(10).sub(16).div(max).min(1)
                return req
            },
            fillStyle: {'background-color' : "#444444"},
            progress() { return this.req() },
            display(){return "凝聚器中有 "+format(player.s.fillStone)+" 禁言石<br>由于凝聚器的不稳定,每秒损失其中的5%<br>填充进度: "+format(this.req().mul(100))+"%<br>填充进度达到 100% 后解锁第四层领域!"},
            borderStyle: {'border-radius': "0px",},
            unlocked(){return hasChallenge("s",12)||hasUpgrade("b",22)},
        },
    },
    rPointMax(){
        let max = buyableEffect("s",12)
        return max
    },
    fillGet(){
        let get = player.s.points.mul(0.02)
        return get
    },
    fillMult(){
        let mult = one
        if(hasChallenge("s",13)) mult = mult.mul(1e10)
        return mult
    },
    outEffect(num){
        let eff = one
        if(num==1){
            let power = five
            if(hasUpgrade("s",82)) power = power.add(layers.s.outEffect(3))
            if(hasUpgrade("b",23)) power = power.add(upgradeEffect("b",23))
            eff = player.s.outEffBase.add(1).pow(power)
            eff = powsoftcap(eff,n(1e50),five)
        }if(num==2){
            if(hasUpgrade("s",81)) eff = player.s.outEffBase.add(1).pow(2)
        }if(num==3){
            if(hasUpgrade("s",82)) eff = player.s.outEffBase.root(3)
        }if(num==4){
            if(hasUpgrade("s",83)) eff = player.s.outEffBase.add(1).root(3)
        }
        return eff
    },
    update(diff){
        player.s.fillStone = player.s.fillStone.sub(player.s.fillStone.mul(0.05).mul(diff)).max(0)
        player.s.outTime = player.s.outTime.sub(diff).max(0)
        if(player.s.outTime.eq(0)) player.s.outEffBase = zero
        if(player.s.onFill){
            player.s.fillStone = player.s.fillStone.add(layers.s.fillGet().mul(layers.s.fillMult()).mul(diff))
            if(!hasUpgrade("c",21))player.s.points = player.s.points.sub(layers.s.fillGet().mul(diff)).max(0)
        }
    },
    microtabs:{
        stones:{
            "升级":{
                buttonStyle: {
                    "border-color": "white","background-color": "#0f0f0f"
                },
                content:[
                    "blank",["upgrades",[1,2,3]],["clickable",11],["display-text", function() {return "到达 5e26 禁言石 解锁 "+quickColor("禁言砖","#ce723c")}],
                ],
            },
            "领域":{
                buttonStyle: {
                    "border-color": "#444444","background-color": "#0f0f0f"
                },
                content:[
                    "blank","blank",
                    ["row",[["buyable",11],["column",[["row",[["upgrade",41],["upgrade",42],["upgrade",43]]],["row",[["upgrade",51],["upgrade",52],["upgrade",53]]]]],["challenge",11]]],
                    ["row",[["column",[["buyable",12],["clickable",21]]],["column",[["row",[["upgrade",61],["upgrade",62],["upgrade",63]]],["row",[["upgrade",71],["upgrade",72],["upgrade",73]]]]],["challenge",12]]],
                    ["row",[["column",[["clickable",31],["clickable",32]]],["column",[["row",[["upgrade",81],["upgrade",82],["upgrade",83]]],["bar","u9x"]]],["challenge",13]]],
                    ["row",[["buyable",14],["column",[["row",[["upgrade",91],["upgrade",92],["upgrade",93]]],["row",[["upgrade",101],["upgrade",102],["upgrade",103]]]]],["challenge",14]]],
                ],
                unlocked(){return hasUpgrade("s",35)||player.b.unlocked}
            },
        },
    },
    tabFormat: [ 
        ["display-text", function() { return getPointsDisplay() }],
        ["row",[["column",["main-display","prestige-button"]],"blank",                             
        ["display-text",function(){return "你有 "+format(player.points)+" 禁言点<br>你最多同时拥有 "+format(player.s.best,0)+" 禁言石<br>你共有 "+format(player.s.total,0)+" 禁言石<br>你在新的固化中花费了 "+formatTime(player.s.resetTime)+"<br>最佳固化时间为 "+formatTime(player.s.bestTime)+""}]]],
        ["microtabs","stones"] 
    ], 
    layerShown(){return true},
})
addLayer("b", {
    name: "brick",
    symbol: "禁言砖",
    position: 0,
    startData() { return {
        unlocked: false,
		points: zero,
        bestTime: new Decimal(1e308),
        waiTime: zero,
        waiTimeMax: zero,
        walledBrick: zero,
        R4Opened: false,
        unlLA: false,
        saveP: zero,
        saveUpgs: [],
        Lpoints: zero,
    }},
    color: "#ce723c",
    requires: new Decimal(5e26),
    resource: "禁言砖",
    baseResource: "禁言石",
    baseAmount() {return player.s.points},
    type: "normal",
    exponent: 0.1,
    gainMult() {
        mult = one
        if(hasUpgrade("s",103)) mult = mult.mul(upgradeEffect("s",103))
        if(player.s.outTime.gt(0)) mult = mult.mul(layers.s.outEffect(4))
        if(layers.b.LEffectP().gte(0.03)) mult = mult.mul(layers.b.LEffect(3))
        if(getBuyableAmount("b",12).gte(1)) mult = mult.mul(buyableEffect("b",12))
        if(hasUpgrade("b",52)) mult = mult.mul(upgradeEffect("b",52))
        if(hasUpgrade("c",31)) mult = mult.mul(upgradeEffect("c",31))
        return mult
    },
    gainExp() {
        exp = one.div(10000)
        if(hasUpgrade("b",16)) exp = one
        return exp
    },
    row: 3,
    doReset(resettingLayer){
        player.b.bestTime=player.b.bestTime.min(player.b.resetTime)
        if (layers[resettingLayer].row > layers[this.layer].row) {
            let kept = []
            layerDataReset(this.layer, kept)
            if(resettingLayer=="c"){
                if(hasUpgrade("c",42)) player.b.upgrades = [11,12,13,14,15,16]
            }
        }
    },
    hotkeys: [
        {key: "b", description: "B: 进行凝聚重置(禁言砖)", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.s.total.gt(1e20)||player.b.unlocked},
    passiveGeneration() { 
        let a = zero
        if(hasUpgrade("c",44)) a = a.max(upgradeEffect("c",44))
        return a
    },
    upgrades:{
        11: {
            title: "砖化练习",
            description: "打字冷却时间在计算完减法后/5",
            effect(){
                let eff = five
                return eff
            },
            effectDisplay(){return "/"+format(this.effect())},
            cost: new Decimal(0.5),
            unlocked(){return player.b.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        12: {
            title: "禁言点强化",
            description: "禁言点获取x20",
            effect(){
                let eff = five.mul(4)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(0.5),
            unlocked(){return player.b.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        13: {
            title: "禁言石强化",
            description: "禁言石获取x5",
            effect(){
                let eff = five
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(0.5),
            unlocked(){return player.b.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        14: {
            title: "禁言点倍率强化",
            description: "禁言点倍增器的效果底数+1",
            effect(){
                let eff = one
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            cost: new Decimal(0.5),
            unlocked(){return player.b.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        15: {
            title: "均衡强化",
            description: "仅对信息获取-禁言点获取-禁言石获取x3,禁言点倍增器的效果底数+0.5",
            effect(){
                let eff = three
                return eff
            },effect2(){
                let eff = one.div(2)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())+",+"+format(this.effect2())},
            cost: new Decimal(1),
            unlocked(){return player.b.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        16: {
            title: "恢复增长",
            description: "将禁言砖的获取指数恢复正常(1/50000➜1/10)",
            cost: new Decimal(0),
            unlocked(){
                let a = hasUpgrade("b",11)&&hasUpgrade("b",12)&&hasUpgrade("b",13)&&hasUpgrade("b",14)&&hasUpgrade("b",15)
                return a||inChallenge("b",11)||player.c.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        17: {
            title: "自动领域",
            description: "自动购买领域可购买,保持开启填充禁言石(在自动化页面中调整)",
            cost: new Decimal(3000),
            unlocked(){return player.b.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        21: {
            title: "禁言砖墙",
            description: "禁言时间上限变为0s,升级'外部禁言''外部禁言?'免费,但在禁言石领域挑战中失效",
            cost: new Decimal(10),
            unlocked(){return player.b.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        22: {
            title: "领域解锁",
            description: "你不需要通过完成挑战来解锁禁言石的更高层领域,但每完成一个领域挑战,使禁言石获取x10",
            effect(){
                let eff = one
                if(hasChallenge("s",11)) eff = eff.mul(10)
                if(hasChallenge("s",12)) eff = eff.mul(10)
                if(hasChallenge("s",13)) eff = eff.mul(10)
                if(hasChallenge("s",14)) eff = eff.mul(10)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(15),
            unlocked(){return player.b.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        23: {
            title: "额外释放",
            description: "释放效果1指数额外+1",
            effect(){
                let eff = one
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            cost: new Decimal(50),
            unlocked(){return player.b.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        24: {
            title: "自动固化",
            description: "每秒自动获取固化时能获取的100%禁言石",
            effect(){
                let eff = one
                return eff
            },
            effectDisplay(){return "+"+format(this.effect().mul(100),0)+"/%"},
            cost: new Decimal(250),
            unlocked(){return player.b.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        25: {
            title: "自动升级",
            description: "自动购买所有禁言石层的升级",
            cost: new Decimal(2000),
            unlocked(){return player.b.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        26: {
            title: "砖反增益",
            description: "x100禁言点获取,但效果基于禁言点减弱(下限x1)",
            effect(){
                let eff = n(100)
                eff = eff.div(player.points.max(10).log(10).div(two.log(10).mul(1024)).mul(100)).max(1)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            cost: new Decimal(2500),
            unlocked(){return player.b.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        27: {
            title: "禁言记忆",
            description: "解锁剧情页面和砌墙页面(这还真是用禁言砖造墙",
            cost: new Decimal(1e4),
            unlocked(){return hasUpgrade("b",16)||inChallenge("b",11)||player.c.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        31: {
            title: "释放优化",
            description: "释放效果基础计算对数时的底数/1.25",
            cost: new Decimal(50000),
            effect(){
                let eff = one.add(0.25)
                return eff
            },
            effectDisplay(){return "/"+format(this.effect())},
            unlocked(){return hasUpgrade("b",27)||inChallenge("b",11)||player.c.unlocked},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"投入砌墙的禁言砖",
            currencyInternalName:"walledBrick",
            currencyLayer:"b",
        },      
        32: {
            title: "倍增优化",
            description: "可购买'禁言点倍增器'的效果基础x1.25(计算完加法后)",
            cost: new Decimal(50000),
            effect(){
                let eff = one.add(0.25)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            unlocked(){return hasUpgrade("b",27)||inChallenge("b",11)||player.c.unlocked},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"投入砌墙的禁言砖",
            currencyInternalName:"walledBrick",
            currencyLayer:"b",
        },   
        33: {
            title: "禁言次数优化",
            description: "基于禁言砖数量倍增禁言次数获取",
            cost: new Decimal(50000),
            effect(){
                let eff = player.b.points.max(1.001).log(1.001).pow(2)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            unlocked(){return hasUpgrade("b",27)||inChallenge("b",11)||player.c.unlocked},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"投入砌墙的禁言砖",
            currencyInternalName:"walledBrick",
            currencyLayer:"b",
        },
        34: {
            title: "墙体优化",
            description: "将砌墙的进度转减弱注视效果的比率由1/4增加到1/3",
            cost: new Decimal(1000000),
            unlocked(){return hasUpgrade("b",27)||inChallenge("b",11)||player.c.unlocked},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"投入砌墙的禁言砖",
            currencyInternalName:"walledBrick",
            currencyLayer:"b",
        },
        35: {
            title: "砌墙优化",
            description: "砌墙冷却时间/2",
            cost: new Decimal(100000000),
            effect(){
                let eff = two
                return eff
            },
            effectDisplay(){return "/"+format(this.effect())},
            unlocked(){return hasUpgrade("b",27)||inChallenge("b",11)||player.c.unlocked},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"投入砌墙的禁言砖",
            currencyInternalName:"walledBrick",
            currencyLayer:"b",
        },
        36: {
            title: "额外降低",
            description: "降低注视效果额外 -1%",
            cost: new Decimal(1e11),
            effect(){
                let eff = one.div(100)
                return eff
            },
            effectDisplay(){return "-"+format(this.effect().mul(100),0)+"%"},
            unlocked(){return hasUpgrade("b",27)||inChallenge("b",11)||player.c.unlocked},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"投入砌墙的禁言砖",
            currencyInternalName:"walledBrick",
            currencyLayer:"b",
        },
        37: {
            title: "扩容优化",
            description: "禁言点倍增器购买上限基于禁言砖增加",
            cost: new Decimal(1e14),
            effect(){
                let eff = player.b.points.max(1).log(10).floor()
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            unlocked(){return hasUpgrade("b",27)||inChallenge("b",11)||player.c.unlocked},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"投入砌墙的禁言砖",
            currencyInternalName:"walledBrick",
            currencyLayer:"b",
        },
        41: {
            title: "注视升级11",
            description: "进入注视领域时,保留领域升级13,23;信息获取x100",
            cost: new Decimal(1e5),
            effect(){
                let eff = ten.mul(10)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            unlocked(){return true},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"注视点",
            currencyInternalName:"Lpoints",
            currencyLayer:"b",
        },
        42: {
            title: "注视升级12",
            description: "进入注视领域时,获得3个禁言砖",
            cost: new Decimal(1e11),
            unlocked(){return true},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"注视点",
            currencyInternalName:"Lpoints",
            currencyLayer:"b",
        },
        43: {
            title: "注视升级13",
            description: "禁言石倍增器的初始价格下调至1,解锁自动购买禁言石倍增器",
            cost: new Decimal(5e14),
            unlocked(){return true},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"注视点",
            currencyInternalName:"Lpoints",
            currencyLayer:"b",
        },
        51: {
            title: "注视升级21",
            description: "基于投入砌墙的禁言砖额外降低注视效果",
            cost: new Decimal(1e36),
            effect(){
                let eff = player.b.walledBrick.max(1e44).log(10).sub(44).div(20).max(0).min(0.15)
                return eff
            },
            effectDisplay(){return "-"+format(this.effect().mul(100))+"%"},
            unlocked(){return true},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"注视点",
            currencyInternalName:"Lpoints",
            currencyLayer:"b",
        },
        52: {
            title: "注视升级22",
            description: "解锁禁言环,禁言砖获取x100",
            cost: new Decimal(1e69),
            effect(){
                let eff = ten.mul(10)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            unlocked(){return true},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"注视点",
            currencyInternalName:"Lpoints",
            currencyLayer:"b",
        },
        53: {
            title: "注视升级23",
            description: "???",
            cost: new Decimal(1e1000),
            unlocked(){return true},
            style() { return {'border-radius': "0px",}},
            currencyDisplayName:"注视点",
            currencyInternalName:"Lpoints",
            currencyLayer:"b",
        },
    },
    clickables:{
        11:{
            title() {return "砌墙"},
            display() {return "将你的10%的禁言砖用于砌墙,用于砌墙的禁言砖越多,冷却时间越长<br>当前: -"+format(this.WBG(),0)+" 禁言砖<br>+"+formatTime(this.WTG())+" 冷却时间"},
            canClick(){return player.b.waiTime.eq(0)&&!inChallenge("b",11)&&hasUpgrade("b",27)},
            onClick() {          
                player.b.walledBrick = player.b.walledBrick.add(this.WBG())
                player.b.waiTime = player.b.waiTimeMax = this.WTG()
                if(!hasUpgrade("c",24)) player.b.points = player.b.points.sub(this.WBG())
            },
            WBG(){
                let wb = player.b.points.div(10).floor()
                return wb
            },
            WTG(){
                let wt = this.WBG().div(10).max(1).log(10).pow(2)
                if(hasUpgrade("b",35)) wt = wt.div(upgradeEffect("b",35))
                if(getBuyableAmount("b",13).gte(1)) wt = wt.div(buyableEffect("b",13))
                if(hasUpgrade("c",33)) wt = wt.div(5)
                return wt
            },
            style() { return { 'background-color': this.canClick()?"#ffffff":"#bf8f8f", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "240px"}},
            unlocked(){return hasUpgrade("b",27)||inChallenge("b",11)||player.c.unlocked},
        },
    },
    challenges:{
        11: {
            name: "注视之管理的领域",
            challengeDescription(){return "<h2>进入注视之管理的领域,效果:<h3><br>清空禁言砖,禁言砖升级页面中的前两行升级,但储存这些禁言砖和升级,退出领域后返还<br>进行一次禁言砖重置,但保留'外部禁言''外部禁言?'两升级<br>禁言点和禁言石获取基于未降低的注视效果降低,当前: ^"+format(this.inCeff(),4)+"<br>信息获取/1e8,打字速度/3<br>在领域中,进行凝聚重置会自动退出领域<br>当退出领域时,基于已有的信息,禁言点,禁言石获取注视点!<br>当前可获得 +"+format(inChallenge("b",11)?this.pointG():zero)+" 注视点<br>(起始于1000信息,软上限于1e15注视点)<br>"},
            canComplete() {return player.points.gte(1e100000000000000000000000)},
            goalDescription: "<h3>???",
            rewardDescription(){return "<h3>???"},
            onEnter() {
                const upg = quickSpawnConst(2,7)
                for(u in upg){
                    if(hasUpgrade("b",upg[u])) player.b.saveUpgs.push(upg[u])
                }
                quickUpgBuyorSell("b",upg,false);player.b.saveP=player.b.points;player.b.points = zero
                player.s.upgrades = [21,24].concat(hasUpgrade("b",41)?[43,53]:[])
                if(hasUpgrade("b",42)) player.b.points = three
            },
            pointG(){
                let get = zero
                get = player.m.points.div(1000).max(1).log(10).mul(player.points.root(2).max(1)).mul(player.s.points.max(1))
                get = powsoftcap(get,n(1e15),three)
                get = powsoftcap(get,n(1e30),three)
                return get
            },
            onExit() {
                player.b.Lpoints = player.b.Lpoints.add(this.pointG())
                quickUpgBuyorSell("b",quickSpawnConst(2,7),false)
                player.b.upgrades=player.b.upgrades.concat(player.b.saveUpgs);player.b.saveUpgs = []
                player.b.points = player.b.saveP;player.b.saveP = zero
            },
            inCeff(){
                let eff = layers.b.LEffectP()
                return eff
            },
            style() {return {filter: "brightness(100%)",'border-radius': "0px",height: "592px", width: "352px"}},
            unlocked(){return player.b.unlLA},
        },
    },
    buyables:{
        11:{
            title: "注视减弱器",
            cost(x) {
                let a = ten.pow(x)
                return a
            },
            display() { 
                let base = format(this.base().mul(100))
                return "额外降低 " + base + "% 的注视效果<br>价格: " + format(this.cost()) + "注视点<br>效果: -"+format(this.effect().mul(100))+"%<br>购买量上限: "+format(this.purchaseLimit())},
            canAfford() { return player.b.Lpoints.gte(this.cost())},
            buy() {
                player.b.Lpoints = player.b.Lpoints.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x){
                let eff = this.base().mul(x)
                return eff
            },
            base(){
                let base = one.div(100)
                return base
            },
            purchaseLimit(){
                let max = n(50)
                return max
            },
            unlocked(){return true},
            style() { return {filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "360px"}},
            tooltip(){
                let oth = ""
                //if(this.other().gt(0)) oth = "+" + format(this.other())
                let a = "购买量: <h2 style='color:#AAAAAA;text-shadow:0px 0px 10px;'>"+ format(getBuyableAmount(this.layer,this.id),0) + "</h2>" +oth
                return a},
        },
        12:{
            title: "禁言砖倍增器",
            cost(x) {
                let a = five.pow(x.add(1))
                return a
            },
            display() { 
                let base = format(this.base())
                if(this.base().eq(2)) base = "双"
                return base + "倍禁言砖获取<br>价格: " + format(this.cost()) + "注视点<br>效果: "+format(this.effect())+"x<br>购买量上限: "+format(this.purchaseLimit())},
            canAfford() { return player.b.Lpoints.gte(this.cost())},
            buy() {
                player.b.Lpoints = player.b.Lpoints.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x){
                let eff = this.base().pow(x)
                return eff
            },
            base(){
                let base = two
                return base
            },
            purchaseLimit(){
                let max = n(50)
                return max
            },
            unlocked(){return true},
            style() { return {filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "360px"}},
            tooltip(){
                let oth = ""
                //if(this.other().gt(0)) oth = "+" + format(this.other())
                let a = "购买量: <h2 style='color:#AAAAAA;text-shadow:0px 0px 10px;'>"+ format(getBuyableAmount(this.layer,this.id),0) + "</h2>" +oth
                return a},
        },
        13:{
            title: "砌墙加速器",
            cost(x) {
                let a = n(100).pow(x)
                return a
            },
            display() { 
                let base = format(this.base())
                if(this.base().eq(2)) base = "双"
                return base + "倍砌墙速度<br>价格: " + format(this.cost()) + "注视点<br>效果: 冷却时间/"+format(this.effect())+"<br>购买量上限: "+format(this.purchaseLimit())},
            canAfford() { return player.b.Lpoints.gte(this.cost())},
            buy() {
                player.b.Lpoints = player.b.Lpoints.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x){
                let eff = this.base().pow(x)
                return eff
            },
            base(){
                let base = two
                return base
            },
            purchaseLimit(){
                let max = n(10)
                return max
            },
            unlocked(){return true},
            style() { return {filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "360px"}},
            tooltip(){
                let oth = ""
                //if(this.other().gt(0)) oth = "+" + format(this.other())
                let a = "购买量: <h2 style='color:#AAAAAA;text-shadow:0px 0px 10px;'>"+ format(getBuyableAmount(this.layer,this.id),0) + "</h2>" +oth
                return a},
        },
    },
    bars:{
        wall:{
            direction: UP,
            width: 356,
            height: 236,
            req(){
                max = 35
                req = player.b.walledBrick.max(1).log(10).sub(3).div(max).max(0).min(1)
                return req
            },
            fillStyle: {'background-color' : "#ce723c"},
            progress() { return this.req() },
            display(){
                let text = "砌墙进度: "+format(this.req().mul(100))+"%<br>你已将 "+format(player.b.walledBrick)+" 禁言砖投入砌墙<br>已砌的墙降低注视的效果 -"+format(this.effect().mul(100))+"%<br>共降低注视效果 -"+format(layers.b.LEffectP().mul(100))+"%<br>效果:<h5>"
                if(layers.b.LEffectP().lt(0.006)) text += "降低注视效果 -0.6% 解锁第一效果"
                if(layers.b.LEffectP().gte(0.006)) text += "1.倍增信息(仅对信息),禁言点获取 x" + format(layers.b.LEffect(1))
                if(layers.b.LEffectP().lt(0.01)&&layers.b.LEffectP().gte(0.006)) text += "<br>降低注视效果 -1% 解锁第二效果"
                if(layers.b.LEffectP().gte(0.01)) text += "<br>2.倍增禁言石获取 x" + format(layers.b.LEffect(2))
                if(layers.b.LEffectP().lt(0.03)&&layers.b.LEffectP().gte(0.01)) text += "<br>降低注视效果 -3% 解锁第三效果"
                if(layers.b.LEffectP().gte(0.03)) text += "<br>3.倍增禁言砖获取 x" + format(layers.b.LEffect(3))
                if(layers.b.LEffectP().lt(0.0525)&&layers.b.LEffectP().gte(0.03)) text += "<br>降低注视效果 -5.25% 解锁第四效果"
                if(layers.b.LEffectP().gte(0.0525)) text += "<br>4.每个禁言石倍增器给予禁言点倍增器 " + format(layers.b.LEffect(4)) + " 个额外等级"
                if(layers.b.LEffectP().lt(0.1)&&layers.b.LEffectP().gte(0.0525)) text += "<br>降低注视效果 -10% 解锁第五效果"
                if(layers.b.LEffectP().gte(0.1)) text += "<br>5.增加禁言点倍增器的购买上限 +" + format(layers.b.LEffect(5),0)
                if(layers.b.LEffectP().lt(0.25)&&layers.b.LEffectP().gte(0.1)) text += "<br>降低注视效果 -25% 解锁第六效果"
                if(layers.b.LEffectP().gte(0.25)) text += "<br>6.增加效果1,2,3的指数 +" + format(layers.b.LEffect(6))
                if(layers.b.LEffectP().lt(0.5)&&layers.b.LEffectP().gte(0.25)) text += "<br>降低注视效果 -50% 解锁第七效果"
                if(layers.b.LEffectP().gte(0.5)) text += "<br>7.最大化购买禁言石层的可购买,且不再消耗禁言石"
                if(layers.b.LEffectP().lt(0.75)&&layers.b.LEffectP().gte(0.5)) text += "<br>降低注视效果 -75% 解锁第八效果"
                if(layers.b.LEffectP().gte(0.75)) text += "<br>8.增加禁言石倍增器的基础效果 +" + format(layers.b.LEffect(8))
                if(layers.b.LEffectP().lt(1)&&layers.b.LEffectP().gte(0.75)) text += "<br>降低注视效果 -100% 解锁第九效果"
                if(layers.b.LEffectP().gte(1)) text += "<br>9. " + format(layers.b.LEffect(9))
                return text
            },
            borderStyle: {'border-radius': "0px",},
            unlocked(){return true},
            effect(){
                return this.req().div(hasUpgrade("b",34)?3:4)
            },
        },
        wait:{
            direction: RIGHT,
            width: 236,
            height: 116,
            req(){
                if(player.b.waiTimeMax.eq(0)) return zero
                req = player.b.waiTime.div(player.b.waiTimeMax)
                return req
            },
            fillStyle: {'background-color' : "#aa4411"},
            progress() { return this.req() },
            display(){return "砌墙冷却时间: <br>"+formatTime(player.b.waiTime)+"/"+formatTime(player.b.waiTimeMax)},
            borderStyle: {'border-radius': "0px"},
            unlocked(){return true},
        },
        unlL:{
            direction: RIGHT,
            width: 596,
            height: 56,
            req(){
                return player.s.buyables[14].div(100).min(1)
            },
            fillStyle: {'background-color' : "#444444"},
            progress() { return this.req() },
            display(){return "解锁 注视之管理的领域 需要使禁言石倍增器的数量达到100("+format(this.req().mul(100),0)+"%)"},
            borderStyle: {'border-radius': "0px"},
            unlocked(){return !player.b.unlLA},
        },
    },
    LEffectP(){
        let eff = tmp.b.bars["wall"].effect
        if(hasUpgrade("b",36)) eff = eff.add(upgradeEffect("b",36))
        if(getBuyableAmount("b",11).gte(1)) eff = eff.add(buyableEffect("b",11))
        if(hasUpgrade("b",51)) eff = eff.add(upgradeEffect("b",51))
        eff = eff.min(100).max(0)
        return eff   
    },
    LEffect(num){
        let eff = one
        if(num==1){
            if(layers.b.LEffectP().gte(0.006)) eff = layers.b.LEffectP().mul(100).add(1).pow(six.add(layers.b.LEffect(6))).add(layers.b.LEffectP().mul(2500))
        }if(num==2){
            if(layers.b.LEffectP().gte(0.01)) eff = layers.b.LEffectP().mul(100).add(1).pow(three.add(layers.b.LEffect(6))).add(layers.b.LEffectP().mul(1250))
        }if(num==3){
            if(layers.b.LEffectP().gte(0.03)) eff = layers.b.LEffectP().mul(100).pow(two.add(layers.b.LEffect(6))).max(1)
        }if(num==4){
            if(layers.b.LEffectP().gte(0.0525)) eff = layers.b.LEffectP().root(2).min(1)
            else eff = zero
        }if(num==5){
            if(layers.b.LEffectP().gte(0.1)) eff = layers.b.LEffectP().mul(100).floor()
            else eff = zero
        }if(num==6){
            if(layers.b.LEffectP().gte(0.25)) eff = layers.b.LEffectP().mul(100).max(2).log(2).root(2).sub(1)
            else eff = zero
        }if(num==8){
            if(layers.b.LEffectP().gte(0.75)) eff = layers.b.LEffectP().sub(0.75).max(0)
            else eff = zero
        }
        return eff
    },
    update(diff){
        player.b.waiTime = player.b.waiTime.sub(diff).max(0)
        if(player.b.waiTime.eq(0)) player.b.waiTimeMax = zero
        if(tmp.s.bars["u9x"].req.gte(1)) player.b.R4Opened = true
        if(tmp.b.bars["unlL"].req.gte(1)) player.b.unlLA = true
    },
    microtabs:{
        bricks:{
            "升级":{
                buttonStyle: {
                    "border-color": "white","background-color": "#0f0f0f"
                },
                content:[
                    "blank",["upgrades",[1,2,3]],["display-text", function() {return "到达 1e50 禁言砖 解锁 "+quickColor("禁言环","#88FF88")}],
                ],
            },
            "砌墙":{
                buttonStyle: {
                    "border-color": "#ce723c","background-color": "#0f0f0f"
                },
                content:[
                    "blank",
                    ["display-text", function() {return quickColor("<i>你感到好像有人在注视着你...</i>","#ce723c")}],
                    "blank",["row",[["column",[["clickable",11],["bar","wait"]]],["bar","wall"]]]
                ],
                unlocked(){return hasUpgrade("b",27)||player.c.unlocked},
            },
            "注视":{
                buttonStyle: {
                    "border-color": "#ce723c","background-color": "#0f0f0f"
                },
                content:[
                    "blank",["bar","unlL"],["display-text",function(){
                        return "你有 <h2 style='text-shadow:0px 0px 10px;'>" +quickColor(format(player.b.Lpoints),"#AAAAAA") +"</h2> 注视点"
                    }],"blank",["row",[["challenge",11],["column",[["buyable",11],["buyable",12],["buyable",13],["row",[["upgrade",41],["upgrade",42],["upgrade",43]]],["row",[["upgrade",51],["upgrade",52],["upgrade",53]]]]]]]
                ],
                unlocked(){return hasChallenge("s",14)||player.c.unlocked},
            },
        },
    },
    tabFormat: [ 
        ["display-text", function() { return getPointsDisplay() }],
        ["row",[["column",["main-display","prestige-button"]],"blank",                             
        ["display-text",function(){return "你有 "+format(player.s.points)+" 禁言石<br>你最多同时拥有 "+format(player.b.best,0)+" 禁言砖<br>你共有 "+format(player.b.total,0)+" 禁言砖<br>你在新的凝聚中花费了 "+formatTime(player.b.resetTime)+"<br>最佳凝聚时间为 "+formatTime(player.b.bestTime)+""}]]],
        ["microtabs","bricks"]
    ], 
})
addLayer("c", {
    name: "cycle",
    symbol: "禁言环",
    position: 0,
    startData() { return {
        unlocked: false,
		points: zero,
        bestTime: new Decimal(1e308),
    }},
    color: "#88FF88",
    requires: new Decimal(1e50),
    resource: "禁言环",
    baseResource: "禁言砖",
    baseAmount() {return player.b.points},
    type: "normal",
    exponent: 1/55,
    gainMult() {
        mult = one
        return mult
    },
    gainExp() {
        exp = one
        return exp
    },
    row: 4,
    doReset(resettingLayer){
        player.c.bestTime=player.c.bestTime.min(player.c.resetTime)
        if (layers[resettingLayer].row > layers[this.layer].row) {
            let kept = []
            layerDataReset(this.layer, kept)
        }
    },
    hotkeys: [
        {key: "c", description: "C: 进行衔接重置(禁言环)", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return tmp.b.bars['wall'].req.gte(1)||player.c.unlocked},
    
    upgrades:{
        11: {
            title: "环形正提升I",
            description: "基于禁言点倍增禁言点获取,x1e50到达上限",
            cost: new Decimal(0.25),
            buy(){
                player.c.points = n(format(player.c.points,5))
            },
            effect(){
                let eff = player.points.root(10)
                eff = powsoftcap(eff,n(1e20),five)
                eff = eff.max(1).min(1e50)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            unlocked(){return player.c.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        12: {
            title: "环形正提升II",
            description: "基于禁言石倍增禁言石石获取,x1e25到达上限",
            cost: new Decimal(0.25),
            buy(){
                player.c.points = n(format(player.c.points,5))
            },
            effect(){
                let eff = player.s.points.root(20)
                eff = powsoftcap(eff,n(1e10),five)
                eff = eff.max(1).min(1e25)
                return eff
            },
            effectDisplay(){return "x"+format(this.effect())},
            unlocked(){return player.c.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        13: {
            title: "环形扩容I",
            description: "禁言点倍增器上限+20",
            cost: new Decimal(0.5),
            buy(){
                player.c.points = n(format(player.c.points,5))
            },
            effect(){
                let eff = n(20)
                return eff
            },
            effectDisplay(){return "+"+format(this.effect(),0)},
            unlocked(){return player.c.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        14: {
            title: "环形扩容II",
            description: "禁言石倍增器上限+20",
            cost: new Decimal(0.5),
            buy(){
                player.c.points = n(format(player.c.points,5))
            },
            effect(){
                let eff = n(20)
                return eff
            },
            effectDisplay(){return "+"+format(this.effect(),0)},
            unlocked(){return player.c.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        21: {
            title: "自动释放",
            description: "释放效果持续时间持续为1s,自动获得释放效果基础,填充凝聚不再消耗禁言石",
            cost: new Decimal(0.25),
            buy(){
                player.c.points = n(format(player.c.points,5))
            },
            unlocked(){return player.c.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        22: {
            title: "最大购买",
            description: "最大化购买禁言石层的可购买,且不消耗对应资源",
            cost: new Decimal(0.25),
            buy(){
                player.c.points = n(format(player.c.points,5))
            },
            unlocked(){return player.c.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        23: {
            title: "自动石购买",
            description: "自动购买所有禁言石升级和禁言石可购买,保持填充凝聚激活状态",
            cost: new Decimal(0.25),
            buy(){
                player.c.points = n(format(player.c.points,5))
            },
            unlocked(){return player.c.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        24: {
            title: "自动砖购买",
            description: "自动购买禁言砖升级,自动砌墙,砌墙不再消耗禁言砖",
            cost: new Decimal(0.25),
            buy(){
                player.c.points = n(format(player.c.points,5))
            },
            unlocked(){return player.c.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        31: {
            title: "砖研倍化",
            description: "基于投入砌墙的禁言砖倍增禁言砖获取",
            cost: new Decimal(0.5),
            buy(){
                player.c.points = n(format(player.c.points,5))
            },
            effect(){
                let eff = player.b.walledBrick.root(10).max(1)
                eff = logsoftcap(eff,n(1e10),n(10/9))
                return eff
            },            
            effectDisplay(){return "x"+format(this.effect())},
            unlocked(){return player.c.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        32: {
            title: "高速前期",
            description: "自动'发一次信息',购买信息,禁言点升级,信息获取x3,打字冷却,禁言时间/2<br>(作者注:这个升级几乎必选)",
            cost: new Decimal(0.25),
            buy(){
                player.c.points = n(format(player.c.points,5))
            },
            unlocked(){return player.c.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        33: {
            title: "降低时长",
            description: "禁言时间,打字冷却,砌墙冷却/5",
            cost: new Decimal(0.25),
            buy(){
                player.c.points = n(format(player.c.points,5))
            },
            unlocked(){return player.c.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        34: {
            title: "不再重置",
            description: "固化重置不再重置任何资源,升级'固化速度增益'的效果锁定在x60",
            cost: new Decimal(0.5),
            buy(){
                player.c.points = n(format(player.c.points,5))
            },
            unlocked(){return player.c.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        41: {
            title: "再见挑战",
            description: "凝聚,衔接重置时不再重置禁言石挑战(实际需1.25个禁言环)",
            cost: new Decimal(1.25),
            buy(){
                player.c.points = n(format(player.c.points,5))
            },
            unlocked(){return player.c.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        42: {
            title: "保留强化",
            description: "衔接重置时保留前6个禁言砖升级(实际需1.25个禁言环)",
            cost: new Decimal(1.25),
            buy(){
                player.c.points = n(format(player.c.points,5))
            },
            unlocked(){return player.c.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        43: {
            title: "再强化禁言",
            description: "升级'超强化禁言'的效果指数基于禁言砖增加(实际需1.25个禁言环)",
            cost: new Decimal(1.25),
            effect(){
                let eff = player.b.points.max(1).log(10).sub(30).max(0)
                eff = logsoftcap2(eff,n(10),n(2))
                return eff
            },
            effectDisplay(){return "+"+format(this.effect())},
            buy(){
                player.c.points = n(format(player.c.points,5))
            },
            unlocked(){return player.c.unlocked},
            style() { return {'border-radius': "0px"}},
        },
        44: {
            title: "自动凝聚",
            description: "每秒自动获得重置可获得禁言砖的10%(实际需1.25个禁言环)",
            cost: new Decimal(1.25),
            effect(){
                let eff = n(1/10)
                return eff
            },
            effectDisplay(){return "+"+format(this.effect().mul(100),0)+"%/s"},
            buy(){
                player.c.points = n(format(player.c.points,5))
            },
            unlocked(){return player.c.unlocked},
            style() { return {'border-radius': "0px"}},
        },
    },
    update(diff){

    },
    microtabs:{
        cycles:{
            "升级":{
                buttonStyle: {
                    "border-color": "white","background-color": "#0f0f0f"
                },
                content:[
                    "blank",["upgrades",[1,2,3,4]],["display-text", function() {if(false)return "到达 5e26 禁言石 解锁 "+quickColor("禁言砖","#ce723c")}],
                ],
            },
        },
    },
    tabFormat: [ 
        ["display-text", function() { return getPointsDisplay() }],
        ["row",[["column",["main-display","prestige-button"]],"blank",                             
        ["display-text",function(){return "你有 "+format(player.b.points)+" 禁言砖<br>你最多同时拥有 "+format(player.c.best,0)+" 禁言环<br>你共有 "+format(player.c.total,0)+" 禁言环<br>你在新的衔接中花费了 "+formatTime(player.c.resetTime)+"<br>最佳衔接时间为 "+formatTime(player.c.bestTime)+""}]]],
        ["microtabs","cycles"]
    ], 
})