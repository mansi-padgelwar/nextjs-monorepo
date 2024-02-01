interface Languages {
    [key: string]: {
    pair_earphone: string;
    waiting_to_pair: string;
    close: string;
    };
    }    
 
 export const languages:Languages={
    "en": {        
        "pair_earphone": "Pair Your Earphone",
        "waiting_to_pair": "Waiting to Pair Your Earphone",
        "close": "Close"        
    },
    "hi": {
        "pair_earphone": "अपना इयरफ़ोन जोड़ें",
        "waiting_to_pair": "आपके इयरफ़ोन को जोड़ने की प्रतीक्षा की जा रही है",
        "close": "बंद करना"
    },
    "es": {
        "pair_earphone": "Empareja Tus Auriculares",
        "waiting_to_pair": "Esperando Para Emparejar Su Auricular",
        "close": "Cerca"
    }
}