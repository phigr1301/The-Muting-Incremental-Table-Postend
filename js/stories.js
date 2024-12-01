//此文件是关于游戏剧情的,如果你不想被剧透,那么请你赶紧退出该文件!
addLayer("sy", {
    name: "stories",
    symbol: "剧情",
    symbolEN: "Stories", 
    position: 5,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        
    }},
    color: "cyan",
    type: "none",
    resource: "",
    row: 0,
    layerShown(){return hasUpgrade("b",27)||player.b.unlLA||player.c.unlocked},
    doReset(){},
    microtabs:{
        stories:{
            "序":{
                buttonStyle: {
                    "border-color": "white","background-color": "#0f0f0f"
                },
                content:["blank",
                    ["display-text",function(){return"<h1><s>没做呢</s>"}]                
                ],
                unlocked(){return hasUpgrade("m",11)||player.s.unlocked},
            },
        },
    },
    tabFormat: [
       ["display-text", function() { return getPointsDisplay() }],["microtabs","stories"]
    ],
})