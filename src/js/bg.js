var url = require( 'url' );
var Web3 = require( 'web3')


var web3 = new Web3()

if( web3.currentProvider == null )
    web3.setProvider( new web3.providers.HttpProvider( ) );

var EID = require( 'etherid-js')
var ipfs_gateway

chrome.storage.sync.get('ipfs_gateway', function (result) {
    ipfs_gateway = result.ipfs_gateway;
        
    if( !ipfs_gateway ) {
        ipfs_gateway = "http://localhost:8080/ipfs/"
            
        chrome.storage.sync.set( { 'ipfs_gateway': v} )
    }
});


chrome.storage.onChanged.addListener( function( changes, namespace ) {
    for (key in changes) {
          var storageChange = changes[key];
        
        if( key == "ipfs_gateway" ) {
            ipfs_gateway = storageChange.newValue
        }
    }
});


chrome.webRequest.onBeforeRequest.addListener(
    
    function(details)
    {
        var u = url.parse( details.url )
        
        if( u.path.startsWith( "/ipfs") ) {

            var ss = u.path.split( "/")
            
            if( ss.length > 2 ) {
                
                var dd = ss[2].split( ".")
                
                var domain = dd[0]
                var ID = dd.length > 1 ? dd[1] : "ipfs"
                
                console.log( "domain:" + domain + " ID:" + ID );

                var r = EID.getId( web3, domain, ID )
                
                if( r.value != 0 && r.valueHash != "" ) {
                    console.log( "Found IPFS hash:" + r.valueHash );
                    
                    var tail = ""
                    for( var i = 3; i < ss.length; i++ ) tail += "/" + ss[i]

                    return {
                        redirectUrl: ipfs_gateway + r.valueHash + tail
                    };
                }
            }
        }
    },
    {urls: ["file://*/*"]},
    ['blocking']    
);

chrome.webRequest.onBeforeRequest.addListener(
    
    function(details)
    {
        console.log( "url:" + details.url );
        var u = url.parse( details.url )
        
        if( u.path.startsWith( "/ipfs") ) {

            var ss = u.path.split( "/")
            
            if( ss.length > 2 ) {
                
                var dd = ss[2].split( ".")
                
                var domain = dd[0]
                var ID = dd.length > 1 ? dd[1] : "ipfs"
                
                console.log( "domain:" + domain + " ID:" + ID );

                var r = EID.getId( web3, domain, ID )
                
                if( r.value != 0 && r.valueHash != "" ) {
                    console.log( "Found IPFS hash:" + r.valueHash );
                    
                    var tail = ""
                    for( var i = 3; i < ss.length; i++ ) tail += "/" + ss[i]

                    return {
                        redirectUrl: ipfs_gateway + r.valueHash + tail
                    };
                }
            }
        } else {
            var ss = u.path.split( "/")
            
            if( ss.length > 1 ) {
                var dd = ss[1].split( ".")
                
                var domain = dd[0]
                var ID = dd.length > 1 ? dd[1] : "ip"
                
                console.log( "domain:" + domain + " ID:" + ID );

                var r = EID.getId( web3, domain, ID )
                
                if( r.valueStr != "" ) {
                    console.log( "Found IP string:" + r.valueStr );
                    
                    var tail = ""
                    for( var i = 2; i < ss.length; i++ ) tail += "/" + ss[i]

                    var p = u.port ? ":" + u.port : ""
                        
                    return {
                        redirectUrl: u.protocol + "//" + r.valueStr + p + tail
                    };
                }
            }
            
        }
        
    },
    {urls: ["*://e.id/*"]},
    ['blocking']    
);
console.log( "All set!");
