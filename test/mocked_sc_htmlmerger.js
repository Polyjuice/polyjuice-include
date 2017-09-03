const connect = require('connect');
const fs = require('fs');
const path = require('path');

const servingDirectory = 'sc/';

connect().use('/sc/htmlmerger', function fooMiddleware(req, res, next) {
    // req.url starts with "/foo"
    const query = req._parsedUrl.query;
    const parts = query.split('&');
    let content = '';
    // console.log('Merging ' + query);
    parts.forEach((part)=>{
        // res.write("Chunk");
        const fileName = part.split('=')[1];
        if(fileName){
            if(fs.existsSync(servingDirectory + fileName)){
                content +=  fs.readFileSync(servingDirectory + fileName, 'utf8');
            } else {
                content +=  '<template>file does not exist, but you\'re just mocking, right?</template>';
            }
        }
    })
    res.setHeader('Content-Type', 'text/html');
    res.end(content);
    next();
}).listen(9999, function() {
    console.log('Mocked SC Server running on 9999...');
});
