document.addEventListener('DOMContentLoaded', function()
{
    document.getElementById( "ipfs_gateway").onkeyup = function() {
        v = document.getElementById( "ipfs_gateway").value
        chrome.storage.sync.set( { 'ipfs_gateway': v } )
    }
    
    chrome.storage.sync.get('ipfs_gateway', function (result) {
        v = result.ipfs_gateway;
        
        if( !v ) {
            v = "http://localhost:8080/ipfs/"
            
            chrome.storage.sync.set( { 'ipfs_gateway': v} )
        }
    
        document.getElementById( "ipfs_gateway").value = v
    });
    
}, false);
    
