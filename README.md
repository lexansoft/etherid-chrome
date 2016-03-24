# etherid-chrome

EtherId-chrome extention is a small plugin that redirect the url's based on the EtherId values.

In order the extenstion to work you need to install and run Ethereum node and made the JSON RPC available. 

# IPFS redirection

Once you install the plugin, you can simply use the EtherID IPFS hash values in the file:///ipfs urls.

For example, if you type

        file:///ipfs/test
        
or

        file:///ipfs/test.ipfs
        
the browser will automatically redirect into the IPFS hash specified in the test.ipfs Ether ID:

        http://localhost:8080/ipfs/QmUrTBzXHK4Ba8wJzRLnYHtXvDnVtuYuNuHzFh3Co9a6HV
        
        
# HTTP redirections

The plugin redirects the urls from non existing domain e.id ( http://e.id/ ). If you try URL

        http://e.id/test
        
or

        http://e.id/test.ip
        
the plugin will find the value for Ether ID test.ip and substitute the domain:

        http://74.220.208.218
        
Also it will rcognize the urls like http://e.id/ipfs/... and also redirect them into the ipfs gateway.

# Configure IPFS Gateway

You can configure the IPFS Gateway in the extension options page. The default value is:

        http://localhost:8080/ipfs/

Note, do not forget the '/' at the end.
        
        
