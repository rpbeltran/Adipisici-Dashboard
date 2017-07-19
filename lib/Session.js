
var request = require('request');

class Session {


    constructor( ) {

        this.url = "";

    }

    // ------------------------------------------------------------------------------


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

        // either
        //  return true if connection is successful
        //  return false if connection failed
        // or even better
        //  make this a promise that resolves or rejects depending on if connection was successful

        return false;

    }


    // ------------------------------------------------------------------------------


    get( url ) {

        var this_ = this;

        return new Promise( function ( resolve, reject ) {

            request.get (
                {
                    url: this_.url + url,
                    json: true,
                    headers: { 'User-Agent': 'adipsiici' }
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

    post( url, body ) {

        var this_ = this;

        return new Promise( function ( resolve, reject ) {

            request.post(
                {
                    url: this_.url + url,
                    json: true,
                    headers: { 'User-Agent': 'adipisici' },
                    form: body
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


    // ------------------------------------------------------------------------------


    getInfo() {

        return this.get( '/__adipisici/admin_panel/get_info' );

    }

    list_objects() {

        return this.get( '/__adipisici/admin_panel/list_objects' );

    }

    execute( object_name, endpoint_name ) {

        return this.post( '/__adipisici/admin_panel/execute', {
                name : object_name,
                endpoint : endpoint_name
        } );

    }


}



module.exports = Session;


