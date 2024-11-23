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
                let a = player.at.auto.includes(this.id)&&hasUpgrade("s",43)?"开":"关"
                return "开关自动购买禁言层升级<br>当前:"+ a},
            canClick(){return hasUpgrade("s",43)},
            onClick() {          
                quickConstElement(this.id,player.at.auto)
            },
            run(){
                if(!hasUpgrade("s",43)||!player.at.auto.includes(this.id)) return
                quickUpgBuy("m", quickSpawnConst(4,5))
            },
            style() { return { 'background-color': player.at.auto.includes(this.id)?"cyan":"#FFFFFF", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "200px"}},
            unlocked(){return hasUpgrade("s",43)||player.b.unlocked},
        },
        12:{
            title() {
                let a = player.at.auto.includes(this.id)&&hasUpgrade("s",53)?"开":"关"
                return "开关自动'发一次消息'<br>当前:"+ a},
            canClick(){return hasUpgrade("s",53)},
            onClick() {          
                quickConstElement(this.id,player.at.auto)
            },
            run(){
                if(!hasUpgrade("s",53)||!player.at.auto.includes(this.id)) return
                clickClickable("m",11)
            },
            style() { return { 'background-color': player.at.auto.includes(this.id)?"cyan":"#FFFFFF", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "200px"}},
            unlocked(){return hasUpgrade("s",53)||player.b.unlocked},
        },
        21:{
            title() {
                let a = player.at.auto.includes(this.id)&&hasUpgrade("b",25)?"开":"关"
                return "开关自动购买禁言石层升级<br>当前:"+ a},
            canClick(){return hasUpgrade("b",25)},
            onClick() {          
                quickConstElement(this.id,player.at.auto)
            },
            run(){
                if(!hasUpgrade("b",25)||!player.at.auto.includes(this.id)) return
                quickUpgBuy("s", quickSpawnConst(8,5))
            },
            style() { return { 'background-color': player.at.auto.includes(this.id)?"#AAAAAA":"#FFFFFF", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "200px"}},
            unlocked(){return hasUpgrade("b",25)},
        },
        22:{
            title() {
                let a = player.at.auto.includes(this.id)&&hasUpgrade("b",17)?"开":"关"
                return "开关自动购买禁言点倍增器<br>当前:"+ a},
            canClick(){return hasUpgrade("b",17)},
            onClick() {          
                quickConstElement(this.id,player.at.auto)
            },
            run(){
                if(!hasUpgrade("b",17)||!player.at.auto.includes(this.id)) return
                buyBuyable("s",11)
            },
            style() { return { 'background-color': player.at.auto.includes(this.id)?"#AAAAAA":"#FFFFFF", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "200px"}},
            unlocked(){return hasUpgrade("b",17)},
        },
        23:{
            title() {
                let a = player.at.auto.includes(this.id)&&hasUpgrade("b",17)?"开":"关"
                return "开关自动购买领域构筑器<br>当前:"+ a},
            canClick(){return hasUpgrade("b",17)},
            onClick() {          
                quickConstElement(this.id,player.at.auto)
            },
            run(){
                if(!hasUpgrade("b",17)||!player.at.auto.includes(this.id)) return
                buyBuyable("s",12)
            },
            style() { return { 'background-color': player.at.auto.includes(this.id)?"#AAAAAA":"#FFFFFF", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "200px"}},
            unlocked(){return hasUpgrade("b",17)},
        },
        24:{
            title() {
                let a = player.at.auto.includes(this.id)&&hasUpgrade("b",17)?"开":"关"
                return "开关保持开启填充禁言石到凝聚器<br>当前:"+ a},
            canClick(){return hasUpgrade("b",17)},
            onClick() {          
                quickConstElement(this.id,player.at.auto)
            },
            run(){
                if(!hasUpgrade("b",17)||!player.at.auto.includes(this.id)) return
                player.s.onFill = true
            },
            style() { return { 'background-color': player.at.auto.includes(this.id)?"#AAAAAA":"#FFFFFF", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "200px"}},
            unlocked(){return hasUpgrade("b",17)},
        },
        25:{
            title() {
                let a = player.at.auto.includes(this.id)&&hasUpgrade("b",43)?"开":"关"
                return "开关自动购买禁言石倍增器<br>当前:"+ a},
            canClick(){return hasUpgrade("b",43)},
            onClick() {          
                quickConstElement(this.id,player.at.auto)
            },
            run(){
                if(!hasUpgrade("b",43)||!player.at.auto.includes(this.id)) return
                buyBuyable("s",14)
            },
            style() { return { 'background-color': player.at.auto.includes(this.id)?"#AAAAAA":"#FFFFFF", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "200px"}},
            unlocked(){return hasUpgrade("b",43)},
        },
        31:{
            title() {
                let a = player.at.auto.includes(this.id)&&hasChallenge("s",14)?"开":"关"
                return "开关用禁言砖自动砌墙<br>当前:"+ a},
            canClick(){return hasUpgrade("b",17)},
            onClick() {          
                quickConstElement(this.id,player.at.auto)
            },
            run(){
                if(!hasChallenge("s",14)||!player.at.auto.includes(this.id)) return
                clickClickable("b",11)
            },
            style() { return { 'background-color': player.at.auto.includes(this.id)?"#ce723c":"#FFFFFF", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "200px"}},
            unlocked(){return hasChallenge("s",14)},
        },
    },
    microtabs:{
        autos:{
            "页1":{
                buttonStyle: {
                    "border-color": "white","background-color": "#0f0f0f"
                },
                content:[
                    "blank",["row",[["clickable",11],["clickable",12]]],["row",[["clickable",21],["clickable",22],["clickable",23],["clickable",24],["clickable",25]]],["row",[["clickable",31]]]
                ],
                unlocked(){return hasUpgrade("m",11)||player.s.unlocked},
            },
        },
    },
    tabFormat: [
       ["display-text", function() { return getPointsDisplay() }],["microtabs","autos"]
    ],
})