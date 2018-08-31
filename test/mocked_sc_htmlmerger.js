const connect = require('connect');
const fs = require('fs');
const path = require('path');

const servingDirectory = 'sc/';

connect().use('/sc/htmlmerger', function fooMiddleware(req, res, next) {
    // req.url starts with "/foo"
    const query = req._parsedUrl.query;
    const pairs = query.split('&');
    let content = '';
    // console.log('Merging ' + query);
    pairs.forEach((pair)=>{
        // res.write("Chunk");
        const parts = pair.split('=');
        const appName = parts[0];
        let fileName = parts[1];
        content += `<imported-template-scope scope="${appName}"><template><meta itemprop="juicy-composition-scope" content="${appName}"/></template>`;
        if(fileName){
            fileName = fileName.replace('%2F','/');
            if(fs.existsSync(servingDirectory + fileName)){
                content +=  fs.readFileSync(servingDirectory + fileName, 'utf8');
            } else {
                content +=  '<template>file does not exist, but you\'re just mocking, right?</template>';
            }
        }
        content += `</imported-template-scope>`;
    })
    res.setHeader('Content-Type', 'text/html');
    setTimeout(()=>{
        res.end(content)
        next();
    }, 50);
}).listen(9999, function() {
    console.log('Mocked SC Server running on 9999...');
});
