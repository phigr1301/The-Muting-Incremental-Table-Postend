addLayer("at", {
    name: "auto",
    symbol: "自动化",
    symbolEN: "Autos", 
    position: 4,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        auto: [],
    }},
    color: "grey",
    type: "none",
    resource: "",
    row: 0,
    layerShown(){return hasUpgrade("s",43)||player.b.unlocked},
    doReset(){},
    clickables:{
        11:{
            title() {
                let b = hasUpgrade("s",43)||hasUpgrade("c",32)
                let a = player.at.auto.includes(this.id)&&b?"开":"关"
                return "开关自动购买禁言层升级<br>当前:"+ a},
            canClick(){return hasUpgrade("s",43)||hasUpgrade("c",32)},
            onClick() {          
                quickConstElement(this.id,player.at.auto)
            },
            run(){
                let a = hasUpgrade("s",43)||hasUpgrade("c",32)
                if(!a||!player.at.auto.includes(this.id)) return
                quickUpgBuy("m", quickSpawnConst(4,5))
            },
            style() { return { 'background-color': player.at.auto.includes(this.id)?"cyan":"#FFFFFF", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "200px"}},
            unlocked(){return hasUpgrade("s",43)||player.b.unlocked},
        },
        12:{
            title() {
                let b = hasUpgrade("s",53)||hasUpgrade("c",32)
                let a = player.at.auto.includes(this.id)&&b?"开":"关"
                return "开关自动'发一次消息'<br>当前:"+ a},
            canClick(){return hasUpgrade("s",53)||hasUpgrade("c",32)},
            onClick() {          
                quickConstElement(this.id,player.at.auto)
            },
            run(){
                let a = hasUpgrade("s",53)||hasUpgrade("c",32)
                if(!a||!player.at.auto.includes(this.id)) return
                clickClickable("m",11)
            },
            style() { return { 'background-color': player.at.auto.includes(this.id)?"cyan":"#FFFFFF", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "200px"}},
            unlocked(){return hasUpgrade("s",53)||player.b.unlocked},
        },
        21:{
            title() {
                let b = hasUpgrade("b",25)||hasUpgrade("c",23)
                let a = player.at.auto.includes(this.id)&&b?"开":"关"
                return "开关自动购买禁言石层升级<br>当前:"+ a},
            canClick(){return hasUpgrade("b",25)||hasUpgrade("c",23)},
            onClick() {          
                quickConstElement(this.id,player.at.auto)
            },
            run(){
                let a = hasUpgrade("b",25)||hasUpgrade("c",23)
                if(!a||!player.at.auto.includes(this.id)) return
                quickUpgBuy("s", quickSpawnConst(hasUpgrade("c",23)?10:8,5))
            },
            style() { return { 'background-color': player.at.auto.includes(this.id)?"#AAAAAA":"#FFFFFF", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "200px"}},
            unlocked(){return hasUpgrade("b",25)||player.c.unlocked},
        },
        22:{
            title() {
                let b = hasUpgrade("b",17)||hasUpgrade("c",23)
                let a = player.at.auto.includes(this.id)&&b?"开":"关"
                return "开关自动购买禁言点倍增器<br>当前:"+ a},
            canClick(){return hasUpgrade("b",17)||hasUpgrade("c",23)},
            onClick() {          
                quickConstElement(this.id,player.at.auto)
            },
            run(){
                let a = hasUpgrade("b",17)||hasUpgrade("c",23)
                if(!a||!player.at.auto.includes(this.id)) return
                buyBuyable("s",11)
            },
            style() { return { 'background-color': player.at.auto.includes(this.id)?"#AAAAAA":"#FFFFFF", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "200px"}},
            unlocked(){return hasUpgrade("b",17)||player.c.unlocked},
        },
        23:{
            title() {
                let b = hasUpgrade("b",17)||hasUpgrade("c",23)
                let a = player.at.auto.includes(this.id)&&b?"开":"关"
                return "开关自动购买领域构筑器<br>当前:"+ a},
            canClick(){return hasUpgrade("b",17)||hasUpgrade("c",23)},
            onClick() {          
                quickConstElement(this.id,player.at.auto)
            },
            run(){
                let a = hasUpgrade("b",17)||hasUpgrade("c",23)
                if(!a||!player.at.auto.includes(this.id)) return
                buyBuyable("s",12)
            },
            style() { return { 'background-color': player.at.auto.includes(this.id)?"#AAAAAA":"#FFFFFF", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "200px"}},
            unlocked(){return hasUpgrade("b",17)||player.c.unlocked},
        },
        24:{
            title() {
                let b = hasUpgrade("b",17)||hasUpgrade("c",23)
                let a = player.at.auto.includes(this.id)&&b?"开":"关"
                return "开关保持开启填充禁言石到凝聚器<br>当前:"+ a},
            canClick(){return hasUpgrade("b",17)||hasUpgrade("c",23)},
            onClick() {          
                quickConstElement(this.id,player.at.auto)
            },
            run(){
                let a = hasUpgrade("b",17)||hasUpgrade("c",23)
                if(!a||!player.at.auto.includes(this.id)) return
                player.s.onFill = hasChallenge("s",12)||hasUpgrade("b",22)
            },
            style() { return { 'background-color': player.at.auto.includes(this.id)?"#AAAAAA":"#FFFFFF", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "200px"}},
            unlocked(){return hasUpgrade("b",17)||player.c.unlocked},
        },
        25:{
            title() {
                let b = hasUpgrade("b",43)||hasUpgrade("c",23)
                let a = player.at.auto.includes(this.id)&&b?"开":"关"
                return "开关自动购买禁言石倍增器<br>当前:"+ a},
            canClick(){return hasUpgrade("b",43)||hasUpgrade("c",23)},
            onClick() {          
                quickConstElement(this.id,player.at.auto)
            },
            run(){
                let a = hasUpgrade("b",43)||hasUpgrade("c",23)
                if(!a||!player.at.auto.includes(this.id)) return
                buyBuyable("s",14)
            },
            style() { return { 'background-color': player.at.auto.includes(this.id)?"#AAAAAA":"#FFFFFF", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "200px"}},
            unlocked(){return hasUpgrade("b",43)||player.c.unlocked},
        },
        26:{
            title() {
                let a = player.at.auto.includes(this.id)&&hasUpgrade("c",21)?"开":"关"
                return "开关自动获取释放效果<br>当前:"+ a},
            canClick(){return hasUpgrade("c",21)},
            onClick() {          
                quickConstElement(this.id,player.at.auto)
            },
            run(){
                if(!hasUpgrade("c",21)||!player.at.auto.includes(this.id)) return
                player.s.outTime=one;player.s.outEffBase=player.s.outEffBase.max(tmp.s.clickables[31].effectB)
            },
            style() { return { 'background-color': player.at.auto.includes(this.id)?"#AAAAAA":"#FFFFFF", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "200px"}},
            unlocked(){return hasUpgrade("c",21)},
        },
        31:{
            title() {
                let b = hasChallenge("s",14)||hasUpgrade("c",24)
                let a = player.at.auto.includes(this.id)&&b?"开":"关"
                return "开关用禁言砖自动砌墙<br>当前:"+ a},
            canClick(){return hasChallenge("s",14)||hasUpgrade("c",24)},
            onClick() {          
                quickConstElement(this.id,player.at.auto)
            },
            run(){
                let a = hasChallenge("s",14)||hasUpgrade("c",24)
                if(!a||!player.at.auto.includes(this.id)) return
                clickClickable("b",11)
            },
            style() { return { 'background-color': player.at.auto.includes(this.id)?"#ce723c":"#FFFFFF", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "200px"}},
            unlocked(){return hasChallenge("s",14)||player.c.unlocked},
        },
        32:{
            title() {
                let a = player.at.auto.includes(this.id)&&hasUpgrade("c",24)?"开":"关"
                return "开关自动购买禁言砖层升级<br>当前:"+ a},
            canClick(){return hasUpgrade("c",24)},
            onClick() {          
                quickConstElement(this.id,player.at.auto)
            },
            run(){
                if(!hasUpgrade("c",24)||!player.at.auto.includes(this.id)) return
                quickUpgBuy("b", quickSpawnConst(5,7))
            },
            style() { return { 'background-color': player.at.auto.includes(this.id)?"#ce723c":"#FFFFFF", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "200px"}},
            unlocked(){return hasUpgrade("c",24)},
        },
    },
    microtabs:{
        autos:{
            "页1":{
                buttonStyle: {
                    "border-color": "white","background-color": "#0f0f0f"
                },
                content:[
                    "blank",["row",[["clickable",11],["clickable",12]]],["row",[["clickable",21],["clickable",22],["clickable",23],["clickable",24],["clickable",25],["clickable",26]]],["row",[["clickable",31],["clickable",32]]]
                ],
                unlocked(){return hasUpgrade("m",11)||player.s.unlocked},
            },
        },
    },
    tabFormat: [
       ["display-text", function() { return getPointsDisplay() }],["microtabs","autos"]
    ],
})