export var Blockly_Debuggee = {};
Blockly_Debuggee.actions = {};

Blockly_Debuggee.state = {
  currNest : 0,
  currId : '',
  promptMsg : undefined,
  stepWait : false,
  currState: {
    stepIn : false,
    stepOver : false,
    stepParent : false,
    stepOut : false,
    continue : true
  },
  isState: function(state){
    return this.currState[state];
  },
  setState: function(new_state) {
    this.currState["stepIn"] = false;
    this.currState["stepOver"] = false;
    this.currState["stepParent"] = false;
    this.currState["stepOut"] = false;
    this.currState["continue"] = false;
    this.currState[new_state] = true;
  }
};


Blockly_Debuggee.wait = (function(){
  function highlightBlock(id, CurrentSystemEditorId){
    postMessage({"type": "highlightBlock", "data" : {"id" : id, "CurrentSystemEditorId" : CurrentSystemEditorId}});
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  function next_message() { 
    return sleep(0); 
  }

  async function wait(nest, block_id, CurrentSystemEditorId){
    highlightBlock(block_id, CurrentSystemEditorId);
    //  console.log("nest: " + nest + "    currNest: " + Blockly_Debuggee.state.currNest + "    State: " );
    //  console.log( Blockly_Debuggee.state.currState);

    var hasBreakpoint = Blockly_Debuggee.actions.breakpoint.includes(block_id) || (Blockly_Debuggee.actions["runToCursor"].cursorBreakpoint === block_id);
    
    if(Blockly_Debuggee.state.isState("continue") && !hasBreakpoint){ 
      Blockly_Debuggee.state.currNest = nest;   
      return;
    }
    if(Blockly_Debuggee.state.currNest == -1 && !hasBreakpoint) return;    // stepOver + stepOut for functions                   
      if(Blockly_Debuggee.state.isState("stepIn") || hasBreakpoint || nest <= Blockly_Debuggee.state.currNest){
        if(Blockly_Debuggee.state.currId  === block_id && !hasBreakpoint) return;
        if(Blockly_Debuggee.state.isState("stepParent") && nest == Blockly_Debuggee.state.currNest && !hasBreakpoint) return;

        // Send the array with vars values 
        Blockly_Debuggee.actions["variables"].updateDebugger();

        while(!Blockly_Debuggee.state.stepWait){
            await next_message();
        }
        Blockly_Debuggee.state.stepWait = false;
        Blockly_Debuggee.state.currId = block_id;
        if(Blockly_Debuggee.state.isState("stepOut")){
            Blockly_Debuggee.state.currNest = -1;
            Blockly_Debuggee.state.currState.stepOut = false;                                  
        }else{
            Blockly_Debuggee.state.currNest = nest;
        }       
    }
  };
  return wait;  
})();


export var window = {
  alert : function(msg) {
    // Blockly_Debuggee.actions["variables"].updateDebugger();     // gia na fainontai swsta kata to alert ta value pisw ston pinaka --- to kanei meta to alert 
    postMessage({"type": "alert", "data" : msg});
  },
  prompt : async function (msg){
    // Blockly_Debuggee.actions["variables"].updateDebugger();     // gia na fainontai swsta kata to prompt ta value pisw ston pinaka --- to kanei mete 
    postMessage({"type": "prompt", "data" : msg});
    while(Blockly_Debuggee.state.promptMsg == undefined){
      await (function(){return new Promise(resolve => setTimeout(resolve, 0));})();         // next_message();
    }
    var tmp = Blockly_Debuggee.state.promptMsg;
    Blockly_Debuggee.state.promptMsg = undefined;
    return tmp;
  }
} ;  


export var dispatcher = {
  prompt : (promptMsg) => {
    Blockly_Debuggee.state.promptMsg = promptMsg;
  }
};




