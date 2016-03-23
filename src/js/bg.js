var url = require( 'url' );
var Web3 = require( 'web3')


var web3 = new Web3()

if( web3.currentProvider == null )
    web3.setProvider( new web3.providers.HttpProvider( ) );

var EID = require( 'etherid-js')

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
                
                if( r.valueHash != "" ) {
                    console.log( "Found IPFS hash:" + r.valueHash );
                    
                    var tail = ""
                    for( var i = 3; i < ss.length; i++ ) tail += "/" + ss[i]

                    return {
                        redirectUrl: "http://localhost:8080/ipfs/" + r.valueHash + tail
                    };
                }
            }
        }
    },
    {urls: ["file://*/*"]},
    ['blocking']    
);

console.log( "All set!");
