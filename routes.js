const fs = require('fs');

//route
const handler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/users') {
        return fs.readFile('./message.txt', (err, ds) => {
            const d = ds.toString().trim().split('\n').map(d => `<li>${d}</li>`).join('');
            res.write("<html>");
            res.write("<head><title>Users List</title></head>")
            res.write(`<body<h1>Users</h1><ul>${d}</ul><a href='/'>Create New User</a></body>`)
            res.write("</html>");
            return res.end();
        });
    }
    if(url === '/create-user') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }); 
        return req.on('end', () => {
            const d = Buffer.concat(body).toString().split('=')[1];
            console.log(d);
            fs.appendFile('message.txt', d+'\n', (err) => {
                console.log('Saved!');
            });
            res.setHeader('Content-Type', 'text/html');
            res.write("<html>");
            res.write("<head><title>Created User</title></head>")
            res.write(`<body>${d ? '<h1>Created New User: ' + d + '</h1>' : ''} <a href='/users'>Users</a></body>`)
            res.write("</html>");
            res.end();
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.write("<html>");
    res.write("<head><title>Create User</title></head>")
    res.write("<body><form action='/create-user' method='POST'><input type='text' name='username' /><button type='submit'>Submit</form></body>")
    res.write("</html>");
    res.end();
}

exports.routing = handler;