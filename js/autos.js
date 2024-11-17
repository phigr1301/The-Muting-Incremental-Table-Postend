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
                let a = player.at.auto.includes("autoBuyMUpgs")&&hasUpgrade("s",43)?"开":"关"
                return "开关自动购买禁言层升级<br>当前:"+ a},
            canClick(){return hasUpgrade("s",43)},
            onClick() {          
                quickConstElement("autoBuyMUpgs",player.at.auto)
            },
            run(){
                if(!hasUpgrade("s",43)||!player.at.auto.includes("autoBuyMUpgs")) return
                quickUpgBuy("m", quickSpawnConst(4,5))
            },
            style() { return { 'background-color': player.at.auto.includes("autoBuyMUpgs")?"cyan":"#FFFFFF", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "200px"}},
            unlocked(){return hasUpgrade("s",43)||player.b.unlocked},
        },
        12:{
            title() {
                let a = player.at.auto.includes("autoSendMsgs")&&hasUpgrade("s",53)?"开":"关"
                return "开关自动'发一次消息'<br>当前:"+ a},
            canClick(){return hasUpgrade("s",53)},
            onClick() {          
                quickConstElement("autoSendMsgs",player.at.auto)
            },
            run(){
                if(!hasUpgrade("s",53)||!player.at.auto.includes("autoSendMsgs")) return
                clickClickable("m",11)
            },
            style() { return { 'background-color': player.at.auto.includes("autoSendMsgs")?"cyan":"#FFFFFF", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "200px"}},
            unlocked(){return hasUpgrade("s",53)||player.b.unlocked},
        },
        21:{
            title() {
                let a = player.at.auto.includes("autoBuySUpgs")&&hasUpgrade("b",25)?"开":"关"
                return "开关自动购买禁言石层升级<br>当前:"+ a},
            canClick(){return hasUpgrade("b",25)},
            onClick() {          
                quickConstElement("autoBuySUpgs",player.at.auto)
            },
            run(){
                if(!hasUpgrade("b",25)||!player.at.auto.includes("autoBuySUpgs")) return
                quickUpgBuy("s", quickSpawnConst(8,5))
            },
            style() { return { 'background-color': player.at.auto.includes("autoBuySUpgs")?"#AAAAAA":"#FFFFFF", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "200px"}},
            unlocked(){return hasUpgrade("b",25)},
        },
        22:{
            title() {
                let a = player.at.auto.includes("autoBuySB1")&&hasUpgrade("b",17)?"开":"关"
                return "开关自动购买禁言点倍增器<br>当前:"+ a},
            canClick(){return hasUpgrade("b",17)},
            onClick() {          
                quickConstElement("autoBuySB1",player.at.auto)
            },
            run(){
                if(!hasUpgrade("b",17)||!player.at.auto.includes("autoBuySB1")) return
                buyBuyable("s",11)
            },
            style() { return { 'background-color': player.at.auto.includes("autoBuySB1")?"#AAAAAA":"#FFFFFF", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "200px"}},
            unlocked(){return hasUpgrade("b",17)},
        },
        23:{
            title() {
                let a = player.at.auto.includes("autoBuySB2")&&hasUpgrade("b",17)?"开":"关"
                return "开关自动购买领域构筑器<br>当前:"+ a},
            canClick(){return hasUpgrade("b",17)},
            onClick() {          
                quickConstElement("autoBuySB2",player.at.auto)
            },
            run(){
                if(!hasUpgrade("b",17)||!player.at.auto.includes("autoBuySB2")) return
                buyBuyable("s",12)
            },
            style() { return { 'background-color': player.at.auto.includes("autoBuySB2")?"#AAAAAA":"#FFFFFF", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "200px"}},
            unlocked(){return hasUpgrade("b",17)},
        },
        24:{
            title() {
                let a = player.at.auto.includes("keepOnFill")&&hasUpgrade("b",17)?"开":"关"
                return "开关保持开启填充禁言石到凝聚器<br>当前:"+ a},
            canClick(){return hasUpgrade("b",17)},
            onClick() {          
                quickConstElement("keepOnFill",player.at.auto)
            },
            run(){
                if(!hasUpgrade("b",17)||!player.at.auto.includes("keepOnFill")) return
                player.s.onFill = true
            },
            style() { return { 'background-color': player.at.auto.includes("keepOnFill")?"#AAAAAA":"#FFFFFF", filter: "brightness(100%)",'border-radius': "0px",height: "120px", width: "200px"}},
            unlocked(){return hasUpgrade("b",17)},
        },
    },
    microtabs:{
        autos:{
            "页1":{
                buttonStyle: {
                    "border-color": "white","background-color": "#0f0f0f"
                },
                content:[
                    "blank",["row",[["clickable",11],["clickable",12]]],["row",[["clickable",21],["clickable",22],["clickable",23],["clickable",24]]]
                ],
                unlocked(){return hasUpgrade("m",11)||player.s.unlocked},
            },
        },
    },
    tabFormat: [
       ["display-text", function() { return getPointsDisplay() }],["microtabs","autos"]
    ],
})