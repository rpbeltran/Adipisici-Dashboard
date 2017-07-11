
class Session {


    constructor( ) {

        this.url = "";

    }


    loadSession() {

        // Retrieve session data

        if( sessionStorage["session"] ) {

            var data = JSON.parse( sessionStorage.getItem("session") );

            this.url = data.url;

        }

    }


    saveSession() {

        // Save session data locally

        sessionStorage.setItem( "session", JSON.stringify( {

            url : this.url

        } ) );

    }


    connect( ) {

        // PUT AUTHENTICATION STUFF HERE
        // make the parameters whatever
        // return true if connection is successful
        // return false if connection failed

        return false;

    }



    getInfo() {

        return new Promise( function ( resolve, reject ) {

            request.get (
                {
                    url: adipisici_url + '/__adipisici/admin_panel/get_info',
                    json: true,
                    headers: { 'User-Agent': 'request' }
                },
                function ( err, res, data ) {
                    if ( err )
                        reject( 'Error: ' + err );
                    else if ( res.statusCode !== 200 )
                        reject( 'Status: ' + res.statusCode );
                    else
                        resolve( data );
                }
            );

        } );

    }



    execute( object_name, endpoint_name ) {

        return new Promise( function ( resolve, reject ) {

            request (
                {
                    url: adipisici_url + '/__adipisici/admin_panel/execute',
                    json: true,
                    headers: {
                        'User-Agent': 'dashboard'
                    },
                    form: {
                        name : object_name,
                        endpoint : endpoint_name
                    }
                },
                function ( err, res, data ) {
                    if ( err )
                        reject( 'Error: ' + err );
                    else if ( res.statusCode !== 200 )
                        reject( 'Status: ' + res.statusCode );
                    else
                        resolve( data );
                }
            );

        } );
    }



}



module.exports = Session;


