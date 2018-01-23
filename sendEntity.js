var apiai = require('apiai');

var app = apiai("40d26efb59274e6e8ab325d326ad0716");

var user_entities = [{
    name: 'Application',
    extend: false,
    entries: [
        {
            value: 'Firefox',
            synonyms: ['Firefox']
        },
        {
            value: 'XCode',
            synonyms: ['XCode']
        },
        {
            value: 'Sublime Text',
            synonyms: ['Sublime Text']
        }
    ]
}];

var user_entities_body = {
    sessionId: sessionId,
    entities: user_entities
};

var user_entities_request = app.userEntitiesRequest(user_entities_body);

user_entities_request.on('response', function(response) {
    console.log('User entities response: ');
    console.log(JSON.stringify(response, null, 4));

    var request = app.textRequest('open XCode', {sessionId: sessionId});

    request.on('response', function(response) {
        console.log('Query response: ');
        console.log(JSON.stringify(response, null, 4));
    });

    request.on('error', function(error) {
        console.log(error);
    });

    request.end();
});

user_entities_request.on('error', function(error) {
    console.log(error);
});

user_entities_request.end();
